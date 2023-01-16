import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import CanvasJSReact from "../../canvas/canvasjs.react";

import { summaryLCASummaryRedux } from "../../redux/features/summary/summaryDataSlice";
import { chartThemeColorsArray } from "../../utils/graphDesignConstants";
import { update_allowed_tabs, update_is_next_tab_allowed } from "../../redux/features/allowedTabsSlice";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import SummarySideMenu from "../../components/sideMenus/SummarySideMenu";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("themeColors", chartThemeColorsArray);

const initPieGraphOptions = {
  animationEnabled: true,
  title: {
    text: "",
    fontSize:15,
    fontWeight: 700,
    fontFamily: "Noto Sans"
  },
  colorSet: "themeColors",
  data: [{
    type: "pie",
    showInLegend: false,
    legendText: "{name}",
    dataPoints: [{ name: "",     y: 1 }]
  }]
}

const initColumnChartPointObj =   {
  type: "stackedColumn100",
  legendText: "", //source + targetProcess
  showInLegend: "true",
  dataPoints: [
    {  y: 0, label: ""} //per each category, add value
  ]
}

const initColumnChartOptions = 	{
  animationEnabled: true,
  legend: {
    fontSize:15,
    fontWeight: 400,
    fontFamily: "Noto Sans",
  },
  data: []
}

function SummarySummary() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  const AllowedPages = useSelector(state => state.allowedSummaryPages);
  const SummaryLCASummaryData = useSelector(summaryLCASummaryRedux);

  const [selectedDispMode, setSelDispMode] = useState("Column Chart");

  const [columnGraphOptions, setColumnGraphOptions] = useState(initColumnChartOptions);
  const [allPieChartsGraphObjs, setAllPieChartsGraphObjs] = useState([])

  useEffect(()=>{
    if(!AllowedPages.summaryLCASummary){
      navigate(-1);
    }else{
      reduxDispatch(update_allowed_tabs({sensitivityAnalysis: true}))
      reduxDispatch(update_is_next_tab_allowed(true))
    }
  },[AllowedPages, navigate, reduxDispatch])

  useEffect(()=>{
    setShowLoadingScreen(true)

    setSelDispMode("Column Chart")


    let allDataPointObjs = []

    //for column charts, use SummaryLCASummaryData as is
    SummaryLCASummaryData.forEach(item => {
      let newPointObj = cloneDeep(initColumnChartPointObj)
      newPointObj.legendText = `(${item.source}) ${item.targetProcess}`

      let newDataPoints = []

      item.impact_assesment.forEach(ass => {
        newDataPoints.push({  y: ass.value, label: ass.category} )
      })

      newPointObj.dataPoints = newDataPoints

      allDataPointObjs.push(newPointObj)
    })

    let newColumnChartOptions = cloneDeep(initColumnChartOptions)

    // newColumnChartOptions.title = ""
    newColumnChartOptions.data = allDataPointObjs;

    setColumnGraphOptions(newColumnChartOptions)

    //GET PIE CHARTS LIST
    let impactCategoryList = []
    let finalCategoryList = []

    SummaryLCASummaryData[0].impact_assesment.forEach(item => {
      impactCategoryList.push(item.category)
    })

    impactCategoryList.forEach(category => {
      let finalList = []
      SummaryLCASummaryData.forEach(item => {
        let valueIdx = item.impact_assesment.findIndex(obj => obj.category  === category)

        if(valueIdx>-1){
          let newFinalItem = cloneDeep(item.impact_assesment[valueIdx])
          delete newFinalItem.category
          finalList.push({...newFinalItem, source: item.source, targetProcess: item.targetProcess})
        }
      })

      finalCategoryList.push({category, values: finalList})
    })

    let pieCharts = []

    finalCategoryList.forEach(item => {
      let thisDataPoints = []

      item.values.forEach(item => {
        thisDataPoints.push({
          name: `(${item.source}) ${item.targetProcess}`, y: item.value
        })
      })
  
      let newGraphOptions = cloneDeep(initPieGraphOptions)
      newGraphOptions.title.text = item.category;
      newGraphOptions.data[0].dataPoints = thisDataPoints;

      pieCharts.push(newGraphOptions)

    })

    setAllPieChartsGraphObjs(pieCharts);
  
    setShowLoadingScreen(false)
  },[SummaryLCASummaryData])


  const updateSelectedData = (newDisp) => {
    setSelDispMode(newDisp)
  }

  const MenuOptions = [
    {
      title: "Column Chart",
      onClick: () => updateSelectedData("Column Chart")
    },
    {
      title: "Pie Chart",
      onClick: () => updateSelectedData("Pie Chart")
    },
  ]

  const renderedPieCharts = allPieChartsGraphObjs.map((chart, chartIdx)=>{
    return(
      <div className="column is-one-quarter" key={chartIdx}>
        <div className="box mx-1" >
          <CanvasJSChart options={chart}/>
        </div>
      </div>
    )
  })

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<SummarySideMenu/>}>
          <EditorTopMenu 
          downloadType="image" 
          pageTitle="Chart Type: "
          menuOptions={MenuOptions} 
          selected={selectedDispMode}
          />

          <div className="mr-4">
            {selectedDispMode === "Column Chart"? (
              <div className="column box">
                <CanvasJSChart options={columnGraphOptions}/>
              </div>
            ):(
              <div className="columns is-multiline">
                {renderedPieCharts}
              </div>
            )}
          </div>

        </AppPageLayout>
      </div>
    );
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default SummarySummary;
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import CanvasJSReact from "../../canvas/canvasjs.react";

import { chartThemeColorsArray, getInitDoughnutGraphOptions } from "../../utils/graphDesignConstants";

import { lastestCurrencyRateRedux } from "../../redux/features/allowedTabsSlice";
import { biAssumptionRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { teaOpexCostRedux, teaOpexUnitRedux } from "../../redux/features/tea/TEAOpexSlice";

import { captalizeFirst, formatDigit } from "../../utils/appUtils";
import { TEAOpexCostSample } from "../../utils/testData";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import SummarySideMenu from "../../components/sideMenus/SummarySideMenu";
import TableRow from "../../components/table/TableRow";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("themeColors", chartThemeColorsArray);

const initRowObj =   {
  rowId: null,
  rowHeader: null,
  columns: [
    {
      colId: "00",
      colType: "display,currency",
      colValue: ""
    },
    {
      colId: "01",
      colType: "display",
      colValue: "₩/hr"
    }
  ]
}

const initDataArr = [
  { name: "DOTP",     y: 1 },
]

const initGraphOptions = getInitDoughnutGraphOptions("Feed", initDataArr)

function SummaryOpex() {
  const navigate = useNavigate();

  const [graphOptions, setGraphOptions] = useState(initGraphOptions)

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [selectedDisplayData, setSelectedDisplayData] = useState("Feed")
  const [tableData, setTableData] = useState([])
  const [columnHeaders, setColumnHeaders] = useState(["Feed", "Value", "Unit"])

  const AllowedPages = useSelector(state => state.allowedSummaryPages);
  const TeaOpexCost = useSelector(teaOpexCostRedux);
  const TeaOpexUnit = useSelector(teaOpexUnitRedux);
  const BIAssumptionData = useSelector(biAssumptionRedux);
  const LastestCurrencyRate = useSelector(lastestCurrencyRateRedux);
  const [exchangeRate, setExchangeRate] = useState(LastestCurrencyRate)

  const[thisPageCurrency, setThisPageCurrency] = useState(TeaOpexUnit)

  useEffect(()=>{
    if(!AllowedPages.summaryTEAOpex){
      navigate(-1)
    }
  },[AllowedPages, navigate])

  const getTableDataByStream = useCallback((stream = "feed") => {
    setShowLoadingScreen(true)
    const serverData = TeaOpexCost[stream]? TeaOpexCost[stream]: TEAOpexCostSample[stream];
    const ServerOperatingHour = BIAssumptionData? BIAssumptionData.assumption_value.operatinghour : 8760

    let initTableRowData = []
    let sumOfMassFlow = 0

    serverData.forEach((row, rowIndex) => {
      let newRow = cloneDeep(initRowObj);

      newRow["rowId"] = formatDigit(rowIndex);
      newRow["rowHeader"] = row.CompoundName;

      const singleMassFlow = row.massFlow? row.massFlow*row.cost : 0 * row.cost

      sumOfMassFlow = sumOfMassFlow+singleMassFlow
      
      newRow["columns"] = [
        {
          colId: formatDigit(0 + rowIndex),
          colType: "display,currency",
          colValue: singleMassFlow*ServerOperatingHour
        },
        {
          colId: formatDigit(1 + rowIndex),
          colType: "display",
          colValue: TeaOpexUnit === "krw"? "₩/yr":"$/yr"
        }
      ]

      initTableRowData.push(newRow)
    })

    let newGraphData = []

    initTableRowData.forEach(row => {
      newGraphData.push({
        name: row.rowHeader,
        y: row.columns[0].colValue
      })
    })

    let newGraphObj = cloneDeep(initGraphOptions)
    newGraphObj.title.text = captalizeFirst(stream);
    newGraphObj.data[0].yValueFormatString = TeaOpexUnit === "krw"? "#,### ₩/yr":"#,### $/yr"
    newGraphObj.data[0].dataPoints = newGraphData;
    setGraphOptions(newGraphObj)

    const currentLength = initTableRowData.length;

    let opexRow2 = cloneDeep(initRowObj);

    opexRow2["rowId"] = formatDigit(currentLength+1);
    opexRow2["rowHeader"] = "OPEX";
    
    opexRow2["columns"] = [
      {
        colId: formatDigit(0 + currentLength+1),
        colType: "display,currency",
        colValue:  sumOfMassFlow*ServerOperatingHour,
      },
      {
        colId: formatDigit(1 + currentLength+1),
        colType: "display",
        colValue: TeaOpexUnit === "krw"? "₩/yr":"$/yr"
      }
    ]

    initTableRowData.push(opexRow2)

    setTableData(initTableRowData)
    setShowLoadingScreen(false)
  }, [TeaOpexCost, TeaOpexUnit, BIAssumptionData])

  useEffect(()=>{
    getTableDataByStream()
    setSelectedDisplayData("Feed")
  },[getTableDataByStream])

  useEffect(()=>{
    if(BIAssumptionData!=null){
      setExchangeRate(BIAssumptionData.assumption_value.exchangerate)
    }
  },[BIAssumptionData])

  const updateSelectedData = (newMode) => {
    setColumnHeaders([newMode, "Value", "Unit"])
    setSelectedDisplayData(newMode)
    getTableDataByStream(newMode.toLowerCase())
  }

  const MenuOptions = [
    {
      title: "Feed",
      onClick: () => updateSelectedData("Feed")
    },
    {
      title: "Utility",
      onClick: () => updateSelectedData("Utility")
    },
    {
      title: "Waste",
      onClick: () => updateSelectedData("Waste")
    },
  ]

  const handleUnitSelection = () => {
    setShowLoadingScreen(true)

    if(thisPageCurrency === "krw"){
      setThisPageCurrency("usd")

      let newTableData = cloneDeep(tableData)

      newTableData.forEach(row => {
        row.columns[0].colValue = row.columns[0].colValue>0? row.columns[0].colValue/exchangeRate : 0
        row.columns[1].colValue = "$/yr"
      })

      setTableData(newTableData)

      let newGraphOptions = cloneDeep(graphOptions)
      newGraphOptions.data[0].yValueFormatString = "#,### $/yr"
      newGraphOptions.data[0].dataPoints.forEach(point => {
        point.y = point.y/exchangeRate
      })

      setGraphOptions(newGraphOptions)
      setShowLoadingScreen(false)
    }else{
      setThisPageCurrency("krw")

      let newTableData = cloneDeep(tableData)

      newTableData.forEach(row => {
        row.columns[0].colValue = row.columns[0].colValue*exchangeRate
        row.columns[1].colValue = "₩/yr"
      })

      setTableData(newTableData)

      let newGraphOptions = cloneDeep(graphOptions)
      newGraphOptions.data[0].yValueFormatString = "#,### ₩/yr"
      newGraphOptions.data[0].dataPoints.forEach(point => {
        point.y = point.y*exchangeRate
      })

      setGraphOptions(newGraphOptions)
      setShowLoadingScreen(false)
    }
  }

  const ThisTable = () => {
    const renderedTableBody = tableData.slice(0, tableData.length-1).map(row => {
      return(
        <tr key={row.rowId}>
          <TableRow
            rowId={row.rowId} 
            rowHeader={row.rowHeader}
            rowCols={row.columns} 
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      return(
        <th 
        key={idx} 
        className={`is-vcentered ${col === "Unit"? "has-text-centered": idx === 1? "has-text-right" : "has-text-left"}`}>
          {col}
        </th>
      )
    })

    const RenderedTableFooter = () => {
      return (
        <tr key={tableData[tableData.length-1].rowId}>
          <TableRow
            rowId={tableData[tableData.length-1].rowId} 
            rowHeader={tableData[tableData.length-1].rowHeader}
            rowCols={tableData[tableData.length-1].columns} 
          />
        </tr>
      )  
    }
  
    return(
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>{renderedTableColumns}</tr>
        </thead>
        <tbody>
          {renderedTableBody}
        </tbody>
        <tfoot className="has-background-primary-light">
          <RenderedTableFooter/>
        </tfoot>
      </table>
    );
  }

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<SummarySideMenu/>}>
          <EditorTopMenu 
          downloadType="image" 
          pageTitle="Sream: "
          menuOptions={MenuOptions} 
          onUnitSelect={handleUnitSelection}
          selected={selectedDisplayData}
          />

          <div className="columns mr-4">
            <div className="column is-two-fifths mr-4">
              <div className="table-container box">
                <ThisTable/>
              </div>
            </div>
            <div className="column box" style={{height: 500}}>
              <CanvasJSChart containerProps={{ width: '100%', height: '100%' }} options={graphOptions}/>
            </div>
          </div>

          <div className='block'/>
          
        </AppPageLayout>
      </div>
    );
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default SummaryOpex;
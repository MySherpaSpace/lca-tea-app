import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";

import CanvasJSReact from "../../canvas/canvasjs.react";

import { teaCapexResultsRedux } from "../../redux/features/tea/TEACapexSlice";
import { biAssumptionRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { lastestCurrencyRateRedux } from "../../redux/features/allowedTabsSlice";

import { allowServerComm } from "../../utils/appConstants";
import { TEACapexResultsSample } from "../../utils/testData";
import { chartThemeColorsArray, getInitDoughnutGraphOptions } from "../../utils/graphDesignConstants";

import AppPageLayout from "../../components/AppPageLayout";
import SummarySideMenu from "../../components/sideMenus/SummarySideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("themeColors", chartThemeColorsArray);

const thisTDCCChartTitle = "Contributions to Total Direct Capital Cost" 
const thisTCCChartTitle = "Contributions to Total Capital Cost" 
const initDataArr = [
  { name: "Compressor",     y: 1 },
  { name: "Instantaneous",  y: 1 },
  { name: "Column",         y: 1 },
  { name: "Heat Exchanger", y: 1 },
  { name: "Pump",           y: 1 },
  { name: "Heater",         y: 1 },
  { name: "Cooler",         y: 1 },
  { name: "Vessel",         y: 1 }
]

const initGraphOptions = getInitDoughnutGraphOptions(thisTDCCChartTitle, initDataArr)

function SummaryCapex() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [selectedDisplayData, setSelectedDisplayData] = useState("Direct Capital Cost")
  const [graphOptions, setGraphOptions] = useState(initGraphOptions)

  const [columnHeaders, setColumnHeaders] = useState(["Unit Type", "Total Direct Capital Cost", "Unit"])

  const [allTableData, setAllTableData] = useState({tdcc: [], tcc: []})
  const [tableData, setTableData] = useState([])

  const TEACapexResults = useSelector(teaCapexResultsRedux);
  const TEACapexResultsSummary = useSelector(state => state.TEACAPEXResultsSummary);

  const BIAssumptionData = useSelector(biAssumptionRedux);
  const LastestCurrencyRate = useSelector(lastestCurrencyRateRedux);
  const [exchangeRate, setExchangeRate] = useState(LastestCurrencyRate)

  const [contributionsToTDCCData, setContributionsToTDCCData] = useState([])
  const [contributionsToTCCData, setContributionsToTCCData] = useState([])

  const[thisPageCurrency, setThisPageCurrency] = useState("krw")
  

  useEffect(()=>{
    if(BIAssumptionData!=null){
      setExchangeRate(BIAssumptionData.assumption_value.exchangerate)
    }
  },[BIAssumptionData])

  const getContributionsToTDCCData = useCallback((rows=[], rate) => {

    let totalCost = 0

    rows.forEach(row => {
      totalCost = totalCost+row.Total_Cost[0]
    })

    return totalCost*rate
  },[])

  useEffect(()=>{
    setShowLoadingScreen(true)
    setSelectedDisplayData("Direct Capital Cost")
    setThisPageCurrency("krw")

    let serverData = allowServerComm? TEACapexResults.unit_cost : TEACapexResultsSample.unit_cost;

    const newTDCCData = [
      { name: "Compressor",     y: getContributionsToTDCCData(serverData["COMPRESSOR"], exchangeRate) },
      { name: "Instantaneous",  y: getContributionsToTDCCData(serverData["INSTANTANEOUS"], exchangeRate) },
      { name: "Column",         y: getContributionsToTDCCData(serverData["COLUMN"], exchangeRate) },
      { name: "Heat Exchanger", y: getContributionsToTDCCData(serverData["EXCHANGER"], exchangeRate) },
      { name: "Pump",           y: getContributionsToTDCCData(serverData["PUMP"], exchangeRate) },
      { name: "Heater",         y: getContributionsToTDCCData(serverData["HEATER"], exchangeRate) },
      { name: "Cooler",         y: getContributionsToTDCCData(serverData["COOLER"], exchangeRate) },
      { name: "Vessel",         y: getContributionsToTDCCData(serverData["VESSEL"], exchangeRate) }
    ]
    setContributionsToTDCCData(newTDCCData);

    const tdccTableData = [
      {rowId: '00', rowHeader: newTDCCData[0].name, columns: [{colId: "00", colType: "display,currency", colValue: newTDCCData[0].y}, {colId: "01",colType: "display", colValue: "₩"}]},
      {rowId: '01', rowHeader: newTDCCData[1].name, columns: [{colId: "10", colType: "display,currency", colValue: newTDCCData[1].y}, {colId: "11",colType: "display", colValue: "₩"}]},
      {rowId: '02', rowHeader: newTDCCData[2].name, columns: [{colId: "20", colType: "display,currency", colValue: newTDCCData[2].y}, {colId: "21",colType: "display", colValue: "₩"}]},
      {rowId: '03', rowHeader: newTDCCData[3].name, columns: [{colId: "30", colType: "display,currency", colValue: newTDCCData[3].y}, {colId: "31",colType: "display", colValue: "₩"}]},
      {rowId: '04', rowHeader: newTDCCData[4].name, columns: [{colId: "40", colType: "display,currency", colValue: newTDCCData[4].y}, {colId: "41",colType: "display", colValue: "₩"}]},
      {rowId: '05', rowHeader: newTDCCData[5].name, columns: [{colId: "50", colType: "display,currency", colValue: newTDCCData[5].y}, {colId: "51",colType: "display", colValue: "₩"}]},
      {rowId: '06', rowHeader: newTDCCData[6].name, columns: [{colId: "60", colType: "display,currency", colValue: newTDCCData[6].y}, {colId: "61",colType: "display", colValue: "₩"}]},
      {rowId: '07', rowHeader: newTDCCData[7].name, columns: [{colId: "70", colType: "display,currency", colValue: newTDCCData[7].y}, {colId: "71",colType: "display", colValue: "₩"}]}
    ]

    //this is in won by default
    const newTCCData = [
      {name: "Total Direct Capital Cost",        y: TEACapexResultsSummary[0].totalDirectCapitalCost},
      {name: "Purchased Equipment Installation", y: TEACapexResultsSummary[1].columns[0].colValue},
      {name: "EC & I",                           y: TEACapexResultsSummary[2].columns[0].colValue},
      {name: "Piping & Valves",                  y: TEACapexResultsSummary[3].columns[0].colValue},
      {name: "Site Improvement",                 y: TEACapexResultsSummary[7].columns[0].colValue},
      {name: "Service Facilities",               y: TEACapexResultsSummary[8].columns[0].colValue},
      {name: "Steelwork",                        y: TEACapexResultsSummary[9].columns[0].colValue},
      {name: "General Facilities Capital",       y: TEACapexResultsSummary[11].columns[0].colValue},
      {name: "Engineering & Home Office Fees",   y: TEACapexResultsSummary[12].columns[0].colValue},
      {name: "Project Contingency Cost",         y: TEACapexResultsSummary[13].columns[0].colValue},
      {name: "Process Contigency Cost",          y: TEACapexResultsSummary[14].columns[0].colValue},
      {name: "Royalty Fees",                     y: TEACapexResultsSummary[15].columns[0].colValue}
      //{name: "Total Capital Cost",               y: TEACapexResultsSummary[16].columns[0].colValue},
    ]
    setContributionsToTCCData(newTCCData)

    const tccTableData = [
      {rowId: '00', rowHeader: newTCCData[0].name,  columns: [{colId: "00",  colType: "display,currency", colValue: newTCCData[0].y},  {colId: "01", colType: "display", colValue: "₩"}]},
      {rowId: '01', rowHeader: newTCCData[1].name,  columns: [{colId: "10",  colType: "display,currency", colValue: newTCCData[1].y},  {colId: "11", colType: "display", colValue: "₩"}]},
      {rowId: '02', rowHeader: newTCCData[2].name,  columns: [{colId: "20",  colType: "display,currency", colValue: newTCCData[2].y},  {colId: "21", colType: "display", colValue: "₩"}]},
      {rowId: '03', rowHeader: newTCCData[3].name,  columns: [{colId: "30",  colType: "display,currency", colValue: newTCCData[3].y},  {colId: "31", colType: "display", colValue: "₩"}]},
      {rowId: '04', rowHeader: newTCCData[4].name,  columns: [{colId: "40",  colType: "display,currency", colValue: newTCCData[4].y},  {colId: "41", colType: "display", colValue: "₩"}]},
      {rowId: '05', rowHeader: newTCCData[5].name,  columns: [{colId: "50",  colType: "display,currency", colValue: newTCCData[5].y},  {colId: "51", colType: "display", colValue: "₩"}]},
      {rowId: '06', rowHeader: newTCCData[6].name,  columns: [{colId: "60",  colType: "display,currency", colValue: newTCCData[6].y},  {colId: "61", colType: "display", colValue: "₩"}]},
      {rowId: '07', rowHeader: newTCCData[7].name,  columns: [{colId: "70",  colType: "display,currency", colValue: newTCCData[7].y},  {colId: "71", colType: "display", colValue: "₩"}]},
      {rowId: '08', rowHeader: newTCCData[8].name,  columns: [{colId: "80",  colType: "display,currency", colValue: newTCCData[8].y},  {colId: "81", colType: "display", colValue: "₩"}]},
      {rowId: '09', rowHeader: newTCCData[9].name,  columns: [{colId: "90",  colType: "display,currency", colValue: newTCCData[9].y},  {colId: "91", colType: "display", colValue: "₩"}]},
      {rowId: '10', rowHeader: newTCCData[10].name, columns: [{colId: "100", colType: "display,currency", colValue: newTCCData[10].y}, {colId: "101",colType: "display", colValue: "₩"}]},
      {rowId: '11', rowHeader: newTCCData[11].name, columns: [{colId: "110", colType: "display,currency", colValue: newTCCData[11].y}, {colId: "111",colType: "display", colValue: "₩"}]},
      //{rowId: '12', rowHeader: newTCCData[12].name, columns: [{colId: "120", colType: "display,currency", colValue: newTCCData[12].y}, {colId: "121",colType: "display", colValue: "₩"}]},
    ]

    let newGraphObj = cloneDeep(initGraphOptions)
    newGraphObj.title.text = thisTDCCChartTitle;
    newGraphObj.data[0].dataPoints = newTDCCData;
    setGraphOptions(newGraphObj)


    setTableData(tdccTableData)
    setAllTableData({tdcc: tdccTableData, tcc: tccTableData})

    setShowLoadingScreen(false)
  },[TEACapexResults, exchangeRate, getContributionsToTDCCData, TEACapexResultsSummary])

  const updateSelectedData = (newOption) => {
    setSelectedDisplayData(newOption)
    setThisPageCurrency("krw")

    if(newOption === "Direct Capital Cost"){
      setColumnHeaders(["Unit Type", "Total Direct Capital Cost", "Unit"])
      let newGraphObj = cloneDeep(initGraphOptions)
      newGraphObj.title.text = thisTDCCChartTitle;
      newGraphObj.data[0].dataPoints = contributionsToTDCCData;
      setGraphOptions(newGraphObj)
      setTableData(allTableData.tdcc)
    }else{
      setColumnHeaders(["CAPEX Results", "Value", "Unit"])
      let newGraphObj = cloneDeep(initGraphOptions)
      newGraphObj.title.text = thisTCCChartTitle;
      newGraphObj.data[0].dataPoints = contributionsToTCCData;
      setGraphOptions(newGraphObj)
      setTableData(allTableData.tcc)
    }
  }

  const handleUnitSelection = () => {
    setShowLoadingScreen(true)

    if(thisPageCurrency === "krw"){
      setThisPageCurrency("usd")

      let newTableData = cloneDeep(tableData)

      newTableData.forEach(row => {
        row.columns[0].colValue = row.columns[0].colValue>0? row.columns[0].colValue/exchangeRate : 0
        row.columns[1].colValue = "$"
      })

      setTableData(newTableData)

      let newGraphOptions = cloneDeep(graphOptions)
      newGraphOptions.data[0].yValueFormatString = "$#,###"
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
        row.columns[1].colValue = "₩"
      })

      setTableData(newTableData)

      let newGraphOptions = cloneDeep(graphOptions)
      newGraphOptions.data[0].yValueFormatString = "₩#,###"
      newGraphOptions.data[0].dataPoints.forEach(point => {
        point.y = point.y*exchangeRate
      })

      setGraphOptions(newGraphOptions)
      setShowLoadingScreen(false)
    }
  }

  const MenuOptions = [
    {
      title: "Direct Capital Cost",
      onClick: () => updateSelectedData("Direct Capital Cost")
    },
    {
      title: "Total Capital Cost",
      onClick: () => updateSelectedData("Total Capital Cost")
    }
  ]

  const ThisTable = () => {
    const renderedTableBody = tableData.slice(0, selectedDisplayData !== "Direct Capital Cost"? tableData.length-1: tableData.length).map(row => {
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
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      return(
        <th 
        key={idx} 
        className={`is-vcentered ${col === "Unit"? "has-text-centered": idx === 1? "has-text-right" : "has-text-left"}`}>
          {col}
        </th>
      )
    })
  
    return(
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>{renderedTableColumns}</tr>
        </thead>
        <tbody>
          {renderedTableBody}
        </tbody>
        {selectedDisplayData !== "Direct Capital Cost" &&
          (
            <tfoot className="has-background-primary-light">
              <RenderedTableFooter/>
            </tfoot>
          )
        }
      </table>
    );
  }

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<SummarySideMenu/>}>
          <EditorTopMenu 
          downloadType="image" 
          pageTitle="Analysis: "
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
 
export default SummaryCapex;
import classNames from "classnames";
import { cloneDeep } from "lodash";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";
import TableRow from "../../components/table/TableRow";
import { lastestCurrencyRateRedux } from "../../redux/features/allowedTabsSlice";
import { biAssumptionRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { store_tea_capex_results_summary_obj } from "../../redux/features/tea/TEACapexResultsSummarySlice";
import { teaCapexInputPercentageMethodRedux, teaCapexResultsRedux } from "../../redux/features/tea/TEACapexSlice";
import { allowServerComm } from "../../utils/appConstants";
import { calculatePMT, captalizeFirst, formatHomeTableDataForExport, formatNumberToCurrencyString } from "../../utils/appUtils";
import { TEACapexResultsSample } from "../../utils/testData";

const initTableData = [
  {
    rowId: "0",
    rowHeader: "Purchased Equipment Installation",
    columns: [
      { colId: "00", colType: "display,currency", colValue: 0 },
      { colId: "01", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "1",
    rowHeader: "EC & I (including services)",
    columns: [
      { colId: "10", colType: "display,currency", colValue: 0 },
      { colId: "11", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "2",
    rowHeader: "Piping & Valves",
    columns: [
      { colId: "20", colType: "display,currency", colValue: 0 },
      { colId: "21", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "3",
    rowHeader: "Piping",
    columns: [
      { colId: "30", colType: "display,currency", colValue: 0 },
      { colId: "31", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "4",
    rowHeader: "Manual Valves",
    columns: [
      { colId: "40", colType: "display,currency", colValue: 0 },
      { colId: "41", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "5",
    rowHeader: "Insulation and Painting",
    columns: [
      { colId: "50", colType: "display,currency", colValue: 0 },
      { colId: "51", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "6",
    rowHeader: "Site Improvement",
    columns: [
      { colId: "60", colType: "display,currency", colValue: 0 },
      { colId: "61", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "7",
    rowHeader: "Service Facilities (including installation)",
    columns: [
      { colId: "70", colType: "display,currency", colValue: 0 },
      { colId: "71", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "8",
    rowHeader: "Steelwork",
    columns: [
      { colId: "80", colType: "display,currency", colValue: 0 },
      { colId: "81", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "9",
    rowHeader: "Process Facility Cost",
    columns: [
      { colId: "90", colType: "display,currency", colValue: 0 },
      { colId: "91", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "10",
    rowHeader: "General Facilities Capital",
    columns: [
      { colId: "100", colType: "display,currency", colValue: 0 },
      { colId: "101", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "11",
    rowHeader: "Engineering & Home Office Fees",
    columns: [
      { colId: "110", colType: "display,currency", colValue: 0 },
      { colId: "111", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "12",
    rowHeader: "Project Contigency Cost",
    columns: [
      { colId: "120", colType: "display,currency", colValue: 0 },
      { colId: "121", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "13",
    rowHeader: "Process Contigency Cost",
    columns: [
      { colId: "130", colType: "display,currency", colValue: 0 },
      { colId: "131", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "14",
    rowHeader: "Royalty Fees",
    columns: [
      { colId: "140", colType: "display,currency", colValue: 0 },
      { colId: "141", colType: "display", colValue: "₩" }
    ]
  },
  {
    rowId: "15",
    rowHeader: "Total Capital Cost",
    columns: [
      { colId: "150", colType: "display,currency", colValue: 0 },
      { colId: "151", colType: "display", colValue: "₩" }
    ]
  },
  // {
  //   rowId: "16",
  //   rowHeader: "CAPEX",
  //   columns: [
  //     { colId: "180", colType: "display,currency", colValue: 0 },
  //     { colId: "181", colType: "display", colValue: "₩/yr" }
  //   ]
  // }
]

function TEACapexResultsSummaryPage() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const TEACapexInputPerMethod = useSelector(teaCapexInputPercentageMethodRedux)
  const TEACapexResults = useSelector(teaCapexResultsRedux)
  const AllowedPages = useSelector(state => state.allowedTEAPages);
  const BIAssumptionData = useSelector(biAssumptionRedux);
  const LastestCurrencyRate = useSelector(lastestCurrencyRateRedux);

  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [exportData, setExportData] = useState([])
  const [exchangeRate, setExchangeRate] = useState(LastestCurrencyRate)
  const [tableData, setTableData] = useState(initTableData)
  const [subColumnHeaders, setSubColumnHeaders] = useState(["Total Direct Capital Cost", 0, "₩"])
  const [isItKRW, setIsItKRW] = useState(true)

  const columnHeaders = ["CAPEX Results", "Value", "Unit"]

  useEffect(()=>{
    if(BIAssumptionData!=null){
      setExchangeRate(BIAssumptionData.assumption_value.exchangerate)
    }
  },[BIAssumptionData])

  useEffect(()=>{
    if(!AllowedPages.capexResultsSummary){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    setShowLoadingScreen(true)
    let serverData = allowServerComm? TEACapexResults.unit_cost : TEACapexResultsSample.unit_cost

    const serverDataKeys = Object.keys(serverData);

    let sumOfTotalCost0 = 0
    let sumOfTotalCost1 = 0

    serverDataKeys.forEach(key => {
      serverData[key].forEach(obj => {
        // console.log(obj.Total_Cost[0]);
        sumOfTotalCost0 = sumOfTotalCost0 + obj.Total_Cost[0]
        sumOfTotalCost1 = sumOfTotalCost1 + obj.Total_Cost[1]
      })
    })

    const { 
      ec_i, piping, manual_valves, insulation_painting, site_improvement, service_facilities, steelwork, generalfacilities_capital, 
      engineeringhomeoffice_fees, projectcontingency_cost, processcontingency_cost, royalty_fees
    } = TEACapexInputPerMethod;

    const { costofcapital, plantlife } = BIAssumptionData.assumption_value;

    const totalDirectCapitalCost = exchangeRate * sumOfTotalCost0;
    const processFacilityCost = (exchangeRate * (sumOfTotalCost0 + sumOfTotalCost1 + ec_i + piping + manual_valves + insulation_painting + site_improvement + service_facilities + steelwork))/100;
    const secondTotal = exchangeRate*processFacilityCost;
    const totalCapitalCost = (exchangeRate*((processFacilityCost*(100+generalfacilities_capital+engineeringhomeoffice_fees+projectcontingency_cost+processcontingency_cost+royalty_fees))/100));

    let newTableData = cloneDeep(initTableData);
    newTableData[0].columns[0].colValue = exchangeRate * sumOfTotalCost1 - sumOfTotalCost0;
    newTableData[1].columns[0].colValue = (totalDirectCapitalCost*ec_i)/100;
    newTableData[2].columns[0].colValue = (totalDirectCapitalCost*(piping + manual_valves+insulation_painting))/100;
    newTableData[3].columns[0].colValue = (totalDirectCapitalCost*piping)/100;
    newTableData[4].columns[0].colValue = (totalDirectCapitalCost*manual_valves)/100;
    newTableData[5].columns[0].colValue = (totalDirectCapitalCost*insulation_painting)/100;
    newTableData[6].columns[0].colValue = (totalDirectCapitalCost*site_improvement)/100;
    newTableData[7].columns[0].colValue = (totalDirectCapitalCost*service_facilities)/100;
    newTableData[8].columns[0].colValue = (totalDirectCapitalCost*steelwork)/100;
    newTableData[9].columns[0].colValue = processFacilityCost;
    newTableData[10].columns[0].colValue = (secondTotal*generalfacilities_capital)/100;
    newTableData[11].columns[0].colValue = (secondTotal*engineeringhomeoffice_fees)/100;
    newTableData[12].columns[0].colValue = (secondTotal*projectcontingency_cost)/100;
    newTableData[13].columns[0].colValue = (secondTotal*processcontingency_cost)/100;
    newTableData[14].columns[0].colValue = (secondTotal*royalty_fees)/100;
    newTableData[15].columns[0].colValue = totalCapitalCost;
    // newTableData[16].columns[0].colValue = calculatePMT(costofcapital/100, plantlife, totalCapitalCost, 0,0);

    setTableData(newTableData)
    reduxDispatch(store_tea_capex_results_summary_obj([{totalDirectCapitalCost}, ...newTableData]))
    setSubColumnHeaders(prev => [prev[0],  totalDirectCapitalCost, prev[2]])

    const thisExportData = formatHomeTableDataForExport(newTableData)
    setExportData(thisExportData)

    setShowLoadingScreen(false)
    
  },[exchangeRate, TEACapexResults, BIAssumptionData, TEACapexInputPerMethod, reduxDispatch])

  const convertDataToUSD = () => {
    setShowLoadingScreen(true)
    let newTableData = cloneDeep(tableData);

    newTableData.forEach(obj => {
      if(obj.rowId !== "16"){
        obj.columns[1].colValue = "$";
      }else{
        obj.columns[1].colValue = "$/yr";
      }
    })

    setSubColumnHeaders(prev => [prev[0], prev[1]/exchangeRate, "$"])

    setIsItKRW(false)
    setTableData(newTableData);
    const thisExportData = formatHomeTableDataForExport(newTableData);
    setExportData(thisExportData)
    setShowLoadingScreen(false)
  }

  const convertDataToWon = () => {
    setShowLoadingScreen(true)
    let newTableData = cloneDeep(tableData);

    newTableData.forEach(obj => {
      if(obj.rowId !== "16"){
        obj.columns[1].colValue = "₩";
      }else{
        obj.columns[1].colValue = "₩/yr";
      }
    })

    setSubColumnHeaders(prev => [prev[0], prev[1]*exchangeRate, "₩"])
    setIsItKRW(true)
    setTableData(newTableData);
    const thisExportData = formatHomeTableDataForExport(newTableData);
    setExportData(thisExportData)
    setShowLoadingScreen(false)
  }

  const ThisTable = () => {
    const renderedTableBody = tableData.map(row => {
      return(
        <tr key={row.rowId} className={row.rowHeader === "CAPEX"? "has-background-primary-light":""}>
          <TableRow
            rowId={row.rowId} 
            rowHeader={captalizeFirst(row.rowHeader)} 
            rowCols={row.columns} 
            addTabs={(row.rowId === "3" || row.rowId === "4" || row.rowId === "5")}
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white", {"has-text-centered": col === "Unit", "has-text-right": col === "Value"})
      return <th key={idx} className={headRowClass}>{col}</th>;
    })

    const renderedTableSubColumns = subColumnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white", {
        "has-text-centered": (idx === 2),
        "has-text-right": (idx === 1)
      })
      return <th key={idx} className={headRowClass}>{idx === 1? formatNumberToCurrencyString(col):col}</th>;
    })
  
    return(
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr className="has-background-primary">{renderedTableColumns}</tr>
          <tr className="has-background-link">{renderedTableSubColumns}</tr>
        </thead>
        <tbody>
          {renderedTableBody}
        </tbody>
      </table>
    );
  }

  const exportFileName = `TEA-CAPEX-Input-ResultsSummary-Export (${new Date().toISOString()})`
  
  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<TEASideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          tableData={exportData} 
          fileName={exportFileName}
          onConvertToUSD={isItKRW && convertDataToUSD}
          onConvertToWon={!isItKRW && convertDataToWon}
          />
          <div className="table-container mr-4">
            <ThisTable/>
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
 
export default TEACapexResultsSummaryPage;
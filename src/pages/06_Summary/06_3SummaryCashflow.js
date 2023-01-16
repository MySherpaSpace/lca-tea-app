import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";
import axios from "axios";

import classNames from "classnames";

import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { allowServerComm, httpPaths } from "../../utils/appConstants";
import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";
import { SummaryOpexCashflowSample } from "../../utils/testData";
import { update_summary_cashflow_data } from "../../redux/features/summary/summaryDataSlice";
import { update_allowed_summary_pages } from "../../redux/features/allowedSectionPages/allowedSummaryPages";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";
import SummarySideMenu from "../../components/sideMenus/SummarySideMenu";

const initRowObj =   {
  rowId: null,
  rowHeader: "",
  columns: []
}

const initColHeaders = ["Year"]
const initRowHeaders = [
  "Revenue", "Expenses", "O&M", "Depreciation", "Sales Expense", "Earning Before Interest & Taxes (EBIT)", "Interest", 
  "Earning Before Interest (EBT)", "Tax", "Net Income (NI)", "Capital Investment", "Debt", "Net Cash Flow", "Discounted Cash In Flow", 
  "Discounted Cash Out Flow", "Net Present Value (NPV)", "Accumulated NPV"
]

function SummaryCashflow() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const ref = useRef(null);

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  const AllowedPages = useSelector(state => state.allowedSummaryPages);
  const SelectedProjectId = useSelector(selectedProjectIdRedux);

  const [tableData, setTableData] = useState([]);
  const [allTableData, setAllTableData] = useState({cashflow: [], debt: []})
  const [selectedDispMode, setSelDispMode] = useState("Cash flow")

  const [columnHeaders, setColumnHeaders] = useState([]);

  useEffect(()=>{
    if(!AllowedPages.summaryTEACashflow){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  const extractTableRows = (rowHeader, rowIdx, extraColNum, colValueArr = []) => {
    let newRowObj = cloneDeep(initRowObj)

    newRowObj["rowHeader"] = rowHeader
    newRowObj["rowId"] = formatDigit(rowIdx)
    
    let allCols = []

    for (let i = 0; i < extraColNum; i++) {
      allCols.push({
        colId: allCols.length+""+rowIdx,
        colType: "display,currency",
        colValue: colValueArr[i]? colValueArr[i] : 0
      })
    }
    
    newRowObj["columns"] = allCols;

    return newRowObj
  }
  const server = (serverData) =>{
    
          
    reduxDispatch(update_summary_cashflow_data(serverData))
    reduxDispatch(update_allowed_summary_pages({summaryTEAEconomicIndex: true}))

    let yearRow = [];
    let revenueRow = [];
    let expensesRow = [];
    let oAndMRow = [];
    let deprecRow = [];
    let salesExpRow = [];
    let ebitRow = [];
    let interTow = [];
    let ebtRow = [];
    let taxRow = [];
    let netIncomeRow = [];
    let capInvRow = [];
    let debtRow = [];
    let netCashflowRow = [];
    let discCashInFlow = [];
    let discCashOutFlow = [];
    let npvRow = [];
    let accNpvRow = []

    serverData.forEach(datum => {
      yearRow.push(datum.year )
      revenueRow.push(datum.revenue )
      expensesRow.push(datum.expenses )
      oAndMRow.push(datum.operation_maintenance )
      deprecRow.push(datum.depreciation )
      salesExpRow.push(datum.sales_expense )
      ebitRow.push(datum.ebit )
      interTow.push(datum.interest )
      ebtRow.push(datum.ebt )
      taxRow.push(datum.tax )
      netIncomeRow.push(datum.net_income )
      capInvRow.push(datum.capital_investment )
      debtRow.push(datum.debt )
      netCashflowRow.push(datum.net_cashflow )
      discCashInFlow.push(datum.discountedcash_inflow )
      discCashOutFlow.push(datum.discountedcash_outflow )
      npvRow.push(datum.npv )
      accNpvRow.push(datum.accumulated_npv )
    })          

    const allRows = [ 
      revenueRow, expensesRow, oAndMRow, deprecRow, salesExpRow, ebitRow, interTow, ebtRow, taxRow, netIncomeRow, capInvRow,
      debtRow, netCashflowRow, discCashInFlow, discCashOutFlow, npvRow, accNpvRow
    ]
    let thisInitColHeads = []

    yearRow.forEach(year => {
      thisInitColHeads.push(year.toString())
    })
    
    const finalColumnHaders = [...initColHeaders, ...thisInitColHeads]
    setColumnHeaders(finalColumnHaders)

    const extraColNum = finalColumnHaders.length - initColHeaders.length;

    let thisTableData = []

    initRowHeaders.forEach((row, rowIdx) => {
      const newRowObj = extractTableRows(row, rowIdx, extraColNum, allRows[rowIdx])
      thisTableData.push(newRowObj)
    })

    let cashflowData = thisTableData.slice(0, 10)
    let debtData = thisTableData.slice(9);
    let depreciationRow = cloneDeep(cashflowData[3]);
    depreciationRow.rowId = "20"; //so the table doesnt add a tab based on row Id

    debtData.splice(1, 0 , depreciationRow);

    setAllTableData({cashflow: cashflowData, debt: debtData})
    setTableData(cashflowData)

    setShowLoadingScreen(false)
  }
  useEffect(()=>{
    setShowLoadingScreen(true)
    let serverData = SummaryOpexCashflowSample;
 
    if(allowServerComm){
      axios.post(httpPaths["cashFlow"], {project_id: SelectedProjectId})
      .then(response => {
        if(response.data.length>0){
          serverData = response.data;
          server(serverData)
        }else{
          alert("No data available")
          serverData = []
          server(serverData)
        }
      }).catch(e => {
        alert("Error while fetching cash flow data "+e)
        serverData = []
        server(serverData)
      })
    }
   
  },[SelectedProjectId, reduxDispatch])

  const updateSelectedData = (newDisp) => {
    if(newDisp === "Cash Flow"){
      setTableData(allTableData.cashflow)
      setSelDispMode(newDisp)
    }else{
      setTableData(allTableData.debt)
      setSelDispMode(newDisp)
    }
  }

  const getTableDataForExport = () => {
    const thisExportData = formatHomeTableDataForExport(tableData)
    return thisExportData
  }

  const MenuOptions = [
    {
      title: "Cash Flow",
      onClick: () => updateSelectedData("Cash Flow")
    },
    {
      title: "Considering Debt",
      onClick: () => updateSelectedData("Considering Debt")
    }
  ]


  const ThisTable = () => {
    const renderedTableBody = tableData.map(row => {
      return(
        <tr key={row.rowId}>
          <TableRow
            minWidth={250}
            rowId={row.rowId} 
            rowHeader={row.rowHeader}
            rowCols={row.columns} 
            highlightNegatives
            addTabs={(row.rowId === "02" || row.rowId === "03" || row.rowId === "04" || row.rowId === "06" || row.rowId === "08")}
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white is-vcentered", { "has-text-right": col!=="Year" })
      const colText = col.includes("$")? <>{col.split("$")[0]}<br/>{col.split("$")[1]}</> : <>{col}</>
      return <th key={idx} className={headRowClass}>{colText}</th>;
    })
  
    return(
      <table className="table is-hoverable is-fullwidth" ref={ref}>
        <thead className="has-background-primary">
          <tr>{renderedTableColumns}</tr>
        </thead>
        <tbody>
          {renderedTableBody}
        </tbody>
      </table>
    );
  }
  
  const exportFileName = `Summary-TEA-Cashflow-Export (${new Date().toISOString()})`

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<SummarySideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          onDownload={getTableDataForExport} 
          fileName={exportFileName}  
          menuOptions={MenuOptions} 
          selected={selectedDispMode}
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
 
export default SummaryCashflow;
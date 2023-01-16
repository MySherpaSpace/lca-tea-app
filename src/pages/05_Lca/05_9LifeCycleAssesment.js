import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";

import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import { update_summary_lca_summary_data } from "../../redux/features/summary/summaryDataSlice";

const initRowObj =   {
  rowId: null,
  rowHeader: "",
  columns: [
    {
      colId: "00",
      colType: "display,left",
      colValue: ""
    },
    {
      colId: "01",
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "02",
      colType: "display",
      colValue: ""
    }
  ]
}

const initColHeaders = ["Source", "Target Process", "Amount", "Unit"]

function LCALifeCycleAssesment() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [tableData, setTableData] = useState([])
  const [thisAssesmentMethod, setThisAssesmentMethod] = useState("")

  const LCAResultsFromUser = useSelector(state => state.LCAResults.fromUser);

  const [columnHeaders, setColumnHeaders] = useState([]);

  useEffect(()=>{
    if(!AllowedPages.resultsImpactAssesmentLifeCycleAssesment){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    setShowLoadingScreen(true)

    let thisTableData = []

    let thisInitColHeaders = []

    LCAResultsFromUser.forEach((datum, datumIdx)=> {
      if(datumIdx === 0){
        setThisAssesmentMethod(datum.method);
        datum.impact_assesment.forEach(col => {
          thisInitColHeaders.push(`${col.category}$${col.unit}`)
        })
      }

      let newRowObj = cloneDeep(initRowObj);

      newRowObj["rowId"] = formatDigit(datumIdx);
      newRowObj["rowHeader"] = datum.source;
      newRowObj["columns"][0].colValue = datum.targetProcess
      newRowObj["columns"][1].colValue = datum.amount
      newRowObj["columns"][2].colValue = datum.unit

      let moreCols = newRowObj["columns"];

      datum.impact_assesment.forEach(col => {
        moreCols.push({
          colId: formatDigit(moreCols.length),
          colType: "display,number",
          colValue: col.value
        })
      })

      newRowObj["columns"] = moreCols

      thisTableData.push(newRowObj)
    })

    reduxDispatch(update_summary_lca_summary_data(LCAResultsFromUser))

    const finalColumnHaders = [...initColHeaders, ...thisInitColHeaders]
    setColumnHeaders(finalColumnHaders)
    setTableData(thisTableData)
    setShowLoadingScreen(false)
  },[LCAResultsFromUser, reduxDispatch])

  const getTableDataForExport = () => {
    const thisExportData = formatHomeTableDataForExport(tableData)
    return thisExportData
  }

  const ThisTable = () => {
    const renderedTableBody = tableData.map(row => {
      return(
        <tr key={row.rowId}>
          <TableRow
            rowId={row.rowId} 
            rowIsNew={row.rowIsNew}
            rowCols={row.columns} 
            rowHeader={row.rowHeader}
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white is-vcentered",{"has-text-centered": (col!=="Source" && col!=="Target Process")})
      const colText = col.includes("$")? <>{col.split("$")[0]}<br/>{col.split("$")[1]}</> : <>{col}</>

      return <th key={idx} className={headRowClass}>{colText}</th>;
    })
  
    return(
      <table className="table is-hoverable is-fullwidth">
        <thead className="has-background-primary">
          <tr>{renderedTableColumns}</tr>
        </thead>
        <tbody>
          {renderedTableBody}
        </tbody>
      </table>
    );
  }

  const exportFileName = `LCA-Results-Life-Cycle-Assesment-Export (${new Date().toISOString()})`
  
  if(!showLoadingScreen){
    return(
      <AppPageLayout sideMenu={<LCASideMenu/>}>
        <EditorTopMenu 
        downloadType="table" 
        pageTitle={`Assesment Method: ${thisAssesmentMethod}`}
        onDownload={getTableDataForExport} 
        fileName={exportFileName} 
        />

        <div className="table-container mr-4">
          <ThisTable/>
        </div>
        <div className='block'/>
        
      </AppPageLayout>
    );
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default LCALifeCycleAssesment;
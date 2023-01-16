import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";

import LCASideMenu from "../../components/sideMenus/LCASideMenu";

const initRowObj =   {
  rowId: null,
  rowHeader: "",
  columns: [
    {
      colId: "00",
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "01",
      colType: "display,left",
      colValue: ""
    }
  ]
}

function LCASummaryOverview() {
  const navigate = useNavigate();

  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [tableData, setTableData] = useState([])

  const LCAResultsFromUser = useSelector(state => state.LCAResults.fromUser);

  const columnHeaders = ["Impact Category", "Result", "Reference Unit"]

  useEffect(()=>{
    if(!AllowedPages.resultsSummaryOverview){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    setShowLoadingScreen(true)

    let thisTableData = []

    let sumOfEachCategory = []

    LCAResultsFromUser.forEach((datum, datumIdx) => {
      if(datumIdx === 0){
        datum.impact_assesment.forEach((row, rowIdx) => {
          let newDataObj = cloneDeep(initRowObj)
          newDataObj["rowId"] = formatDigit(rowIdx)
          newDataObj["rowHeader"] = row.category;
          newDataObj["columns"][1].colValue = row.unit.replace(/["'()]/g,"");

          sumOfEachCategory.push(row.value);
          thisTableData.push(newDataObj)
        })
      }else{
        datum.impact_assesment.forEach((row, rowIdx) => {
          sumOfEachCategory[rowIdx] = parseFloat(sumOfEachCategory[rowIdx]) + parseFloat(row.value);//sumOfEachCategory[rowIdx] + row.value;
        })
      }      
    })

    thisTableData.forEach((row, rowIdx) => {
      row["columns"][0].colValue = sumOfEachCategory[rowIdx]
    })

    setTableData(thisTableData)
    setShowLoadingScreen(false)
  },[LCAResultsFromUser])

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
      const headRowClass = classNames("has-text-white is-vcentered",{"has-text-centered": (col!=="Impact Category" && col!=="Reference Unit")})
      return <th key={idx} className={headRowClass}>{col}</th>;
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

  const exportFileName = `LCA-Results-Summary-Overview-Export (${new Date().toISOString()})`
  
  if(!showLoadingScreen){
    return(
      <AppPageLayout sideMenu={<LCASideMenu/>}>
        <EditorTopMenu 
        downloadType="table" 
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
 
export default LCASummaryOverview;
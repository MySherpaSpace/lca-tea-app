import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { parameterUncertaintyInputRedux, parameterUncertaintyResultsRedux } from "../../redux/features/sensitivityAnalysis/sensitivityAnalysisSlicer";

import AppPageLayout from "../../components/AppPageLayout";
import SensitivityAnalysisSideMenu from "../../components/sideMenus/SensitivityAnalysisSideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";

const initRowObj = {
  rowId: "0",
  rowHeader: null, //source
  columns: [
    {
      colId: "00",
      colType: "display", //Compound Name
      colValue: ""
    },
    {
      colId: "01",
      colType: "display", // Cost
      colValue: 0
    },
    {
      colId: "02",
      colType: "display", //+x%
      colValue: 0
    },
    {
      colId: "03",
      colType: "display", //-x%
      colValue: 0
    },
    {
      colId: "04",
      colType: "display", //+IRR%
      colValue: 0
    },
    {
      colId: "05",
      colType: "display", //-IRR%
      colValue: 0
    },
    {
      colId: "06",
      colType: "display", //+NPV ₩
      colValue: 0
    },
    {
      colId: "07",
      colType: "display", //-NPV ₩
      colValue: 0
    },
    {
      colId: "08",
      colType: "display", //+Payback Period
      colValue: 0
    },
    {
      colId: "09",
      colType: "display", //-Payback Period
      colValue: 0
    },
  ]
}

function ParameterUncertaintyResults() {
  const navigate = useNavigate();

  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const AllowedPages = useSelector(state => state.allowedSensitivityAnalysisPages);
   
 const ParameterUncertaintyInput = useSelector(parameterUncertaintyInputRedux)
 const ParameterUncertaintyResults = useSelector(parameterUncertaintyResultsRedux)

  const columnHeaders = ["Source", "Name", "Cost", "+X%", "-X%", "+IRR%", "-IRR%", "+NPV ₩", "-NPV ₩", "+Payback Period", "-Payback Period"];

  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    if(!AllowedPages.parameterUncertaintyResults){
      navigate(-1)
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    setShowLoadingScreen(true)

    let thisTableRows = []

    ParameterUncertaintyResults.forEach((row, rowIdx) => {
      console.log("row----",row)
      // console.log("rowIdx----",rowIdx, ParameterUncertaintyInput[rowIdx])
      let newRowObj = cloneDeep(initRowObj);

      newRowObj["rowHeader"] = row.source
    
      newRowObj["rowId"] = formatDigit(rowIdx);
      newRowObj["columns"].forEach((col, colIdx)=>{
        // console.log("col----", col, colIdx)
        col.colId = rowIdx + formatDigit(colIdx)
      })

      newRowObj["columns"][0].colValue = row.CompoundName;
      newRowObj["columns"][1].colValue = row.cost;
      if (ParameterUncertaintyInput[rowIdx] != undefined){
        newRowObj["columns"][2].colValue = ParameterUncertaintyInput[rowIdx].x_pos;
        newRowObj["columns"][3].colValue = ParameterUncertaintyInput[rowIdx].x_neg;}
      newRowObj["columns"][4].colValue = row.increase_irr;
      newRowObj["columns"][5].colValue = row.decrease_irr;
      newRowObj["columns"][6].colValue = row.increase_npv;
      newRowObj["columns"][7].colValue = row.decrease_npv;
      newRowObj["columns"][8].colValue = row.increase_payback;
      newRowObj["columns"][9].colValue = row.decrease_payback;

      thisTableRows.push(newRowObj);
    })

    setTableData(thisTableRows)
    setShowLoadingScreen(false)
  },[ParameterUncertaintyInput, ParameterUncertaintyResults])

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
            rowHeader={row.rowHeader}
            rowCols={row.columns} 
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white",{"has-text-centered": (col!=="Source")})
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

  const exportFileName = `Sensitivity-Analysis-Parameter-Uncertainty-Results-Export (${new Date().toISOString()})`

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<SensitivityAnalysisSideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          />

          <div className="mr-4">
            <div className="table-container">
              <ThisTable/>
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
 
export default ParameterUncertaintyResults;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import axios from "axios";

import { allowServerComm, getNavURL, httpPaths } from "../../utils/appConstants";

import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";
import { teaOpexCostFeedRedux, teaOpexCostUtilityRedux } from "../../redux/features/tea/TEAOpexSlice";
import { SensitivityAnalysisParameterUncertaintyResultsSample } from "../../utils/testData";
import { update_parameter_uncertainty_input, update_parameter_uncertainty_results } from "../../redux/features/sensitivityAnalysis/sensitivityAnalysisSlicer";
import { update_allowed_sensitivity_analysis_pages } from "../../redux/features/allowedSectionPages/allowedSensitivityAnalysisPages";

import AppPageLayout from "../../components/AppPageLayout";
import SensitivityAnalysisSideMenu from "../../components/sideMenus/SensitivityAnalysisSideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";

const initRowObj = {
  rowId: "0",
  rowHeader: null,
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
      colType: "display", //Unit
      colValue: "₩"
    }
  ]
}

function ParameterUncertaintyInput() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const SelectedProjectId = useSelector(selectedProjectIdRedux);

  const TeaOpexCostFeed = useSelector(teaOpexCostFeedRedux);
  const TeaOpexCostUtility = useSelector(teaOpexCostUtilityRedux);

  const columnHeaders = ["Source", "Name", "Cost", "+X%", "-X%", "Unit"];

  const [tableData, setTableData] = useState([])
  const [parameter, setParameter] = useState(0)

  useEffect(()=>{
    setShowLoadingScreen(true);

    let thisTableRows = []

    const allTableInitData = TeaOpexCostFeed.concat(TeaOpexCostUtility)

    allTableInitData.forEach((row, rowIdx) => {
      let newRowObj = cloneDeep(initRowObj);
    
      newRowObj["rowId"] = formatDigit(rowIdx);
      newRowObj["columns"].forEach((col, colIdx)=>{
        col.colId = rowIdx + formatDigit(colIdx)
      })

      let thisSource = "Feed"

      if(rowIdx > TeaOpexCostFeed.length-1){
        thisSource = "Utility"
      }

      newRowObj["rowHeader"] = thisSource;

      newRowObj["columns"][0].colValue = row.CompoundName;
      newRowObj["columns"][1].colValue = row.cost;

      thisTableRows.push(newRowObj);
    })

    setTableData(thisTableRows)
    setShowLoadingScreen(false);
  },[TeaOpexCostFeed, TeaOpexCostUtility])

  const handleParameterInput = (event) => {
    setParameter(event.target.value)
  }

  const handleParameterSubmit = (event) => {
    event.preventDefault()
    let newRowData = cloneDeep(tableData)

    newRowData.forEach(newRow => {
      let thisCost = newRow.columns[1].colValue;
      const numParam = parseInt(parameter)
      newRow.columns[2].colValue = numParam>0? thisCost*(1+(numParam/100)) : 0
      newRow.columns[3].colValue = numParam>0? thisCost*(1-(numParam/100)) : 0
    })

    setTableData(newRowData)
  }

  const handleParameterUncertaintyInputSave = () => {
    setShowLoadingScreen(true)
    let serverData = SensitivityAnalysisParameterUncertaintyResultsSample;

    let formattedTable = []

    tableData.forEach((row)=>{
      formattedTable.push({
        source:       row.rowHeader, 
        CompoundName: row.columns[0].colValue, 
        cost:         row.columns[1].colValue, 
        x_pos:        row.columns[2].colValue, 
        x_neg:        row.columns[3].colValue,  
        unit:         row.columns[4].colValue, 
      })
    })

    if(allowServerComm){
      axios.post(httpPaths["sensAnalysis"], {project_id: SelectedProjectId, parameter: parameter})
      .then((response)=>{
        serverData = response.data;
      }).catch(e => {
        console.log("Error while sending data to server "+e)
      })
    }

    if(serverData.length === 0){
      console.log("Error on data from server");
      setShowLoadingScreen(false)
      return;
    }

    const nextUrl = getNavURL("/sensitivity-analysis/parameter-uncertainty-results");
    reduxDispatch(update_allowed_sensitivity_analysis_pages({parameterUncertaintyResults: true}))
    reduxDispatch(update_parameter_uncertainty_input(formattedTable))
    reduxDispatch(update_parameter_uncertainty_results(serverData))
    navigate(nextUrl)

    setShowLoadingScreen(false)
  }

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

  const exportFileName = `Sensitivity-Analysis-Parameter-Uncertainty-Input-Export (${new Date().toISOString()})`

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<SensitivityAnalysisSideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          onSave={handleParameterUncertaintyInputSave}
          />

          <div className="mr-4">

            <div className="table-container">
              <ThisTable/>
            </div>

            <div className="column is-4 is-offset-8">
              <form className="box" onSubmit={handleParameterSubmit}>
                <label className="label">Enter Parameter</label>
                <div className="field is-grouped">
                  <div className="control is-expanded">
                    <input className="input" type="number" min={1} value={parameter} onChange={handleParameterInput} onBlur={handleParameterSubmit}/>
                  </div>
                  <div className="control">
                    <div className="button is-link">
                      Enter
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className='block'/>
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
 
export default ParameterUncertaintyInput;
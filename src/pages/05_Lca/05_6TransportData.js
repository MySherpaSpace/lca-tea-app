import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";
import axios from "axios";

import { allowServerComm, getNavURL, httpPaths } from "../../utils/appConstants";
import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";

import { update_lca_input_processes_transport } from "../../redux/features/lca/LCAInputSlice";
import { update_allowed_lca_pages } from "../../redux/features/allowedSectionPages/allowedLCAPages";
import { LCAInventoryAnalysisTransportTypes } from "../../utils/lcaInventoryAnalysisData";
import { update_lca_results_from_server } from "../../redux/features/lca/LCAResultsSlice";
import { LCAResultSample } from "../../utils/testData";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";
import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import useAuth from "../../hooks/use-auth";

const initTransportRowObj =   {
  rowId: null,
  rowHeader: null,
  columns: [
    {
      colId: "00",
      colType: "display,left",
      colValue: ""
    },
    {
      colId: "01",
      colType: "input,number",
      colValue: 0,
      colRange: [0, null]
    },
    {
      colId: "02",
      colType: "input,number",
      colValue: 0,
      colRange: [0, null]
    },
    {
      colId: "03",
      colType: "checkbox",
      colValue: true
    },
    {
      colId: "04",
      colType: "dropdown,lca",
      colMenuItems: LCAInventoryAnalysisTransportTypes,
      colValue: LCAInventoryAnalysisTransportTypes[0]
    },
    {
      colId: "05",
      colType: "dropdown,lca",
      colValue: LCAInventoryAnalysisTransportTypes[0].transportProcesses[0],
      colMenuItems: LCAInventoryAnalysisTransportTypes[0].transportProcesses,
    },
    {
      colId: "06",
      colType: "button,delete"
    }
  ]
}

function LCATransportData() {
  const {userToken} = useAuth();
  const navigate = useNavigate();
  const ref = useRef(null);
  const reduxDispatch = useDispatch();
  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  const [initAllTableData, setInitAllTableData] = useState([])
  const [tableData, setTableData] = useState([])
  const [enableRunButton, setEnableRunButton] = useState(false)

  const columnHeaders = ["Compound Id", "Weight (ton)", "Distance (km)", "Search DB", "Transport Type", "LCI DB", ""];
  const LCAInputData = useSelector(state => state.LCAInput);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)
  const [alertModalButtons, setAlertModalButtons] = useState(null)

  const alertModalOpen = (title, content, buttons) => {
    setAlertModalButtons(buttons)
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }

  const alertModalClose = () => setShowAlertModal(false);

  useEffect(()=>{
    if(!AllowedPages.inputTransportData){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    setShowLoadingScreen(true)
    let utilityData = [{"CompoundName": "DOTP"}, {"CompoundName": "2-EH"}];

    let thisUtilTableRows = []
    
    utilityData.forEach((compound, compoundIdx) => {
      let newRowObj = cloneDeep(initTransportRowObj);

      newRowObj["rowId"] = formatDigit(compoundIdx);
      newRowObj["columns"][0].colId = compoundIdx+"0";
      newRowObj["columns"][1].colId = compoundIdx+"1";
      newRowObj["columns"][2].colId = compoundIdx+"2";
      newRowObj["columns"][3].colId = compoundIdx+"3";
      newRowObj["columns"][4].colId = compoundIdx+"4";
      newRowObj["columns"][5].colId = compoundIdx+"5";
      newRowObj["columns"][6].colId = compoundIdx+"6";

      newRowObj["columns"][0].colValue = compound.CompoundName;

      thisUtilTableRows.push(newRowObj)
    })

    setInitAllTableData(thisUtilTableRows)

    setTableData(thisUtilTableRows)
    setShowLoadingScreen(false)

  },[])

  //now we need to be able to edit each value in each cell
  const onCellValueEdit = (rowId, colId, newVal) => {
    if(rowId){
      //let's create a deep copy of the original array to modify
      let tableCopy = cloneDeep(tableData)

      //first, let's find the corresponding rowId
      //we need to find the idx to use it to modify the tableCopy
      let rowOfIntIdx = tableCopy.findIndex(row => row.rowId === rowId)
      //let's get a ref to the row colums
      let rowOfIntColumns = tableCopy[rowOfIntIdx].columns

      //second, let's find the right column idx by id
      let colOfIntIdx = rowOfIntColumns.findIndex(col => col.colId === colId)
      //let's get a ref to the column to modify
      let colOfInt = rowOfIntColumns[colOfIntIdx]

      // console.log(colId);
      let newColOfIntIdx = colOfIntIdx+1
      let newColOfIntIdx2 = colOfIntIdx+2
      let newColOfInt = rowOfIntColumns[newColOfIntIdx]
      let newColOfInt2 = rowOfIntColumns[newColOfIntIdx2]
      let newOptions1 = []
      let newOptions2 = []

      let assignNewVal1 = false
      let assignNewVal2 = false

      //let's modify the cell in the table with the new value
      tableCopy[rowOfIntIdx].columns[colOfIntIdx] = {
        ...colOfInt,
        colValue: newVal
      }

      if(colId.endsWith("3")){
        if(newVal === true){
          newOptions1 = LCAInventoryAnalysisTransportTypes
          newOptions2 = LCAInventoryAnalysisTransportTypes[0].transportProcesses
        }else{
          newOptions1 = [{value: null}]
          newOptions2 = [{value: null, uuid: null}]
        }

        assignNewVal1 = true
        assignNewVal2 = true
      }else if(colId.endsWith("4")){
        const foundObj = LCAInventoryAnalysisTransportTypes.find(obj => obj.value === newVal.value)
        newOptions1 = foundObj.transportProcesses
        assignNewVal1 = true
      }

      if(assignNewVal1){
        Object.assign(tableCopy[rowOfIntIdx].columns[newColOfIntIdx], {
          ...newColOfInt,
          colValue: newOptions1.length>0? newOptions1[0]:"",
          colMenuItems: newOptions1
        })
      }

      if(assignNewVal2){
        Object.assign(tableCopy[rowOfIntIdx].columns[newColOfIntIdx2], {
          ...newColOfInt2,
          colValue: newOptions2.length>0? newOptions2[0]:"",
          colMenuItems: newOptions2
        })
      }

      // console.log(newVal);
      //update table data in the state
      setTableData(tableCopy)
    }
  }

  const handleTableAddRow = () => {
    let newRow = cloneDeep(initTransportRowObj)

    let newRowId = formatDigit(tableData.length)

    newRow["rowId"] = newRowId;
    newRow["rowHeader"] = "";

    newRow.columns.forEach((col, colIdx) => {
      col.colId = parseInt(newRowId)+""+colIdx;

      if(colIdx === 0){
        col.colType = "input"
      }
    })

    setTableData(prev => [...prev, newRow])    
  }

  const handleTableDataReset = () => {
    alertModalOpen(`RESET this table?`,"This action can't be undone",[
      {
        title: "Cancel",
      },
      {
        title: "RESET",
        style: "destructive",
        onClick: () => {
          setTableData(initAllTableData)
        }
      }
    ])
  }

  const handleTableRowDelete = (rowId) => {
    const updatedRows = tableData.filter((row) => {
      return row.rowId !== rowId;
    });
  
    setTableData(updatedRows);
  };

  const getTableDataForExport = () => {
    const thisExportData = formatHomeTableDataForExport(tableData)
    return thisExportData
  }

  const handleTransportSave = () => {
    setShowLoadingScreen(true)

    let shouldSkip = false;

    let finalArr = []

    tableData.forEach((row, rowIdx) => {
      if(shouldSkip){
        return;
      }

      if(!row.columns[0].colValue){
        alertModalOpen("Compound Id is required!", `Check row ${rowIdx+1}`)
        shouldSkip = true;
        return;
      }

      let newRowItem = {comp_id: null, isSelected: false, weight: 0, distance: 0, transportType: null, process_name: null, uuid: null, description: "", amounts: 1, unit: "kg"}
      
      newRowItem["comp_id"] = row.columns[0].colValue;
      newRowItem["weight"] = row.columns[1].colValue;
      newRowItem["distance"] = row.columns[2].colValue;
      newRowItem["isSelected"] = row.columns[3].colValue;
      newRowItem["transportType"] = row.columns[4].colValue.value;
      newRowItem["process_name"] = row.columns[5].colValue.value;
      newRowItem["uuid"] = row.columns[5].colValue.uuid;

      finalArr.push(newRowItem)
    })
    setShowLoadingScreen(false)

    if(!shouldSkip){
      alertModalOpen("Values saved", "Press run button to continue")
      reduxDispatch(update_lca_input_processes_transport(finalArr))
      setEnableRunButton(true)
    }
  }

  const formatProcessNameString = (val) => {
    return val.replace("/"," per ")
          .replace(">", "greaterthan")
          .replace("<", "lessthan")
          .replace(/\(\)/g, "bracket")
          .replace("%", " percent ")
          .replace("m²", "meter square ")
          .replace("m²K", "meter square K");
  }

  const formatUnitValue = (val) => val.replace("/","per")

  const handleTransportDataRun = () => {
    setShowLoadingScreen(true)
    const processesFeedList = LCAInputData.processes.feed;
    const processesUtilityList = LCAInputData.processes.utility;
    const processesWasteList = LCAInputData.processes.waste;
    const processesTransportList = LCAInputData.processes.transport;
    const processesFuelList = LCAInputData.flows.utility;

    let finalProcessesFeedList = []
    let finalProcessesUtilityList = []
    let finalProcessesWasteList = []
    let finalProcessesTransportList = []
    let finalProcessesFuelList = []

    processesFeedList.forEach(obj => {
      if(obj.isSelected){
        const newMsgObj = {
          comp_id: obj.comp_id,
          uuid: obj.uuid,
          process_name: formatProcessNameString(obj.process_name),
          amounts: obj.amounts,
          unit: formatUnitValue(obj.unit),
        }
  
        finalProcessesFeedList.push(newMsgObj)
      }
    });
    processesUtilityList.forEach(obj => {
      if(obj.isSelected){
        const newMsgObj = {
          comp_id: obj.comp_id,
          uuid: obj.uuid,
          process_name: formatProcessNameString(obj.process_name),
          amounts: obj.amounts,
          unit: formatUnitValue(obj.unit),
        }
  
        finalProcessesUtilityList.push(newMsgObj)
      }
    });
    processesWasteList.forEach(obj => {
      if(obj.isSelected){
        const newMsgObj = {
          comp_id: obj.comp_id,
          uuid: obj.uuid,
          process_name: formatProcessNameString(obj.process_name),
          amounts: obj.amounts,
          unit: formatUnitValue(obj.unit),
        }
  
        finalProcessesWasteList.push(newMsgObj)
      }
    });
    
    processesTransportList.forEach(obj => {
      if(obj.isSelected){
        const newMsgObj = {
          comp_id: obj.comp_id,
          uuid: obj.uuid,
          process_name: formatProcessNameString(obj.process_name),
          amounts: obj.amounts,
          unit: formatUnitValue(obj.unit),
        }
  
        finalProcessesTransportList.push(newMsgObj)
      }
    });

    if(processesFuelList.length>0){
      processesFuelList.forEach(obj => {
        const newMsgObj = {
          comp_id: obj.comp_id,
          uuid: obj.uuid,
          flow_name: obj.flow_name,
          flow_property: obj.flow_property,
          in_or_out: obj.in_or_out,
          amounts: obj.amounts,
          unit: obj.unit,
        }
  
        finalProcessesFuelList.push(newMsgObj)
      })
    }

    const finalInput = [{
      email: userToken.email,
      project_id: LCAInputData.project_id,
      projectinfo: LCAInputData.projectinfo,
      method: LCAInputData.method,
      processes: {
        feed: finalProcessesFeedList,
        utility: finalProcessesUtilityList,
        waste: finalProcessesWasteList,
        transport: finalProcessesTransportList,
      },
      flows: {
        utility: finalProcessesFuelList
      }
    }]
    // console.log(finalInput)

    const nextUrl = getNavURL("/lca/results-impact-assesment-analysis-by-coefficient");
    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.post(httpPaths["lcaResult"], finalInput)
      .then((response)=>{
        reduxDispatch(update_lca_results_from_server(response.data[0].impact_assessment));
        reduxDispatch(update_allowed_lca_pages({resultsImpactAssesmentAnalysisByCoefficient: true}));
        setShowLoadingScreen(false)
        navigate(nextUrl);
      }).catch(e => {
        alert("Error on start: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      reduxDispatch(update_lca_results_from_server(LCAResultSample[0].impact_assessment));
      reduxDispatch(update_allowed_lca_pages({resultsImpactAssesmentAnalysisByCoefficient: true}));
      setShowLoadingScreen(false)
      navigate(nextUrl);
    }
  }

  const ThisTable = () => {
    const renderedTableBody = tableData.map(row => {
      return(
        <tr key={row.rowId}>
          <TableRow
            rowId={row.rowId} 
            rowIsNew={row.rowIsNew}
            rowCols={row.columns} 
            onColEdit={onCellValueEdit}
            onRowDelete={handleTableRowDelete}
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white",{"has-text-centered": col!=="Compound Id"})
      return <th key={idx} className={headRowClass}>{col}</th>;
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

  const exportFileName = `LCA-Input-Inventory-Analysis-Transport-Export (${new Date().toISOString()})`

  const alertModal = (
    <AlertModal 
    buttons={alertModalButtons}
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );
  
  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<LCASideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          onAddRow={handleTableAddRow} 
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          onSave={handleTransportSave}            
          onReset={handleTableDataReset} 
          onRun={enableRunButton&& handleTransportDataRun}
          />
          {showAlertModal && alertModal}
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
 
export default LCATransportData;
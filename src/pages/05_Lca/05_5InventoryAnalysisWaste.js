import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";
import axios from "axios";

import { biOutletRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { allowServerComm, getNavURL, httpPaths } from "../../utils/appConstants";
import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { BIInOuletSample, LCALCIDBSample } from "../../utils/testData";

import { update_lca_input_processes_waste } from "../../redux/features/lca/LCAInputSlice";
import { update_allowed_lca_pages } from "../../redux/features/allowedSectionPages/allowedLCAPages";
import { restore_lca_lci_db_obj } from "../../redux/features/lca/LCALCIDBSlice";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";
import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import useAuth from "../../hooks/use-auth";
import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";

const initRowObj =   {
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
      colType: "checkbox",
      colValue: true
    },
    {
      colId: "02",
      colType: "search",
      colValue: {uuid: "", value: "", description: ""},
      colMenuItems: [],
    },
    {
      colId: "03",
      colType: "button,delete"
    }
  ]
}

function LCAInventoryAnalysisWaste() {
  const navigate = useNavigate();

  const {userToken} = useAuth();
  const SelectedProjectId = useSelector(selectedProjectIdRedux);

  const reduxDispatch = useDispatch();
  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const LCALCIDBList = useSelector(state => state.LCALCIDB)

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [tableData, setTableData] = useState([])
  const [compsWithMassFlows, setCompsWithMassFlows] = useState([])
  const [initTableData, setInitTableData] = useState([])

  const BIStreamsOutlet = useSelector(biOutletRedux)
  const columnHeaders = ["Compound Id", "Material Category", "Search DB", "LCI DB", ""];

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
    if(!AllowedPages.inputInventoryAnalysisWaste){
      navigate(-1);
    }else{
      if(LCALCIDBList.length === 0){
        if(allowServerComm){
          setShowLoadingScreen(true)
          axios.post(httpPaths["getLcaLciDB"], {email: userToken?.email, project_id: SelectedProjectId})
          .then((response)=>{
            let formattedResponse = []
            response.data.forEach(obj => {
              let newObj = cloneDeep(obj);
  
              delete newObj.name
  
              formattedResponse.push({...newObj, value: obj.name })
            })
            reduxDispatch(restore_lca_lci_db_obj(formattedResponse))
            setShowLoadingScreen(false)
          }).catch(e => {
            alert("Error when fetching lci db: "+e)
            setShowLoadingScreen(false)
          })
        }else{
          reduxDispatch(restore_lca_lci_db_obj(LCALCIDBSample))
        }
      }
    }
  },[AllowedPages, navigate, reduxDispatch, LCALCIDBList.length, userToken, SelectedProjectId])

  useEffect(()=>{
    let serverData = allowServerComm? BIStreamsOutlet : BIInOuletSample[1]["u_outlet_strm"];

    const { CompoundNameList, MassFlowUnit } = serverData[0];

    let sumOfMassFlowLists = []
    serverData.forEach((obj) => {
      for (let i = 0; i < CompoundNameList.length; i++) {
        let newVal = 0
        if(sumOfMassFlowLists[i]){
          newVal = sumOfMassFlowLists[i] + obj.MassFlowList[i]
        }else{
          newVal = obj.MassFlowList[i]
        }
        sumOfMassFlowLists[i] = newVal
      }
    })

    let thisCompsWithMassFlows = []
    let thisTableRows = []
    
    CompoundNameList.forEach((compound, compoundIdx) => {
      let newRowObj = cloneDeep(initRowObj);

      newRowObj["rowId"] = compoundIdx;
      newRowObj["columns"][0].colId = newRowObj["columns"][0].colId+compoundIdx;
      newRowObj["columns"][1].colId = newRowObj["columns"][1].colId+compoundIdx;
      newRowObj["columns"][2].colId = newRowObj["columns"][2].colId+compoundIdx;


      newRowObj["columns"][0].colValue = compound;

      const newCompObj = {
        comp_id: compound,
        amounts: sumOfMassFlowLists[compoundIdx],
        unit: MassFlowUnit
      }

      thisCompsWithMassFlows.push(newCompObj)

      thisTableRows.push(newRowObj)
    })
    // console.log(compsWithMassFlows);
    setCompsWithMassFlows(thisCompsWithMassFlows)
    setTableData(thisTableRows)
    setInitTableData(thisTableRows)
    setShowLoadingScreen(false)

  },[BIStreamsOutlet])


  //now we need to be able to edit each value in each cell
  const onCellValueEdit = (rowId, colId, newVal = 0) => {
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

    //let's modify the cell in the table with the new value
    if(colOfInt.colType === "search"){
      // console.log(newVal);
      tableCopy[rowOfIntIdx].columns[colOfIntIdx] = {
        ...colOfInt,
        colValue: newVal,
        colMenuItems: []
      }
    }else{
      tableCopy[rowOfIntIdx].columns[colOfIntIdx] = {
        ...colOfInt,
        colValue: newVal
      }
    }

    // console.log(newVal);
    //update table data in the state
    setTableData(tableCopy)
  }

  const onCellValueSearch = (rowId, colId, newTerm = "") => {
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

    let searchResults = []

    if(newTerm){
      LCALCIDBList.forEach(obj => {
        if(obj.value.toLowerCase().startsWith(newTerm.toLowerCase())){
          searchResults.push(obj)
        }
      })

      if(searchResults.length<=0){
        alertModalOpen("No search results found")
      }
    }

    //let's modify the cell in the table with the new value
    tableCopy[rowOfIntIdx].columns[colOfIntIdx] = {
      ...colOfInt,
      colValue: {uuid: "", value: "", description: ""},
      colMenuItems: searchResults,
    }

    // console.log(newVal);
    //update table data in the state
    setTableData(tableCopy)
  }

  const handleTableAddRow = () => {
    let newRow = cloneDeep(initRowObj)

    let newRowId = formatDigit(tableData.length)

    newRow.columns.forEach((col, colIdx) => {
      col.colId = parseInt(newRowId)+""+colIdx;

      if(colIdx === 0){
        col.colType = "input"
      }
    })

    setTableData(prev => [...prev, newRow])    
  }

  const handleTableRowDelete = (rowId) => {
    const updatedRows = tableData.filter((row) => {
      return row.rowId !== rowId;
    });
  
    setTableData(updatedRows);
  };

  const handleTableDataReset = () => {
    alertModalOpen(`RESET this table?`,"This action can't be undone",[
      {
        title: "Cancel",
      },
      {
        title: "RESET",
        style: "destructive",
        onClick: () => setTableData(initTableData)
      }
    ])
  }

  const getTableDataForExport = () => {
    const thisExportData = formatHomeTableDataForExport(tableData)
    return thisExportData
  }

  const handleInventoryAnalysisWasteSave = () => {
    let finalArr = []

    tableData.forEach(row => {
      let newRowItem = {comp_id: null, process_name: null, uuid: null, description: "", isSelected: false, amounts: 0, unit: 0}

      newRowItem["comp_id"]          = row.columns[0].colValue;
      newRowItem["isSelected"]       = row.columns[1].colValue;
      newRowItem["process_name"]     = row.columns[2].colValue.value;
      newRowItem["uuid"]             = row.columns[2].colValue.uuid;
      newRowItem["description"]      = row.columns[2].colValue.description;


      //get amounts and unit from compsWithMassFlows
      let foundObj = compsWithMassFlows.find(obj => obj.comp_id === newRowItem.comp_id);
      let newCompObj = {}

      if(foundObj){
        newCompObj = {
          amounts: foundObj.amounts,
          unit: foundObj.unit
        }
      }else{
        newCompObj = {
          amounts: 1,
          unit: compsWithMassFlows[0].unit
        }
      }
      newRowItem["amounts"] = newCompObj.amounts;
      newRowItem["unit"] = newCompObj.unit;

      finalArr.push(newRowItem)
    })

    // console.log(finalArr);

    let shouldSkip = false;

    finalArr.forEach((obj, objIdx) => {
      if(shouldSkip){
        return
      }

      if(!obj.comp_id && !shouldSkip){
        alertModalOpen(`Error on row ${objIdx+1}`, "Compound Id is required")
        shouldSkip = true
        return
      }

      if(obj.isSelected && !shouldSkip){
        if(!obj.process_name){
          alertModalOpen(`Error on compound ${obj.comp_id}`, "If Search DB is selected, LCI DB value selection is required.")
          shouldSkip = true
          return
        }
      }
    })

    if(!shouldSkip){
      // console.log(newObj);
      const nextUrl = getNavURL("/lca/input-transport-data");
      reduxDispatch(update_allowed_lca_pages({inputTransportData: true}))
      reduxDispatch(update_lca_input_processes_waste(finalArr))
      navigate(nextUrl)
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
            onColSearch={onCellValueSearch}
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

  const exportFileName = `LCA-Input-Inventory-Analysis-Waste-Export (${new Date().toISOString()})`

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
          pageTitle="Source: Waste"
          downloadType="table" 
          onAddRow={handleTableAddRow} 
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          onSave={handleInventoryAnalysisWasteSave}            
          onReset={handleTableDataReset}
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
 
export default LCAInventoryAnalysisWaste;
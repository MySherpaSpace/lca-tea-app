import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cloneDeep, groupBy } from "lodash";

import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { allowServerComm, getNavURL } from "../../utils/appConstants";

import { BIBlockInfoSample } from "../../utils/testData";
import { biBlockInfoRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { teaOpexUnitRedux, update_tea_opex_cost_utility } from "../../redux/features/tea/TEAOpexSlice";
import { update_allowed_tea_pages } from "../../redux/features/allowedSectionPages/allowedTEAPages";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";

const initRowObj = {
  rowId: "0",
  rowHeader: null,
  rowIsNew: false,
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
    },
    {
      colId: "03",
      colType: "input,number",
      colValue: 0
    },
    {
      colId: "04",
      colType: "display",
      colValue: "₩"
    },
    {
      colId: "05",
      colType: "display",
      colValue: ""
    },
    {
      colId: "06",
      colType: "button,delete"
    }
  ]
}


function TEAOpexInputUtilityPage() {
  const navigate = useNavigate();

  const reduxDispatch = useDispatch();
  const AllowedPages = useSelector(state => state.allowedTEAPages);

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [tableData, setTableData] = useState([])
  const [initTableData, setInitTableData] = useState([])

  const columnHeaders = ["Utility", "Usage Rate", "Unit", "Cost (1kg or 1kWh)", "", "",""];

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)
  const [alertModalButtons, setAlertModalButtons] = useState(null)

  const BIBlocksInfo = useSelector(biBlockInfoRedux);
  const TeaOpexUnit = useSelector(teaOpexUnitRedux)

  const alertModalOpen = (title, content, buttons) => {
    setAlertModalButtons(buttons)
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }

  const alertModalClose = () => setShowAlertModal(false);

  useEffect(()=>{
    if(!AllowedPages.opexInputFeed){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    try {
      const serverData = allowServerComm? BIBlocksInfo : BIBlockInfoSample;

      let serverDataOfInt = serverData["HEATER"].concat(serverData["COOLER"], serverData["VESSEL"], serverData["COMPRESSOR"], serverData["EXCHANGER"], serverData["PUMP"], serverData["COLUMN"], serverData["INSTANTANEOUS"]);

      // console.log(JSON.stringify(serverData));
  
      const groupedServerData = groupBy(serverDataOfInt, item => item.UTL_ID? item.UTL_ID : "");
  
      const groupedDataKeys = Object.keys(groupedServerData)//.sort();
  
      let thisTableRows = []
  
      groupedDataKeys.forEach((key, keyIdx) => {
        if(key){
          // console.log(key);
          let thisRowUsageRate = 0
          let thisRowUnit = ""
      
          groupedServerData[key].forEach((item) => {
            thisRowUsageRate = thisRowUsageRate + item.UTL_USAGE[1]
            if(!thisRowUnit){
              thisRowUnit = item.UTL_USAGE[0]
            }
          })
    
          let newRowObj = cloneDeep(initRowObj);
    
          newRowObj["rowId"] = formatDigit(keyIdx);
          newRowObj["columns"][0].colId = keyIdx+"0";
          newRowObj["columns"][1].colId = keyIdx+"1";
          newRowObj["columns"][2].colId = keyIdx+"2";
          newRowObj["columns"][3].colId = keyIdx+"3";
          newRowObj["columns"][4].colId = keyIdx+"4";
          newRowObj["columns"][5].colId = keyIdx+"5";
          newRowObj["columns"][6].colId = keyIdx+"6";
    
          newRowObj["columns"][0].colValue = key;
          newRowObj["columns"][1].colValue = thisRowUsageRate;
          newRowObj["columns"][2].colValue = thisRowUnit;
    
          thisTableRows.push(newRowObj);
        }
      })
      
      setInitTableData(thisTableRows)
      setTableData(thisTableRows)
      setShowLoadingScreen(false)
    } catch (error) {
      console.log(error);
      setShowLoadingScreen(false)
    }

  },[TeaOpexUnit, BIBlocksInfo])


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
    tableCopy[rowOfIntIdx].columns[colOfIntIdx] = {
      ...colOfInt,
      colValue: newVal
    }

    // console.log(newVal);
    //update table data in the state
    setTableData(tableCopy)
  }

  const onTableAddRow = () => {
    let newRow = cloneDeep(initRowObj)

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

  const handleOpexInputUtilitySave = () => {

    let finalArr = []

    tableData.forEach(row => {
      let newRowItem = {CompoundName: null, cost: 0, massFlow: 0}

      newRowItem["CompoundName"] = row.columns[0].colValue
      newRowItem["massFlow"] = row.columns[1].colValue
      newRowItem["cost"] = row.columns[3].colValue

      finalArr.push(newRowItem)
    })

    let isThereBadObjs = false;

    finalArr.forEach(obj => {
      if(!obj.CompoundName){
        isThereBadObjs = true
        alertModalOpen("Compound names are required")
      }

      if(obj.cost == null || obj.cost === ""){
        isThereBadObjs = true
        alertModalOpen("Cost values are required")
      }
    })

    if(isThereBadObjs) return;

    const nextUrl = getNavURL("/tea/opex-input-waste");
    reduxDispatch(update_allowed_tea_pages({opexInputWaste: true}))
    reduxDispatch(update_tea_opex_cost_utility(finalArr))
    navigate(nextUrl)
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
      const headRowClass = classNames("has-text-white",{"has-text-centered": col!=="Utility"})
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

  const exportFileName = `TEA-Opex-Input-Feed-Export (${new Date().toISOString()})`

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
        <AppPageLayout sideMenu={<TEASideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          onAddRow={onTableAddRow} 
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          onSave={handleOpexInputUtilitySave}
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
 
export default TEAOpexInputUtilityPage;
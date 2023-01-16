import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cloneDeep } from "lodash";

import classNames from "classnames";
import { biInletRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { allowServerComm, getNavURL } from "../../utils/appConstants";
import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { BIInOuletSample } from "../../utils/testData";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";
import { teaOpexUnitRedux, update_tea_opex_cost_feed, update_tea_opex_unit } from "../../redux/features/tea/TEAOpexSlice";
import { update_allowed_tea_pages } from "../../redux/features/allowedSectionPages/allowedTEAPages";
import { useNavigate } from "react-router-dom";

const initRowObj =   {
  rowId: null,
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
      colType: "display",
      colValue: ""
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
    }
  ]
}

function TEAOpexInputFeedPage() {
  const navigate = useNavigate();

  const reduxDispatch = useDispatch();
  const AllowedPages = useSelector(state => state.allowedTEAPages);

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [tableData, setTableData] = useState([])
  const [initTableData, setInitTableData] = useState([])

  const BIStreamsInlet = useSelector(biInletRedux)
  const columnHeaders = ["Feed", "Mass Flow", "Unit", "Cost (1kg)", "", ""];

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)
  const [alertModalButtons, setAlertModalButtons] = useState(null)

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
    }else{
      if(TeaOpexUnit == null){
        alertModalOpen("Select currency for OPEX Input Pages","",[
          {
            title: "USD",
            style: "default",
            onClick: () => reduxDispatch(update_tea_opex_unit("usd"))
          },
          {
            title: "KRW",
            style: "default",
            onClick: () => reduxDispatch(update_tea_opex_unit("krw"))
          }
        ])
      }
    }
  },[AllowedPages, navigate, reduxDispatch, TeaOpexUnit])

  useEffect(()=>{
    let serverData = allowServerComm? BIStreamsInlet : BIInOuletSample[0]["u_inlet_strm"];

    const { CompoundNameList, MassFlowUnit } = serverData[0]; //MassFlowList

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

    let thisTableRows = []
    
    CompoundNameList.forEach((compound, compoundIdx) => {
      let newRowObj = cloneDeep(initRowObj);

      newRowObj["rowId"] = compoundIdx;
      newRowObj["columns"][0].colId = newRowObj["columns"][0].colId+compoundIdx;
      newRowObj["columns"][1].colId = newRowObj["columns"][1].colId+compoundIdx;
      newRowObj["columns"][2].colId = newRowObj["columns"][2].colId+compoundIdx;
      newRowObj["columns"][3].colId = newRowObj["columns"][3].colId+compoundIdx;
      newRowObj["columns"][4].colId = newRowObj["columns"][4].colId+compoundIdx;


      newRowObj["columns"][0].colValue = compound;
      newRowObj["columns"][1].colValue = sumOfMassFlowLists[compoundIdx];
      newRowObj["columns"][2].colValue = MassFlowUnit;
      newRowObj["columns"][4].colValue = TeaOpexUnit? TeaOpexUnit === "krw"? "₩" :"$":"₩";


      thisTableRows.push(newRowObj)
    })

    setTableData(thisTableRows)
    setInitTableData(thisTableRows)
    setShowLoadingScreen(false)

  },[TeaOpexUnit, BIStreamsInlet])


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
    newRow["rowIsNew"] = true;

    newRow["columns"] =[
      {
        colId: "00"+newRowId,
        colType: "input",
        colValue: ""
      },
      {
        colId: "01"+newRowId,
        colType: "display",
        colValue: ""
      },
      {
        colId: "02"+newRowId,
        colType: "display",
        colValue: ""
      },
      {
        colId: "03"+newRowId,
        colType: "input,number",
        colValue: 0
      },
      {
        colId: "04"+newRowId,
        colType: "display",
        colValue: TeaOpexUnit? TeaOpexUnit === "krw"? "₩" :"$":"₩"
      },
      {
        colId: "05",
        colType: "button,delete"
      }
    ]

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

  const handleOpexInputFeedSave = () => {

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

    if(!TeaOpexUnit){
      alertModalOpen("Select currency for OPEX Input Pages","Unit must be selected before continuing",[
        {
          title: "USD",
          style: "default",
          onClick: () => reduxDispatch(update_tea_opex_unit("usd"))
        },
        {
          title: "KRW",
          style: "default",
          onClick: () => reduxDispatch(update_tea_opex_unit("krw"))
        }
      ]);

      return;
    }

    const nextUrl = getNavURL("/tea/opex-input-utility");
    reduxDispatch(update_allowed_tea_pages({opexInputUtility: true}))
    reduxDispatch(update_tea_opex_cost_feed(finalArr))
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
      const headRowClass = classNames("has-text-white",{"has-text-centered": col!=="Feed"})
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

  const handleUnitSelection = () => {
    alertModalOpen("Select currency for OPEX Input Pages","",[
      {
        title: "USD",
        style: "default",
        onClick: () => reduxDispatch(update_tea_opex_unit("usd"))
      },
      {
        title: "KRW",
        style: "default",
        onClick: () => reduxDispatch(update_tea_opex_unit("krw"))
      }
    ])
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
          onUnitSelect={handleUnitSelection}
          onSave={handleOpexInputFeedSave}            
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
 
export default TEAOpexInputFeedPage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import classNames from "classnames";

import useAuth from "../../hooks/use-auth";
import { biOutletRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { allowServerComm, httpPaths } from "../../utils/appConstants";
import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { teaOpexUnitRedux, update_tea_opex_revenue_product } from "../../redux/features/tea/TEAOpexSlice";
import { selectedProjectIdRedux, update_allowed_tabs, update_is_next_tab_allowed } from "../../redux/features/allowedTabsSlice";
import { store_tea_capex_results_summary_obj} from "../../redux/features/tea/TEACapexResultsSummarySlice";
import { BIInOuletSample } from "../../utils/testData";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";

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
      colType: "display,number",
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

function TEAOpexRevenueProductPage() {
  const { userToken } = useAuth()

  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const SelectedProjectId = useSelector(selectedProjectIdRedux);
  const totalCapitalCost = useSelector(store_tea_capex_results_summary_obj);
  const AllowedPages = useSelector(state => state.allowedTEAPages);

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [tableData, setTableData] = useState([])
  const [initTableData, setInitTableData] = useState([])  
  const [enableRunButton, setEnableRunButton] = useState(false)

  const BIStreamsOutlet = useSelector(biOutletRedux)
  const columnHeaders = ["Waste", "Mass Flow", "Unit", "Revenue (1kg)", "", ""];

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)
  const [alertModalButtons, setAlertModalButtons] = useState(null)

  const TEAOpexObj = useSelector(state => state.TEAOpex);
  const TeaOpexUnit = useSelector(teaOpexUnitRedux);

  const alertModalOpen = (title, content, buttons) => {
    setAlertModalButtons(buttons)
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }

  const alertModalClose = () => setShowAlertModal(false);

  useEffect(()=>{
    if(!AllowedPages.opexRevenueProduct){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    let serverData = allowServerComm? BIStreamsOutlet : BIInOuletSample[1]["u_outlet_strm"];

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
      newRowObj["columns"][4].colValue = TeaOpexUnit === "krw"? "₩" :"$";


      thisTableRows.push(newRowObj)
    })

    setTableData(thisTableRows)
    setInitTableData(thisTableRows)
    setShowLoadingScreen(false)

  },[TeaOpexUnit, BIStreamsOutlet])


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
        colType: "display,number",
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
        colValue: TeaOpexUnit === "krw"? "₩" :"$"
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

  const handleOpexRevenueProductSave = () => {

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
    reduxDispatch(update_tea_opex_revenue_product(finalArr))
    alertModalOpen("Values saved", "Press run button to continue")
    setEnableRunButton(true)
  }

  const finishSaveProcess = () => {
    reduxDispatch(update_allowed_tabs({lca: true}))
    reduxDispatch(update_is_next_tab_allowed(true))
    setShowLoadingScreen(false)
    alertModalOpen("Changes saved!","Press next tab to continue")
  }

  const handleOpexRevenueProductRun = () => {
    let serverMsg = cloneDeep(TEAOpexObj)
    // console.log("@@@ ",serverMsg)

    // serverMsg.opex_cost.feed.forEach(obj => {
    //   delete obj.massFlow
    // })
    // serverMsg.opex_cost.utility.forEach(obj => {
    //   delete obj.massFlow
    // })
    // serverMsg.opex_cost.waste.forEach(obj => {
    //   delete obj.massFlow
    // })
    // serverMsg.opex_revenue.product.forEach(obj => {
    //   delete obj.massFlow
    // })

    serverMsg = {...serverMsg, total_capitalcost:totalCapitalCost.payload.TEACAPEXResultsSummary[16].columns[0].colValue, project_id: SelectedProjectId, email: userToken.email}

    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.post(httpPaths["opexCost"], serverMsg)
      .then(()=>{
        finishSaveProcess()
      }).catch(e => {
        alert("Error on start: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      finishSaveProcess()
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
      const headRowClass = classNames("has-text-white",{"has-text-centered": col!=="Waste"})
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

  const exportFileName = `TEA-Opex-Revenue-Product-Export (${new Date().toISOString()})`

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
          onSave={handleOpexRevenueProductSave}  
          onReset={handleTableDataReset}      
          onRun={enableRunButton&& handleOpexRevenueProductRun}       
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
 
export default TEAOpexRevenueProductPage;
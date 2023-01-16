import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { allowServerComm, getNavURL /*, isProductionMode */} from "../../utils/appConstants";
import { formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";
import { TEAOpexCostSample } from "../../utils/testData";
import { teaOpexCostUtilityRedux } from "../../redux/features/tea/TEAOpexSlice";

import { update_lca_input_flows, /*update_lca_input_flows_fuel_type,*/ update_lca_input_processes_utility } from "../../redux/features/lca/LCAInputSlice";
import { update_allowed_lca_pages } from "../../redux/features/allowedSectionPages/allowedLCAPages";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";

import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import { LCAInventoryAnalysisFuelTypes, LCAInventoryAnalysisUtilityTypes } from "../../utils/lcaInventoryAnalysisData";

const initUtilityRowObj =   {
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
      colType: "dropdown,lca",
      colMenuItems: LCAInventoryAnalysisUtilityTypes,
      colValue: LCAInventoryAnalysisUtilityTypes[0]
    },
    {
      colId: "03",
      colType: "dropdown,lca",
      colValue: LCAInventoryAnalysisUtilityTypes[0].utilityProcesses[0],
      colMenuItems: LCAInventoryAnalysisUtilityTypes[0].utilityProcesses,
    },
    {
      colId: "04",
      colType: "button,delete"
    }
  ]
}

const initFuelRowObj = {
    rowId: "00",
    rowHeader: " ",
    columns: [
      {
        colId: "00", //fuel type
        colType: "dropdown, lca",
        colMenuItems: LCAInventoryAnalysisFuelTypes,
        colValue: LCAInventoryAnalysisFuelTypes[0]
      },
      {
        colId: "01", //amount
        colType: "input,number",
        colValue: 1,
        colRange: [0, null]
      },
      {
        colId: "02", //unit
        colType: "display",
        colValue: LCAInventoryAnalysisFuelTypes[0].unit,
      },
      {
        colId: "03", //co2
        colType: "display,number",
        colValue: LCAInventoryAnalysisFuelTypes[0].CO2,
      },
      {
        colId: "04", //co
        colType: "display,number",
        colValue: LCAInventoryAnalysisFuelTypes[0].CO,
      },
      {
        colId: "05", //ch4
        colType: "display,number",
        colValue: LCAInventoryAnalysisFuelTypes[0].CH4,
      },
      {
        colId: "06", //nmvoc
        colType: "display,number",
        colValue: LCAInventoryAnalysisFuelTypes[0].NMVOC,
      },
      {
        colId: "07", //nox
        colType: "display,number",
        colValue: LCAInventoryAnalysisFuelTypes[0].NOx,
      },
      {
        colId: "08", //n2o
        colType: "display,number",
        colValue: LCAInventoryAnalysisFuelTypes[0].N2O,
      },
      {
        colId: "09",
        colType: "button,delete"
      }
    ]
  }


const allColumnHeaders = {
  UTILITY: ["Compound Id", "Search DB", "Utility Type", "LCI DB", ""], 
  FUEL: ["Fuel Type", "Amount", "Unit", "CO2", "CO", "CH4", "NMVOC", "NOx", "N2O", ""]
}

function LCAInventoryAnalysisUtility() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const reduxDispatch = useDispatch();
  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  const [selectedDisplay, setSelectedDisplay] = useState("Utility")

  const [initAllTableData, setInitAllTableData] = useState({"UTILITY": [], "FUEL": []})
  //const [allTableData, setAllTableData] = useState({"UTILITY": [], "FUEL": []})
  const [tableData, setTableData] = useState([])

  // const [columnHeaders, setColumnHeaders] = useState(allColumnHeaders.UTILITY);
  const columnHeaders = allColumnHeaders.UTILITY;

  const [utilCompsWithMassFlow, setUtilCompsWithMassFlow] = useState([])
  const TEAOpexCostUtility = useSelector(teaOpexCostUtilityRedux)

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
    if(!AllowedPages.inputInventoryAnalysisFeed){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    setShowLoadingScreen(true)
    let utilityData = allowServerComm? TEAOpexCostUtility : TEAOpexCostSample.utility;

    let thisUtilCompsWithMassFlows = []
    let thisUtilTableRows = []
    
    utilityData.forEach((compound, compoundIdx) => {
      let newRowObj = cloneDeep(initUtilityRowObj);

      newRowObj["rowId"] = formatDigit(compoundIdx);
      newRowObj["columns"][0].colId = compoundIdx+"0";
      newRowObj["columns"][1].colId = compoundIdx+"1";
      newRowObj["columns"][2].colId = compoundIdx+"2";
      newRowObj["columns"][3].colId = compoundIdx+"3";
      newRowObj["columns"][4].colId = compoundIdx+"4";

      newRowObj["columns"][0].colValue = compound.CompoundName;

      const newCompObj = {
        comp_id: compound.CompoundName,
        amounts: 1,
        unit: compound.CompoundName === "ELECTRICITY"? "kWh":"kg"
      }

      thisUtilCompsWithMassFlows.push(newCompObj)

      thisUtilTableRows.push(newRowObj)
    })

    const thisFuelTableRows = [initFuelRowObj];

    setUtilCompsWithMassFlow(thisUtilCompsWithMassFlows)

    setSelectedDisplay("Utility")
    setInitAllTableData({"UTILITY": thisUtilTableRows, "FUEL":thisFuelTableRows})
    // setAllTableData({"UTILITY": thisUtilTableRows, "FUEL":thisFuelTableRows})

    setTableData(thisUtilTableRows)
    setShowLoadingScreen(false)

  },[TEAOpexCostUtility])

  // const updateSelectedData = (newDisp) => {
  //   const newDispUp = newDisp.toUpperCase();

  //   let totalData = cloneDeep(allTableData);

  //   totalData[selectedDisplay.toUpperCase()] = tableData;

  //   setAllTableData(totalData);
  //   setSelectedDisplay(newDisp);
  //   setTableData(totalData[newDispUp])
  //   setColumnHeaders(allColumnHeaders[newDispUp])
  // }

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


      if(selectedDisplay === "Utility"){
        if(colId.endsWith("1")){
          if(newVal === true){
            newOptions1 = LCAInventoryAnalysisUtilityTypes
            newOptions2 = LCAInventoryAnalysisUtilityTypes[0].utilityProcesses
          }else{
            newOptions1 = [{value: null}]
            newOptions2 = [{value: null, uuid: null}]
          }

          assignNewVal1 = true
          assignNewVal2 = true
        }else if(colId.endsWith("2")){
          const foundObj = LCAInventoryAnalysisUtilityTypes.find(obj => obj.value === newVal.value)
          newOptions1 = foundObj.utilityProcesses
          assignNewVal1 = true
        }
      }else if(selectedDisplay === "Fuel"){
        let thisMultiplier = newVal
        if(colId.endsWith("0")){
          tableCopy[rowOfIntIdx].columns[1] = {
            ...tableCopy[rowOfIntIdx].columns[1],
            colValue: 1
          }

          tableCopy[rowOfIntIdx].columns[2] = {
            ...tableCopy[rowOfIntIdx].columns[2],
            colValue: tableCopy[rowOfIntIdx].columns[0].colValue.unit
          }

          thisMultiplier = 1
        }

        tableCopy[rowOfIntIdx].columns[3] = {
          ...tableCopy[rowOfIntIdx].columns[3],
          colValue: thisMultiplier*tableCopy[rowOfIntIdx].columns[0].colValue.CO2
        }

        tableCopy[rowOfIntIdx].columns[4] = {
          ...tableCopy[rowOfIntIdx].columns[4],
          colValue: thisMultiplier*tableCopy[rowOfIntIdx].columns[0].colValue.CO
        }

        tableCopy[rowOfIntIdx].columns[5] = {
          ...tableCopy[rowOfIntIdx].columns[5],
          colValue: thisMultiplier*tableCopy[rowOfIntIdx].columns[0].colValue.CH4
        }

        tableCopy[rowOfIntIdx].columns[6] = {
          ...tableCopy[rowOfIntIdx].columns[6],
          colValue: thisMultiplier*tableCopy[rowOfIntIdx].columns[0].colValue.NMVOC
        }

        tableCopy[rowOfIntIdx].columns[7] = {
          ...tableCopy[rowOfIntIdx].columns[7],
          colValue: thisMultiplier*tableCopy[rowOfIntIdx].columns[0].colValue.NOx
        }

        tableCopy[rowOfIntIdx].columns[8] = {
          ...tableCopy[rowOfIntIdx].columns[8],
          colValue: thisMultiplier*tableCopy[rowOfIntIdx].columns[0].colValue.N2O
        }


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
    let newRow = cloneDeep(selectedDisplay === "Utility"? initUtilityRowObj:initFuelRowObj)

    let newRowId = formatDigit(tableData.length)

    newRow["rowId"] = newRowId;
    newRow["rowHeader"] = "";

    newRow.columns.forEach((col, colIdx) => {
      col.colId = parseInt(newRowId)+""+colIdx;

      if(selectedDisplay === "Utility" && colIdx === 0){
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
          setTableData(initAllTableData[selectedDisplay.toUpperCase()])
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

  const handleInventoryAnalysisUtilitySave = () => {
    setShowLoadingScreen(true)
    if(selectedDisplay === "Utility"){
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

        let newRowItem = {comp_id: null, isSelected: false, utilityType: null, process_name: null, uuid: null, description: "", amounts: 1, unit: ""}
        
        newRowItem["comp_id"] = row.columns[0].colValue;
        newRowItem["isSelected"] = row.columns[1].colValue;
        newRowItem["utilityType"] = row.columns[2].colValue.value;
        newRowItem["process_name"] = row.columns[3].colValue.value;
        newRowItem["uuid"] = row.columns[3].colValue.uuid;

        //get amounts and unit from compsWithMassFlows
        let foundObj = utilCompsWithMassFlow.find(obj => obj.comp_id === newRowItem.comp_id);

        // newRowItem["amounts"] = foundObj.amounts;
        newRowItem["unit"] = foundObj.unit;

        finalArr.push(newRowItem)
      })
      setShowLoadingScreen(false)
      const nextUrl = getNavURL("/lca/input-inventory-analysis-waste");
      reduxDispatch(update_lca_input_processes_utility(finalArr))
      reduxDispatch(update_allowed_lca_pages({inputInventoryAnalysisWaste: true}))
      navigate(nextUrl)
    }/*else{
      setShowLoadingScreen(true)
      const finalObj = [
        {amounts:tableData[0].columns[3].colValue, unit:tableData[0].columns[2].colValue, comp_id:"CO2",   uuid:"643975a8-03da-44bb-873f-4fe8e7740fe6", flow_name:"Carbon dioxide",   flow_property:"Mass", in_or_out:"in"},
        {amounts:tableData[0].columns[4].colValue, unit:tableData[0].columns[2].colValue, comp_id:"CO",    uuid:"620bc2f6-cf71-4dde-bba9-c6e8fdec5e23", flow_name:"Carbon monoxide",  flow_property:"Mass", in_or_out:"in"},
        {amounts:tableData[0].columns[5].colValue, unit:tableData[0].columns[2].colValue, comp_id:"CH4",   uuid:"b53d3744-3629-4219-be20-980865e54031", flow_name:"Methane",          flow_property:"Mass", in_or_out:"in"},
        {amounts:tableData[0].columns[6].colValue, unit:tableData[0].columns[2].colValue, comp_id:"NMVOC", uuid:"175baa64-d985-4c5e-84ef-67cc3a1cf952", flow_name:"NMVOC",            flow_property:"Mass", in_or_out:"in"},
        {amounts:tableData[0].columns[7].colValue, unit:tableData[0].columns[2].colValue, comp_id:"NOx",   uuid:"d068f3e2-b033-417b-a359-ca4f25da9731", flow_name:"Nitrogen oxides",  flow_property:"Mass", in_or_out:"in"},
        {amounts:tableData[0].columns[8].colValue, unit:tableData[0].columns[2].colValue, comp_id:"N2O",   uuid:"d9945575-a965-4bf3-9cd7-584263172abd", flow_name:"Nitrogen dioxide", flow_property:"Mass", in_or_out:"in"}
      ]
      setShowLoadingScreen(false)
      const nextUrl = getNavURL("/lca/input-inventory-analysis-waste");
      reduxDispatch(update_lca_input_flows_fuel_type(tableData[0].columns[0].colValue))
      reduxDispatch(update_allowed_lca_pages({inputInventoryAnalysisWaste: true}))
      reduxDispatch(update_lca_input_flows(finalObj))
      navigate(nextUrl)
    }*/
  }

  const handleFuelInputSkip = () => {
    alertModalOpen(`Skip this fuel configuration?`,"",[
      {
        title: "Cancel",
      },
      {
        title: "Skip",
        style: "destructive",
        onClick: () => {
          const nextUrl = getNavURL("/lca/input-inventory-analysis-waste");
          reduxDispatch(update_allowed_lca_pages({inputInventoryAnalysisWaste: true}))
          reduxDispatch(update_lca_input_flows([]))
          navigate(nextUrl)
        }
      }
    ])
  }

  // const MenuOptions = [
  //   {
  //     title: "Utility",
  //     onClick: () => updateSelectedData("Utility")
  //   },
  //   {
  //     title: "Fuel",
  //     onClick: () => updateSelectedData("Fuel")
  //   }
  // ]

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

  const exportFileName = `LCA-Input-Inventory-Analysis-${selectedDisplay}-Export (${new Date().toISOString()})`

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
          pageTitle={`Source: ${selectedDisplay}`}
          downloadType="table" 
          onAddRow={selectedDisplay === "Utility" &&handleTableAddRow} 
          onSkip={selectedDisplay === "Fuel" && handleFuelInputSkip}
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          onSave={handleInventoryAnalysisUtilitySave}            
          onReset={handleTableDataReset}
          //areMenuOptionsEnabled={!isProductionMode}
          //menuOptions={MenuOptions} 
          //selected={selectedDisplay}
          />
          {showAlertModal && alertModal}
          <div className="table-container mr-4">
            {selectedDisplay === "Fuel" && (
              <div className="is-flex has-background-link" style={{width: ref.current?.width}}>
                <div className="has-background-primary" style={{width:"50%"}}/>
                <div className="has-text-white has-text-centered" style={{width:"45%"}}>Air Emission from Fuel Combustion</div>
                <div className="has-background-primary" style={{width:"5%"}}/>
              </div>
            )}
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
 
export default LCAInventoryAnalysisUtility;
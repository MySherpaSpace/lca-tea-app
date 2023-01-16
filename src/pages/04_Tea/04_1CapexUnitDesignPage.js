import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";

import { BIBlockInfoSample } from "../../utils/testData";
import { allowServerComm, getNavURL, isProductionMode } from "../../utils/appConstants";

import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";
import { biBlockInfoRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { CapexUnitDesignAssignInitInputVal, CapexUnitDesignSaveConfig, CapexUnitDesignTableColumnHeaders, GetCapexUnitDesignDropdownColVal } from "../../utils/capexUnitDesignTableData";

import { update_tea_capex_input_project_id, update_tea_capex_input_unit_design_obj } from "../../redux/features/tea/TEACapexSlice";
import { update_allowed_tea_pages } from "../../redux/features/allowedSectionPages/allowedTEAPages";

import TransposedTableInput from "../../components/transposedTable/TransposedTableInput";
import TransposedTableDropdown from "../../components/transposedTable/TransposedTableDropdown";
import AlertModal from "../../components/AlertModal";

const ColumnWidth = 175;
const TitleColumnHeight = 50;
const InputColumnHeight = 80;

function TEACapexUnitDesignPage() {
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [exportData, setExportData] = useState([])
  const [selectedDisplay, setSelectedDisplay] = useState("Column")

  const [allTableData, setAllTableData] = useState({})
  const [allTableHeaders, setAllTableHeaders] = useState(CapexUnitDesignTableColumnHeaders)
  const [selectedTableHeaders, setSelectedTableHeaders] = useState([])
  const [selectedTableRows, setSelectedTableRows] = useState([])

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
  
  const BIBlocksInfo = useSelector(biBlockInfoRedux);
  const SelectedProjectId = useSelector(selectedProjectIdRedux);

  const generateRowData = (blockInfoObj, selDisp) => {
    let thisObj = selDisp.toUpperCase()
    let arrayOfRows = []

    let numberOfMainRows = blockInfoObj[thisObj].length

    for (let i = 0; i < numberOfMainRows; i++) {
      let rowsInThisRow = [] 
      let columnVals = [blockInfoObj[thisObj][i].NumberofStages]
      let compVals = selDisp === "Compressor"? [blockInfoObj[thisObj][i]["Net_work"][1]]: []
      let pumpVals = selDisp === "Pump"? [blockInfoObj[thisObj][i]["Flow_Rate"][1], blockInfoObj[thisObj][i]["Pump_Head"][1], blockInfoObj[thisObj][i]["Brake_HP"][1]]: []
      let exchVals = selDisp === "Exchanger"? [blockInfoObj[thisObj][i]["HX_AREA"][1], blockInfoObj[thisObj][i]["Out_Hot_Pressure"][1]]:[]

      for (let j = 0; j < 1; j++) {//create a number of rows//j < [blockInfoObj[thisObj][i].NumberofStages]
        let columnsInThisRow = []
        let newRow = {
          rowIndex: rowsInThisRow.length+i, //WARNING: if using this again, check if it works well
          rowId: blockInfoObj[thisObj][i]._id, 
          rowTitle: blockInfoObj[thisObj][i].block_name
        }

        CapexUnitDesignTableColumnHeaders[thisObj].forEach((mainCol)=>{
          let mainColTitle = mainCol.columnTitle
          mainCol.subColumns.forEach((colObj)=>{
            let newCol = cloneDeep(colObj)
            let extraData = selDisp ==="Column"? columnVals : selDisp === "Compressor"? compVals: selDisp === "Pump"? pumpVals: selDisp === "Exchanger"? exchVals : 0
            let newColVal = CapexUnitDesignAssignInitInputVal(colObj, colObj.head, blockInfoObj[thisObj][i], j, extraData)

            newCol = {
              mainCol: mainColTitle,
              colId: uuidv4(),
              colValue: newCol.type === "dropdown"? GetCapexUnitDesignDropdownColVal(newCol.options):newColVal,
              colType: newCol.type,
              colRange: newCol.range,
              colHead: newCol.head,
              colIsMandatory: newCol.isMandatory,
              colOptions: newCol.type === "dropdown"? Array.isArray(newCol.options[0])? newCol.options[0]:newCol.options: null,
              colAllOptions: newCol.options
            }
            columnsInThisRow.push(newCol);
          })
        })          
        rowsInThisRow.push({...newRow,  columns: columnsInThisRow})
      }

      arrayOfRows.push(rowsInThisRow)
    }

    return arrayOfRows.flat(1)  
  }

  useEffect(()=>{
    setShowLoadingScreen(true)
    //run only once at the first rendering of page
    //WARNING: don't forget to switch to the reducer
    let serverData = allowServerComm? BIBlocksInfo:BIBlockInfoSample;

    let firstElements = generateRowData(serverData, "Column")
    let secondElements = generateRowData(serverData, "Instantaneous")
    let thirdElements = generateRowData(serverData, "Compressor")
    let fourthElements = generateRowData(serverData, "Pump")
    let fifthElements = generateRowData(serverData, "Exchanger")
    let sixthElements = generateRowData(serverData, "Vessel")

    let thisTableData = {
      "COLUMN": firstElements,
      "INSTANTANEOUS": secondElements,
      "COMPRESSOR": thirdElements,
      "PUMP": fourthElements,
      "EXCHANGER": fifthElements,
      "VESSEL": sixthElements,
    }

    setAllTableData(thisTableData)
    setExportData(thisTableData)
    setAllTableHeaders(CapexUnitDesignTableColumnHeaders)
    setSelectedTableHeaders(CapexUnitDesignTableColumnHeaders["COLUMN"])
    setSelectedTableRows(firstElements)
    setShowLoadingScreen(false)

    reduxDispatch(update_tea_capex_input_project_id(SelectedProjectId))
  },[SelectedProjectId, reduxDispatch, BIBlocksInfo])

  const updateSelectedData = (newData = "Column") => {
    setShowLoadingScreen(true)
    let totalData = cloneDeep(allTableData)
    let totalColumnHeaders = cloneDeep(allTableHeaders)

    totalData[selectedDisplay.toUpperCase()] = selectedTableRows;
    totalColumnHeaders[selectedDisplay.toUpperCase()] = selectedTableHeaders;

    setExportData(allTableData);
    setAllTableData(totalData);
    setSelectedDisplay(newData);
    setSelectedTableRows(totalData[newData.toUpperCase()])
    setSelectedTableHeaders(totalColumnHeaders[newData.toUpperCase()])
    setShowLoadingScreen(false)
  }

  const handleResetTableData = () => {
    const onConfirm = () => {
      setShowLoadingScreen(true)

      let serverData = allowServerComm? BIBlocksInfo:BIBlockInfoSample;

      let newElements = generateRowData(serverData, selectedDisplay)

      let newTableData = cloneDeep(allTableData)

      newTableData[selectedDisplay.toUpperCase()] = newElements;

  
      setAllTableData(newTableData)
      setExportData(newTableData)
      setSelectedTableRows(newElements)
  
      setShowLoadingScreen(false)
    }

    alertModalOpen(`RESET table values for ${selectedDisplay}?`,"This action can't be undone",[
      {
        title: "Cancel",
      },
      {
        title: "RESET",
        style: "destructive",
        onClick: () => onConfirm()
      }
    ])
  }

  const onCellValueEdit = (rowId, mainCol, rowIndex, colId, colHead, newVal = 0) => {
    //let's create a deep copy of the original array to modify
    let tableCopy = cloneDeep(selectedTableRows)

    //first, let's find the corresponding rowIdx, since all the row ids in this table are the same
    //we need to find the idx to use it to modify the tableCopy
    let rowOfIntIdx = tableCopy.findIndex(row => row.rowIndex === rowIndex)

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

    //DEBUG_LOG:
    // console.log(newVal);
    let newColOfIntIdx = colOfIntIdx+1
    let newColOfIntIdx2 = colOfIntIdx+2
    let newColOfIntIdx3 = colOfIntIdx+3
    let newColOfInt = rowOfIntColumns[newColOfIntIdx]
    let newColOfInt2 = rowOfIntColumns[newColOfIntIdx2]
    let newColOfInt3 = rowOfIntColumns[newColOfIntIdx3]
    let newOptions = newColOfInt?.colAllOptions[0]
    let newOptions2 = newColOfInt2?.colAllOptions[0]
    let newOptions3 = newColOfInt3?.colAllOptions[0]

    let assignNewVal1 = false
    let assignNewVal2 = false
    let assignNewVal3 = false

    const checkDisplay = selectedDisplay.toLowerCase();
    const checkMainCol = mainCol.toLowerCase();
    const checkColHead = colHead.toLowerCase();
    const checkNewVal = newVal? newVal.toLowerCase() : null;

    if(checkDisplay === "column"){
      // console.log("checkNewVal = ",checkNewVal);
      // console.log("checkColHead = ", checkColHead);
      // console.log("newOptions = ",newOptions);
      // console.log("newOptions2 = ",newOptions2);
      // console.log("newOptions3 = ",newOptions3);
      if(checkMainCol === "column design"){
        if(checkColHead === "model name"){
          if(!checkNewVal){
            newOptions = [null]
            newOptions2 = [null]
            newOptions3 = [null]
          }else if(checkNewVal === "seider" ){
            newOptions = newColOfInt.colAllOptions[1]
            newOptions2 = newColOfInt2.colAllOptions[1]
            newOptions3 = [null]
          }else if(checkNewVal === "sinnott"){
            newOptions = newColOfInt.colAllOptions[2]
            newOptions2 = newColOfInt2.colAllOptions[1]
            newOptions3 = newColOfInt3.colAllOptions[1]
          }

          assignNewVal1 = true;
          assignNewVal2 = true;
          assignNewVal3 = true;
        }
      }else if(checkMainCol === "packing/tray design"){
        if(checkColHead === "type"){
          if(!checkNewVal){
            newOptions = [null]
            newOptions2 = [null]
          }else if(checkNewVal === "column packing"){
            newOptions = newColOfInt.colAllOptions[1]
            newOptions2 = [null]
          }else if(checkNewVal === "tray"){
            newOptions = newColOfInt.colAllOptions[2]
            newOptions2 = newColOfInt2.colAllOptions[6]
          }

          assignNewVal1 = true;
          assignNewVal2 = true;
        }else if(checkColHead === "equipment type"){
          if(!checkNewVal){
            newOptions = [null]
          }else if(checkNewVal === "304 ss raschig rings"){
            newOptions = newColOfInt.colAllOptions[1]
          }else if(checkNewVal === "ceramic intalox saddles"){
            newOptions = newColOfInt.colAllOptions[2]
          }else if(checkNewVal === "304 ss pall rings"){
            newOptions = newColOfInt.colAllOptions[3]
          }else if(checkNewVal === "pvc structured packing"){
            newOptions = newColOfInt.colAllOptions[4]
          }else if(checkNewVal === "304 ss structured packing, 350 m2/m3"){
            newOptions = newColOfInt.colAllOptions[5]
          }else if(checkNewVal === "sieve"){
            newOptions = newColOfInt.colAllOptions[6]
          }else if(checkNewVal === "valve"){
            newOptions = newColOfInt.colAllOptions[6]
          }else if(checkNewVal === "bubble cap"){
            newOptions = newColOfInt.colAllOptions[6]
          }

          assignNewVal1 = true;
        }
    }
    }else if(checkDisplay === "instantaneous" || checkDisplay === "vessel"){
      if(checkMainCol === "instantaneous design" || checkMainCol === "vessel design"){
        if(checkColHead === "model name"){
          if(!checkNewVal){
            newOptions = [null]
            newOptions2 = [null]
            newOptions3 = [null]
          }else if(checkNewVal === "seider" ){
            newOptions = newColOfInt.colAllOptions[1]
            newOptions2 = newColOfInt2.colAllOptions[1]
            newOptions3 = [null]
            // newOptions2 = [null]
          }else if(checkNewVal === "sinnott"){
            newOptions = newColOfInt.colAllOptions[2]
            newOptions2 = newColOfInt2.colAllOptions[1]
            newOptions3 = newColOfInt3.colAllOptions[1]
          }

          assignNewVal1 = true;
          assignNewVal2 = true;
          assignNewVal3 = true;
        }
      }else if(checkMainCol === "agitator design"){
        if(checkColHead === "equipment type"){
          if(!checkNewVal){
            newOptions = [null]
          }else{
            newOptions = newColOfInt.colAllOptions[1]
          }

          assignNewVal1 = true;
        }
      }else if(checkMainCol === "autoclave design"){
        if(checkColHead === "equipment type"){
          if(!checkNewVal){
            newOptions = [null]
          }else if(checkNewVal === "steel"){
            newOptions = newColOfInt.colAllOptions[1]
          }else if(checkNewVal === "stainless steel"){
            newOptions = newColOfInt.colAllOptions[2]
          }else if(checkNewVal === "glass lined"){
            newOptions = newColOfInt.colAllOptions[3]
          }

          assignNewVal1 = true;
        }
      }
    }else if(checkDisplay === "compressor"){
      if(checkMainCol === "compressor design"){
        if(checkColHead === "model name"){
          if(checkNewVal === "seider"){
            newOptions = newColOfInt.colAllOptions[0]
            newOptions2 = newColOfInt2.colAllOptions[0]
          }else if(checkNewVal === "sinnott"){
            newOptions = newColOfInt.colAllOptions[1]
            newOptions2 = newColOfInt2.colAllOptions[1]
          }

          assignNewVal1 = true;
          assignNewVal2 = true;
        }
      }
    }else if(checkDisplay === "pump"){
      if(checkMainCol === "pump design"){
        if(checkColHead === "model name"){
          if(checkNewVal === "seider"){
            newOptions = newColOfInt.colAllOptions[0]
            newOptions2 = newColOfInt2.colAllOptions[0]
          }else if(checkNewVal === "sinnott"){
            newOptions = newColOfInt.colAllOptions[1]
            newOptions2 = newColOfInt2.colAllOptions[2]
          }

          assignNewVal1 = true;
          assignNewVal2 = true;
        }else if(checkColHead === "equipment type"){
          if(checkNewVal === "reciprocating plunger"){
            newOptions = newColOfInt.colAllOptions[1]
            assignNewVal1 = true;
          }
        }
      }
    }else if(checkDisplay === "exchanger"){
      if(checkMainCol === "exchanger design"){
        if(checkColHead === "model name"){
          if(checkNewVal === "seider"){
            newOptions = newColOfInt.colAllOptions[0]
            newOptions2 = newColOfInt2.colAllOptions[0]
          }else if(checkNewVal === "sinnott"){
            newOptions = newColOfInt.colAllOptions[1]
            newOptions2 = newColOfInt2.colAllOptions[1]
          }

          assignNewVal1 = true;
          assignNewVal2 = true;
        }
      }
    }

    if(assignNewVal1){
      // console.log("tableCopy[rowOfIntIdx].columns[newColOfIntIdx] = ",tableCopy[rowOfIntIdx].columns[newColOfIntIdx])
      // console.log("tableCopy = ",tableCopy)
      Object.assign(tableCopy[rowOfIntIdx].columns[newColOfIntIdx], {
        ...newColOfInt,
        colValue: newOptions[0],
        colOptions: newOptions
      })
    }

    if(assignNewVal2){
      Object.assign(tableCopy[rowOfIntIdx].columns[newColOfIntIdx2], {
        ...newColOfInt2,
        colValue: newOptions2[0],
        colOptions: newOptions2
      })
    }

    if(assignNewVal3){
      Object.assign(tableCopy[rowOfIntIdx].columns[newColOfIntIdx3], {
        ...newColOfInt3,
        colValue: newOptions3[0],
        colOptions: newOptions3
      })
    }

    setSelectedTableRows(tableCopy)
  }

  const checkForValueValidity = (rowIndex, valObj) => {
    if(valObj.colIsMandatory){
      if(valObj.colValue == null || valObj.colValue === ""){
        alertModalOpen("Value is required!", `Row ${rowIndex+1}: ${valObj.mainCol} - ${valObj.colHead}`)
        return;
      }
      return valObj.colValue
    }

    return valObj.colValue
  }

  const onUnitDesignSave = () => {
    if(selectedDisplay === "Column"){
      // console.log(JSON.stringify(selectedTableRows))
      let savedArray = []

      selectedTableRows.forEach((row, rowIndex) => {
        let newObj = cloneDeep(CapexUnitDesignSaveConfig[1].unit_design[selectedDisplay.toUpperCase()][0])

        // console.log("Column ",row.columns)
        let columnsArr = row.columns
        newObj._id = row.rowId;
        newObj.Inside_Diameter[1] = checkForValueValidity(rowIndex, columnsArr[4])

        newObj.Shell_Length[1] = checkForValueValidity(rowIndex, columnsArr[5])
        newObj.Weight_Shell[1] = checkForValueValidity(rowIndex, columnsArr[6])
        newObj.Weight_Shell_Heads[1] = checkForValueValidity(rowIndex, columnsArr[7])

        newObj.Design["Model_Name"] = checkForValueValidity(rowIndex, columnsArr[8])
        newObj.Design["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[10]) //9-->10
        newObj.Design["Equip_Type_1"] = checkForValueValidity(rowIndex, columnsArr[11]) //10-->11
        newObj.Design["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[9]) //11-->9
        newObj.Design["Target_yr"] = checkForValueValidity(rowIndex, columnsArr[12])

        newObj.Design_1["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[13])

        newObj.Design_2["Type"] = checkForValueValidity(rowIndex, columnsArr[14])
        newObj.Design_2["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[15])
        newObj.Design_2["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[16])

        savedArray.push(newObj)
      })

      reduxDispatch(update_tea_capex_input_unit_design_obj({selectedDisplay, newValue: savedArray}))
      updateSelectedData("Instantaneous")
    }else if(selectedDisplay === "Instantaneous"){
      // console.log(JSON.stringify(selectedTableRows))
      let savedArray = []

      selectedTableRows.forEach((row, rowIndex) => {
        let newObj = cloneDeep(CapexUnitDesignSaveConfig[1].unit_design[selectedDisplay.toUpperCase()][0])
        console.log("Instantaneous ",row.columns)
        let columnsArr = row.columns
        newObj._id = row.rowId;

        newObj.Inside_Diameter[1] = checkForValueValidity(rowIndex, columnsArr[1])
        newObj.Shell_Length[1] = checkForValueValidity(rowIndex, columnsArr[2])
        newObj.Weight_Shell[1] = checkForValueValidity(rowIndex, columnsArr[3])
        newObj.Weight_Shell_Heads[1] = checkForValueValidity(rowIndex, columnsArr[4])
        newObj.Agitator_Power[1] = checkForValueValidity(rowIndex, columnsArr[5])

        newObj.Design["Model_Name"] = checkForValueValidity(rowIndex, columnsArr[6])
        newObj.Design["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[8]) //7-->8
        newObj.Design["Equip_Type_1"] = checkForValueValidity(rowIndex, columnsArr[9]) //8-->9
        newObj.Design["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[7]) //9-->7
        newObj.Design["Target_yr"] = checkForValueValidity(rowIndex, columnsArr[10])

        newObj.Design_1["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[11])

        newObj.Design_2["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[12])
        newObj.Design_2["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[13])

        newObj.Design_3["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[14])
        newObj.Design_3["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[15])

        savedArray.push(newObj)
      })

      reduxDispatch(update_tea_capex_input_unit_design_obj({selectedDisplay, newValue: savedArray}))
      updateSelectedData("Compressor")
    }else if(selectedDisplay === "Compressor"){
      let savedArray = []

      selectedTableRows.forEach((row, rowIndex) => {
        let newObj = cloneDeep(CapexUnitDesignSaveConfig[1].unit_design[selectedDisplay.toUpperCase()][0])

        let columnsArr = row.columns
        newObj._id = row.rowId;

        newObj.Design["Model_Name"] = checkForValueValidity(rowIndex, columnsArr[2])
        newObj.Design["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[3])
        newObj.Design["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[4])
        newObj.Design["Target_yr"] = checkForValueValidity(rowIndex, columnsArr[5])

        savedArray.push(newObj)
      })

      reduxDispatch(update_tea_capex_input_unit_design_obj({selectedDisplay, newValue: savedArray}))
      updateSelectedData("Pump")
    }else if(selectedDisplay === "Pump"){
      // console.log(JSON.stringify(selectedTableRows))
      let savedArray = []

      selectedTableRows.forEach((row, rowIndex) => {
        let newObj = cloneDeep(CapexUnitDesignSaveConfig[1].unit_design[selectedDisplay.toUpperCase()][0])

        let columnsArr = row.columns
        newObj._id = row.rowId;

        newObj.Design["Model_Name"] = checkForValueValidity(rowIndex, columnsArr[4])
        newObj.Design["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[5])
        newObj.Design["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[6])
        newObj.Design["Target_yr"] = checkForValueValidity(rowIndex, columnsArr[7])

        newObj.Design_1["Model_Name"] = checkForValueValidity(rowIndex, columnsArr[8])
        newObj.Design_1["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[9])
        newObj.Design_1["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[10])
        newObj.Design_1["Target_yr"] = checkForValueValidity(rowIndex, columnsArr[11])

        savedArray.push(newObj)
      })
      reduxDispatch(update_tea_capex_input_unit_design_obj({selectedDisplay, newValue: savedArray}))
      updateSelectedData("Exchanger")
    }else if(selectedDisplay === "Exchanger"){
      // console.log(JSON.stringify(selectedTableRows))
      let savedArray = []

      selectedTableRows.forEach((row, rowIndex) => {
        let newObj = cloneDeep(CapexUnitDesignSaveConfig[1].unit_design[selectedDisplay.toUpperCase()][0])

        let columnsArr = row.columns
        newObj._id = row.rowId;

        newObj.Design["Model_Name"] = checkForValueValidity(rowIndex, columnsArr[3])
        newObj.Design["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[4])
        newObj.Design["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[5])
        newObj.Design["Target_yr"] = checkForValueValidity(rowIndex, columnsArr[6])

        savedArray.push(newObj)
      })

      reduxDispatch(update_tea_capex_input_unit_design_obj({selectedDisplay, newValue: savedArray}))
      updateSelectedData("Vessel")
    }else if(selectedDisplay === "Vessel"){
      // console.log(JSON.stringify(selectedTableRows))
      let savedArray = []

      selectedTableRows.forEach((row, rowIndex) => {
        let newObj = cloneDeep(CapexUnitDesignSaveConfig[1].unit_design[selectedDisplay.toUpperCase()][0])

        let columnsArr = row.columns
        newObj._id = row.rowId;

        newObj.Inside_Diameter[1] = checkForValueValidity(rowIndex, columnsArr[1])
        newObj.Shell_Length[1] = checkForValueValidity(rowIndex, columnsArr[2])
        newObj.Weight_Shell[1] = checkForValueValidity(rowIndex, columnsArr[3])
        newObj.Weight_Shell_Heads[1] = checkForValueValidity(rowIndex, columnsArr[4])
        newObj.Agitator_Power[1] = checkForValueValidity(rowIndex, columnsArr[5])

        newObj.Design["Model_Name"] = checkForValueValidity(rowIndex, columnsArr[6])
        newObj.Design["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[8]) //7-->8
        newObj.Design["Equip_Type_1"] = checkForValueValidity(rowIndex, columnsArr[9]) //8-->9
        newObj.Design["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[7]) //9-->7
        newObj.Design["Target_yr"] = checkForValueValidity(rowIndex, columnsArr[10])

        newObj.Design_1["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[11])

        newObj.Design_2["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[12])
        newObj.Design_2["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[13])

        newObj.Design_3["Equip_Type"] = checkForValueValidity(rowIndex, columnsArr[14])
        newObj.Design_3["Material_Type"] = checkForValueValidity(rowIndex, columnsArr[15])

        savedArray.push(newObj)
      })
      const nextUrl = getNavURL("/tea/capex-percentage-method");
      reduxDispatch(update_allowed_tea_pages({capexPercentageMethod: true}))
      reduxDispatch(update_tea_capex_input_unit_design_obj({selectedDisplay, newValue: savedArray}))
      navigate(nextUrl)
    }
  }

  const MenuOptions = [
    {
      title: "Column",
      onClick: () => updateSelectedData("Column")
    },
    {
      title: "Instantaneous",
      onClick: () => updateSelectedData("Instantaneous")
    },
    {
      title: "Compressor",
      onClick: () => updateSelectedData("Compressor")
    },
    {
      title: "Pump",
      onClick: () => updateSelectedData("Pump")
    },
    {
      title: "Exchanger",
      onClick: () => updateSelectedData("Exchanger")
    },
    {
      title: "Vessel",
      onClick: () => updateSelectedData("Vessel")
    }
  ]

  const TransposedTableColumnTitle = ({columnTitle="", subColumns=[]}) => {
    const renderedSubColumns = subColumns.map((subCol, subColIdx)=>{
      return(
        <div key={subColIdx} className="is-flex">
          <div style={{height:  TitleColumnHeight, width:1, backgroundColor: "white"}}/>
          <div 
          className={`is-flex is-justify-content-center is-align-items-center has-text-centered has-text-white has-background-link`} 
          style={{width:ColumnWidth, height:  TitleColumnHeight, paddingInline:10}}
          >
            {subCol.head}
          </div>
        </div>
      )
    })

    const isMultiLine = subColumns[0].head != null
    // console.log("isMultiLine ", columnTitle, subColumns)
    return(
      <td>
        <div className="is-flex ">
          <div style={{height:"100%", width:1.5, backgroundColor: "white"}}/>
          <div className="is-flex is-justify-content-center is-align-items-center has-background-primary has-text-centered has-text-white" style={{height:isMultiLine?  TitleColumnHeight:( TitleColumnHeight*2), width: isMultiLine? "100%":ColumnWidth, paddingInline: isMultiLine? null:10}}>
            {columnTitle}
          </div>
        </div>
        {isMultiLine&& (
          <div className="is-flex">
            {renderedSubColumns}
          </div>
        )}
      </td>
    )
  }

  const TransposedTableHeaderRow = ({columnsList = []}) => {
    const renderedRow = columnsList.map((col, colIdx)=> {
      return(
        <TransposedTableColumnTitle
          key={colIdx}
          columnTitle={col.columnTitle}
          subColumns={col.subColumns}
        />
      )
    })

    return(
      <tr className="is-flex">
        {renderedRow}
      </tr>
    )
  }

  const TransposedTableColumnInput = ({columns, onColumnEdit, rowId, rowIndex}) => {

    const renderedColumns = columns.map(( col,  colIdx)=>{

      const onColChange = (newVal) => {
        onColumnEdit(rowId, col.mainCol, rowIndex, col.colId, col.colHead, newVal)
      }

      return( 
        <div key={colIdx}>
          <div key={ colIdx} className="is-flex">
            <div style={{height:InputColumnHeight, width:1, backgroundColor: "#f0f0f0"}}/>
            <div 
            className={`is-flex is-justify-content-center is-align-items-center has-text-centered has-background-white`} 
            style={{width:ColumnWidth, height:InputColumnHeight, paddingInline:10}}
            >
              <>
                {/* {console.log("colType ", col.colType)} */}
                { col.colType === "display" &&(
                  <>{col.colValue}</>
                )}
                { col.colType.includes("input") &&(
                  <TransposedTableInput 
                    value={col.colValue} 
                    onChange={onColChange} 
                    isMandatory={col.colIsMandatory} 
                    type={col.colType} 
                    range={col.colRange}                    
                  />
                )}
                { col.colType === "dropdown" &&(
                  <TransposedTableDropdown
                    isMandatory={col.colIsMandatory}
                    value={col.colValue}
                    options={col.colOptions}
                    onChange={onColChange}
                  />
                )}
              </>
            </div>
          </div>
          <div style={{width:"100%", height:1, backgroundColor: "#f0f0f0"}}/>
        </div>
      )
    })
  
    return(
      <td>
        <div className="is-flex">
          {renderedColumns}
        </div>
      </td>
    )
  }

  const TransposedTableInputRow = ({rowsList, onColumnEdit}) => {
    const renderedRow = rowsList.map((row, rowIdx)=> {
      return(
        <TransposedTableColumnInput
          key={rowIdx}
          columns={row.columns}
          onColumnEdit={onColumnEdit}
          rowId={row.rowId}
          rowIndex={row.rowIndex}
        />
      )
    })

    return(
      <tr className="is-flex  is-flex-direction-column">
        {renderedRow}
      </tr>
    )
  }

  const ThisTable = () => {
    return(
      <table>
        <thead>
          <TransposedTableHeaderRow columnsList={selectedTableHeaders}/>
        </thead>
        <tbody>
          <TransposedTableInputRow rowsList={selectedTableRows} onColumnEdit={onCellValueEdit}/>
        </tbody>
      </table>
    )
  }

  const alertModal = (
    <AlertModal 
    buttons={alertModalButtons}
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );

  const exportFileName = `TEA-CAPEX-Input-UnitDesign-Export (${new Date().toISOString()})`

  
  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<TEASideMenu/>}>
          <EditorTopMenu 
          pageTitle="Specifications of Unit Design"
          downloadType="table" 
          tableData={exportData} 
          fileName={exportFileName} 
          onReset={handleResetTableData}
          onSave={onUnitDesignSave}
          areMenuOptionsEnabled={!isProductionMode}
          menuOptions={MenuOptions} 
          selected={selectedDisplay}
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
 
export default TEACapexUnitDesignPage;
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { allowServerComm, getNavURL } from "../../utils/appConstants";
import { LCAResultSample } from "../../utils/testData";
import { convertExponentialToDecimal, formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";

import { update_lca_results_from_user } from "../../redux/features/lca/LCAResultsSlice";
import { update_allowed_lca_pages } from "../../redux/features/allowedSectionPages/allowedLCAPages";
import { 
  lcaInputAssesmentMethodRedux, lcaInputFeedDataRedux, lcaInputImpactCategoriesRedux, lcaInputTransportDataRedux, 
  lcaInputUtilityDataRedux, lcaInputWasteDataRedux 
} from "../../redux/features/lca/LCAInputSlice";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";
import LCASideMenu from "../../components/sideMenus/LCASideMenu";


const initRowObj =   {
  rowId: null,
  rowHeader: "",
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
    }
  ]
}

const initColHeaders = ["Source", "Target Process", "Amount", "Unit"]

function LCAAnalysisByCoefficient() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const reduxDispatch = useDispatch();

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  const AllowedPages = useSelector(state => state.allowedLCAPages);

  const InputAssesmentMethod = useSelector(lcaInputAssesmentMethodRedux);
  const InputImpactCategories = useSelector(lcaInputImpactCategoriesRedux);
  const InputFeedData = useSelector(lcaInputFeedDataRedux);
  const InputUtilityData = useSelector(lcaInputUtilityDataRedux);
  const InputWasteData = useSelector(lcaInputWasteDataRedux);
  const InputTransportData = useSelector(lcaInputTransportDataRedux);

  const LCAResultsFromServer = useSelector(state => state.LCAResults.fromServer);

  const [initTableData, setInitTableData] = useState([])
  const [tableData, setTableData] = useState([])

  const [columnHeaders, setColumnHeaders] = useState([]);

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
    if(!AllowedPages.resultsImpactAssesmentAnalysisByCoefficient){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  const extractTableRows = (initRowObj, headName, input, inputIdx, impactAssArr, extraColNum) => {
    let newRowObj = cloneDeep(initRowObj)
    newRowObj["rowHeader"] = headName
    newRowObj["rowId"] = formatDigit(inputIdx)
    
    let allCols = []

    newRowObj["columns"].forEach((col, colIdx) => {
      let newObj = {...col, colId: inputIdx+""+colIdx}

      if(colIdx === 0){ 
        newObj =  {...newObj, colValue: input.comp_id}
      }else if(colIdx === 1){
        newObj =  {...newObj, colValue: input.amounts}
      }else if(colIdx === 2){
        newObj =  {...newObj, colValue: input.unit}
      }

      allCols.push(newObj)
    })

    const resIndex = impactAssArr.findIndex(res => Object.keys(res)[0] === input.comp_id)
    let lcaResults = []
    if(resIndex>= 0){
      lcaResults = impactAssArr[resIndex][input.comp_id].lca_result
      lcaResults.forEach(res => {
        allCols.push({
          colId: allCols.length+""+inputIdx,
          colType: "display,number",
          colValue: typeof res.impact_value !== "number"? Number(convertExponentialToDecimal(res.impact_value)) : res.impact_value
        })
      })
    }else{
      for (let i = 0; i < extraColNum; i++) {
        allCols.push({
          colId: allCols.length+""+inputIdx,
          colType: "input,number",
          colValue: 0,
          colRange: [0, null]
        })
      }
    }
    
    newRowObj["columns"] = allCols;

    return newRowObj
  }
  useEffect(()=>{
    let thisInitRowObj = cloneDeep(initRowObj)
    let thisInitColHeads = []

    const serverData = allowServerComm? LCAResultsFromServer : LCAResultSample[0].impact_assessment

    // console.log(Object.values(serverData.feed[0])[0].lca_result);

    const tableColHeadObjArr = Object.values(serverData.feed[0])[0].lca_result;

    tableColHeadObjArr.forEach(cat => {
      const colHeadObj = `${cat.impact_category}$(${cat.impact_unit})`
      thisInitColHeads.push(colHeadObj)
    })
    
    const finalColumnHaders = [...initColHeaders, ...thisInitColHeads]
    setColumnHeaders(finalColumnHaders)

    const extraColNum = finalColumnHaders.length - initColHeaders.length

    let thisTableData = []

    InputFeedData.forEach((input, idx) => {
      const thisIdx = thisTableData.length;
      const newRowObj = extractTableRows(thisInitRowObj, "Feed", input, thisIdx, serverData.feed, extraColNum)
      thisTableData.push(newRowObj)
    })

    InputUtilityData.forEach((input) => {
      const thisIdx = thisTableData.length;
      const newRowObj = extractTableRows(thisInitRowObj, "Utility", input, thisIdx, serverData.utility, extraColNum)
      thisTableData.push(newRowObj)
    })

    InputWasteData.forEach((input) => {
      const thisIdx = thisTableData.length;
      const newRowObj = extractTableRows(thisInitRowObj, "Waste", input, thisIdx, serverData.waste, extraColNum)
      thisTableData.push(newRowObj)
    })

    InputTransportData.forEach((input) => {
      const thisIdx = thisTableData.length;
      const newRowObj = extractTableRows(thisInitRowObj, "Transport", input, thisIdx, serverData.transport, extraColNum)
      thisTableData.push(newRowObj)
    })

    setInitTableData(thisTableData)
    setTableData(thisTableData)
    setShowLoadingScreen(false)
  },[InputImpactCategories, LCAResultsFromServer, InputFeedData, InputTransportData, InputUtilityData, InputWasteData])


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

  const handleAnalysisByCoefficientSave = () => {
    let finalArr = []

    const initStorageObj = {
      source: "",
      targetProcess: "",
      amount: 0,
      unit: "",
      method: "",
      impact_assesment: [
        {
          category: "",
          unit: "",
          value: 0
        }
      ]
    }

    tableData.forEach(row => {
      let newStorageObj = cloneDeep(initStorageObj)

      newStorageObj["source"] = row.rowHeader;
      newStorageObj["targetProcess"] = row.columns[0].colValue;
      newStorageObj["amount"] = row.columns[1].colValue;
      newStorageObj["unit"] = row.columns[2].colValue;
      newStorageObj["method"] = InputAssesmentMethod.method_name;

      let finalImpactAssesmentList = []
      for (let i = 3; i < row.columns.length; i++) {
        const element = row.columns[i];

        let thisArr = ["",""]

        if(i+3 < columnHeaders.length+3){
          thisArr = columnHeaders[i+1].split("$")
        }

        const impactAssObj = {
          category: thisArr[0],
          unit: thisArr[1],
          value: element.colValue
        }

        finalImpactAssesmentList.push(impactAssObj)
      }

      newStorageObj["impact_assesment"] = finalImpactAssesmentList;

      finalArr.push(newStorageObj)
    })

    const nextUrl = getNavURL("/lca/results-impact-assesment-life-cycle-assesment");
    reduxDispatch(update_allowed_lca_pages({
      //resultsImpactAssesmentFuelCombustion: true,
      resultsImpactAssesmentLifeCycleAssesment: true,
      resultsSummaryOverview: true,
      resultsSummaryAnalysisByMaterial: true,
      resultsSummaryAnalysisByCategory: true,
      resultsSummaryAnalysisByManufacturingStage: true,
    }))
    reduxDispatch(update_lca_results_from_user(finalArr))
    navigate(nextUrl)
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
          setTableData(initTableData)
        }
      }
    ])
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
            onColEdit={onCellValueEdit}
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white is-vcentered",{"has-text-centered": (col!=="Source" && col!=="Target Process")})
      const colText = col.includes("$")? <>{col.split("$")[0]}<br/>{col.split("$")[1]}</> : <>{col}</>

      return <th key={idx} className={headRowClass}>{colText}</th>;
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

  const alertModal = (
    <AlertModal 
    buttons={alertModalButtons}
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );
  
  const exportFileName = `LCA-Results-Analysis-By-Coefficient-Export (${new Date().toISOString()})`

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<LCASideMenu/>}>
          <EditorTopMenu 
          pageTitle={`Assesment Method: ${InputAssesmentMethod.method_name}`}
          downloadType="table" 
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          onSave={handleAnalysisByCoefficientSave}            
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
 
export default LCAAnalysisByCoefficient;
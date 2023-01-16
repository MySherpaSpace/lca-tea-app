import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { captalizeFirst, formatDigit, formatHomeTableDataForExport } from "../../utils/appUtils";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";

import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import { LCAResultSample } from "../../utils/testData";
import { allowServerComm } from "../../utils/appConstants";

const initRowObj =   {
  rowId: null,
  rowHeader: "",
  columns: [
    {
      colId: "00",
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "01",
      colType: "display,left",
      colValue: ""
    }
  ]
}

function LCAAnalysisByCategory() {
  const navigate = useNavigate();

  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [allTableData, setAllTableData] = useState([])
  const [tableData, setTableData] = useState([])
  const [menuOptions, setMenuOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState("")

  const LCAResultsFromServer = useSelector(state => state.LCAResults.fromServer);

  const columnHeaders = ["Impact Category", "Result", "Reference Unit"]

  useEffect(()=>{
    if(!AllowedPages.resultsSummaryAnalysisByCategory){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  const getTableRows = (data) => {
    let theseNewRows = []

    data.impact_assesment.forEach((row, rowIdx) => {
      let newDataObj = cloneDeep(initRowObj)
      newDataObj["rowId"] = formatDigit(rowIdx)
      newDataObj["rowHeader"] = row.category;
      newDataObj["columns"][0].colValue = row.value;
      newDataObj["columns"][1].colValue = row.unit.replace(/["'()]/g,"");
      theseNewRows.push(newDataObj)
    })

    return theseNewRows
  }

  useEffect(()=>{
    setShowLoadingScreen(true)

    const serverData = allowServerComm? LCAResultsFromServer : LCAResultSample[0].impact_assessment
    
    //options have to be passed as {title: "blabla"}
    let allMenuOptions = []

    const serverDataKeys = Object.keys(serverData)

    let impactAssesmentDataByKey = []

    serverDataKeys.forEach(thisSource => {
      allMenuOptions.push({title: captalizeFirst(thisSource)})

      let newDataObj = {source: thisSource}

      let tableCols = []
      let sumOfVals =  []

      serverData[thisSource].forEach((item, itemIdx) => {
        let thisVal = Object.values(item)[0]
        thisVal.lca_result.forEach((result, resultIdx) => {
          if(itemIdx === 0){
            if(resultIdx < thisVal.lca_result.length){
              tableCols.push({
                value: result.impact_value,
                unit: result.impact_unit,
                category: result.impact_category
              })   
            }
          }

          if(sumOfVals.length < thisVal.lca_result.length){
            sumOfVals.push(result.impact_value)
          }
          sumOfVals[resultIdx] = parseFloat(sumOfVals[resultIdx]) + parseFloat(result.impact_value)
        })
      })

      tableCols.forEach((col, colIdx)=> {
        col.value = sumOfVals[colIdx]
      })

      newDataObj = {...newDataObj, impact_assesment: tableCols}
      impactAssesmentDataByKey.push(newDataObj)
    })

    setMenuOptions(allMenuOptions)
    setSelectedOption(allMenuOptions[0].title)
    setAllTableData(impactAssesmentDataByKey)

    const selectedObj = impactAssesmentDataByKey[0]
    const thisTableData = getTableRows(selectedObj)

    setTableData(thisTableData)
    setShowLoadingScreen(false)
  },[LCAResultsFromServer])

  const handleCategorySelection = (newOption) => {    
    setShowLoadingScreen(true)
    //NOTE: options are passed as {title: "blabla"}
    const newOptionTitle = newOption.title;

    const selectedObjIdx = allTableData.findIndex(obj => obj.source.toLowerCase() === newOptionTitle.toLowerCase())
    const selectedObj = allTableData[selectedObjIdx]
    const thisTableData = getTableRows(selectedObj)

    setTableData(thisTableData)
    setSelectedOption(newOptionTitle)
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
            rowIsNew={row.rowIsNew}
            rowCols={row.columns} 
            rowHeader={row.rowHeader}
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white is-vcentered",{"has-text-centered": (col!=="Impact Category" && col!=="Reference Unit")})
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

  const exportFileName = `LCA-Results-Analysis-By-Category-Export (${new Date().toISOString()})`
  
  if(!showLoadingScreen){
    return(
      <AppPageLayout sideMenu={<LCASideMenu/>}>
        <EditorTopMenu 
        downloadType="table" 
        pageTitle="Category: "
        onDownload={getTableDataForExport} 
        fileName={exportFileName} 
        menuOptions={menuOptions} 
        selected={selectedOption}
        onMenuOptionSelect={handleCategorySelection}
        />

        <div className="table-container mr-4">
          <ThisTable/>
        </div>
        <div className='block'/>
        
      </AppPageLayout>
    );
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default LCAAnalysisByCategory;
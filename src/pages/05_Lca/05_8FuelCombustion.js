import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { formatHomeTableDataForExport } from "../../utils/appUtils";
import { lcaInputFuelDataRedux, lcaInputFuelTypeDataRedux } from "../../redux/features/lca/LCAInputSlice";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";

import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import { getNavURL } from "../../utils/appConstants";

const initRowObj =   {
  rowId: null,
  rowHeader: null, //fuelType
  columns: [
    {
      colId: "00", //co2
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "01", //co
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "02", //ch4
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "03", //nmvoc
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "04", //nox
      colType: "display,number",
      colValue: 0
    },
    {
      colId: "05", //n2o
      colType: "display,number",
      colValue: 0
    }
  ]
}

function LCAFuelCombustion() {
  const navigate = useNavigate();
  const ref = useRef(null);

  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [tableData, setTableData] = useState([])
  const InputFuelData = useSelector(lcaInputFuelDataRedux);
  const InputFuelTypeData = useSelector(lcaInputFuelTypeDataRedux);

  const columnHeaders = ["Fuel Type", "CO2", "CO", "CH4", "NMVOC", "NOx", "N2O"]

  useEffect(()=>{
    if(!AllowedPages.resultsImpactAssesmentFuelCombustion){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  useEffect(()=>{
    setShowLoadingScreen(true)

    let newTableData = cloneDeep(initRowObj);
    newTableData["rowId"] = "0"
    newTableData["rowHeader"] = InputFuelTypeData.value
    newTableData["columns"][0].colValue = InputFuelData[0].amounts
    newTableData["columns"][1].colValue = InputFuelData[1].amounts
    newTableData["columns"][2].colValue = InputFuelData[2].amounts
    newTableData["columns"][3].colValue = InputFuelData[3].amounts
    newTableData["columns"][4].colValue = InputFuelData[4].amounts
    newTableData["columns"][5].colValue = InputFuelData[5].amounts

    setTableData([newTableData])
    setShowLoadingScreen(false)
  },[InputFuelTypeData.value, InputFuelData])

  const getTableDataForExport = () => {
    const thisExportData = formatHomeTableDataForExport(tableData)
    return thisExportData
  }
  
  const handleNextPageClick = () => {
    const nextUrl = getNavURL("/lca/results-impact-assesment-life-cycle-assesment");
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
            rowHeader={row.rowHeader}
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white",{"has-text-centered": col!=="Fuel Type"})
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

  const exportFileName = `LCA-Results-Fuel-Combustion-Export (${new Date().toISOString()})`
  
  if(!showLoadingScreen){
    return(
      <AppPageLayout sideMenu={<LCASideMenu/>}>
        {InputFuelData.length>0?(
          <>
            <EditorTopMenu 
            downloadType="table" 
            onDownload={getTableDataForExport} 
            fileName={exportFileName} 
            />

            <div className="table-container mr-4">
              <div className="has-background-link" style={{width: ref.current?.width}}>
                <div className="has-text-white has-text-centered has-text-weight-bold py-1">Calculated Air Emission (kg)</div>
              </div>
              <ThisTable/>
            </div>
            <div className='block'/>
          </>
        ):(
          <>
            <div style={{height:200}}/>
            <div className="columns is-centered">
              <div className="column is-three-quarters has-text-centered">
                <h1 className="title">No Data Found</h1>
                <p className="subtitle">Data was not entered from Input Utility Data</p>
                <button className="button is-primary" onClickCapture={handleNextPageClick}>Continue to Next Page</button>
              </div>
            </div>
          </>
        )}
        
      </AppPageLayout>
    );
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default LCAFuelCombustion;
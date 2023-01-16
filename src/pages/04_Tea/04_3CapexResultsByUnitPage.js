import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";
import classNames from "classnames";

import { captalizeFirst, handleConvertToWon } from "../../utils/appUtils";
import { allowServerComm } from "../../utils/appConstants";
import { TEACapexResultsSample } from "../../utils/testData";

import { teaCapexResultsRedux } from "../../redux/features/tea/TEACapexSlice";
import { lastestCurrencyRateRedux } from "../../redux/features/allowedTabsSlice";
import { biAssumptionRedux } from "../../redux/features/basicInfo/basicInfoSlice";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";
import TableRow from "../../components/table/TableRow";

const initRowObj =   {
  rowId: null, //_id
  rowHeader: null,//_block_name
  columns: [
    {
      colId: "00",
      colType: "display, currency",
      colValue: 0
    },
    {
      colId: "01",
      colType: "display, currency",
      colValue: 0
    },
    {
      colId: "02",
      colType: "display, currency",
      colValue: 0
    },
    {
      colId: "03",
      colType: "display",
      colValue: 0
    }
  ]
}

const columnHeaders = ["Unit Name", "Purchase Cost", "Installed Cost","Number of Labor", "Failed Message"]

function TEACapexResultsByUnitPage() {
  const navigate = useNavigate();

  const TEACapexResults = useSelector(teaCapexResultsRedux)
  const AllowedPages = useSelector(state => state.allowedTEAPages);
  const BIAssumptionData = useSelector(biAssumptionRedux);
  const LastestCurrencyRate = useSelector(lastestCurrencyRateRedux);

  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [selectedDisplay, setSelectedDisplay] = useState("Column")
  const [exportData, setExportData] = useState([])
  const [allTableData, setAllTableData] = useState(false)
  const [tableData, setTableData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(LastestCurrencyRate)
  const [spareUnitNum, setSpareUnitNum] = useState(1)

  useEffect(()=>{
    if(BIAssumptionData!=null){
      setExchangeRate(BIAssumptionData.assumption_value.exchangerate)
    }
  },[BIAssumptionData])
  
  useEffect(()=>{
    if(!AllowedPages.capexResultsByUnit){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  const getRowData = (rows=[]) => {
    let allRows = []

    rows.forEach(row => {
      let newRow = cloneDeep(initRowObj)
      newRow.rowId = row._id
      newRow.rowHeader = row.block_name
      newRow.columns[0].colValue = row.Total_Cost[0]
      newRow.columns[1].colValue = row.Total_Cost[1]
      newRow.columns[2].colValue = row.Total_Cost[2]
      newRow.columns[3].colValue = row.msg_f

      allRows.push(newRow)
    })

    return allRows
  }

  useEffect(()=>{
    setShowLoadingScreen(true)
    let serverData = allowServerComm? TEACapexResults.unit_cost : TEACapexResultsSample.unit_cost;

    let thisData = {
      COLUMN: getRowData(serverData["COLUMN"]),
      INSTANTANEOUS: getRowData(serverData["INSTANTANEOUS"]),
      COMPRESSOR: getRowData(serverData["COMPRESSOR"]),
      PUMP: getRowData(serverData["PUMP"]),
      EXCHANGER: getRowData(serverData["EXCHANGER"]),
      HEATER: getRowData(serverData["HEATER"]),
      COOLER: getRowData(serverData["COOLER"]),
      VESSEL: getRowData(serverData["VESSEL"]),
    }

    setExportData(serverData)
    setAllTableData(thisData)

    setTableData(handleConvertToWon(thisData["COLUMN"], exchangeRate))
    setShowLoadingScreen(false)
    // setTableData(thisData["COLUMN"])
  },[TEACapexResults, exchangeRate])

  const updateSelectedData = (newDisp) => {
    setSelectedDisplay(newDisp)
    setTableData(handleConvertToWon(allTableData[newDisp.toUpperCase()], exchangeRate))
  }

  const handleSpareUnitInput = (event) => {
    setSpareUnitNum(event.target.value)
  }

  const handleSpareUnitSubmit = (event) => {
    event.preventDefault()

    let originalData = handleConvertToWon(allTableData[selectedDisplay.toUpperCase()], exchangeRate)
    let newRowData = cloneDeep(originalData)

    newRowData.forEach(newRow => {
      newRow.columns[0].colValue = newRow.columns[0].colValue * spareUnitNum
      newRow.columns[1].colValue = newRow.columns[1].colValue * spareUnitNum
      newRow.columns[2].colValue = newRow.columns[2].colValue * spareUnitNum
    })

    setTableData(newRowData)
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
      title: "Heater",
      onClick: () => updateSelectedData("Heater")
    },
    {
      title: "Cooler",
      onClick: () => updateSelectedData("Cooler")
    },
    {
      title: "Vessel",
      onClick: () => updateSelectedData("Vessel")
    }
  ]

  const ThisTable = () => {
    const renderedTableBody = tableData.map(row => {
      return(
        <tr key={row.rowId}>
          <TableRow
            rowId={row.rowId} 
            rowHeader={captalizeFirst(row.rowHeader)} 
            rowCols={row.columns}  
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white", 
      {
        "has-text-right": (col !== "Unit Name" && col !== "Failed Message"),
        "has-text-centered": col === "Failed Message",
      })
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

  const exportFileName = `TEA-CAPEX-Input-ResultsByUnit-Export (${new Date().toISOString()})`

  
  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<TEASideMenu/>}>
          <EditorTopMenu 
          menuOptions={MenuOptions} 
          selected={selectedDisplay} 
          downloadType="table" 
          tableData={exportData} 
          fileName={exportFileName}
          page="Results by Unit"
          />

          <div className="mr-4">
            <div className="table-container">
              <ThisTable/>
            </div>
            
            <div className="columns">
              <div className="column is-4 is-offset-8">
                <form className="box" onSubmit={handleSpareUnitSubmit}>
                  <label className="label">Enter number of spare units</label>
                  <div className="field is-grouped">
                    <div className="control is-expanded">
                      <input className="input" type="number" min={1} value={spareUnitNum} onChange={handleSpareUnitInput} onBlur={handleSpareUnitSubmit}/>
                    </div>
                    <div className="control">
                      <div className="button is-link">
                        Enter
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className='block'/>
          </div>
          
        </AppPageLayout>
      </div>
    );
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default TEACapexResultsByUnitPage;
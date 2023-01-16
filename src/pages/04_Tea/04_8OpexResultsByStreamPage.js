import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import classNames from "classnames";

import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";
import { biAssumptionRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { teaOpexCostRedux, teaOpexUnitRedux } from "../../redux/features/tea/TEAOpexSlice";

import { captalizeFirst, formatDigit, formatHomeTableDataForExport, formatNumberToCurrencyString } from "../../utils/appUtils";
import { TEAOpexCostSample } from "../../utils/testData";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";
import TableRow from "../../components/table/TableRow";

const initRowObj =   {
  rowId: null,
  rowHeader: null,
  columns: [
    {
      colId: "00",
      colType: "display,currency",
      colValue: ""
    },
    {
      colId: "01",
      colType: "display",
      colValue: "₩/hr"
    }
  ]
}

function TEAOpexResultsByStreamPage() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [selectedMode, setSelectedMode] = useState("Feed")
  const [tableData, setTableData] = useState([])
  const [columnHeaders, setColumnHeaders] = useState(["Feed", "Value", ""])

  const AllowedPages = useSelector(state => state.allowedTEAPages);
  const SelectedProjectId = useSelector(selectedProjectIdRedux);
  const TeaOpexCost = useSelector(teaOpexCostRedux);
  const TeaOpexUnit = useSelector(teaOpexUnitRedux);
  const BIAssumptionData = useSelector(biAssumptionRedux);

  useEffect(()=>{
    if(!AllowedPages.opexResultsByStream){
      navigate(-1)
    }
  },[AllowedPages, navigate, SelectedProjectId, reduxDispatch])

  const getTableDataByStream = useCallback((stream = "feed") => {
    setShowLoadingScreen(true)
    const serverData = TeaOpexCost[stream]? TeaOpexCost[stream]: TEAOpexCostSample[stream];
    const ServerOperatingHour = BIAssumptionData? BIAssumptionData.assumption_value.operatinghour : 8760

    let initTableRowData = []
    let sumOfMassFlow = 0

    serverData.forEach((row, rowIndex) => {
      let newRow = cloneDeep(initRowObj);

      newRow["rowId"] = formatDigit(rowIndex);
      newRow["rowHeader"] = row.CompoundName;

      const singleMassFlow = row.massFlow? row.massFlow*row.cost : 0 * row.cost

      sumOfMassFlow = sumOfMassFlow+singleMassFlow
      
      newRow["columns"] = [
        {
          colId: formatDigit(0 + rowIndex),
          colType: "display,currency",
          colValue: singleMassFlow
        },
        {
          colId: formatDigit(1 + rowIndex),
          colType: "display",
          colValue: TeaOpexUnit === "krw"? "₩/hr":"$/hr"
        }
      ]

      initTableRowData.push(newRow)
    })

    let currentLength = initTableRowData.length;
    let opexRow1 = cloneDeep(initRowObj);

    opexRow1["rowId"] = formatDigit(currentLength);
    opexRow1["rowHeader"] = "OPEX";
    
    opexRow1["columns"] = [
      {
        colId: formatDigit(0 + currentLength),
        colType: "display,currency",
        colValue: sumOfMassFlow,
      },
      {
        colId: formatDigit(1 + currentLength),
        colType: "display",
        colValue: TeaOpexUnit === "krw"? "₩/hr":"$/hr"
      }
    ]

    initTableRowData.push(opexRow1)

    let opexRow2 = cloneDeep(initRowObj);

    opexRow2["rowId"] = formatDigit(currentLength+1);
    opexRow2["rowHeader"] = "OPEX";
    
    opexRow2["columns"] = [
      {
        colId: formatDigit(0 + currentLength+1),
        colType: "display,currency",
        colValue:  sumOfMassFlow*ServerOperatingHour,
      },
      {
        colId: formatDigit(1 + currentLength+1),
        colType: "display",
        colValue: TeaOpexUnit === "krw"? "₩/yr":"$/yr"
      }
    ]

    initTableRowData.push(opexRow2)

    setTableData(initTableRowData)
    setShowLoadingScreen(false)
  }, [TeaOpexCost, TeaOpexUnit, BIAssumptionData])

  useEffect(()=>{
    getTableDataByStream()
    setSelectedMode("Feed")
  },[getTableDataByStream])

  const updateSelectedData = (newMode) => {
    setColumnHeaders([newMode, "Value", ""])
    setSelectedMode(newMode)
    getTableDataByStream(newMode.toLowerCase())
  }

  const getTableDataForExport = () => {
    const thisExportData = formatHomeTableDataForExport(tableData)
    return thisExportData
  }

  const MenuOptions = [
    {
      title: "Feed",
      onClick: () => updateSelectedData("Feed")
    },
    {
      title: "Utility",
      onClick: () => updateSelectedData("Utility")
    },
    {
      title: "Waste",
      onClick: () => updateSelectedData("Waste")
    },
  ]

  const ThisTable = () => {
    const renderedTableBody = tableData.map(row => {
      return(
        <tr key={row.rowId}>
          {row.rowHeader !== "OPEX"&& (
            <TableRow
              rowId={row.rowId} 
              rowHeader={captalizeFirst(row.rowHeader)} 
              rowCols={row.columns} 
            />
          )}
        </tr>
      );
    })

    const RenderedOpexRows = () => {
      const obj1 = tableData[tableData.length-2].columns
      const obj2 = tableData[tableData.length-1].columns
      return (
        <tr>
          <th className="has-background-primary-light">
            <div className="is-flex is-align-items-center" style={{height: 60, width: "100%"}}>
              OPEX
              {/* <div style={{height:60, width:1, backgroundColor: "#f0f0f0"}}/> */}
            </div>       
            
          </th>
          <td className="is-bordered">
            <div className="has-text-right" style={{height: 30, width: "100%"}}>
              {formatNumberToCurrencyString(obj1[0].colValue)}
            </div>   
            <div style={{width:"100%", height:1, backgroundColor: "#d4d4d4"}}/>
            <div className="has-text-right" style={{height: 30, width: "100%"}}>
              {formatNumberToCurrencyString(obj2[0].colValue)}
            </div> 
          </td>
          <td>
            <div className="has-text-centered" style={{height: 30, width: "100%"}}>
              {obj1[1].colValue}
            </div>   
            <div style={{width:"100%", height:1, backgroundColor: "#d4d4d4"}}/>
            <div className="has-text-centered" style={{height: 30, width: "100%"}}>
              {obj2[1].colValue}
            </div> 
          </td>
        </tr>
      );
    }

  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white", {"has-text-centered": col === "Unit", "has-text-right": col === "Value"})
      return <th key={idx} className={headRowClass}>{col}</th>;
    })
  
    return(
      <table className="table is-hoverable is-fullwidth">
        <thead className="has-background-primary">
          <tr>{renderedTableColumns}</tr>
        </thead>
        <tbody>
          {renderedTableBody}
          <RenderedOpexRows/>
        </tbody>
      </table>
    );
  }

  const exportFileName = `TEA-OPEX-Results-ByStreams-${selectedMode}-Export (${new Date().toISOString()})`

  
  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<TEASideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          pageTitle={"Stream"}
          onDownload={getTableDataForExport}
          fileName={exportFileName} 
          menuOptions={MenuOptions} 
          selected={selectedMode}/>
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
 
export default TEAOpexResultsByStreamPage;
import { cloneDeep } from "lodash";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { teaCapexInputRedux, update_tea_capex_input_percentage_method_obj, update_tea_capex_results_obj } from "../../redux/features/tea/TEACapexSlice";
import { allowServerComm, httpPaths, getNavURL } from "../../utils/appConstants";
import { captalizeFirst } from "../../utils/appUtils";
import { CapexUnitDesignSaveConfig } from "../../utils/capexUnitDesignTableData";
import { TEACapexResultsSample } from "../../utils/testData";
import { update_allowed_tea_pages } from "../../redux/features/allowedSectionPages/allowedTEAPages";

import AlertModal from "../../components/AlertModal";
import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TEASideMenu from "../../components/sideMenus/TEASideMenu";
import TableRow from "../../components/table/TableRow";

const initTableData = [
  {
    rowId: "0",
    rowHeader: "EC & I (Including Services)",
    columns: [
      {
        colId: "00",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 18
      },
      {
        colId: "01",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "02",
        colType: "display",
        colValue: "of Total Direct Capital Cost"
      }
    ]
  },
  {
    rowId: "1",
    rowHeader: "Piping and Valves",
    columns: [
      {
        colId: "10",
        colType: "display",
        colValue: 40
      },
      {
        colId: "11",
        colType: "display",
        colValue: ""
      },
      {
        colId: "12",
        colType: "display",
        colValue: ""
      }
    ]
  },
  {
    rowId: "2",
    rowHeader: "Piping",
    columns: [
      {
        colId: "20",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 20
      },
      {
        colId: "21",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "22",
        colType: "display",
        colValue: "of Total Direct Capital Cost"
      }
    ]
  },
  {
    rowId: "3",
    rowHeader: "Manual Valves",
    columns: [
      {
        colId: "30",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 15
      },
      {
        colId: "31",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "32",
        colType: "display",
        colValue: "of Total Direct Capital Cost"
      }
    ]
  },
  {
    rowId: "4",
    rowHeader: "Insulation and Painting",
    columns: [
      {
        colId: "40",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 5
      },
      {
        colId: "41",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "42",
        colType: "display",
        colValue: "of Total Direct Capital Cost"
      }
    ]
  },
  {
    rowId: "5",
    rowHeader: "Site Improvement",
    columns: [
      {
        colId: "50",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 18
      },
      {
        colId: "51",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "52",
        colType: "display",
        colValue: "of Total Direct Capital Cost"
      }
    ]
  },
  {
    rowId: "6",
    rowHeader: "Service Facilities (including installation)",
    columns: [
      {
        colId: "60",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 6
      },
      {
        colId: "61",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "62",
        colType: "display",
        colValue: "of Total Direct Capital Cost"
      }
    ]
  },
  {
    rowId: "7",
    rowHeader: "Steelwork",
    columns: [
      {
        colId: "70",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 5
      },
      {
        colId: "71",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "72",
        colType: "display",
        colValue: "of Total Direct Capital Cost"
      }
    ]
  },
  {
    rowId: "8",
    rowHeader: "General Facilities Capital",
    columns: [
      {
        colId: "80",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 10
      },
      {
        colId: "81",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "82",
        colType: "display",
        colValue: "of Process Facility Cost"
      }
    ]
  },
  {
    rowId: "9",
    rowHeader: "Engineering & Home Office Fees",
    columns: [
      {
        colId: "90",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 7
      },
      {
        colId: "91",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "92",
        colType: "display",
        colValue: "of Process Facility Cost"
      }
    ]
  },
  {
    rowId: "10",
    rowHeader: "Project Contigency Cost",
    columns: [
      {
        colId: "100",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 15
      },
      {
        colId: "101",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "102",
        colType: "display",
        colValue: "of Process Facility Cost"
      }
    ]
  },
  {
    rowId: "11",
    rowHeader: "Process Contigency Cost",
    columns: [
      {
        colId: "110",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 10
      },
      {
        colId: "111",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "112",
        colType: "display",
        colValue: "of Process Facility Cost"
      }
    ]
  },
  {
    rowId: "12",
    rowHeader: "Royalty Fees",
    columns: [
      {
        colId: "120",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 2
      },
      {
        colId: "121",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "122",
        colType: "display",
        colValue: "of Process Facility Cost"
      }
    ]
  },
]

function TEACapexPercentageMethodPage() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const columnHeaders = ["Capex Input", "Percentage Method", "Percentage Method","Percentage Method"]

  const [tableData, setTableData] = useState(initTableData)
  const [exportData, setExportData] = useState([])

  const [showLoadingScreen, setShowLoadingScreen] = useState(false)

  const [enableRunButton, setEnableRunButton] = useState(false)

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)

  const TeaCapexInput = useSelector(teaCapexInputRedux)

  const alertModalOpen = (title, content) => {
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  const AllowedPages = useSelector(state => state.allowedTEAPages);

  useEffect(()=>{
    if(!AllowedPages.capexPercentageMethod){
      navigate(-1);
    }
  },[AllowedPages, navigate])

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
    
    if(rowId === "2" || rowId === "3" || rowId === "4"){
      let sumofElements = tableCopy[2].columns[0].colValue + tableCopy[3].columns[0].colValue + tableCopy[4].columns[0].colValue;

      tableCopy[1].columns[0] = {
        ...tableCopy[1].columns[0],
        colValue: sumofElements
      }
    }

    //DEBUG_LOG:
    let tableDataForExport = [];

    tableCopy.forEach(row => {
      let newRow = cloneDeep(row)

      delete newRow.rowId;
      let columnArr = []
      newRow.columns.forEach(column => {
        columnArr.push(column.colValue)
      })
      
      newRow.columns = columnArr.join(",")

      tableDataForExport.push(newRow)
    })

    setExportData(tableDataForExport);
    // console.log(newVal);
    //update table data in the state
    setTableData(tableCopy)
  }

  const ThisTable = () => {
    const renderedTableBody = tableData.map(row => {
      return(
        <tr key={row.rowId}>
          <TableRow
            rowId={row.rowId} 
            rowHeader={captalizeFirst(row.rowHeader)} 
            rowCols={row.columns} 
            onColEdit={onCellValueEdit} 
            addTabs={(row.rowId === "2" || row.rowId === "3" || row.rowId === "4")}
          />
        </tr>
      );
    })
  
    return(
      <>
        <div className="is-flex has-background-primary has-text-white" style={{width:"100%", height:35, alignItems: "center"}}>
          <div className="has-text-centered" style={{width:"39%"}}>{columnHeaders[0]}</div>
          <div style={{width:1, height:"100%", backgroundColor: "white"}}/>
          <div className="has-text-centered" style={{width:"60%"}}>{columnHeaders[1]}</div>
        </div>
        <table className="table is-hoverable is-fullwidth">
          <tbody>
            {renderedTableBody}
          </tbody>
        </table>
      </>
    );
  }

  const checkForValueValidity = (rowHeader, value) => {
    if(value == null || value === ""){
      alertModalOpen("Value is required!", `${rowHeader}`)
      return;
    }
    return value
  }

  const handlePercentageMethodSave = () => {
    let newObj = cloneDeep(CapexUnitDesignSaveConfig[2].percentage_method)

    newObj.ec_i =                       checkForValueValidity(tableData[0].rowHeader,  tableData[0].columns[0].colValue);
    newObj.piping =                     checkForValueValidity(tableData[2].rowHeader,  tableData[2].columns[0].colValue);
    newObj.manual_valves =              checkForValueValidity(tableData[3].rowHeader,  tableData[3].columns[0].colValue);
    newObj.insulation_painting =        checkForValueValidity(tableData[4].rowHeader,  tableData[4].columns[0].colValue);
    newObj.site_improvement =           checkForValueValidity(tableData[5].rowHeader,  tableData[5].columns[0].colValue);
    newObj.service_facilities =         checkForValueValidity(tableData[6].rowHeader,  tableData[6].columns[0].colValue);
    newObj.steelwork =                  checkForValueValidity(tableData[7].rowHeader,  tableData[7].columns[0].colValue);
    newObj.generalfacilities_capital =  checkForValueValidity(tableData[8].rowHeader,  tableData[8].columns[0].colValue);
    newObj.engineeringhomeoffice_fees = checkForValueValidity(tableData[9].rowHeader,  tableData[9].columns[0].colValue);
    newObj.projectcontingency_cost =    checkForValueValidity(tableData[10].rowHeader, tableData[10].columns[0].colValue);
    newObj.processcontingency_cost =    checkForValueValidity(tableData[11].rowHeader, tableData[11].columns[0].colValue);
    newObj.royalty_fees =               checkForValueValidity(tableData[12].rowHeader, tableData[12].columns[0].colValue);

    alertModalOpen("Values saved", "Press run button to continue")
    reduxDispatch(update_tea_capex_input_percentage_method_obj(newObj))
    setEnableRunButton(true)
  }

  const handlePercentageMethodRun = () => {
    const nextUrl = getNavURL("/tea/capex-results-by-unit");
    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.post(httpPaths["capexCalculate"], TeaCapexInput)
      .then((response)=>{
        reduxDispatch(update_tea_capex_results_obj(response.data));
        setShowLoadingScreen(false)
        reduxDispatch(update_allowed_tea_pages({ capexResultsByUnit: true, capexResultsSummary: true, opexInputFeed: true }));
        navigate(nextUrl);
      }).catch(e => {
        alert("Error on start: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      reduxDispatch(update_tea_capex_results_obj(TEACapexResultsSample));
      reduxDispatch(update_allowed_tea_pages({ capexResultsByUnit: true, capexResultsSummary: true, opexInputFeed: true }));
      setShowLoadingScreen(false)
      navigate(nextUrl)
    }
  }

  const exportFileName = `TEA-CAPEX-Input-Percentage-Method-Export (${new Date().toISOString()})`

  const alertModal = (
    <AlertModal 
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
          tableData={exportData} 
          fileName={exportFileName} 
          onSave={handlePercentageMethodSave} 
          onRun={enableRunButton&& handlePercentageMethodRun}
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
 
export default TEACapexPercentageMethodPage;
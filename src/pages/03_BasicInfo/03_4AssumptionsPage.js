import { useEffect, useState } from "react";

import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import classNames from "classnames";

import { lastestCurrencyRateRedux, selectedProjectIdRedux, update_allowed_tabs, update_is_next_tab_allowed } from "../../redux/features/allowedTabsSlice";
import { update_bi_assumption_object } from "../../redux/features/basicInfo/basicInfoSlice";

import { httpPaths, allowServerComm } from "../../utils/appConstants";
import { captalizeFirst } from "../../utils/appUtils";

import AppPageLayout from "../../components/AppPageLayout";
import BasicInfoSideMenu from "../../components/sideMenus/BasicInfoSideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";
import AlertModal from "../../components/AlertModal";

const initTableData = [
  {
    rowId: "0",
    rowHeader: "Base Year",
    columns: [
      {
        colId: "00",
        colType: "input,number",
        colLimit: [0, new Date().getFullYear()],
        colValue: 2017
      },
      {
        colId: "01",
        colType: "display",
        colValue: "yr"
      },
      {
        colId: "02",
        colType: "input",
        colValue: "Plant 설비투자 시작연도"
      }
    ]
  },
  {
    rowId: "1",
    rowHeader: "Project Period",
    columns: [
      {
        colId: "10",
        colType: "input,number",
        colLimit: [0, null],
        colValue: 2
      },
      {
        colId: "11",
        colType: "display",
        colValue: "yr"
      },
      {
        colId: "12",
        colType: "input",
        colValue: "Plant 가동 전 총 투자기간"
      }
    ]
  },
  {
    rowId: "2",
    rowHeader: "Operating Hour",
    columns: [
      {
        colId: "20",
        colType: "input,number",
        colLimit: [0, 8760],
        colValue: 8000
      },
      {
        colId: "21",
        colType: "display",
        colValue: "hr"
      },
      {
        colId: "22",
        colType: "input",
        colValue: "1년 기준 Plant 가동시간(최대 8,760시간)"
      }
    ]
  },
  {
    rowId: "3",
    rowHeader: "Exchange Rate",
    columns: [
      {
        colId: "30",
        colType: "input,number",
        colLimit: [0, null],
        colValue: 0
      },
      {
        colId: "31",
        colType: "display",
        colValue: "₩/$"
      },
      {
        colId: "32",
        colType: "input",
        colValue: "KRW/USD 환율"
      }
    ]
  },
  {
    rowId: "4",
    rowHeader: "Plant Life",
    columns: [
      {
        colId: "40",
        colType: "input,number",
        colLimit: [0, null],
        colValue: 30
      },
      {
        colId: "41",
        colType: "display",
        colValue: "yr"
      },
      {
        colId: "42",
        colType: "input",
        colValue: "총 Plant 가동기간"
      }
    ]
  },
  {
    rowId: "5",
    rowHeader: "Deprication Period",
    columns: [
      {
        colId: "50",
        colType: "input,number",
        colLimit: [0, null],
        colValue: 20
      },
      {
        colId: "51",
        colType: "display",
        colValue: "yr"
      },
      {
        colId: "52",
        colType: "input",
        colValue: "총 Plant 감가상각기간"
      }
    ]
  },
  {
    rowId: "6",
    rowHeader: "차입율",
    columns: [
      {
        colId: "60",
        colType: "input,number",
        colLimit: [0, null],
        colValue: 0
      },
      {
        colId: "61",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "62",
        colType: "input",
        colValue: "Total Capital Cost에 투입된 자본대비 차입금의 비율"
      }
    ]
  },
  {
    rowId: "7",
    rowHeader: "할인율 (Discount Rate)",
    columns: [
      {
        colId: "70",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 8
      },
      {
        colId: "71",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "72",
        colType: "input",
        colValue: "미래현금흐름 계산 시 적용되는 할인율"
      }
    ]
  },
  {
    rowId: "8",
    rowHeader: "Inflation Rate",
    columns: [
      {
        colId: "80",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 4
      },
      {
        colId: "81",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "82",
        colType: "input",
        colValue: "Plant 운영 기간 평균 물가상승률(매출 및 OPEX 계산시 반영)"
      }
    ]
  },
  {
    rowId: "9",
    rowHeader: "판관비율",
    columns: [
      {
        colId: "90",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 5
      },
      {
        colId: "91",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "92",
        colType: "input",
        colValue: "매출액 대비 평균 판매비와 관리비의 비율"
      }
    ]
  },
  {
    rowId: "10",
    rowHeader: "이자율",
    columns: [
      {
        colId: "100",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 4
      },
      {
        colId: "101",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "102",
        colType: "input",
        colValue: "차입금에 대한 연평균 이자율"
      }
    ]
  },
  {
    rowId: "11",
    rowHeader: "제세율 (법+주)",
    columns: [
      {
        colId: "110",
        colType: "input,number",
        colLimit: [0, 100],
        colValue: 22
      },
      {
        colId: "111",
        colType: "display",
        colValue: "%"
      },
      {
        colId: "112",
        colType: "input",
        colValue: "평균 법인세율"
      }
    ]
  },
  {
    rowId: "12",
    rowHeader: "CEI in Current",
    columns: [
      {
        colId: "120",
        colType: "input,number",
        colLimit: [0, null],
        colValue: 567.5
      },
      {
        colId: "121",
        colType: "display",
        colValue: " "
      },
      {
        colId: "122",
        colType: "input",
        colValue: "Equipment에 대한 Cost Index"
      }
    ]
  },
]

function BIAssumptionPage() {
  const navigate = useNavigate()
  const reduxDispatch = useDispatch();
  const columnHeaders = ["Basic Information", "Value", "Units", "Description"]

  const [tableData, setTableData] = useState(initTableData)
  const [exportData, setExportData] = useState([])

  const [showLoadingScreen, setShowLoadingScreen] = useState(false)

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)

  const SelectedProjectId = useSelector(selectedProjectIdRedux);
  const BIStreamClass = useSelector(state => state.basicInfoStreamClass);
  const LastestCurrencyRate = useSelector(lastestCurrencyRateRedux);

  const alertModalOpen = (title, content) => {
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  const AllowedPages = useSelector(state => state.allowedBasicInfoPages);

  useEffect(()=>{
    let newTableData = cloneDeep(initTableData)
    newTableData[3].columns[0].colValue = LastestCurrencyRate;

    setTableData(newTableData)
  },[LastestCurrencyRate])

  useEffect(()=>{
    if(!AllowedPages.assumption){
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
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white", {"has-text-centered": col !== "Basic Information"})
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

  const thisRegex = /[^a-zA-Z0-9]/ugi

  const handleAssumptionSave = () => {
    setShowLoadingScreen(true);
    let formattedAssumptionData = {
      project_id: SelectedProjectId,
      heater: BIStreamClass.heater,
      assumption_value: {
        baseyear:           tableData[0].columns[0].colValue,
        projectperiod:      tableData[1].columns[0].colValue,
        operatinghour:      tableData[2].columns[0].colValue,
        exchangerate:       tableData[3].columns[0].colValue,
        plantlife:          tableData[4].columns[0].colValue,
        amortizationperiod: tableData[5].columns[0].colValue,
        borrowingrate:      tableData[6].columns[0].colValue,
        costofcapital:      tableData[7].columns[0].colValue,
        inflationrate:      tableData[8].columns[0].colValue,
        costincomeratio:    tableData[9].columns[0].colValue,
        interestrate:       tableData[10].columns[0].colValue,            
        taxrate:            tableData[11].columns[0].colValue,
        cepci:              tableData[12].columns[0].colValue,
      }, 
      assumption_description: {
        baseyear_note:           tableData[0].columns[2].colValue.replace(thisRegex, ""),
        projectperiod_note:      tableData[1].columns[2].colValue.replace(thisRegex, ""),
        operatinghour_note:      tableData[2].columns[2].colValue.replace(thisRegex, ""),
        exchangerate_note:       tableData[3].columns[2].colValue.replace(thisRegex, ""),
        plantlife_note:          tableData[4].columns[2].colValue.replace(thisRegex, ""),
        amortizationperiod_note: tableData[5].columns[2].colValue.replace(thisRegex, ""),
        borrowingrate_note:      tableData[6].columns[2].colValue.replace(thisRegex, ""),
        costofcapita_note:       tableData[7].columns[2].colValue.replace(thisRegex, ""),
        inflationrate_note:      tableData[8].columns[2].colValue.replace(thisRegex, ""),
        interestrate_note:       tableData[9].columns[2].colValue.replace(thisRegex, ""),
        costincomeratio_note:    tableData[10].columns[2].colValue.replace(thisRegex, ""),
        taxrate_note:            tableData[11].columns[2].colValue.replace(thisRegex, ""),
        cepci_note:              tableData[12].columns[2].colValue.replace(thisRegex, ""),
      }
    }

    if(allowServerComm){
      axios.post(httpPaths["basicAssumption"], formattedAssumptionData)
      .then(()=>{
        setShowLoadingScreen(false)
        reduxDispatch(update_bi_assumption_object(formattedAssumptionData))
        reduxDispatch(update_allowed_tabs({tea: true}))
        reduxDispatch(update_is_next_tab_allowed(true))
        alertModalOpen("Changes saved!","Press next tab to continue")
      }).catch(e => {
        alert("Error on start: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      setShowLoadingScreen(false)
      reduxDispatch(update_bi_assumption_object(formattedAssumptionData))
      reduxDispatch(update_allowed_tabs({tea: true}))
      reduxDispatch(update_is_next_tab_allowed(true))
      alertModalOpen("Changes saved!","Press next tab to continue")
    }
  }

  const exportFileName = `BasicInfo-Assumption-Export (${new Date().toISOString()})`

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
        <AppPageLayout sideMenu={<BasicInfoSideMenu/>}>
          <EditorTopMenu downloadType="table" tableData={exportData} fileName={exportFileName} onSave={handleAssumptionSave}/>
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
 
export default BIAssumptionPage;
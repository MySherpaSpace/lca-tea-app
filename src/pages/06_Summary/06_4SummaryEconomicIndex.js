import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloneDeep, isEmpty, round } from "lodash";
import axios from "axios";

import classNames from "classnames";

import { formatHomeTableDataForExport } from "../../utils/appUtils";
import { allowServerComm, httpPaths } from "../../utils/appConstants";
import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";
import { SummaryEconomicIndexSample } from "../../utils/testData";
import { update_summary_economic_index_data } from "../../redux/features/summary/summaryDataSlice";
import { update_allowed_summary_pages } from "../../redux/features/allowedSectionPages/allowedSummaryPages";

import AppPageLayout from "../../components/AppPageLayout";
import EditorTopMenu from "../../components/EditorTopMenu";
import TableRow from "../../components/table/TableRow";
import SummarySideMenu from "../../components/sideMenus/SummarySideMenu";

const initTableData = [
  {
    rowId: "00",
    rowHeader: "Present Value (Cash in flow)",
    columns: [
      {
        colId: "00",
        colType: "display",
        colValue: 0
      },
      {
        colId: "01",
        colType: "display",
        colValue: "₩"
      }
    ]
  },
  {
    rowId: "01",
    rowHeader: "Present Value (Cash out flow)",
    columns: [
      {
        colId: "10",
        colType: "display",
        colValue: 0
      },
      {
        colId: "11",
        colType: "display",
        colValue: "₩"
      }
    ]
  },
  {
    rowId: "02",
    rowHeader: "Net Present Value (NPV)",
    columns: [
      {
        colId: "20",
        colType: "display",
        colValue: 0
      },
      {
        colId: "21",
        colType: "display",
        colValue: "₩"
      }
    ]
  },
  {
    rowId: "03",
    rowHeader: "Internal Rate of Return (IRR)",
    columns: [
      {
        colId: "30",
        colType: "display",
        colValue: 0
      },
      {
        colId: "31",
        colType: "display",
        colValue: "%"
      }
    ]
  },
  {
    rowId: "04",
    rowHeader: "Benefit/Cost",
    columns: [
      {
        colId: "40",
        colType: "display",
        colValue: 0
      },
      {
        colId: "41",
        colType: "display",
        colValue: "%"
      }
    ]
  },
  {
    rowId: "05",
    rowHeader: "Payback Period",
    columns: [
      {
        colId: "50",
        colType: "display",
        colValue: 0
      },
      {
        colId: "51",
        colType: "display",
        colValue: "yr"
      }
    ]
  },
  {
    rowId: "06",
    rowHeader: "Investment Proposal",
    columns: [
      {
        colId: "60",
        colType: "display",
        colValue: ''
      },
      {
        colId: "61",
        colType: "display",
        colValue: " "
      }
    ]
  }
]

function SummaryEconomicIndex() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const ref = useRef(null);

  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  const AllowedPages = useSelector(state => state.allowedSummaryPages);
  const SelectedProjectId = useSelector(selectedProjectIdRedux);

  const [tableData, setTableData] = useState([]);

  const columnHeaders = ["Economic Index", "Value", "Unit"]

  useEffect(()=>{
    if(!AllowedPages.summaryTEAEconomicIndex){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  const server = (serverData) => {        
    reduxDispatch(update_summary_economic_index_data(serverData))
    reduxDispatch(update_allowed_summary_pages({summaryLCASummary: true}))

    let thisTableData = cloneDeep(initTableData)

    // console.log("@@@@@@@ ",serverData)
    thisTableData[0].columns[0].colValue = round(serverData.cash_inflow, 2);
    thisTableData[1].columns[0].colValue = round(serverData.cash_outflow, 2);
    thisTableData[2].columns[0].colValue = round(serverData.total_npv, 2);
    thisTableData[3].columns[0].colValue = round(serverData.irr, 2);
    thisTableData[4].columns[0].colValue = round(serverData.BenefitCost_ratio, 2);
    thisTableData[5].columns[0].colValue = round(serverData.payback, 2);
    thisTableData[6].columns[0].colValue = serverData.invested_proposal;

    setTableData(thisTableData)
    setShowLoadingScreen(false)
  }

  useEffect(()=>{
    setShowLoadingScreen(true)

    const initServerVal = { cash_inflow : 0, cash_outflow: 0, total_npv:  0, irr: 0, BenefitCost_ratio: 0, payback: 0, invest_proposal: "" }

    let serverData = SummaryEconomicIndexSample;
    if(allowServerComm){
      axios.post(httpPaths["economicIndex"], {project_id: SelectedProjectId})
      .then(response => {
        if(!isEmpty(response.data)){
          serverData = response.data;
          server(serverData)
        }else{
          alert("No data available")
          serverData = initServerVal
          server(serverData)
        }
      }).catch(e => {
        alert("Error while fetching cash flow data "+e)
        serverData = initServerVal
        server(serverData)
      })
    }


  },[SelectedProjectId, reduxDispatch])

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
          />
        </tr>
      );
    })
  
    const renderedTableColumns = columnHeaders.map((col, idx) => {
      const headRowClass = classNames("has-text-white is-vcentered", { "has-text-centered": col !=="Economic Index" })
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
  
  const exportFileName = `Summary-TEA-Economic-Index-Export (${new Date().toISOString()})`

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<SummarySideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          onDownload={getTableDataForExport} 
          fileName={exportFileName}  
          />
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
 
export default SummaryEconomicIndex;
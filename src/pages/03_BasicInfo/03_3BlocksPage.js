import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from 'lodash';
import { useNavigate } from "react-router-dom";

import { separateCamelCase } from "../../utils/appUtils";
import { httpPaths, allowServerComm } from "../../utils/appConstants";

import { biBlockInfoRedux, update_bi_blockInfo_object } from "../../redux/features/basicInfo/basicInfoSlice";
import { update_basic_info_heater_info } from "../../redux/features/basicInfo/basicInfoStreamClassSlice";
import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";
import { BIBlockInfoSample } from "../../utils/testData";

import AppPageLayout from "../../components/AppPageLayout";
import BasicInfoSideMenu from "../../components/sideMenus/BasicInfoSideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";
import SelectDropdown from "../../components/SelectDropdown";
import AlertModal from "../../components/AlertModal";

import { Cells, RowLabel, TallRow } from "../../components/basicInfoTable/BIStreamsTableComps";

const isItMultiRow = (value) => {
  if(Array.isArray(value[0])){
    return true
  }
  return false
}

const isItInteresting = (rowName, value) => {
  let finalRes = true
  switch (rowName) {
    case "_id":
      finalRes = false;
      break;
    case "project_id":
      finalRes = false;
      break;
    case "block_name":
      finalRes = false;
      break;
    case "block_type":
      finalRes = false;
      break;
    default:
      finalRes = true;
      break;
  }

  if(isItMultiRow(value)){
    finalRes = false;
  }

  return finalRes;
}

const parseLabelName = (name) => {
  try {
    if(name === "NumberofStages"){
      return "Number Of Stages"
    }

    let separateName = separateCamelCase(name)
    let zeroLayer = separateName.replace(/_/g, " ")
    let firstlayer = zeroLayer.replace(" List","")
    let secondLayer = firstlayer.replace("Frac", "Fraction")
    let thirdLayer = secondLayer.replace("Fractiontion", "Fraction")
    return thirdLayer

  } catch (error) {
    // console.log(error)
    return name
  }
}

function BIBlocksPage() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const [selectedDisplay, setSelectedDisplay] = useState("Column")
  const [tableRows, setTableRows] = useState([])
  const [tableColHeaders, setTableColHeaders] = useState([])
  const [exportData, setExportData] = useState([])
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [heaterTypesList, setHeaterTypesList] = useState([])

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)

  const alertModalOpen = (title, content) => {
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  const BIBlocksInfo = useSelector(biBlockInfoRedux);
  const SelectedProjectId = useSelector(selectedProjectIdRedux);

  const updateBIBlockInfoObj = useCallback((newObj) => reduxDispatch(update_bi_blockInfo_object(newObj)), [reduxDispatch]);

  const AllowedPages = useSelector(state => state.allowedBasicInfoPages);

  useEffect(()=>{
    if(AllowedPages.blockInfo){
      setShowLoadingScreen(true)
      setSelectedDisplay("Column")
      if(allowServerComm){        
        axios.post(httpPaths["blockInfo"], { project_id: SelectedProjectId })
        .then((response)=>{
          let serverResp = response.data; //response.data[0] ALAM CHange
          // console.log('@@@@@ blockInfo ',response.data)
          const [theseRows, theseCols] = getTableBlockInfoTableRows(serverResp["COLUMN"]);

          const heaterDataFromServer = serverResp["HEATER"];
          let newHeaterTypeList = []
          heaterDataFromServer.forEach(unit => {
            newHeaterTypeList.push({
              heater_type: "Heater",
              _id: unit._id
            })
          })
    
          setHeaterTypesList(newHeaterTypeList);
          reduxDispatch(update_basic_info_heater_info(newHeaterTypeList))

          updateBIBlockInfoObj(serverResp);
          setExportData(theseRows);
          setTableRows(theseRows);
          setTableColHeaders(["Block Name", ...theseCols])
          setShowLoadingScreen(false)
        }).catch(e => {
          alert("Error on start: "+e)
          setShowLoadingScreen(false)
          navigate(-1)
        })
      }else{
        let serverResp = BIBlockInfoSample;
        const [theseRows, theseCols] = getTableBlockInfoTableRows(serverResp["COLUMN"]);

        const heaterDataFromServer = serverResp["HEATER"];
        let newHeaterTypeList = []
        heaterDataFromServer.forEach(unit => {
          newHeaterTypeList.push({
            heater_type: "Heater",
            _id: unit._id
          })
        })
  
        setHeaterTypesList(newHeaterTypeList);
        reduxDispatch(update_basic_info_heater_info(newHeaterTypeList))
        updateBIBlockInfoObj(serverResp);
        setExportData(theseRows);
        setTableRows(theseRows);
        setTableColHeaders(["Block Name", ...theseCols])
        setShowLoadingScreen(false)
      }
    }else{
      navigate(-1)
    }
  },[SelectedProjectId, updateBIBlockInfoObj, navigate, AllowedPages, reduxDispatch])

  const getTableBlockInfoTableRows = (data = []) => {
    if(data.length>0){
      let thisTableRows = [];
  
      let entries = []
      let colHeaders = []
  
      data.forEach((obj) => {
        colHeaders.push(obj.block_name);
  
        let theseEntries = Object.entries(obj)
        
        theseEntries.forEach(entry => [
          entries.push(entry)
        ])
      })

      let objKeys = Object.keys(data[0]);

      let allRows = []
  
      objKeys.forEach(key => {
        let rowArr = entries.filter(entry => entry[0] === key);
        let valueArr = []
  
        rowArr.forEach(row => valueArr.push(row[1]))
  
        let newRow = {
          name: rowArr[0][0],
          value: valueArr
        }
        allRows.push(newRow)
      })

      
      let interestRows = allRows.filter(entry => isItInteresting(entry.name, entry.value));
      let multiRows = allRows.filter(entry => isItMultiRow(entry.value));

      let newMultiRows = []
      multiRows.forEach((multiRow) => {
        const {value, name} = multiRow;
  
        let newValueArray = []
  
        value.forEach((subValue) => {
          let subArray = []
          subValue.forEach((item, itemIdx)=>{
            if(itemIdx>0){ 
              subArray.push([item,subValue[0]])
            }
          })
  
          newValueArray.push(subArray)
        })

        newMultiRows.push({name, value: newValueArray})
      })

      interestRows.forEach((row, rowIndex) => {
        thisTableRows.push({...row, rowId: uuidv4(), rowIndex})
      })

      newMultiRows.forEach((row, rowIndex )=> {
        thisTableRows.push({...row, rowId: uuidv4(), rowIndex: (interestRows.length-1)+rowIndex})
      })
  
      let sortedTableRows = cloneDeep(thisTableRows)
  
      sortedTableRows.sort((a, b) => (a.rowIndex > b.rowIndex) ? 1 : -1)
  
      return [sortedTableRows, colHeaders]
    }

    return []
  }

  const updateSelectedData = (newData = "Columns") => {
    setSelectedDisplay(newData)

    const [theseRows, theseCols] = getTableBlockInfoTableRows(BIBlocksInfo[newData.toUpperCase()]);

    setExportData(theseRows);
    setTableRows(theseRows);
    setTableColHeaders(["Block Name", ...theseCols])
  }

  const handleSaveHeaterInformation = () => {
    reduxDispatch(update_basic_info_heater_info(heaterTypesList))
    alertModalOpen("Heater information saved!")
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

  const StreamClassDropdowns = () => {
    const renderedDropdowns = heaterTypesList.map(thisClass => {
      const handleDropChange = (newSel) => {
        let foundIndex = heaterTypesList.findIndex(obj => obj._id === thisClass._id)
        let newList = cloneDeep(heaterTypesList)

        newList[foundIndex].heater_type = newSel

        // console.log(newList);
        setHeaterTypesList(newList)
      }

      return <td key={thisClass._id} className='has-text-centered'><SelectDropdown options={["Heater", "Heat Exchanger"]} value={thisClass.heater_type} onChange={handleDropChange}/></td>
    })

    return(
      <tr><th>Heater Type</th>{renderedDropdowns}</tr>
    )
  }

  const TableRows = ({array}) => {
    const interestRows = array.filter(row => isItInteresting(row.name, row.value))
    const multiRows = array.filter(row => isItMultiRow(row.value))

    const renderedInterestRows = interestRows.map((row, rowIdx) => {
      const {name, value, rowId} = row;
  
      const columns = value.map((col, colIdx) => {
        return <Cells key={rowId+colIdx} col={col}/>
      })
  
      return(
        <tr key={rowId}>
          <RowLabel rowName={parseLabelName(name)} lastRowName={rowIdx !== 0? tableRows[rowIdx-1].name:""}/>
          {columns}
        </tr>
      );
    })

    const renderedTallRows = multiRows.map((row, rowIdx) => {
      return <TallRow rowTitle={parseLabelName(row.name)} columns={row.value} numOfRows={row.value[0].length} key={rowIdx}/>
    })

    return renderedInterestRows.concat(renderedTallRows)
  }

  const renderedTableColumns = tableColHeaders.map((col, idx) => {
    return <th key={idx} className={idx > 0? "has-text-white has-text-centered":"has-text-white"}>{col}</th>;
  })

  const ThisTable = () => {
    return(
      <table className="table is-hoverable is-narrow is-bordered">
        <thead className="has-background-primary">
          <tr>{renderedTableColumns}</tr>
        </thead>
        <tbody>
          {selectedDisplay === "Heater" && (
            <StreamClassDropdowns/>
          )}
          <TableRows array={tableRows}/>
        </tbody>
      </table>
    )
  }

  const alertModal = (
    <AlertModal 
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );

  const exportFileName = `AspenInfo-Blocks-Block-Info-Export (${new Date().toISOString()})`

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<BasicInfoSideMenu/>}>
          <EditorTopMenu 
          onSave={selectedDisplay === "Heater" && handleSaveHeaterInformation}
          menuOptions={MenuOptions} 
          selected={selectedDisplay} 
          downloadType="table" 
          tableData={exportData} 
          fileName={exportFileName}
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
 
export default BIBlocksPage;
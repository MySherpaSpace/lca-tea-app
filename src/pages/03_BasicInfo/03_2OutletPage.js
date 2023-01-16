import { useEffect, useState } from "react";
import { cloneDeep } from 'lodash';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { httpPaths, allowServerComm, getNavURL } from "../../utils/appConstants";
import { separateCamelCase } from "../../utils/appUtils";
import { BIInOuletSample } from "../../utils/testData";

import { biOutletRedux } from "../../redux/features/basicInfo/basicInfoSlice";
import { update_allowed_basic_info_pages } from "../../redux/features/allowedSectionPages/allowedBasicInfoPages";
import { update_basic_info_outlet_stream_class } from "../../redux/features/basicInfo/basicInfoStreamClassSlice";

import AppPageLayout from "../../components/AppPageLayout";
import BasicInfoSideMenu from "../../components/sideMenus/BasicInfoSideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";
import SelectDropdown from '../../components/SelectDropdown';

import { Cells, TallRow, RowLabel,  getBIOutInletRows } from '../../components/basicInfoTable/BIStreamsTableComps';

const parseLabelName = (name) => {
  try {
    let separateName = separateCamelCase(name)
    let firstlayer = separateName.replace(" List","")
    let secondLayer = firstlayer.replace("Frac", "Fraction")
    return secondLayer.replace("Fractiontion", "Fraction")
  } catch (error) {
    console.log(error)
    return name
  }
}

function BIOutletPage() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const [tableRows, setTableRows] = useState([])
  const [tableColHeaders, setTableColHeaders] = useState([])
  const [exportData, setExportData] = useState([])
  const [streamClassList, setStreamClassList] = useState([])
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)

  const BIOutletData = useSelector(biOutletRedux);
  const BIStreamClass = useSelector(state => state.basicInfoStreamClass);

  useEffect(()=>{
    let serverData = allowServerComm? BIOutletData : BIInOuletSample[1]["u_outlet_strm"]

    const [theseRows, theseCols] =  getBIOutInletRows(serverData);
    let streamList = []

    serverData.forEach(column => {
      streamList.push({
        stream_class: null,
        _id: column._id
      })
    })

    setStreamClassList(streamList)

    let newExportData = []

    theseRows.forEach(row => {
      let newVal = row.value.join(", ")
      let newRow = cloneDeep(row)
      delete newRow.rowId
      delete newRow.rowIndex
      newExportData.push({...newRow, value: newVal})
    })

    setExportData(newExportData)

    setTableRows(theseRows)
    setTableColHeaders(["Stream Name", ...theseCols])

  },[BIOutletData])

  const StreamClassDropdowns = () => {

    const renderedDropdowns = streamClassList.map(thisClass => {
      const handleDropChange = (newSel) => {
        let foundIndex = streamClassList.findIndex(obj => obj._id === thisClass._id)
        let newList = cloneDeep(streamClassList)

        newList[foundIndex].stream_class = newSel

        // console.log(newList);
        setStreamClassList(newList)
      }

      return <td key={thisClass._id} className='has-text-centered'><SelectDropdown options={[null,"product", "waste"]} value={thisClass.stream_class} onChange={handleDropChange}/></td>
    })

    return(
      <tr><th>Stream Class</th>{renderedDropdowns}</tr>
    )
  }

  const TableRows = ({array}) => {
    const multiRows = array.filter(row => (row.name === "LiquidConcentrationList" || row.name === "MassFlowList" || row.name === "MassFracList" || row.name === "MoleFlowList" || row.name === "MoleFracList" || row.name === "VaporConcentrationList"))
    const normalRows = array.filter(row => !(row.name === "LiquidConcentrationList" || row.name === "MassFlowList" || row.name === "MassFracList" || row.name === "MoleFlowList" || row.name === "MoleFracList" || row.name === "VaporConcentrationList" || row.name === "LiquidFraction" || row.name === "SolidFraction" || row.name === "VaporFraction"))
    const lastRows = array.filter(row => row.name === "LiquidFraction" || row.name === "SolidFraction" || row.name === "VaporFraction" )

    const renderedNormalRows = normalRows.map((row, rowIdx) => {
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

    const renderedLastRows = lastRows.map((row, rowIdx) => {
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

    return renderedNormalRows.concat(renderedTallRows, renderedLastRows)
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
          {streamClassList.length>0 && <StreamClassDropdowns/>}
          <TableRows array={tableRows}/>
        </tbody>
      </table>
    )
  }

  const exportFileName = `AspenInfo-Streams-Outlet-Export (${new Date().toISOString()})`

  const onStreamClassListSave = () => {
    const nextUrl = getNavURL("/basic-info/aspen-info-blocks-block-info");
    const msg = {
      u_inlet_strm: BIStreamClass.u_inlet_strm,
      u_outlet_strm: streamClassList
    }

    reduxDispatch(update_basic_info_outlet_stream_class(streamClassList));
    
    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.put(httpPaths["streamClass"], msg)
      .then(()=>{
        setShowLoadingScreen(false)
        reduxDispatch(update_allowed_basic_info_pages({blockInfo: true, assumption: true}))
        navigate(nextUrl)
      }).catch(e => {
        alert("Error on start: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      reduxDispatch(update_allowed_basic_info_pages({blockInfo: true, assumption: true}))
      navigate(nextUrl)
    }
  }

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<BasicInfoSideMenu/>}>
          <EditorTopMenu downloadType="table" tableData={exportData} fileName={exportFileName} onSave={onStreamClassListSave}/>
  
          <div className="table-container mr-2">
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

export default BIOutletPage;
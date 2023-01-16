import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const  returnBIOutInletRowIndex = (key) => {
  switch (key) {
    case "Source":
      return "01";
    case "Destination":
      return "02";
    case "Phase":
      return "03";
    case "PropertySet":
      return "04";
    case "VolumeFlow":
      return "05";
    case "CompoundNameList":
      return "06";
    case "MoleFlowList":
      return "07";
    case "MassFlowList":
      return "08";
    case "MoleFracList":
      return "09";
    case "MassFracList":
      return "10";
    case "LiquidConcentrationList":
      return "11";
    case "VaporConcentrationList":
      return "12";
    case "VaporFraction":
      return "13";
    case "LiquidFraction":
      return "14";
    case "SolidFraction":
      return "15";

    default:
      return '00'
  }
}

const  getBIOutInletRows = (data = []) => {
  if(data.length>0){
    let thisTableRows = [];

    let entries = []
    let colHeaders = []

    data.forEach((obj) => {
      colHeaders.push(obj.stream_name);

      let theseEntries = Object.entries(obj)
      
      theseEntries.forEach(entry => [
        entries.push(entry)
      ])
    })

    let compList = data[0].CompoundNameList
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

    let moleFlowUnits = allRows.filter(row => row.name === "MoleFlowUnit")[0]
    let massFlowUnits = allRows.filter(row => row.name === "MassFlowUnit")[0]
    let allSingleRows = allRows.filter(row => !(row.name === "LiquidConcentrationList" || row.name === "MassFlowList" || row.name === "MassFracList" || row.name === "MoleFlowList" || row.name === "MoleFracList" || row.name === "VaporConcentrationList" || row.name === "project_id" || row.name === "_id" || row.name === "stream_name" || row.name === "MoleFlowUnit" || row.name === "MassFlowUnit"))
    let notSingleRows = allRows.filter(row => row.name === "LiquidConcentrationList" || row.name === "MassFlowList" || row.name === "MassFracList" || row.name === "MoleFlowList" || row.name === "MoleFracList" || row.name === "VaporConcentrationList")


    let multiRows = []
    notSingleRows.forEach((multiRow) => {
      const {value, name} = multiRow;

      let newValueArray = []

      value.forEach((subValue, subValueIdx) => {
        let subArray = []
        subValue.forEach((item, itemIdx)=>{
          let newItem = [
            compList[itemIdx],
            item,
            name === "MoleFlowList"? moleFlowUnits.value[subValueIdx] : name === "MassFlowList"? massFlowUnits.value[subValueIdx]: ""
          ]

          subArray.push(newItem)
        })

        newValueArray.push(subArray)
      })


      multiRows.push({
        name,
        value: newValueArray
      })

    })

    allSingleRows.forEach(row => {
      thisTableRows.push({...row, rowId: uuidv4(), rowIndex:  returnBIOutInletRowIndex(row.name)})
    })

    multiRows.forEach(row => {
      thisTableRows.push({...row, rowId: uuidv4(), rowIndex:  returnBIOutInletRowIndex(row.name)})
    })

    let sortedTableRows = cloneDeep(thisTableRows)

    sortedTableRows.sort((a, b) => (a.rowIndex > b.rowIndex) ? 1 : -1)

    return [sortedTableRows, colHeaders]
  }
  return []
}

const Cells = ({col}) => {
  if(!Array.isArray(col)){
    return <td className="has-text-centered">{col}</td>
  }

  return <td className="has-text-centered">{col.join(", ")}</td>
}

const RowLabel = ({rowName, lastRowName}) => {
  if(rowName !== lastRowName){
    return <th>{rowName}</th>
  }

  return <th>&nbsp;</th>
}

const TallRow = ({rowTitle = "", columns = [], numOfRows = 2}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const toggleIsExpanded = () => {
    if(numOfRows>1){
      setIsExpanded(prev => !prev)
    }
  }

  const renderTallRowColumns = columns.map((column, columnIdx) => {
    
    const rows = column.map((row, rowIdx) => {
      const renderedCells =  row.map((cell, cellIdx) => {
        return (
          <div 
          key={Date.now()+cellIdx} 
          className="-hast-text-start"//{cellIdx !== 0 ? "has-text-centered": "has-text-start"}//
          style={{width:cellIdx === row.length-1? null:100, overflow: "hidden", textOverflow: "ellipsis", marginRight: cellIdx !== row.length-1? 5:null}}
          >
          {cell}
          </div>
        )
      })

      return  <div key={Date.now()+rowIdx}><div className='is-flex is-flex-direction-row'>{renderedCells}</div></div>
    })

    return <td key={columnIdx}>
      {isExpanded? (
        <>{rows}</>
      ):(
        <div className='has-text-centered'>...</div>
      )}
    </td>
  })

  return(
    <tr>
      <th onClick={toggleIsExpanded}>
          <span className="icon-text">
          {numOfRows>1 && (
            <span className="icon">
              {isExpanded? <FaChevronUp/>:<FaChevronDown/>}
            </span>
          )}
            <span>{rowTitle}</span>
          </span>
      </th>
      {renderTallRowColumns}
    </tr>
  );
}

const MultiCells = ({values}) => {
  const renderedValues = values.map((value, valueIndex)=>{
    return (
      <div 
      key={valueIndex}
      style={{width:100, overflow: "hidden", textOverflow: "ellipsis", marginRight: 5}}
      className="-hast-text-start">
        {value}
      </div>
    );
  })
  return(
    <div className="is-flex">
      {renderedValues}
    </div>
  )
}

export { Cells, MultiCells, TallRow, RowLabel,  getBIOutInletRows };
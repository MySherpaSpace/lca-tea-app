import classNames from "classnames";

import TableRow from "./TableRow";

import { captalizeFirst } from "../../utils/appUtils";

//THISIS: WARNING: A TEMPLATE, copy/paste and modify accordinglu

function TableDisplay({data = [], columnHeaders=[], onSearch = () => {}, onEdit = () => {}}) {

  /*
  NOTE: we will use these later, for now we will store them here

    // eslint-disable-next-line
  const [tableData, setTableData] = useState([])
  const [tableColHeads, setTableColHeads] = useState([])

  //let's test the table functions, WARNING: this function is just for test
  //we don't know yet what data we will get from the server
  const parseIncomingServerData = (serverData) => {
    //let's gather the object keys
    const objEntries = Object.entries(serverData)

    //add one extra place at the beginning and end
    //beginning for row head, end for del button (only for non-display-only tables)
    setTableColHeads(["", ...Object.keys(serverData), ""]); 
    // const objVals = Object.values(serverData)

    //find the elements in the same row accross objects and put them in a column

    let subObjKeys = []
    let subObjEntries = []
    objEntries.forEach((keyValArr, colIdx)=>{
      // const subObjEntries = Object.entries(keyValArr[1])
      // const subObjKeys = Object.keys(keyValArr[1])
      let thisObjEntries = Object.entries(keyValArr[1])

      

      if(colIdx === 0){
        subObjKeys = Object.keys(keyValArr[1])
      }

      thisObjEntries.forEach(entry => {
        subObjEntries.push([...entry, keyValArr[0]]) //add column name
      })
    })

    let groupedEntries = [] //rowName, colVal, colName is last
    // console.log(subObjKeys)
    subObjKeys.forEach((key) => {
      groupedEntries.push(subObjEntries.filter(entry => entry[0] === key))
    })

    let parsedItems = []

    groupedEntries.forEach((rowArr, rowIdx)=>{
      // console.log(rowArr[0]);
      let newRow = createNewTableRow(
        rowIdx, 
        sepCamelCase(rowArr[0][0]), 
        []
      )

      let thisRowCols = []

      rowArr.forEach((col, colIdx) => {
        let thisColName = col[col.length-1]

        let newCol = createNewTableCol(
          newRow.rowId,
          colIdx,
          sepCamelCase(thisColName),
          thisColName === "2EH"? "display" :thisColName === "DOTP"? "check" : "search",
          // "display",
          col[1]
        )

        thisRowCols.push(newCol)
      })

      newRow = {...newRow, columns: thisRowCols}

      parsedItems.push(newRow)
    })

    setTableData(parsedItems);  
  }

  useEffect(()=>{
    parseIncomingServerData(AspenInfoStreamsFeedTable)
  },[])
  
  //now we need to be able to edit each value in each cell
  const onCellValueEdit = (rowId, colId, newVal = 0) => {
    //let's create a deep copy of the original array to modify
    let tableCopy = JSON.parse(JSON.stringify(tableData))

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
    console.log(newVal);

    //update table data in the state
    setTableData(tableCopy)
  }
  
  //add search results to cell once it is found 
  // eslint-disable-next-line
  const onCellSearchResultsEdit = (rowId, colId, newSearchRes = [], isLoading = false) => {
    //let's create a deep copy of the original array to modify
    let tableCopy = JSON.parse(JSON.stringify(tableData))

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
      colIsLoading: isLoading,
      colMenuItems: newSearchRes
    }

    //DEBUG_LOG:
    console.log(newSearchRes);

    //update table data in the state
    setTableData(tableCopy)
  }
  
  const onSearchStarted = (rowId, colId, term) => {
    // rowId, colId, newVal = 0
    console.log(term);
    // onCellSearchResultsEdit(rowId, colId, [], true)
  }
  */

  const renderedTableBody = data.map(row => {
    return(
      <tr key={row.rowId}>
        <TableRow 
          rowId={row.rowId} 
          rowHeader={captalizeFirst(row.rowHeader)} 
          rowCols={row.columns} 
          onColEdit={onEdit} 
          onColSearch={onSearch}
        />
      </tr>
    );
  })

  const renderedTableColumns = columnHeaders.map((col, idx) => {
    const headRowClass = classNames({"has-text-centered": col !== "2EH"})
    return <th key={idx} className={headRowClass}>{col}</th>;
  })

  return(
    <table className="table is-hoverable" /*is-bordered(only display only tables)"*/>
      <thead className="has-background-primary">
        <tr>{renderedTableColumns}</tr>
      </thead>
      <tbody>
        {renderedTableBody}
      </tbody>
    </table>
  );
}
 
export default TableDisplay;
import classNames from "classnames";
import { GoPrimitiveDot } from "react-icons/go";
import { formatNumberToCurrencyString } from "../../utils/appUtils";
import TableCheckbox from "./TableCheckbox";
import TableDeleteButton from "./TableDeleteRowButton";
import TableDropdown from "./TableDropdown";
import TableInputField from "./TableInputField";
import TableSearchInput from "./TableSearchInput";

function TableRow({rowCols, onColEdit, onColSearch, onRowDelete, rowId, rowHeader, addTabs, minWidth, highlightNegatives}) {

  const renderedCols = rowCols.map((col) => {

    const colClass = classNames("is-vcentered", {
      "has-text-centered": (col.colType.includes("display")|| col.colType.includes("checkbox") || col.colType.includes("dropdown") || col.colType.includes("search")),
      "has-text-right": (col.colType.includes("display") &&  ( col.colType.includes("right") || col.colType.includes("currency"))),
      "has-text-left": ((col.colType.includes("display") &&  col.colType.includes("left")) || col.colType.includes("lca")),
    });

    const handleColChange = (newVal) => {
      onColEdit(rowId, col.colId, newVal)
    }

    const handleColSearch = (newTerm) => {
      onColSearch(rowId, col.colId, newTerm)
    }

    const formatNumValueToString = (num) => {
      if(typeof num === "number"){
        if(num !== 0){
          if(num <0.000001){
            return num.toExponential(6)
          }
          return num.toFixed(6)
        }

        return 0
      }
      
      return num
    }

    const returnRedTextClassName = (colVal) => {
      let finalClassName = ""

      if(highlightNegatives){
        if(typeof colVal === "number"){
          if(Math.sign(colVal) === -1){
            finalClassName = "has-text-danger"
          }
        }
      }

      return finalClassName
    }

    const returnNegFormatNumberToCurrencyString = (num) => {
      if(typeof num === "number"){
        let isNeg = Math.sign(num) === -1? true:false
        let num1 = Number.parseFloat(num.toFixed(2))
        let numToString = num1.toLocaleString("en-US")

        return isNeg? `(${numToString.replace(/-/g,"")})`: numToString
      }
    
      return num
    }

    return(
      <td key={col.colId} className={colClass}>
        {col.colType.includes("display")&&(
          <div className={returnRedTextClassName(col.colValue)}>{col.colType.includes('currency')? highlightNegatives? returnNegFormatNumberToCurrencyString(col.colValue): formatNumberToCurrencyString(col.colValue) : col.colType.includes('number')? formatNumValueToString(col.colValue):col.colValue}</div>
        )}
        {col.colType.includes("input")&&(
          <TableInputField value={col.colValue} onChange={handleColChange} type={col.colType} limit={col.colLimit? col.colLimit:null}/>
        )}
        {col.colType === "checkbox"&&(
          <TableCheckbox value={col.colValue} onChange={handleColChange}/>
        )}
        {col.colType === "search"&&(
          <TableSearchInput 
            value={col.colValue} 
            onChange={handleColChange} 
            onSearch={handleColSearch} 
            options={col.colMenuItems} 
            isLoading={col.colIsLoading}            
          />
        )}
        {col.colType.includes("dropdown")&&(
          <TableDropdown 
            type={col.colType}
            value={col.colValue} 
            onChange={handleColChange} 
            options={col.colMenuItems} 
            isLoading={col.colIsLoading}
          />
        )}
        {col.colType === "button,delete"&&(
          <TableDeleteButton onClick={()=>onRowDelete(rowId)}/>
        )}
      </td>
    );
  });

  const extraTabs = (
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
  )


  return(
    <>
      {rowHeader&&(
        <>
          {addTabs? (
            <td key={"head"+rowId} className="is-vcentered" style={{minWidth}}>
            {addTabs && extraTabs} <GoPrimitiveDot size={12}/> {rowHeader}
            </td>
          ):(
            <th key={"head"+rowId} className="is-vcentered" style={{minWidth}}>
            {rowHeader}
            </th>
          )}
        </>
      )}

      {renderedCols}
    </>
  )
}

TableRow.defaultProps = {
  rowId: 0,
  rowHeader: "",
  rowCols: [],
  onColEdit: () => {},
  onColSearch: () => {},
  onRowDelete: () => {},
  rowIsNew: false,
  addTabs: false, 
  minWidth: null, 
  highlightNegatives:false
}
export default TableRow;
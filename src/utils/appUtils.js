import { cloneDeep } from "lodash";

//DONE: fetches a local storage value item, if exist transforms it into object
export const fetchLocalStorageItem = (key) =>  { 
  const localStoreValue = window.localStorage.getItem(key)
  return localStoreValue != null ? JSON.parse(localStoreValue) : null;
}

//DONE: sets a local storage value item, transforms objects to strings (which is only acceptable way)
export const setLocalStorageItem = (key, value) =>  { 
  window.localStorage.setItem(key, JSON.stringify(value))
}

//DONE: given a key value, delete the correspondant local store item
export const deleteLocalStorageItem = (key) =>  { 
  window.localStorage.removeItem(key)
}

//DONE: delete all the values in the local storage
export const resetLocalStorage = () =>  { 
  window.localStorage.clear()
}

export const formatDigit = (digit) => { //keep
  let digitToString = digit.toString();
  let newDigitToString = `${(digitToString > 9 ? "" + digitToString: "0" + digitToString)}`;
  return `${newDigitToString}`;
}


export const processServerResponse = (response) => {
  if(response.data?.result === "valid"){
    return true
  }else if(response.data?.result === "not valid"){
    return false
  }
  
  return response.data
}

export const separateCamelCase = (txt) => {
  return txt.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export const captalizeFirst = (txt) => {
  if(typeof(txt) === "string"){
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }

  return txt;
}

//original NUMPY: https://www.geeksforgeeks.org/numpy-pmt-in-python/
//source for this: https://stackoverflow.com/questions/5294074/pmt-function-in-javascript
export const calculatePMT = (ir, np, pv, fv, type) => {
  /*
   * ir   - interest rate per month
   * np   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  let pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0)
      return -(pv + fv)/np;

  pvif = Math.pow(1 + ir, np);
  pmt = - ir * (pv * pvif + fv) / (pvif - 1);

  if (type === 1)
      pmt /= (1 + ir);

  return pmt;
}


export const formatHomeTableDataForExport = (data) => {
  //DEBUG_LOG:
  let tableDataForExport = [];

  data.forEach(row => {
    let newRow = cloneDeep(row)

    delete newRow.rowId;
    let columnArr = []
    newRow.columns.forEach(column => {
      columnArr.push(column.colValue)
    })
    
    newRow.columns = columnArr.join(",")

    tableDataForExport.push({
      title: newRow.rowHeader,
      values: newRow.columns
    })
  })


  return tableDataForExport
}

export const formatNumberToCurrencyString = (num) => {
  if(typeof num === "number"){
    let num1 = Number.parseFloat(num.toFixed(2))
    return num1.toLocaleString("en-US")
  }

  return num
}

export const handleConvertToWon = (arr, exchangeRate) => {
  let rowsToWon = []

  arr.forEach(row => {
    let newRow = cloneDeep(row)

    let columnsLength = newRow.columns.length
    newRow.columns.forEach((newCol, newColIdx)=> {
      if(newColIdx !== columnsLength-1){
        newCol.colValue = newCol.colValue*exchangeRate
      }
    })

    rowsToWon.push(newRow)
  })

  return rowsToWon
}

export const convertExponentialToDecimal = (exponentialNumber) => {
  // sanity check - is it exponential number
  const str = exponentialNumber;
  if (str.indexOf('e') !== -1) {
    let frontNum = Number(str.split('e')[0])
    const exponent = parseInt(str.split('-')[1], 10);
    // Unfortunately I can not return 1e-8 as 0.00000001, because even if I call parseFloat() on it,
    // it will still return the exponential representation
    // So I have to use .toFixed()
    const result = frontNum.toFixed(exponent);
    return result;
  } else {
    return exponentialNumber;
  }
}
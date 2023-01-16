import { useState } from "react";

function TableInputField({value, onChange, type="", limit}) {
  const [thisValue, setThisValue] = useState(value)
  const thisInputType = type.includes(",")? type.split(",")[1]:"text"

  const lowerRange = thisInputType? limit? limit[0]? limit[0] : null: null: null
  const upperRange = thisInputType? limit? limit[1]? limit[1] : Infinity: Infinity:null

  const onInputChange = (event) => {
    let newValue = event.target.value;
    setThisValue(newValue)
  }

  const handleFormSubmit = (event) => {
    //this prevents page from reloading after user hits enter in any
    //of the inputs inside the form
    event.preventDefault();
    //this allows the following lines to trigger on submission
    if(thisInputType === "number"){
      const newValue = Math.max(lowerRange, Math.min(upperRange, Number(thisValue)));
      onChange(newValue)
    }else{
      onChange(thisValue)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} style={{minWidth:200}}>
      <input className={`input ${thisInputType === "number"&&"has-text-centered"}`} step={thisInputType === "number"? "0.000000001":null} type={thisInputType} value={thisValue} onChange={onInputChange} onBlur={handleFormSubmit}/>
    </form>
  )
}

TableInputField.defaultProps = {
  value: null,
  onChange: () => {}
}

export default TableInputField;
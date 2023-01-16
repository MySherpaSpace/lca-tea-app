import { useState } from "react";

function TransposedTableInput({value, onChange, type="", range, isMandatory}) {
  const [thisValue, setThisValue] = useState(value)
  const thisInputType = type.includes(",")? type.split(",")[1]:"text"

  const lowerRange = thisInputType? range[0]? range[0] : null: null
  const upperRange = thisInputType? range[1]? range[1] : Infinity: Infinity

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
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <div className="control">
          <input 
          className={`input has-text-centered ${isMandatory && "is-danger"}`} 
          type={thisInputType} 
          value={thisValue}
          min={lowerRange}
          max={upperRange}
          onChange={onInputChange}
          onBlur={handleFormSubmit}
          />
        </div>
        {isMandatory && <p className="help is-danger">* Is Required</p>}
      </div>
    </form>
  )
}

TransposedTableInput.defaultProps = {
  value: null,
  onChange: () => {}
}

export default TransposedTableInput;
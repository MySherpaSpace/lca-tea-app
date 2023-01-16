import { captalizeFirst } from "../utils/appUtils";

function SelectDropdown ({options, onChange = () => {}, value, className}) {
    
  const renderedOptions = options.map((item, index)=>{
    return <option key={index} value={item}>{item == null? "":captalizeFirst(item)}</option>
  })

  const handleSelectOnChange = (event) => {
    onChange(event.target.value)
  }

  return(
    <div className={`select ${className}`}>
      <select value={value? value:""} onChange={handleSelectOnChange}>
        {renderedOptions}
      </select>
    </div>
  );
}

export default SelectDropdown;
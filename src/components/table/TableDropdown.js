import classNames from "classnames";

function TableDropdown({value, options, onChange, isLoading, type}) {
  const classes = classNames("select", {"is-loading": isLoading})

  const renderedOptions = options.map((item, index)=>{
    return <option key={index} value={type.includes("lca")? JSON.stringify(item) : item}>{type.includes("lca")? item.value : item}</option>
  })

  const handleSelectOnChange = (event) => {
    const newVal = event.target.value;
    const parsedVal = type.includes("lca")? JSON.parse(newVal) : newVal;
    onChange(parsedVal)
  }
 
  return(
    <div className={classes}>
      <select value={type.includes("lca")? JSON.stringify(value) : value} disabled={isLoading} onChange={handleSelectOnChange}>
        {renderedOptions}
      </select>
    </div>
  );
}

TableDropdown.defaultProps = {
  value: null,
  options: [],
  onChange: () => {},
  isLoading: false,
  type: ""
}

export default TableDropdown;
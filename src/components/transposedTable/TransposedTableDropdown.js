import SelectDropdown from "../SelectDropdown";

function TransposedTableDropdown({isMandatory, options, onChange, value}) {
  return(
    <div className="is-flex is-flex-direction-column is-flex-grow-0" style={{width: "100%"}}>
      <div>
        <SelectDropdown
        className={`${isMandatory && "is-danger"}`}
        value={value}
        options={Array.isArray(options[0])?  options[0]: options}
        onChange={onChange}
        />
      </div>
    {isMandatory && <p className="help is-danger">* Is Required</p>}
    </div>
  );
}

TransposedTableDropdown.defaultProps = {
  isMandatory: false,
  options: [],
  value: null,
  onChange: () => {}
}
 
export default TransposedTableDropdown;
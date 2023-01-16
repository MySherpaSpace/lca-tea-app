function TableCheckbox({value, onChange}) {
  const onInputChange = (event) => {
    onChange(event.target.checked)
  }

  return(
    <label className="checkbox">
      <input type="checkbox" checked={value} onChange={onInputChange}/>
    </label>
  );
}

TableCheckbox.defaultProps = {
  value: false,
  onChange: () => {}
}
 
export default TableCheckbox;
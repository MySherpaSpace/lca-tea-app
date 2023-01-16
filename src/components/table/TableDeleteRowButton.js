function TableDeleteButton({onClick}) {
  
  return(
    <button className="button is-danger is-outlined" onClick={onClick}>
      <span className="icon is-small">
        <i className="fas fa-times"></i>
      </span>
    </button>
  );
}

TableDeleteButton.defaultProps = {
  onClick: () => {}
}
 
export default TableDeleteButton;
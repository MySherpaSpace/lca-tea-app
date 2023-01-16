import classNames from "classnames";

function TableColumns({columnHeaders}) {

  const renderedTableColumns = columnHeaders.map((col, idx) => {

    const headRowClass = classNames("has-text-white", {"has-text-centered": col.type !== "display"})
    
    return <th key={idx} className={headRowClass}>{col.title}</th>;
  })
  
  return(
    <thead className="has-background-primary">
      <tr>{renderedTableColumns}</tr>
    </thead>
  );
}
 
export default TableColumns;
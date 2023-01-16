import "./TableSearchInput.css";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import classNames from "classnames";

function TableSearchInput({value, onChange, onSearch, options, isLoading}) {
  const [thisValue, setThisValue] = useState(value? value.value:"");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const divEl = useRef();

  const formClass = classNames('control has-icons-left', {"is-loading": isLoading})

  const openDropdown = () => setIsOpen(true)
  const closeDropdown = () => setIsOpen(false)

  useEffect(()=>{
    const handler = (event) => {
      if(!divEl.current){
        return;
      }

      if(!divEl.current.contains(event.target)){
        closeDropdown()
      }
    }

    document.addEventListener("click", handler, true);

    return () => document.removeEventListener("click", handler);
  },[]);

  useEffect(()=>{
    if(options.length>0){
      setSearchResults(options);
      openDropdown()
    }else{
      setSearchResults([])
      closeDropdown()
    }
  },[options])

  const onInputChange = (event) => {
    setThisValue(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(thisValue);
  }

  const renderDropdownContent = searchResults.map((item) => {
    const onOptionSelect = () => onChange(item);

    return(
      <div className="dropdown-item has-text-left" key={item.uuid}>
        <button className="button is-white" onClick={onOptionSelect}>{item.value}</button>
      </div>
    );
  })

  return(
    <div className={`dropdown ${isOpen? "is-active": ""}`} ref={divEl} style={{minWidth:200}}>
      <div className="dropdown-trigger">
        <form className="field has-addons" onSubmit={handleFormSubmit}>
          <div className={formClass}>
            <input className="input" type="text" value={thisValue} onChange={onInputChange}/>
            <span className="icon is-small is-left">
              <FaSearch/>
            </span>
          </div>
          <div className="control">
            <button className="button is-link">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {renderDropdownContent}
        </div>
      </div>
    </div>
  );
}

TableSearchInput.defaultProps = {
  value: null,
  onSearch: () => {},
  options: [],
  onChange: () => {},
  isLoading: false,
}
 
export default TableSearchInput;
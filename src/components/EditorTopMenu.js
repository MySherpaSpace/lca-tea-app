import classNames from "classnames";
import * as FileSaver from "file-saver";
import { AiOutlineQuestionCircle, AiOutlineSave, AiOutlinePlayCircle, AiOutlineDownload, AiOutlineReload, AiOutlineSwap, AiOutlinePlus, AiOutlineFastForward } from "react-icons/ai";
import XLSX from "sheetjs-style";

function EditorTopMenu({
  pageTitle, menuOptions, areMenuOptionsEnabled, selected, onSave, onRun, onHelp, onReset, downloadType, tableData, fileName, onDownload,
  onConvertToUSD, onConvertToWon, page, onAddRow, onUnitSelect, onSkip, onMenuOptionSelect
}) {

  const exportToExcel = async (fileName, excelData=[]) => {
    try {
      if(excelData.length>0){
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        const fileExtension = ".xlsx";
    
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName+fileExtension)
      }else{
        alert("No available data")
      }
    } catch (error) {
      alert(error)
    }
  }

  const onThisDownload = () => {
    if(onDownload){
      const newExportData = onDownload();
      exportToExcel(fileName, newExportData)
    }else{
      if(downloadType === "image"){
        window.print()
      }else{
        exportToExcel(fileName, tableData)
      }
    }
  }

  const renderedDropdownOptions = menuOptions.map(option => {
    const thisClassName = classNames("button is-white dropdown-item ", selected === option.title && "is-active")
    const handleOptionClick = () => {
      if(onMenuOptionSelect){
        onMenuOptionSelect(option)
      }else{
        option.onClick()
      }
    }
    return (
      <button className={thisClassName} onClick={handleOptionClick} key={option.title} disabled={!areMenuOptionsEnabled}>
        <p className={`${(selected === option.title)&& "has-text-primary"}`}>{option.title}</p>
      </button>
    )
  });

  return(
    <>
      <div className="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
        <div className="is-size-5 has-text-weight-semibold is-flex is-align-items-center">
          {pageTitle && <span className="mr-4">{pageTitle}</span>}
          {menuOptions.length>0 && (
            <div className="dropdown is-hoverable mr-4">
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <span>{selected}</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu4" role="menu">
              <div className="dropdown-content">
                {renderedDropdownOptions}
              </div>
              </div>
            </div>
          )}
          {onAddRow&&(
            <button className="button mr-4" onClick={onAddRow}>
              <span className="icon">
                <AiOutlinePlus/>
              </span>
              <span>Add Row</span>
            </button>
          )}
          {onUnitSelect && (
            <button className="button" onClick={onUnitSelect}>
              <span className="icon">
                <AiOutlineSwap/>
              </span>
              <span>Change Currency</span>
            </button>
          )}
          {page === "Results by Unit" && <span className="ml-4">Unit: ₩</span>}
        </div>

        <div className="buttons">

          {onConvertToUSD && (
            <button className="button" onClick={onConvertToUSD}>
              <span className="icon">
                <AiOutlineSwap/>
              </span>
              <span>Convert to $</span>
            </button>
          )}
          {onConvertToWon && (
            <button className="button" onClick={onConvertToWon}>
              <span className="icon">
                <AiOutlineSwap/>
              </span>
              <span>Convert to ₩</span>
            </button>
          )}
          {onHelp && (
            <button className="button is-white" onClick={onHelp}>
              <span className="icon">
                <AiOutlineQuestionCircle/>
              </span>
              <span>Help</span>
            </button>
          )}
          {onRun &&  (
            <button className="button" onClick={onRun}>
              <span className="icon">
                <AiOutlinePlayCircle/>
              </span>
              <span>Run</span>
            </button>  
          )}
          {onSkip && (
            <button className="button" onClick={onSkip}>
              <span>Skip</span>
              <span className="icon">
                <AiOutlineFastForward/>
              </span>
            </button>
          )}
          {onSave && (
            <button className="button" onClick={onSave}>
              <span className="icon">
                <AiOutlineSave/>
              </span>
              <span>Save</span>
            </button>
          )}
          {onReset && (
            <button className="button" onClick={onReset}>
              <span className="icon">
                <AiOutlineReload/>
              </span>
              <span>Reset</span>
            </button>  
          )}
          <button className="button mr-4" onClick={onThisDownload}>
            <span className="icon">
              <AiOutlineDownload/>
            </span>
            <span>Download</span>
          </button>  
        </div>
      </div>
      <div className="block"/>
    </>
  );
}

EditorTopMenu.defaultProps = {
  pageTitle: null, 
  menuOptions:[], 
  selected: null, 
  onSave: null, 
  onRun: null, 
  onHelp: null, 
  onReset: null, 
  downloadType: "image",
  tableData: [], 
  fileName: "export",
  areMenuOptionsEnabled: true
}
 
export default EditorTopMenu;
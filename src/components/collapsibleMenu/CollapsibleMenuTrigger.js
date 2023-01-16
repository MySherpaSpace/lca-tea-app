import { AiOutlineFolder, AiOutlineFolderOpen } from "react-icons/ai";

function CollapsibleMenu({children, title, isTitle = true, state, onToggle}) {
  return(
    <>
      <div className="is-clickable py-1" onClick={onToggle} style={{flex:1, overflow:"hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
        <span>
          <span className={isTitle? "icon has-text-link":"icon"}>
            {state? (<AiOutlineFolderOpen/>):(<AiOutlineFolder/>)}
          </span>
          <span><p className={`icon-text ${isTitle? "is-uppercase is-size-7 has-text-link":"has-text-weight-semibold"}`}>{title}</p></span>
        </span> 
      </div>   

      {state && (
        <div className="ml-2">
          {children}
        </div>
      )}
      <div className="my-2"/>
    </>
  );
}
 
export default CollapsibleMenu;
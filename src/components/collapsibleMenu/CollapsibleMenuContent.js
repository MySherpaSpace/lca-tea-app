import { NavLink } from "react-router-dom";

import { AiOutlineFile } from "react-icons/ai";
import { homeAddress } from "../../utils/appConstants";

function CollapsibleMenuContent({content, to=homeAddress}) {
  return(
    <>
      <NavLink to={to} className={({ isActive }) => isActive? "button is-primary":"button is-white"}>
        <span className="icon-text">
          <span className="icon">
            <AiOutlineFile/>
          </span>
          <span style={{flex:1, overflow:"hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{content}</span>
        </span> 
      </NavLink> 
      <div className="my-2"/>
    </> 
  );
}
 
export default CollapsibleMenuContent;
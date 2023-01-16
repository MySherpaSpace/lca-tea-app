import { useState } from "react";

import CollapsibleMenuContainer from "../collapsibleMenu/CollapsibleMenuContainer";
import CollapsibleMenuTrigger from "../collapsibleMenu/CollapsibleMenuTrigger";
import CollapsibleMenuContent from "../collapsibleMenu/CollapsibleMenuContent";
import { useSelector } from "react-redux";
import { getNavURL } from "../../utils/appConstants";
import { selectedProjectNameRedux } from "../../redux/features/allowedTabsSlice";

function BasicInfoSideMenu() {
  const [isAspenInfoActive, setIsAspenInfoActive] = useState(true)
  const [isStreamsActive, setIsStreamsActive] = useState(true)
  const [isBlocksActive, setIsBlocksActive] = useState(true)
  const [isBasicInfoActive, setIsBasicInfoActive] = useState(true)

  const SelectedProjectName = useSelector(selectedProjectNameRedux)
  const AllowedPages = useSelector(state => state.allowedBasicInfoPages);

  const handleAspenInfoToggle = () => setIsAspenInfoActive(prev => !prev)
  const handleStreamsToggle = () => setIsStreamsActive(prev => !prev)
  const handleBlocksToggle = () => setIsBlocksActive(prev => !prev)
  const handleBasicInfoToggle = () => setIsBasicInfoActive(prev => !prev)

  const inletUrl = getNavURL("/basic-info/aspen-info-streams-inlet");
  const outletUrl = getNavURL("/basic-info/aspen-info-streams-outlet");
  const blocksUrl = getNavURL("/basic-info/aspen-info-blocks-block-info");
  const assumptionUrl = getNavURL("/basic-info/basic-info-assumption");

  return(
    <CollapsibleMenuContainer>
      <h6>Project: {SelectedProjectName}</h6>
      <CollapsibleMenuTrigger title="Aspen Information" state={isAspenInfoActive} onToggle={handleAspenInfoToggle}>
        <CollapsibleMenuTrigger title="Streams" isTitle={false} state={isStreamsActive} onToggle={handleStreamsToggle}>
          {AllowedPages.inlet && (<CollapsibleMenuContent content="Inlet" to={inletUrl}/>)}
          {AllowedPages.outlet && (<CollapsibleMenuContent content="Outlet" to={outletUrl}/>)}          
        </CollapsibleMenuTrigger>
        {AllowedPages.blockInfo && (
          <CollapsibleMenuTrigger title="Blocks" isTitle={false} state={isBlocksActive} onToggle={handleBlocksToggle}>
            <CollapsibleMenuContent content="Block Information" to={blocksUrl}/>
          </CollapsibleMenuTrigger>
        )} 
      </CollapsibleMenuTrigger>
      {AllowedPages.assumption && (
        <CollapsibleMenuTrigger title="Basic Information" state={isBasicInfoActive} onToggle={handleBasicInfoToggle}>
          <CollapsibleMenuContent content="Assumption" to={assumptionUrl}/>
        </CollapsibleMenuTrigger>
      )} 
    </CollapsibleMenuContainer>
  );
}
 
export default BasicInfoSideMenu;
import { useState } from "react";
import { useSelector } from "react-redux";
import { getNavURL } from "../../utils/appConstants";

import CollapsibleMenuContainer from "../collapsibleMenu/CollapsibleMenuContainer";
import CollapsibleMenuTrigger from "../collapsibleMenu/CollapsibleMenuTrigger";
import CollapsibleMenuContent from "../collapsibleMenu/CollapsibleMenuContent";
import { selectedProjectNameRedux } from "../../redux/features/allowedTabsSlice";

function TEASideMenu() {
  const [isCapexSectionActive, setIsCapexSectionActive] = useState(true);
  const handleCapexSectionToggle = () => setIsCapexSectionActive(prev => !prev);
  const [isCapexInputMenuActive, setIsCapexInputMenuActive] = useState(true);
  const handleCapexInputMenuToggle = () => setIsCapexInputMenuActive(prev => !prev);
  const [isCapexResultsMenuActive, setIsCapexResultsMenuActive] = useState(true);
  const handleCapexResultsMenuToggle = () => setIsCapexResultsMenuActive(prev => !prev);

  const [isOpexSectionActive, setIsOpexSectionActive] = useState(true);
  const handleOpexSectionToggle = () => setIsOpexSectionActive(prev => !prev);
  const [isOpexInputMenuActive, setIsOpexInputMenuActive] = useState(true);
  const handleOpexInputMenuToggle = () => setIsOpexInputMenuActive(prev => !prev);
  const [isOpexResultsMenuActive, setIsOpexResultsMenuActive] = useState(true);
  const handleOpexResultsMenuToggle = () => setIsOpexResultsMenuActive(prev => !prev);
  const [isOpexRevenueMenuActive, setIsOpexRevenueMenuActive] = useState(true);
  const handleOpexRevenueMenuToggle = () => setIsOpexRevenueMenuActive(prev => !prev);

  const AllowedPages = useSelector(state => state.allowedTEAPages);
  const SelectedProjectName = useSelector(selectedProjectNameRedux)

  const capexUnitDesignUrl =       getNavURL("/tea/capex-unit-design");
  const capexPercentageMethodUrl = getNavURL("/tea/capex-percentage-method");
  const capexResultsByUnitUrl =    getNavURL("/tea/capex-results-by-unit");
  const capexResultsSummaryUrl =   getNavURL("/tea/capex-results-summary");
  const opexInputFeedUrl =         getNavURL("/tea/opex-input-feed");
  const opexInputUtilityUrl =      getNavURL("/tea/opex-input-utility");
  const opexInputWasteUrl =        getNavURL("/tea/opex-input-waste");
  const opexResultsByStreamUrl =   getNavURL("/tea/opex-results-by-stream");
  const opexRevenueProductUrl =    getNavURL("/tea/opex-revenue-product");

  return(
    <CollapsibleMenuContainer>
      <h6>Project: {SelectedProjectName}</h6>
      <CollapsibleMenuTrigger title="CAPEX" state={isCapexSectionActive} onToggle={handleCapexSectionToggle}>
        <CollapsibleMenuTrigger title="Input" isTitle={false} state={isCapexInputMenuActive} onToggle={handleCapexInputMenuToggle}>
          {AllowedPages.capexUnitDesign && (<CollapsibleMenuContent content="Unit Design" to={capexUnitDesignUrl}/>)}
          {AllowedPages.capexPercentageMethod && (<CollapsibleMenuContent content="Percentage Method" to={capexPercentageMethodUrl}/>)}          
        </CollapsibleMenuTrigger>

        {(AllowedPages.capexResultsByUnit || AllowedPages.capexResultsSummary)&&(
          <CollapsibleMenuTrigger title="Results" isTitle={false} state={isCapexResultsMenuActive} onToggle={handleCapexResultsMenuToggle}>
            {AllowedPages.capexResultsByUnit && (<CollapsibleMenuContent content="By Unit" to={capexResultsByUnitUrl}/>)}
            {AllowedPages.capexResultsSummary && (<CollapsibleMenuContent content="Summary" to={capexResultsSummaryUrl}/>)}          
          </CollapsibleMenuTrigger>
        )}
      </CollapsibleMenuTrigger>

      {(AllowedPages.opexInputFeed || AllowedPages.opexInputUtility || AllowedPages.opexInputWaste || AllowedPages.opexResultsByStream || AllowedPages.opexRevenueProduct)&&
      (
        <CollapsibleMenuTrigger title="OPEX" state={isOpexSectionActive} onToggle={handleOpexSectionToggle}>
          <CollapsibleMenuTrigger title="Input" isTitle={false} state={isOpexInputMenuActive} onToggle={handleOpexInputMenuToggle}>
            {AllowedPages.opexInputFeed && (<CollapsibleMenuContent content="Feed" to={opexInputFeedUrl}/>)}
            {AllowedPages.opexInputUtility && (<CollapsibleMenuContent content="Utility" to={opexInputUtilityUrl}/>)}          
            {AllowedPages.opexInputWaste && (<CollapsibleMenuContent content="Waste" to={opexInputWasteUrl}/>)}          
          </CollapsibleMenuTrigger>
          {AllowedPages.opexResultsByStream && (
            <CollapsibleMenuTrigger title="Results" isTitle={false} state={isOpexResultsMenuActive} onToggle={handleOpexResultsMenuToggle}>
              <CollapsibleMenuContent content="By Stream" to={opexResultsByStreamUrl}/>
            </CollapsibleMenuTrigger>
          )} 
          {AllowedPages.opexRevenueProduct && (
            <CollapsibleMenuTrigger title="Revenue" isTitle={false} state={isOpexRevenueMenuActive} onToggle={handleOpexRevenueMenuToggle}>
              <CollapsibleMenuContent content="Product" to={opexRevenueProductUrl}/>
            </CollapsibleMenuTrigger>
          )} 
        </CollapsibleMenuTrigger>
      )}
    </CollapsibleMenuContainer>
  );
}
 
export default TEASideMenu;
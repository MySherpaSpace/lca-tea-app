import { useState } from "react";
import { useSelector } from "react-redux";

import { getNavURL } from "../../utils/appConstants";
import { selectedProjectNameRedux } from "../../redux/features/allowedTabsSlice";

import CollapsibleMenuContainer from "../collapsibleMenu/CollapsibleMenuContainer";
import CollapsibleMenuTrigger from "../collapsibleMenu/CollapsibleMenuTrigger";
import CollapsibleMenuContent from "../collapsibleMenu/CollapsibleMenuContent";

function SummarySideMenu() {
  const [isTEAActive, setIsTEAActive] = useState(true)
  const [isLCAActive, setIsLCAActive] = useState(true)
  // const [isConclusionActive, setIsConclusionActive] = useState(true)

  const handleTEAToggle = () => setIsTEAActive(prev => !prev)
  const handleLCAToggle = () => setIsLCAActive(prev => !prev)
  // const handleConclusionToggle = () => setIsConclusionActive(prev => !prev)

  const SelectedProjectName = useSelector(selectedProjectNameRedux)
  const AllowedPages = useSelector(state => state.allowedSummaryPages);

  const teaCapexUrl = getNavURL("/summary/tea-capex");
  const teaOpexUrl = getNavURL("/summary/tea-opex");
  const teaCashflowUrl = getNavURL("/summary/tea-cashflow");
  const teaEconomicIndexUrl = getNavURL("/summary/tea-economic-index");

  const lcaSummaryUrl = getNavURL("/summary/lca-summary");

  // const conclusionProcessUrl = getNavURL("/summary/conclusion-process");
  // const conclusionManufacturingCostUrl = getNavURL("/summary/conclusion-manufacturing-cost");

  return(
    <CollapsibleMenuContainer>
      <h6>Project: {SelectedProjectName}</h6>
      {(AllowedPages.summaryTEACapex || AllowedPages.summaryTEAOpex || AllowedPages.summaryTEACashflow || AllowedPages.summaryTEAEconomicIndex)&&(
        <CollapsibleMenuTrigger title="TEA" state={isTEAActive} onToggle={handleTEAToggle}>
          {AllowedPages.summaryTEACapex && (<CollapsibleMenuContent content="CAPEX" to={teaCapexUrl}/>)}
          {AllowedPages.summaryTEAOpex && (<CollapsibleMenuContent content="OPEX" to={teaOpexUrl}/>)}
          {AllowedPages.summaryTEACashflow && (<CollapsibleMenuContent content="Cash Flow" to={teaCashflowUrl}/>)}
          {AllowedPages.summaryTEAEconomicIndex && (<CollapsibleMenuContent content="Economic Index" to={teaEconomicIndexUrl}/>)}
        </CollapsibleMenuTrigger>
      )}

      {AllowedPages.summaryLCASummary && (
        <CollapsibleMenuTrigger title="LCA" state={isLCAActive} onToggle={handleLCAToggle}>
          <CollapsibleMenuContent content="Summary" to={lcaSummaryUrl}/>
        </CollapsibleMenuTrigger>
      )}

      {/* {(AllowedPages.summaryConclusionProcess || AllowedPages.summaryConclusionManufacturingCost)&&(
        <CollapsibleMenuTrigger title="Conclusion" state={isConclusionActive} onToggle={handleConclusionToggle}>
          {AllowedPages.summaryConclusionProcess && (<CollapsibleMenuContent content="Process" to={conclusionProcessUrl}/>)}
          {AllowedPages.summaryConclusionManufacturingCost && (<CollapsibleMenuContent content="Manufacturing Cost" to={conclusionManufacturingCostUrl}/>)}
        </CollapsibleMenuTrigger>
      )} */}
    </CollapsibleMenuContainer>
  );
}
 
export default SummarySideMenu;
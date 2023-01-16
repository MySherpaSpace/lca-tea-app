import { useState } from "react";
import { useSelector } from "react-redux";
import { getNavURL } from "../../utils/appConstants";

import CollapsibleMenuContainer from "../collapsibleMenu/CollapsibleMenuContainer";
import CollapsibleMenuTrigger from "../collapsibleMenu/CollapsibleMenuTrigger";
import CollapsibleMenuContent from "../collapsibleMenu/CollapsibleMenuContent";
import { selectedProjectNameRedux } from "../../redux/features/allowedTabsSlice";

function LCASideMenu() {
  const [isInputActive, setIsInputActive] = useState(true);
  const [isInventoryAnalysisActive, setIsInventoryAnalysisActive] = useState(true);

  const [isResultsActive, setIsResultsActive] = useState(true);
  const [isImpactAssesmentActive, setIsImpactAssesmentActive] = useState(true);
  const [isSummaryActive, setIsSummaryActive] = useState(true);

  const AllowedPages = useSelector(state => state.allowedLCAPages);
  const SelectedProjectName = useSelector(selectedProjectNameRedux)

  const handleInputToggle = () => setIsInputActive(prev => !prev);
  const handleInventoryAnalysisToggle = () => setIsInventoryAnalysisActive(prev => !prev);

  const handleResultsToggle = () => setIsResultsActive(prev => !prev);
  const handleImpactAssesmentToggle = () => setIsImpactAssesmentActive(prev => !prev);
  const handleSummaryToggle = () => setIsSummaryActive(prev => !prev);

  const projectInformationUrl = getNavURL("/lca/input-project-information")
  const impactCategoryInformationUrl = getNavURL("/lca/input-impact-category-information")
  const inventoryAnalysisFeedUrl = getNavURL("/lca/input-inventory-analysis-feed")
  const inventoryAnalysisUtilityUrl = getNavURL("/lca/input-inventory-analysis-utility")
  const inventoryAnalysisWasteUrl = getNavURL("/lca/input-inventory-analysis-waste")
  const transportDataUrl = getNavURL("/lca/input-transport-data")
  const analysisByCoefficienctUrl = getNavURL("/lca/results-impact-assesment-analysis-by-coefficient")
  // const fuelCombustionUrl = getNavURL("/lca/results-impact-assesment-fuel-combustion")
  const lifeCycleAssesmentUrl = getNavURL("/lca/results-impact-assesment-life-cycle-assesment")
  const summaryOverviewUrl = getNavURL("/lca/results-summary-overview")
  const analysisByMaterialUrl = getNavURL("/lca/results-summary-analysis-by-material")
  const analysisByCategoryUrl = getNavURL("/lca/results-summary-analysis-by-category")
  const analysisByManufacturingStageUrl = getNavURL("/lca/results-summary-analysis-by-manufacturing-stage")

  return(
    <CollapsibleMenuContainer>
      <h6>Project: {SelectedProjectName}</h6>
      <CollapsibleMenuTrigger title="Input" state={isInputActive} onToggle={handleInputToggle}>
        <CollapsibleMenuContent content="Project Information" to={projectInformationUrl}/>
        {AllowedPages.inputImpactCategoryInformation && (<CollapsibleMenuContent content="Impact Category Information" to={impactCategoryInformationUrl}/>)}

        {(AllowedPages.inputInventoryAnalysisFeed ||  AllowedPages.inputInventoryAnalysisUtility || AllowedPages.inputInventoryAnalysisWaste)&&(
          <CollapsibleMenuTrigger title="Inventory Analysis" isTitle={false} state={isInventoryAnalysisActive} onToggle={handleInventoryAnalysisToggle}>
          {AllowedPages.inputInventoryAnalysisFeed && (<CollapsibleMenuContent content="Feed"    to={inventoryAnalysisFeedUrl}/>)}
          {AllowedPages.inputInventoryAnalysisUtility && (<CollapsibleMenuContent content="Utility" to={inventoryAnalysisUtilityUrl}/>)}
          {AllowedPages.inputInventoryAnalysisWaste && (<CollapsibleMenuContent content="Waste"   to={inventoryAnalysisWasteUrl}/>)}
          </CollapsibleMenuTrigger>
        )}

        {AllowedPages.inputTransportData && (<CollapsibleMenuContent content="Transport Data" to={transportDataUrl}/>)}

      </CollapsibleMenuTrigger>
        {(
          AllowedPages.resultsImpactAssesmentAnalysisByCoefficient || AllowedPages.resultsImpactAssesmentFuelCombustion ||
          AllowedPages.resultsImpactAssesmentLifeCycleAssesment || AllowedPages.resultsSummaryOverview ||
          AllowedPages.resultsSummaryAnalysisByMaterial || AllowedPages.resultsSummaryAnalysisByCategory ||
          AllowedPages.resultsSummaryAnalysisByManufacturingStage
        )&&(
          <CollapsibleMenuTrigger title="Results" state={isResultsActive} onToggle={handleResultsToggle}>

          <CollapsibleMenuTrigger title="Impact Assesment" isTitle={false} state={isImpactAssesmentActive} onToggle={handleImpactAssesmentToggle}>
            {AllowedPages.resultsImpactAssesmentAnalysisByCoefficient && (<CollapsibleMenuContent content="Analysis By Coefficient" to={analysisByCoefficienctUrl}/>)}
            {/* {AllowedPages.resultsImpactAssesmentFuelCombustion && (<CollapsibleMenuContent content="Fuel Combustion" to={fuelCombustionUrl}/>)} */}
            {AllowedPages.resultsImpactAssesmentLifeCycleAssesment && (<CollapsibleMenuContent content="Life Cycle Assesment" to={lifeCycleAssesmentUrl}/>)}
          </CollapsibleMenuTrigger>

          <CollapsibleMenuTrigger title="Summary" isTitle={false} state={isSummaryActive} onToggle={handleSummaryToggle}>
            {AllowedPages.resultsSummaryOverview && (<CollapsibleMenuContent content="Overview" to={summaryOverviewUrl}/>)}
            {AllowedPages.resultsSummaryAnalysisByMaterial && (<CollapsibleMenuContent content="Analysis By Material" to={analysisByMaterialUrl}/>)}
            {AllowedPages.resultsSummaryAnalysisByCategory && (<CollapsibleMenuContent content="Analysis By Category" to={analysisByCategoryUrl}/>)}
            {AllowedPages.resultsSummaryAnalysisByManufacturingStage && (<CollapsibleMenuContent content="Analysis By Manufacturing Stage" to={analysisByManufacturingStageUrl}/>)}
          </CollapsibleMenuTrigger>

          </CollapsibleMenuTrigger>
        )}

    </CollapsibleMenuContainer>
  );
}
 
export default LCASideMenu;
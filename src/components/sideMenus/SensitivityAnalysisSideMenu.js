import { useState } from "react";
import { useSelector } from "react-redux";

import { getNavURL } from "../../utils/appConstants";
import { selectedProjectNameRedux } from "../../redux/features/allowedTabsSlice";

import CollapsibleMenuContainer from "../collapsibleMenu/CollapsibleMenuContainer";
import CollapsibleMenuTrigger from "../collapsibleMenu/CollapsibleMenuTrigger";
import CollapsibleMenuContent from "../collapsibleMenu/CollapsibleMenuContent";

function SensitivityAnalysisSideMenu() {
  const [isParameterUncertaintyActive, setIsParameterUncertaintyActive] = useState(true)
  // const [isModelScenarioActive, setIsModelScenarioActive] = useState(true)

  const handleParameterUncertaintyToggle = () => setIsParameterUncertaintyActive(prev => !prev)
  // const handleModelScenarioToggle = () => setIsModelScenarioActive(prev => !prev)

  const SelectedProjectName = useSelector(selectedProjectNameRedux)
  const AllowedPages = useSelector(state => state.allowedSensitivityAnalysisPages);

  const parameterUncertaintyInputUrl = getNavURL("/sensitivity-analysis/parameter-uncertainty-input");
  const parameterUncertaintyResultsUrl = getNavURL("/sensitivity-analysis/parameter-uncertainty-results");
  // const modelScenarioInputUrl = getNavURL("/sensitivity-analysis/model-scenario-input");
  // const modelScenarioResultsUrl = getNavURL("/sensitivity-analysis/model-scenario-results");

  return(
    <CollapsibleMenuContainer>
      <h6>Project: {SelectedProjectName}</h6>

      {(AllowedPages.parameterUncertaintyInput || AllowedPages.parameterUncertaintyResults)&&(
        <CollapsibleMenuTrigger title="Parameter Uncertainty" state={isParameterUncertaintyActive} onToggle={handleParameterUncertaintyToggle}>
          {AllowedPages.parameterUncertaintyInput   && (<CollapsibleMenuContent content="Input"   to={parameterUncertaintyInputUrl}/>)}
          {AllowedPages.parameterUncertaintyResults && (<CollapsibleMenuContent content="Results" to={parameterUncertaintyResultsUrl}/>)}
        </CollapsibleMenuTrigger>
      )}

      {/* {(AllowedPages.modelScenarioInput || AllowedPages.modelScenarioResults)&&(
        <CollapsibleMenuTrigger title="Model Scenario" state={isModelScenarioActive} onToggle={handleModelScenarioToggle}>
          {AllowedPages.modelScenarioInput   && (<CollapsibleMenuContent content="Input"   to={modelScenarioInputUrl}/>)}
          {AllowedPages.modelScenarioResults && (<CollapsibleMenuContent content="Results" to={modelScenarioResultsUrl}/>)}
        </CollapsibleMenuTrigger>
      )}    */}

    </CollapsibleMenuContainer>
  );
}
 
export default SensitivityAnalysisSideMenu;
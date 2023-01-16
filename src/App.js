import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import axios from "axios";
import useAuth from "./hooks/use-auth";

import { isProductionMode } from "./utils/appConstants";
import { update_currency_rate } from "./redux/features/allowedTabsSlice";

import SharedHomeLayout from "./components/sharedLayouts/SharedHomeLayout";
import SharedBasicInfoLayout from "./components/sharedLayouts/SharedBasicInfoLayout";
import SharedTEALayout from "./components/sharedLayouts/SharedTEALayout";
import SharedLCALayout from "./components/sharedLayouts/SharedLCALayout";
import SharedSummaryLayout from "./components/sharedLayouts/SharedSummaryLayout";
import SharedSensitivityAnalysisLayout from "./components/sharedLayouts/SharedSensitivityAnalysisLayout";

//NOTE: auth section page imports
import NotFoundPage from "./pages/00_NotFoundPage";
import LoginPage    from "./pages/01_1LoginPage";
import ResetPwPg    from "./pages/01_2ResetPwPage";

//NOTE: home page import
import HomePage    from "./pages/02_1HomePage";

//NOTE: basic information section page imports
import BIInletPage       from "./pages/03_BasicInfo/03_1InletPage";
import BIOutletPage      from "./pages/03_BasicInfo/03_2OutletPage";
import BIBlocksPage      from "./pages/03_BasicInfo/03_3BlocksPage";
import BIAssumptionsPage from "./pages/03_BasicInfo/03_4AssumptionsPage";

//NOTE: tea section page imports
import TEACapexUnitDesignPage       from "./pages/04_Tea/04_1CapexUnitDesignPage";
import TEACapexPercentageMethodPage from "./pages/04_Tea/04_2CapexPercentageMethodPage";
import TEACapexResultsByUnitPage    from "./pages/04_Tea/04_3CapexResultsByUnitPage";
import TEACapexResultsSummaryPage   from "./pages/04_Tea/04_4CapexResultsSummaryPage";
import TEAOpexInputFeedPage         from "./pages/04_Tea/04_5OpexInputFeedPage";
import TEAOpexInputUtilityPage      from "./pages/04_Tea/04_6OpexInputUtilityPage";
import TEAOpexInputWastePage        from "./pages/04_Tea/04_7OpexInputWastePage";
import TEAOpexResultsByStreamPage   from "./pages/04_Tea/04_8OpexResultsByStreamPage";
import TEAOpexRevenueProductPage    from "./pages/04_Tea/04_9OpexRevenueProductPage";

//NOTE: lca section page imports
import LCAProjectInformation        from "./pages/05_Lca/05_1ProjectInformation";
import LCAImpactCategoryInformation from "./pages/05_Lca/05_2ImpactCategoryInformation";
import LCAInventoryAnalysisFeed     from "./pages/05_Lca/05_3InventoryAnalysisFeed";
import LCAInventoryAnalysisUtility  from "./pages/05_Lca/05_4InventoryAnalysisUtility";
import LCAInventoryAnalysisWaste    from "./pages/05_Lca/05_5InventoryAnalysisWaste";
import LCATransportData             from "./pages/05_Lca/05_6TransportData";
import LCAAnalysisByCoefficient     from "./pages/05_Lca/05_7AnalysisByCoefficient";
// import LCAFuelCombustion            from "./pages/05_Lca/05_8FuelCombustion";
import LCALifeCycleAssesment        from "./pages/05_Lca/05_9LifeCycleAssesment";
import LCASummaryOverview           from "./pages/05_Lca/05_10SummaryOverview";
import LCAAnalysisByMaterial        from "./pages/05_Lca/05_11AnalysisByMaterial";
import LCAAnalysisByCategory        from "./pages/05_Lca/05_12AnalysisByCategory";
import LCAAnalysisByManufacturingStage  from "./pages/05_Lca/05_13AnalysisByManufacturingStage";

//NOTE: summary section page imports
import SummaryCapex             from "./pages/06_Summary/06_1SummaryCapex";
import SummaryOpex              from "./pages/06_Summary/06_2SummaryOpex";
import SummaryCashflow          from "./pages/06_Summary/06_3SummaryCashflow";
import SummaryEconomicIndex     from "./pages/06_Summary/06_4SummaryEconomicIndex";
import SummarySummary           from "./pages/06_Summary/06_5SummarySummary";
// import SummaryProcess           from "./pages/06_Summary/06_6SummaryProcess";
// import SummaryManufacturingCost from "./pages/06_Summary/06_7SummaryManufacturingCost";

//NOTE: sensitivity analysis section page imports
import ParameterUncertaintyInput   from "./pages/07_SensitivityAnalysis/07_1ParameterUncertaintyInput";
import ParameterUncertaintyResults from "./pages/07_SensitivityAnalysis/07_2ParameterUncertaintyResults";
// import ModelScenarioInput          from "./pages/07_SensitivityAnalysis/07_3ModelScenarioInput";
// import ModelScenarioResults        from "./pages/07_SensitivityAnalysis/07_4ModelScenarioResults";

//NOTE: account settings page import
import AccountPage from "./pages/08_1AccountPage";

const homeAddress = isProductionMode? "lca-tea-app" : "/"

export default function App() {
  const { userToken } = useAuth()
  const reduxDispatch = useDispatch()

  useEffect(()=>{
    axios.get("https://api.exchangerate-api.com/v4/latest/USD")
    .then(response => {
      reduxDispatch(update_currency_rate(response.data.rates.KRW))
    }).catch((e) => {
      console.log("Could not load currency rate: "+e)
    })
  },[reduxDispatch])

  const loginUrl = isProductionMode? "lca-tea-app/login" : "login"
  
  if(!userToken.isLoading){
    return (
      <Routes>
        <Route path={homeAddress} element={<SharedHomeLayout/>}>
            <Route index element={<HomePage/>}/>
  
            <Route path="basic-info" element={<SharedBasicInfoLayout/>}>
              <Route path="aspen-info-streams-inlet"     element={<BIInletPage/>}/>
              <Route path="aspen-info-streams-outlet"    element={<BIOutletPage/>}/>
              <Route path="aspen-info-blocks-block-info" element={<BIBlocksPage/>}/>
              <Route path="basic-info-assumption"        element={<BIAssumptionsPage/>}/>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
  
            <Route path="tea" element={<SharedTEALayout/>}>
              <Route path="capex-unit-design"       element={<TEACapexUnitDesignPage/>}/>
              <Route path="capex-percentage-method" element={<TEACapexPercentageMethodPage/>}/>
              <Route path="capex-results-by-unit"   element={<TEACapexResultsByUnitPage/>}/>
              <Route path="capex-results-summary"   element={<TEACapexResultsSummaryPage/>}/>
              <Route path="opex-input-feed"         element={<TEAOpexInputFeedPage/>}/>
              <Route path="opex-input-utility"      element={<TEAOpexInputUtilityPage/>}/>
              <Route path="opex-input-waste"        element={<TEAOpexInputWastePage/>}/>
              <Route path="opex-results-by-stream"  element={<TEAOpexResultsByStreamPage/>}/>
              <Route path="opex-revenue-product"    element={<TEAOpexRevenueProductPage/>}/>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
  
            <Route path="lca" element={<SharedLCALayout/>}>
              <Route path="input-project-information"                        element={<LCAProjectInformation/>}/>
              <Route path="input-impact-category-information"                element={<LCAImpactCategoryInformation/>}/>
              <Route path="input-inventory-analysis-feed"                    element={<LCAInventoryAnalysisFeed/>}/>
              <Route path="input-inventory-analysis-utility"                 element={<LCAInventoryAnalysisUtility/>}/>
              <Route path="input-inventory-analysis-waste"                   element={<LCAInventoryAnalysisWaste/>}/>
              <Route path="input-transport-data"                             element={<LCATransportData/>}/>
              <Route path="results-impact-assesment-analysis-by-coefficient" element={<LCAAnalysisByCoefficient/>}/>
              {/* <Route path="results-impact-assesment-fuel-combustion"         element={<LCAFuelCombustion/>}/> */}
              <Route path="results-impact-assesment-life-cycle-assesment"    element={<LCALifeCycleAssesment/>}/>
              <Route path="results-summary-overview"                         element={<LCASummaryOverview/>}/>
              <Route path="results-summary-analysis-by-material"             element={<LCAAnalysisByMaterial/>}/>
              <Route path="results-summary-analysis-by-category"             element={<LCAAnalysisByCategory/>}/>
              <Route path="results-summary-analysis-by-manufacturing-stage"  element={<LCAAnalysisByManufacturingStage/>}/>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
  
            <Route path="summary" element={<SharedSummaryLayout/>}>
              <Route path="tea-capex"                     element={<SummaryCapex/>}/>
              <Route path="tea-opex"                      element={<SummaryOpex/>}/>
              <Route path="tea-cashflow"                  element={<SummaryCashflow/>}/>
              <Route path="tea-economic-index"            element={<SummaryEconomicIndex/>}/>
              <Route path="lca-summary"                   element={<SummarySummary/>}/>
              {/* <Route path="conclusion-process"            element={<SummaryProcess/>}/>
              <Route path="conclusion-manufacturing-cost" element={<SummaryManufacturingCost/>}/> */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
  
            <Route path="sensitivity-analysis" element={<SharedSensitivityAnalysisLayout/>}>
              <Route path="parameter-uncertainty-input"   element={<ParameterUncertaintyInput/>}/>
              <Route path="parameter-uncertainty-results" element={<ParameterUncertaintyResults/>}/>
              {/* <Route path="model-scenario-input"          element={<ModelScenarioInput/>}/>
              <Route path="model-scenario-results"        element={<ModelScenarioResults/>}/> */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
  
            <Route path="account" element={<AccountPage/>}/>
            
            <Route path="*" element={<NotFoundPage />} />
        </Route>
  
        <Route path={loginUrl}>
          <Route index element={<LoginPage/>}/>
          <Route path="reset" element={<ResetPwPg/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
  
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
  }else{
    return <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
  }
}


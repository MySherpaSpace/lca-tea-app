import { createSlice } from '@reduxjs/toolkit';
 
export const initAllowedLCAPagesObj = {
  inputProjectInformation: true,
  inputImpactCategoryInformation: false,
  inputInventoryAnalysisFeed: false,
  inputInventoryAnalysisUtility: false,
  inputInventoryAnalysisWaste: false,
  inputTransportData: false,
  resultsImpactAssesmentAnalysisByCoefficient: false,
  resultsImpactAssesmentFuelCombustion: false,
  resultsImpactAssesmentLifeCycleAssesment: false,
  resultsSummaryOverview: false,
  resultsSummaryAnalysisByMaterial: false,
  resultsSummaryAnalysisByCategory: false,
  resultsSummaryAnalysisByManufacturingStage: false,
}
 
export const allowedLCAPagesSlice = createSlice({
  name: 'allowedLCAPages',
  initialState: initAllowedLCAPagesObj,
  reducers: {
    reset_allowed_lca_pages: () => {
      return initAllowedLCAPagesObj
    },  
    update_allowed_lca_pages: (state, action) => {
      return {...state, ...action.payload}
    },
    update_allowed_lca_pages_for_dev_mode: () => {
      return {
        inputProjectInformation: true,
        inputImpactCategoryInformation: true,
        inputInventoryAnalysisFeed: true,
        inputInventoryAnalysisUtility: true,
        inputInventoryAnalysisWaste: true,
        inputTransportData: true,
        resultsImpactAssesmentAnalysisByCoefficient: true,
        // resultsImpactAssesmentFuelCombustion: true,
        resultsImpactAssesmentLifeCycleAssesment: true,
        resultsSummaryOverview: true,
        resultsSummaryAnalysisByMaterial: true,
        resultsSummaryAnalysisByCategory: true,
        resultsSummaryAnalysisByManufacturingStage: true,
      }
    }
  }
})
 
export const { 
  reset_allowed_lca_pages, update_allowed_lca_pages, update_allowed_lca_pages_for_dev_mode
} = allowedLCAPagesSlice.actions
 
export default allowedLCAPagesSlice.reducer
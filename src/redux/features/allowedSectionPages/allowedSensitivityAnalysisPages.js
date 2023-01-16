import { createSlice } from '@reduxjs/toolkit';
 
export const initAllowedSensitivityAnalysisPagesObj = {
  parameterUncertaintyInput: true,
  parameterUncertaintyResults: false,
  // modelScenarioInput: false,
  // modelScenarioResults: false,
}
 
export const allowedSensitivityAnalysisPagesSlice = createSlice({
  name: 'allowedSensitivityAnalysisPages',
  initialState: initAllowedSensitivityAnalysisPagesObj,
  reducers: {
    reset_allowed_sensitivity_analysis_pages: () => {
      return initAllowedSensitivityAnalysisPagesObj
    },  
    update_allowed_sensitivity_analysis_pages: (state, action) => {
      return {...state, ...action.payload}
    },
    update_allowed_sensitivity_analysis_pages_for_dev_mode: () => {
      return {
        parameterUncertaintyInput: true,
        parameterUncertaintyResults: true,
        // modelScenarioInput: true,
        // modelScenarioResults: true,
      }
    }
  }
})
 
export const { 
  reset_allowed_sensitivity_analysis_pages, update_allowed_sensitivity_analysis_pages, update_allowed_sensitivity_analysis_pages_for_dev_mode
} = allowedSensitivityAnalysisPagesSlice.actions
 
export default allowedSensitivityAnalysisPagesSlice.reducer
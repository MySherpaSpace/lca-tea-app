import { createSlice } from '@reduxjs/toolkit';
 
export const initSensitivityAnalysisObj = {
  parameterUncertaintyInput: [],
  parameterUncertaintyResults: []
};
 
export const sensitivityAnalysisSlice = createSlice({
  name: 'sensitivityAnalysis',
  initialState: initSensitivityAnalysisObj,
  reducers: {
    restore_sensitivity_analysis_obj: (state, action) => {
      return action.payload
    },
    update_sensitivity_analysis_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_sensitivity_analysis_obj: (state, action) => {
      return initSensitivityAnalysisObj
    },
    update_parameter_uncertainty_input: (state, action) => {
      return {...state, parameterUncertaintyInput: action.payload}
    },
    update_parameter_uncertainty_results: (state, action) => {
      return {...state, parameterUncertaintyResults: action.payload}
    }
  }
})
 
export const parameterUncertaintyInputRedux = (state) => state.sensitivityAnalysis.parameterUncertaintyInput
export const parameterUncertaintyResultsRedux = (state) => state.sensitivityAnalysis.parameterUncertaintyResults

export const { 
  restore_sensitivity_analysis_obj, update_sensitivity_analysis_obj, reset_sensitivity_analysis_obj,
  update_parameter_uncertainty_input, update_parameter_uncertainty_results
} = sensitivityAnalysisSlice.actions
 
export default sensitivityAnalysisSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
 
export const initTEACapexResultsSumaryObj = [];
 
export const TEACAPEXResultsSummarySlice = createSlice({
  name: 'TEACAPEXResultsSummary',
  initialState: initTEACapexResultsSumaryObj,
  reducers: {
    store_tea_capex_results_summary_obj: (state, action) => {
      return action.payload
    },
    reset_tea_capex_results_summary_obj: () => {
      return initTEACapexResultsSumaryObj
    }
  }
})
 
export const { store_tea_capex_results_summary_obj, reset_tea_capex_results_summary_obj } = TEACAPEXResultsSummarySlice.actions
 
export default TEACAPEXResultsSummarySlice.reducer
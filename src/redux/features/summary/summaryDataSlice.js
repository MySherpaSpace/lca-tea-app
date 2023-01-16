import { createSlice } from '@reduxjs/toolkit';
 
export const initSummaryDataSliceObj = {
  cashflow: [],
  economicIndex: [],
  lcaSummary: []
}
 
export const summaryDataSliceSlice = createSlice({
  name: 'summaryData',
  initialState: initSummaryDataSliceObj,
  reducers: {
    restore_summary_data_obj: (state, action) => {
      return action.payload
    },
    update_summary_data_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_summary_data_obj: () => {
      return initSummaryDataSliceObj
    },
    update_summary_cashflow_data: (state, action) => {
      return { ...state, cashflow: action.payload }
    },
    update_summary_economic_index_data: (state, action) => {
      return { ...state, economicIndex: action.payload }
    },
    update_summary_lca_summary_data: (state, action) => {
      return { ...state, lcaSummary: action.payload }
    },
  }
})

export const summaryLCASummaryRedux = (state) => state.summaryData.lcaSummary
 
export const { 
  restore_summary_data_obj, update_summary_data_obj, reset_summary_data_obj,
  update_summary_cashflow_data, update_summary_economic_index_data, update_summary_lca_summary_data
} = summaryDataSliceSlice.actions
 
export default summaryDataSliceSlice.reducer
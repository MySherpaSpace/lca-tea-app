import { createSlice } from '@reduxjs/toolkit';
 
export const initAllowedSummaryPagesObj = {
  summaryTEACapex: true,
  summaryTEAOpex: true,
  summaryTEACashflow: true,
  summaryTEAEconomicIndex: false,
  summaryLCASummary: false,
  // summaryConclusionProcess: false,
  // summaryConclusionManufacturingCost: false,
}
 
export const allowedSummaryPagesSlice = createSlice({
  name: 'allowedSummaryPages',
  initialState: initAllowedSummaryPagesObj,
  reducers: {
    reset_allowed_summary_pages: () => {
      return initAllowedSummaryPagesObj
    },  
    update_allowed_summary_pages: (state, action) => {
      return {...state, ...action.payload}
    },
    update_allowed_summary_pages_for_dev_mode: () => {
      return {
        summaryTEACapex: true,
        summaryTEAOpex: true,
        summaryTEACashflow: true,
        summaryTEAEconomicIndex: true,
        summaryLCASummary: true,
        // summaryConclusionProcess: true,
        // summaryConclusionManufacturingCost: true,
      }
    }
  }
})
 
export const { 
  reset_allowed_summary_pages, update_allowed_summary_pages, update_allowed_summary_pages_for_dev_mode
} = allowedSummaryPagesSlice.actions
 
export default allowedSummaryPagesSlice.reducer
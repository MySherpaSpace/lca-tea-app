import { createSlice } from '@reduxjs/toolkit';
 
export const initAllowedTEAPagesObj = {
  capexUnitDesign: true,
  capexPercentageMethod: false,
  capexResultsByUnit: false,
  capexResultsSummary: false,
  opexInputFeed: false,
  opexInputUtility: false,
  opexInputWaste: false,
  opexResultsByStream: false,
  opexRevenueProduct: false
}
 
export const allowedTEAPagesSlice = createSlice({
  name: 'allowedTEAPages',
  initialState: initAllowedTEAPagesObj,
  reducers: {
    reset_allowed_tea_pages: () => {
      return initAllowedTEAPagesObj
    },  
    update_allowed_tea_pages: (state, action) => {
      return {...state, ...action.payload}
    },
    update_allowed_tea_pages_for_dev_mode: () => {
      return {
        capexUnitDesign: true,
        capexPercentageMethod: true,
        capexResultsByUnit: true,
        capexResultsSummary: true,
        opexInputFeed: true,
        opexInputUtility: true,
        opexInputWaste: true,
        opexResultsByStream: true,
        opexRevenueProduct: true
      }
    }
  }
})
 
export const { 
  reset_allowed_tea_pages, update_allowed_tea_pages, update_allowed_tea_pages_for_dev_mode
} = allowedTEAPagesSlice.actions
 
export default allowedTEAPagesSlice.reducer
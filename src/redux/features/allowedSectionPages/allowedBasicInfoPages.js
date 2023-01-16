import { createSlice } from '@reduxjs/toolkit';
 
export const initAllowedBasicInfoPagesObj = {
  inlet: true,
  outlet: false,
  blockInfo: false,
  assumption: false
}
 
export const allowedBasicInfoPagesSlice = createSlice({
  name: 'allowedBasicInfoPages',
  initialState: initAllowedBasicInfoPagesObj,
  reducers: {
    reset_allowed_basic_info_pages: () => {
      return initAllowedBasicInfoPagesObj
    },  
    update_allowed_basic_info_pages: (state, action) => {
      return {...state, ...action.payload}
    },
    update_allowed_basic_info_pages_for_dev_mode: () => {
      return {
        inlet: true,
        outlet: true,
        blockInfo: true,
        assumption: true
      }
    }
  }
})
 
export const { 
  reset_allowed_basic_info_pages, update_allowed_basic_info_pages, update_allowed_basic_info_pages_for_dev_mode
} = allowedBasicInfoPagesSlice.actions
 
export default allowedBasicInfoPagesSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
 
export const initObjName = {
  inlet: [],
  outlet: [],
  blockInfo: [],
  assumption: null
};
 
export const basicInfoSlice = createSlice({
  name: 'basicInfo',
  initialState: initObjName,
  reducers: {
    restore_basic_info_obj: (state, action) => {
      return action.payload
    },
    update_basic_info_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_basic_info_obj: (state, action) => {
      return initObjName
    },
    update_bi_inlet_object: (state, action) => {
      return {...state, inlet: action.payload}
    },
    update_bi_outlet_object: (state, action) => {
      return {...state, outlet: action.payload}
    },
    update_bi_blockInfo_object: (state, action) => {
      return {...state, blockInfo: action.payload}
    },
    update_bi_assumption_object: (state, action) => {
      return {...state, assumption: action.payload}
    },
  }
})

export const biInletRedux = (state) => state.basicInfo.inlet
export const biOutletRedux = (state) => state.basicInfo.outlet
export const biBlockInfoRedux = (state) => state.basicInfo.blockInfo
export const biAssumptionRedux = (state) => state.basicInfo.assumption
 
export const { 
  restore_basic_info_obj, update_basic_info_obj, reset_basic_info_obj,
  update_bi_inlet_object, update_bi_outlet_object, update_bi_blockInfo_object,
  update_bi_assumption_object
} = basicInfoSlice.actions
 
export default basicInfoSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
 
export const initBasicInfoStreamClassObj = {
  u_inlet_strm: [],
  u_outlet_strm: [],
  heater: []
};
 
export const basicInfoStreamClassSlice = createSlice({
  name: 'basicInfoStreamClass',
  initialState: initBasicInfoStreamClassObj,
  reducers: {
    restore_basic_info_stream_class_obj: (state, action) => {
      return action.payload
    },
    update_basic_info_stream_class_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_basic_info_stream_class_obj: (state, action) => {
      return initBasicInfoStreamClassObj
    },
    update_basic_info_inlet_stream_class: (state, action) => {
      return {...state, u_inlet_strm: action.payload}
    },
    update_basic_info_outlet_stream_class: (state, action) => {
      return {...state, u_outlet_strm: action.payload}
    },
    update_basic_info_heater_info: (state, action) => {
      return {...state, heater: action.payload}
    }
  }
})
 
export const { 
  restore_basic_info_stream_class_obj, update_basic_info_stream_class_obj, reset_basic_info_stream_class_obj,
  update_basic_info_inlet_stream_class, update_basic_info_outlet_stream_class, update_basic_info_heater_info
} = basicInfoStreamClassSlice.actions
 
export default basicInfoStreamClassSlice.reducer
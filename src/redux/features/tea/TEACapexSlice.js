import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
 
export const initTEACapex = {
  input: [
    {
      project_id: null
    },
    { 
      unit_design: {
        COLUMN: [],
        INSTANTANEOUS: [],
        COMPRESSOR: [],
        PUMP: [],
        EXCHANGER: []
      }
    },
    {
      percentage_method: null
    }
  ],
  results: {
    unit_cost: {
      COLUMN: [],
      INSTANTANEOUS: [],
      COMPRESSOR: [],
      PUMP: [],
      EXCHANGER: []
    }
  }
};
 
export const TEACapexSlice = createSlice({
  name: 'TEACapex',
  initialState: initTEACapex,
  reducers: {
    restore_tea_capex_obj: (state, action) => {
      return action.payload
    },
    update_tea_capex_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_tea_capex_obj: () => {
      return initTEACapex
    },
    update_tea_capex_input_project_id: (state, action) => {
      let stateCopy = cloneDeep(state);
      let projectIdObj = stateCopy.input[0];

      projectIdObj["project_id"] = action.payload;

      return stateCopy
    },
    update_tea_capex_input_unit_design_obj: (state, action) =>{
      //send it in as {selectedDisplay, newValue}
      let selDisp = action.payload.selectedDisplay.toUpperCase()
      let stateCopy = cloneDeep(state);
      let unitDesignObj = stateCopy.input[1];

      unitDesignObj[selDisp] = action.payload.newValue;

      return stateCopy
    },
    update_tea_capex_input_percentage_method_obj: (state, action) =>{
      let stateCopy = cloneDeep(state);
      let percentageMethodObj = stateCopy.input[2];

      percentageMethodObj["percentage_method"] = action.payload;

      return stateCopy
    },
    update_tea_capex_results_obj: (state, action) =>{
      return { ...state, results: action.payload }
    }
  }
})
 
export const { 
  restore_tea_capex_obj, update_tea_capex_obj, reset_tea_capex_obj,
  update_tea_capex_input_project_id, update_tea_capex_input_unit_design_obj, update_tea_capex_input_percentage_method_obj,
  update_tea_capex_results_obj
} = TEACapexSlice.actions

export const teaCapexInputRedux = (state) => state.TEACapex.input
export const teaCapexInputPercentageMethodRedux = (state) => state.TEACapex.input[2].percentage_method;
export const teaCapexResultsRedux = (state) => state.TEACapex.results
 
export default TEACapexSlice.reducer
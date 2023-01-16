import { createSlice } from '@reduxjs/toolkit';
 
export const initLCAResultsObj = {
  fromServer: [],
  fromUser: []
};
 
export const LCAResultsSlice = createSlice({
  name: 'LCAResults',
  initialState: initLCAResultsObj,
  reducers: {
    restore_lca_results_obj: (state, action) => {
      return action.payload
    },
    update_lca_results_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_lca_results_obj: () => {
      return initLCAResultsObj
    },
    update_lca_results_from_server: (state, action)=>{
      return {...state, fromServer: action.payload}
    },
    update_lca_results_from_user: (state, action)=>{
      return {...state, fromUser: action.payload}
    },
  }
})
 
export const { 
  restore_lca_results_obj, update_lca_results_obj, reset_lca_results_obj, update_lca_results_from_server, update_lca_results_from_user
} = LCAResultsSlice.actions
 
export default LCAResultsSlice.reducer
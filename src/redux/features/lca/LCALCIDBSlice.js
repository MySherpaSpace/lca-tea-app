import { createSlice } from '@reduxjs/toolkit';
 
export const initLCALCIDB = []
 
export const LCALCIDBSlice = createSlice({
  name: 'LCALCIDB',
  initialState: initLCALCIDB,
  reducers: {
    restore_lca_lci_db_obj: (state, action) => {
      return action.payload
    },
    update_lca_lci_db_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_lca_lci_db_obj: () => {
      return initLCALCIDB
    }
  }
})
 
export const { 
  restore_lca_lci_db_obj, update_lca_lci_db_obj, reset_lca_lci_db_obj
} = LCALCIDBSlice.actions
 
export default LCALCIDBSlice.reducer
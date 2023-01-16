import { createSlice } from '@reduxjs/toolkit';
 
export const initAllowedTabsObj = {
  projectId: "",
  projectName: "",
  currencyRate: 1300,
  basicInfo: false,
  tea: false,
  lca: false,
  summary: false,
  sensitivityAnalysis: false,
  isNextTabAllowed: false
}
 
export const allowedTabsSlice = createSlice({
  name: 'allowedTabs',
  initialState: initAllowedTabsObj,
  reducers: {
    reset_allowed_tabs: () => {
      return initAllowedTabsObj
    },  
    update_is_next_tab_allowed: (state, action) => {
      return {...state, isNextTabAllowed: action.payload}
    },  
    update_allowed_tabs: (state, action) => {
      return {...state, ...action.payload}
    },
    update_selected_project_id: (state, action) => {
      return {...state, projectId: action.payload }
    },
    update_selected_project_name: (state, action) => {
      return {...state, projectName: action.payload }
    },
    update_currency_rate: (state, action) => {
      return {...state, currencyRate: action.payload}
    },
    update_allowed_tabs_for_dev_mode:(state, action)=>{
      return {
        ...state,
        basicInfo: true,
        tea: true,
        lca: true,
        summary: true,
        sensitivityAnalysis: true,
        isNextTabAllowed: true
      }
    }
  }
})

export const selectedProjectIdRedux = state => state.allowedTabs.projectId
export const selectedProjectNameRedux = state => state.allowedTabs.projectName
export const lastestCurrencyRateRedux = state => state.allowedTabs.currencyRate
 
export const { 
  reset_allowed_tabs, update_allowed_tabs, update_is_next_tab_allowed, update_selected_project_id, update_allowed_tabs_for_dev_mode,
  update_currency_rate, update_selected_project_name
} = allowedTabsSlice.actions
 
export default allowedTabsSlice.reducer
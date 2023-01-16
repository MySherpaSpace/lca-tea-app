import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
 
export const initLCAInputObj = {
  project_id: '',
  projectinfo: {
    qref:"",
    data_collection_from: "",
    data_collection_to: "",
    functional_value: 1,
    functional_unit: "",
    description:"",
    goalscope:""
  },
  method: {
    method_name: "",
    method_id: ""
  },
  impact_categories: [],
  processes: {
    feed: [],
    utility: [],
    waste: [],
    transport: []
  },
  flows: {
    fuelType: {},
    utility: []
  }
};
 
export const LCAInputSlice = createSlice({
  name: 'LCAInput',
  initialState: initLCAInputObj,
  reducers: {
    restore_lca_input_obj: (state, action) => {
      return action.payload
    },
    update_lca_input_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_lca_input_obj: () => {
      return initLCAInputObj
    },
    update_lca_input_project_id: (state, action) => {
      return {...state, project_id: action.payload}
    },
    update_lca_input_project_info: (state, action) => {
      return {...state, projectinfo: action.payload}
    },
    update_lca_input_method: (state, action) => {
      return {...state, method: action.payload}
    },
    update_lca_input_impact_categories: (state, action) => {
      return {...state, impact_categories: action.payload}
    },
    update_lca_input_processes_feed: (state, action) => {
      const newState = cloneDeep(state)
      const newStateProcesses = newState.processes
      const newStateFlows = newState.flows

      const finalState = {
        project_id: newState.project_id,
        projectinfo: newState.projectinfo,
        method: newState.method,
        impact_categories: newState.impact_categories,
        processes: {...newStateProcesses, feed: action.payload},
        flows: newStateFlows
      }

      return finalState
    },
    update_lca_input_processes_utility: (state, action) => {
      const newState = cloneDeep(state)
      const newStateProcesses = newState.processes
      const newStateFlows = newState.flows

      const finalState = {
        project_id: newState.project_id,
        projectinfo: newState.projectinfo,
        method: newState.method,
        impact_categories: newState.impact_categories,
        processes: {...newStateProcesses, utility: action.payload},
        flows: newStateFlows
      }

      return finalState
    },
    update_lca_input_processes_waste: (state, action) => {
      const newState = cloneDeep(state)
      const newStateProcesses = newState.processes
      const newStateFlows = newState.flows

      const finalState = {
        project_id: newState.project_id,
        projectinfo: newState.projectinfo,
        method: newState.method,
        impact_categories: newState.impact_categories,
        processes: {...newStateProcesses, waste: action.payload},
        flows: newStateFlows
      }

      return finalState
    },
    update_lca_input_processes_transport: (state, action) => {
      const newState = cloneDeep(state)
      const newStateProcesses = newState.processes
      const newStateFlows = newState.flows

      const finalState = {
        project_id: newState.project_id,
        projectinfo: newState.projectinfo,
        method: newState.method,
        impact_categories: newState.impact_categories,
        processes: {...newStateProcesses, transport: action.payload},
        flows: newStateFlows
      }

      return finalState
    },
    update_lca_input_flows: (state, action) => {//fuel
      const newState = cloneDeep(state)
      const newStateProcesses = newState.processes
      const newStateFlows = newState.flows

      const finalState = {
        project_id: newState.project_id,
        projectinfo: newState.projectinfo,
        method: newState.method,
        impact_categories: newState.impact_categories,
        processes: newStateProcesses,
        flows: {...newStateFlows, utility: action.payload}
      }

      return finalState
    },
    update_lca_input_flows_fuel_type: (state, action) => {//fuel
      const newState = cloneDeep(state)
      const newStateProcesses = newState.processes
      const newStateFlows = newState.flows

      const finalState = {
        project_id: newState.project_id,
        projectinfo: newState.projectinfo,
        method: newState.method,
        impact_categories: newState.impact_categories,
        processes: newStateProcesses,
        flows: {...newStateFlows, fuelType: action.payload}
      }

      return finalState
    },
  }
})

export const lcaInputAssesmentMethodRedux = (state) => state.LCAInput.method
export const lcaInputImpactCategoriesRedux = (state) => state.LCAInput.impact_categories
export const lcaInputFeedDataRedux = (state) => state.LCAInput.processes.feed
export const lcaInputUtilityDataRedux = (state) => state.LCAInput.processes.utility
export const lcaInputWasteDataRedux = (state) => state.LCAInput.processes.waste
export const lcaInputTransportDataRedux = (state) => state.LCAInput.processes.transport
export const lcaInputFuelDataRedux = (state) => state.LCAInput.flows.utility
export const lcaInputFuelTypeDataRedux = (state) => state.LCAInput.flows.fuelType
 
export const { 
  restore_lca_input_obj, update_lca_input_obj, reset_lca_input_obj, update_lca_input_project_id, update_lca_input_flows_fuel_type,
  update_lca_input_project_info, update_lca_input_method, update_lca_input_processes_feed, update_lca_input_processes_utility,
  update_lca_input_processes_waste, update_lca_input_processes_transport, update_lca_input_flows, update_lca_input_impact_categories
} = LCAInputSlice.actions
 
export default LCAInputSlice.reducer
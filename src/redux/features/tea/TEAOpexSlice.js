import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
 
export const initTEAOpex = {
  opex_unit: null,
  opex_cost: {
    feed: [],
    utility: [],
    waste: []
  },
  opex_revenue: {
    product: []
  }
};
 
export const TEAOpexSlice = createSlice({
  name: 'TEAOpex',
  initialState: initTEAOpex,
  reducers: {
    restore_tea_opex_obj: (state, action) => {
      return action.payload
    },
    update_tea_opex_obj: (state, action) => {
      return {...state, ...action.payload}
    },
    reset_tea_opex_obj: () => {
      return initTEAOpex
    },
    update_tea_opex_unit: (state, action) => {
      return {...state, opex_unit: action.payload}
    },
    update_tea_opex_cost_feed: (state, action) => {
      const newState = cloneDeep(state)
      const newStateUnit = newState.opex_unit
      const newStateCost = newState.opex_cost
      const newStateResults = newState.opex_results
      const newStateRevenue = newState.opex_revenue

      const finalState = {
        opex_unit: newStateUnit,
        opex_cost: {...newStateCost, feed: action.payload},
        opex_results: newStateResults,
        opex_revenue: newStateRevenue
      }

      return finalState
    },
    update_tea_opex_cost_utility: (state, action) => {
      const newState = cloneDeep(state)
      const newStateUnit = newState.opex_unit
      const newStateCost = newState.opex_cost
      const newStateResults = newState.opex_results
      const newStateRevenue = newState.opex_revenue

      const finalState = {
        opex_unit: newStateUnit,
        opex_cost: {...newStateCost, utility: action.payload},
        opex_results: newStateResults,
        opex_revenue: newStateRevenue
      }

      return finalState
    },
    update_tea_opex_cost_waste: (state, action) => {
      const newState = cloneDeep(state)
      const newStateUnit = newState.opex_unit
      const newStateCost = newState.opex_cost
      const newStateResults = newState.opex_results
      const newStateRevenue = newState.opex_revenue

      const finalState = {
        opex_unit: newStateUnit,
        opex_cost: {...newStateCost, waste: action.payload},
        opex_results: newStateResults,
        opex_revenue: newStateRevenue
      }

      return finalState
    },
    update_tea_opex_revenue_product: (state, action) => {
      const newState = cloneDeep(state)
      const newStateUnit = newState.opex_unit
      const newStateCost = newState.opex_cost
      const newStateResults = newState.opex_results
      const newStateRevenue = newState.opex_revenue

      const finalState = {
        opex_unit: newStateUnit,
        opex_cost: newStateCost,
        opex_results: newStateResults,
        opex_revenue: {...newStateRevenue, product: action.payload},
      }

      return finalState
    },
  }
})
 
export const { 
  restore_tea_opex_obj, update_tea_opex_obj, reset_tea_opex_obj, update_tea_opex_unit,
  update_tea_opex_cost_feed, update_tea_opex_cost_utility, update_tea_opex_cost_waste,
  update_tea_opex_revenue_product
} = TEAOpexSlice.actions

export const teaOpexUnitRedux = (state) => state.TEAOpex.opex_unit
export const teaOpexCostRedux = (state) => state.TEAOpex.opex_cost
export const teaOpexCostFeedRedux = (state) => state.TEAOpex.opex_cost.feed
export const teaOpexCostUtilityRedux = (state) => state.TEAOpex.opex_cost.utility
export const teaOpexCostWasteRedux = (state) => state.TEAOpex.opex_cost.waste
export const teaOpexRevenueProductRedux = (state) => state.TEAOpex.opex_revenue.product
 
export default TEAOpexSlice.reducer
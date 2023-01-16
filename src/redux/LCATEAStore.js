import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

// features
import projectsReducer from "./features/projectsSlice";

import allowedTabsReducer from "./features/allowedTabsSlice";
import allowedBasicInfoPagesReducer from "./features/allowedSectionPages/allowedBasicInfoPages";
import allowedTEAPagesReducer from "./features/allowedSectionPages/allowedTEAPages";
import allowedLCAPagesReducer from "./features/allowedSectionPages/allowedLCAPages";
import allowedSummaryPagesReducer from "./features/allowedSectionPages/allowedSummaryPages";
import allowedSensitivityAnalysisPagesReducer from "./features/allowedSectionPages/allowedSensitivityAnalysisPages";

import basicInfoReducer from "./features/basicInfo/basicInfoSlice";
import basicInfoStreamClassReducer from "./features/basicInfo/basicInfoStreamClassSlice";

import TEACapexReducer from "./features/tea/TEACapexSlice";
import TEACAPEXResultsSummaryReducer from "./features/tea/TEACapexResultsSummarySlice";
import TEAOpexReducer from "./features/tea/TEAOpexSlice";

import LCAInputReducer from "./features/lca/LCAInputSlice";
import LCALCIDBReducer from "./features/lca/LCALCIDBSlice";
import LCAResultsReducer from "./features/lca/LCAResultsSlice";

import summaryDataReducer from "./features/summary/summaryDataSlice";

import sensitivityAnalysisReducer from "./features/sensitivityAnalysis/sensitivityAnalysisSlicer";

// persist config obj
// blacklist a store attribute using it's reducer name. Blacklisted attributes will not persist. (I did not find a way to blacklist specific values)
const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  blacklist: [
    "LCALCIDB"
  ] //blacklisting a store attribute name, will not persist that store attribute.
};

const rootReducer = combineReducers({
  projects: projectsReducer,
  allowedTabs: allowedTabsReducer,
  allowedBasicInfoPages: allowedBasicInfoPagesReducer,
  allowedTEAPages: allowedTEAPagesReducer,
  allowedLCAPages: allowedLCAPagesReducer,
  allowedSummaryPages: allowedSummaryPagesReducer,
  allowedSensitivityAnalysisPages: allowedSensitivityAnalysisPagesReducer,

  basicInfo: basicInfoReducer, 
  basicInfoStreamClass: basicInfoStreamClassReducer, 

  TEACapex: TEACapexReducer, 
  TEAOpex: TEAOpexReducer,
  TEACAPEXResultsSummary: TEACAPEXResultsSummaryReducer,

  LCAInput: LCAInputReducer,
  LCALCIDB: LCALCIDBReducer, //TAG: blacklisted
  LCAResults: LCAResultsReducer,

  summaryData: summaryDataReducer,

  sensitivityAnalysis: sensitivityAnalysisReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const LCATEAStore = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: {
      warnAfter: 5000
    },
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      warnAfter: 5000
    },
  }),
});

export const LCATEAPersistor = persistStore(LCATEAStore);
export default LCATEAStore;
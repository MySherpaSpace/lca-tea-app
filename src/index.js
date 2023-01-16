import "./styling/css/index.css";
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";
import "bulma-accordion/dist/css/bulma-accordion.min.css";
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import 'bulma-list/css/bulma-list.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

//NOTE: Redux Settings
import { Provider as ReduxProvider } from "react-redux";

//NOTE: REDUX-PERSIST
import { PersistGate } from 'redux-persist/integration/react';

//NOTE: redux store
import LCATEAStore, { LCATEAPersistor } from "./redux/LCATEAStore";
 
const el = document.getElementById('root');
 
const root = ReactDOM.createRoot(el);

root.render(
  <BrowserRouter>
    <ReduxProvider store={LCATEAStore}>
      <PersistGate 
      loading={<div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>} 
      persistor={LCATEAPersistor}>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  </BrowserRouter>
);
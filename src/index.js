import React from 'react';
import ReactDOM from 'react-dom/client';

import HomePg from './screens/HomePg';
import ProjectInfoPg from './screens/LCA/LCA_01_ProjectInfo';
import ImpactCategPg from './screens/LCA/LCA_02_ImpactCateg';
 
const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return(
    <div>
      {/* <HomePage/> */}
      <ImpactCategPg/>
    </div>
  );
}
 
root.render(<App/>);
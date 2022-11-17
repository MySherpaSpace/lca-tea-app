import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import LoginPg from './screens/Global_01_Login';
import HomePg from './screens/Global_02_Home';
import ProjectInfoPg from './screens/LCA/LCA_01_ProjectInfo';
import ImpactCategPg from './screens/LCA/LCA_02_ImpactCateg';

import AppTopMenu from './components/AppTopMenu';
import LCASideMenu from './components/LCASideMenu';
 
const root = ReactDOM.createRoot(document.getElementById('root'));

const LCAPages = props => {
  return (
    <div className='section-container'>
      <div className="ui grid">
        <div className="four wide column">
          <LCASideMenu currentPage={props.currentPage} onPagePress={props.onPagePress}/>     
        </div> 
          
        <div className="twelve wide stretched column">
          {props.children}
        </div>
      </div>
    </div>
  );
}


function App() {
  const [currentMode, setCurrentMode] = useState("lca")
  const [currentPage, setCurrentPage] = useState("LCA_ProjectInfo")

  const handleModeChange = (event) => {
    if(event === "home"){
      setCurrentMode(event);
      setCurrentPage("Global_Home");
    }else if(event === "auth"){
      setCurrentMode(event);
      setCurrentPage("Global_Login");
    }else if(event === "lca"){
      setCurrentMode(event);
      setCurrentPage("LCA_ProjectInfo");
    }
  }

  const handlePageChange = (event) => setCurrentPage(event)

  const RenderAppPages = () => {
    if(currentMode === "auth"){
      return <LoginPg onLogin={handleModeChange}/>
    }else if(currentMode === "home"){
      return <HomePg onStart={handleModeChange}/>
    }else if(currentMode === "lca"){

      let ThisComp = () => <ProjectInfoPg/>

      if(currentPage === "LCA_ProjectInfo"){
        ThisComp = () => <ProjectInfoPg/>
      }else if(currentPage === "LCA_ImpactCateg"){
        ThisComp = () => <ImpactCategPg/>
      }else{
        ThisComp = () => <></>
      }

      return(
        <LCAPages currentPage={currentPage} onPagePress={handlePageChange}>
          <ThisComp/>
        </LCAPages>
      )
    }
  }

  const RenderTopMenu = () => {
    if(currentMode !== "auth"){
      return(
        <AppTopMenu 
        currentMode={currentMode}
        setCurrentMode={handleModeChange}
        currentPage={currentPage}          
        />
      );
    }

    return <></>
  }

  return (
    <div>
      <RenderTopMenu/>
      <RenderAppPages/>
    </div>
  );
}
 
root.render(<App/>);
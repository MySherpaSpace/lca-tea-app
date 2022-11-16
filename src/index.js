import React from 'react';
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
    <div className="section-container">
      <div className="ui two column grid">
        <div className="ui three wide column">
          <LCASideMenu currentPage={props.currentPage} onPagePress={props.onPagePress}/>
        </div>          
        
        <div className="ui thirteen wide column">
          {props.children}
        </div>
      </div>
    </div>
  );
}

class App extends React.Component {
  //app modes -> auth, home, newProject, basicInfo, lca, tea, summary, sensitivityAnalysis
  state = {currentMode: "auth", currentPage: "Global_Login"}//"LCA_01_ProjectInfo"}

  renderAppPages() {
    if(this.state.currentMode === "auth"){
      return <LoginPg onLogin={this.handleModeChange.bind(this)}/>
    }else if(this.state.currentMode === "home"){
      return <HomePg onStart={this.handleModeChange.bind(this)}/>
    }else if(this.state.currentMode === "lca"){

      let thisComp = () => <ProjectInfoPg/>

      if(this.state.currentPage === "LCA_ProjectInfo"){
        thisComp = () => <ProjectInfoPg/>
      }else if(this.state.currentPage === "LCA_ImpactCateg"){
        thisComp = () => <ImpactCategPg/>
      }else{
        thisComp = () => <div/>
      }

      return(
        <LCAPages currentPage={this.state.currentPage} onPagePress={this.handlePageChange.bind(this)}>
          <div>{thisComp()}</div>
        </LCAPages>
      )
    }
  }

  handleModeChange = (event) => {
    if(event === "home"){
      this.setState({currentMode: event, currentPage: "Global_Home"})
    }else if(event === "auth"){
      this.setState({currentMode: event, currentPage: "Global_Login"})
    }
    else if(event === "lca"){
      this.setState({currentMode: event, currentPage: "LCA_ProjectInfo"})
    }
  }

  handlePageChange = (event) => {
    this.setState({currentPage: event})
  }

  render() {
    return(
      <div>
        {this.state.currentMode !== "auth"&&(
          <AppTopMenu 
          currentMode={this.state.currentMode}
          setCurrentMode={this.handleModeChange.bind(this)}
          currentPage={this.state.currentPage}          
          />
        )}
        <div>{this.renderAppPages()}</div>
      </div>
    );
  }
}
 
root.render(<App/>);
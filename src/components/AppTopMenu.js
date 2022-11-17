import React from 'react';

//// removed from <a> tags href="/lca-tea-app">
 
const AppTopMenu = ({ currentMode, currentPage, setCurrentMode }) => {

  const isSaveVisible = () => {
    return (
      currentMode === "lca" && (
         currentPage === "LCA_ProjectInfo" ||  currentPage === "LCA_ImpactCateg" ||
         currentPage === "LCA_Feed" ||  currentPage === "LCA_Utility" ||  currentPage === "LCA_Waste" || 
         currentPage === "LCA_TransportData" ||  currentPage === "LCA_AnalysisByCoe"
      )
    )
  }

  const isExportVisible =  currentMode === "lca";

  const isResetVisible = () => {
    return (
       currentMode === "lca" && (
         currentPage === "LCA_ProjectInfo" ||  currentPage === "LCA_ImpactCateg" ||
         currentPage === "LCA_Feed" ||  currentPage === "LCA_Utility" ||  currentPage === "LCA_Waste" || 
         currentPage === "LCA_TransportData"
      )
    );
  }
  const isRunVisible =  currentMode === "lca" &&  currentPage === "LCA_TransportData";

  const onSetCurrentModePress = (modeName) =>  setCurrentMode(modeName)

  const LowerMenuTab = ({ title }) => {

    const onThisPress = () => onSetCurrentModePress(title)
    return (
      <a 
        className={ currentMode.toLowerCase() === title.toLowerCase() ?"active header item":"item"} 
        style={{flex:1, justifyContent: "center"}} 
        onClick={onThisPress}
      > 
        {title}
      </a>
    );
  }

  const onExitPress = () => {
    if(window.confirm("Are you sure you want to exit?")){
      alert("Logged out!")
      onSetCurrentModePress("auth")
    }    
  }

  const onHomePress = () => onSetCurrentModePress("home")

  const SmallTab = () => <span>&nbsp;</span>

  return(
    <div>
      <div className='ui secondary menu'>
        <a className='item'><i className="user small icon"></i><SmallTab/>Account</a>
        { currentMode !== "home" && <a className='item' onClick={onHomePress}><i className="home small icon"></i><SmallTab/>Home</a>}
        {isExportVisible && <a className='item'><i className="download small icon"></i><SmallTab/>Export</a>}
        {isSaveVisible() && <a className='item'><i className="save small icon"></i><SmallTab/>Save</a>}

        <div className='right menu'>
          {isRunVisible && <a className='item'><i className="play small icon"></i><SmallTab/>Run</a>}
          {isResetVisible() && <a className='item'><i className="redo small icon"></i><SmallTab/>Reset</a>}
          <a className='item' onClick={onExitPress}><i className="sign out alternative small icon"></i><SmallTab/>Exit</a>
        </div>
      </div>

      {! currentPage.includes("Global") && (
        <div className="ui tabular menu">
          <div className="ui fluid container">
            <LowerMenuTab title={"Basic Information"} onPress={onSetCurrentModePress}/>
            <LowerMenuTab title={"TEA"} onPress={onSetCurrentModePress}/>
            <LowerMenuTab title={"LCA"} onPress={onSetCurrentModePress}/>
            <LowerMenuTab title={"Summary"} onPress={onSetCurrentModePress}/>
            <LowerMenuTab title={"Sensitivity Analysis"} onPress={onSetCurrentModePress}/>
          </div>
        </div>
      )}
    </div>
  );
}

AppTopMenu.defaultProps = {
  currentPage: "",
  currentMode: "lca",
  setCurrentMode: () => {}
}
 
export default AppTopMenu;
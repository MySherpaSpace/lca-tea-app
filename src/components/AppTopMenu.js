import React from 'react';
 
const AppTopMenu = (props) => {

  const isSaveVisible = () => {
    return (
     props.currentMode === "lca" && (
        props.currentPage === "LCA_ProjectInfo" || props.currentPage === "LCA_ImpactCateg" ||
        props.currentPage === "LCA_Feed" || props.currentPage === "LCA_Utility" || props.currentPage === "LCA_Waste" || 
        props.currentPage === "LCA_TransportData" || props.currentPage === "LCA_AnalysisByCoe"
      )
    )
  }

  const isExportVisible = props.currentMode === "lca";

  const isResetVisible = () => {
    return (
      props.currentMode === "lca" && (
        props.currentPage === "LCA_ProjectInfo" || props.currentPage === "LCA_ImpactCateg" ||
        props.currentPage === "LCA_Feed" || props.currentPage === "LCA_Utility" || props.currentPage === "LCA_Waste" || 
        props.currentPage === "LCA_TransportData"
      )
    );
  }
  const isRunVisible = props.currentMode === "lca" && props.currentPage === "LCA_TransportData";

  const TopMenuTab = ({iconName, title, onPress}) => {
    const onThisPress = () => onPress(title.toLowerCase())
    return (
      <a className="item" onClick={onThisPress} href="/#">
        <i className={`${iconName} icon`}></i> {title}
      </a>
    );
  }

  const TopMenuAction = ({iconName, title, onPress}) => {
    const onThisPress = () => onPress(title)
    return (
      <a className="item" onClick={onThisPress} href="/#">
        <i className={`${iconName} icon`}></i> {title}
      </a>
    );
  }

  const LowerMenuTab = ({title}) => {
    const onThisPress = () => onSetCurrentModePress(title)
    return (
      <a 
        className={props.currentMode.toLowerCase() === title.toLowerCase() ?"active header item":"item"} 
        style={{flex:1, justifyContent: "center"}} 
        onClick={onThisPress}
        href="/#"
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

  const onSetCurrentModePress = (modeName) => {
    props.setCurrentMode(modeName)
  }

  return(
    <div>
      <div className="ui menu">
        <div className="ui fluid container">
          <div className="left menu">
            <TopMenuTab iconName="user" title="Account" onPress={onSetCurrentModePress}/>
            {props.currentMode !== "home" && (
              <TopMenuTab iconName="home" title="Home" onPress={onSetCurrentModePress}/>
            )}

            {isSaveVisible() && ( 
              <TopMenuAction iconName="save" title="Save" onPress={()=>{}}/>
            )}

            {isExportVisible && (
              <TopMenuAction iconName="download" title="Export" onPress={()=>{}}/>
            )}
          </div>

          <div className="right menu">
            {isRunVisible && (
              <TopMenuAction iconName="play" title="Run" onPress={()=>{}}/>
            )}

            {isResetVisible() && (
              <TopMenuAction iconName="redo" title="Reset" onPress={()=>{}}/>
            )}

            <TopMenuTab iconName="sign out alternate" title="Exit" onPress={onExitPress}/>

          </div>
        </div>    
      </div>
      {!props.currentPage.includes("Global") && (
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
import React from 'react';
 
const AppTopMenu = (props) => {

  const isSaveVisible = () => {
    return (
     props.selectedMode === "lca" && (
        props.selectedPage === "projectInformation" || props.selectedPage === "impactCategorySelection" ||
        props.selectedPage === "feed" || props.selectedPage === "utility" || props.selectedPage === "waste" || 
        props.selectedPage === "transportData" || props.selectedPage === "analysisByCoefficient"
      )
    )
  }

  const isExportVisible = props.selectedMode === "lca";

  const isResetVisible = () => {
    return (
      props.selectedMode === "lca" && (
        props.selectedPage === "projectInformation" || props.selectedPage === "impactCategorySelection" ||
        props.selectedPage === "feed" || props.selectedPage === "utility" || props.selectedPage === "waste" || 
        props.selectedPage === "transportData"
      )
    );
  }
  const isRunVisible = props.selectedMode === "lca" && props.selectedPage === "transport data";

  const TopMenuTab = ({iconName, title, onPress}) => {
    const onThisPress = () => onPress()
    return (
      <a className="item" onClick={onThisPress}>
        <i className={`${iconName} icon`}></i> {title}
      </a>
    );
  }

  const LowerMenuTab = ({title}) => {
    const onThisPress = () => props.onModePress(title)
    return (
      <a 
        className={props.selectedMode.toLowerCase() === title.toLowerCase() ?"active header item":"item"} 
        style={{flex:1, justifyContent: "center"}} 
        onClick={onThisPress}
      > 
        {title}
      </a>
    );
  }

  return(
    <div>
      <div className="ui menu">
        <div className="ui fluid container">
          <div className="left menu">
            <TopMenuTab iconName="user" title="Account" onPress={()=>{}}/>
            <TopMenuTab iconName="home" title="Home" onPress={()=>{}}/>

            {isSaveVisible() && ( 
              <TopMenuTab iconName="save" title="Save" onPress={()=>{}}/>
            )}

            {isExportVisible && (
              <TopMenuTab iconName="download" title="Export" onPress={()=>{}}/>
            )}
          </div>

          <div className="right menu">
            {isRunVisible && (
              <TopMenuTab iconName="play" title="Run" onPress={()=>{}}/>
            )}

            {isResetVisible() && (
              <TopMenuTab iconName="redo" title="Reset" onPress={()=>{}}/>
            )}

            <TopMenuTab iconName="sign out alternate" title="Exit" onPress={()=>{}}/>

          </div>
        </div>    
      </div>
      <div className="ui tabular menu">
        <div className="ui fluid container">
          <LowerMenuTab title={"Basic Information"}/>
          <LowerMenuTab title={"TEA"}/>
          <LowerMenuTab title={"LCA"}/>
          <LowerMenuTab title={"Summary"}/>
          <LowerMenuTab title={"Sensitivity Analysis"}/>
        </div>
      </div>
    </div>
  );
}

AppTopMenu.defaultProps = {
  selectedMode: "lca",
  selectedPage: "projectInformation",
  onModePress: (txt) => console.log(txt)
}
 
export default AppTopMenu;
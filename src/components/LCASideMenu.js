import React, { useEffect, useState } from 'react';
 
const LCASideMenu = (props) => {

  const [isInputMenuExpanded, setIsInputMenuExpanded] = useState(true)
  const [isInventoryAnalysisExpanded, setIsInventoryAnalysisExpanded] = useState(false)
  const [isResultMenuExpanded, setIsResultMenuExpanded] = useState(false)
  const [isImpactAssesmentMenuExpanded, setIsImpactAssesmentMenuExpanded] = useState(false)
  const [isSummaryMenuExpanded, setIsSummaryMenuExpanded] = useState(false)

  const AccordionMenu = ({children, title, isExpanded, onExpand}) => {
    const onThisPress = () => onExpand(prev => !prev);

    return(
      <div>
        <div className={isExpanded? "title active":"title"} onClick={onThisPress}>
          <i className="dropdown icon"></i>
          {title}
        </div>
        <div className={isExpanded? "active content":"content"}>
          {children}
        </div>
      </div>
    );
  }

  const MenuItem = ({title, alias}) => {

    const onThisPress = () => {
      props.onPagePress(alias)
    }

    return (
      <div className={props.currentPage === alias? "title active":"title"} onClick={onThisPress}>
        <p style={{color: props.currentPage === alias? "#0E6EB8":"#A0A0A0"}}>{title}</p>
      </div>
    )
  }

  return (
    <div className="ui styled accordion">

      <AccordionMenu title="Input" isExpanded={isInputMenuExpanded} onExpand={setIsInputMenuExpanded}>
        <MenuItem title="Project Information" alias="LCA_ProjectInfo" />
        <MenuItem title="Impact Category Selection" alias="LCA_ImpactCateg" />

        <AccordionMenu title="Inventory Analysis" isExpanded={isInventoryAnalysisExpanded} onExpand={setIsInventoryAnalysisExpanded}>
          <MenuItem title="Feed" alias="LCA_Feed" />
          <MenuItem title="Utility" alias="LCA_Utility" />
          <MenuItem title="Waste" alias="LCA_Waste" />
        </AccordionMenu>

        <MenuItem title="Transport Data" alias="LCA_TransportData" />
      </AccordionMenu>

      <AccordionMenu title="Result" isExpanded={isResultMenuExpanded} onExpand={setIsResultMenuExpanded}>

        <AccordionMenu title="Impact Assesment" isExpanded={isImpactAssesmentMenuExpanded} onExpand={setIsImpactAssesmentMenuExpanded}>
          <MenuItem title="Analysis By Coefficient" alias="LCA_AnalysisByCoe" />
          <MenuItem title="Fuel Combustion" alias="LCA_FuelCombustion" />
          <MenuItem title="Life Cycle Assessment" alias="LCA_LifeCycleAsses" />
        </AccordionMenu>

        <AccordionMenu title="Summary" isExpanded={isSummaryMenuExpanded} onExpand={setIsSummaryMenuExpanded}>
          <MenuItem title="Overview" alias="LCA_Overview" />
          <MenuItem title="Analysis By Material" alias="LCA_AnalysisByMate" />
          <MenuItem title="Analysis By Category" alias="LCA_AnalysisByCate" />
          <MenuItem title="Analysis By Manufacturing Stage" alias="LCA_AnalysisByManu" />
        </AccordionMenu>

      </AccordionMenu>
    </div>
  );
}

LCASideMenu.defaultProps = {
  currentPage: "projectInformation",
  onPagePress: (item) => console.log(item)
}
 
export default LCASideMenu;
import React, { useEffect, useState } from 'react';
 
const LCASideMenu = (props) => {

  const [isInputMenuExpanded, setIsInputMenuExpanded] = useState(true)
  const [isInventoryAnalysisExpanded, setIsInventoryAnalysisExpanded] = useState(false)
  const [isResultMenuExpanded, setIsResultMenuExpanded] = useState(false)
  const [isImpactAssesmentMenuExpanded, setIsImpactAssesmentMenuExpanded] = useState(false)
  const [isSummaryMenuExpanded, setIsSummaryMenuExpanded] = useState(false)

  const [currentPage, setCurrentPage] = useState(props.selectedPage)

  useEffect(()=> setCurrentPage(props.selectedPage),[props.selectedPage])

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
      setCurrentPage(alias)
      props.onPagePress(alias)
    }

    return (
      <div className={currentPage === alias? "title active":"title"} onClick={onThisPress}>
        <p style={{color: currentPage === alias? "#0E6EB8":"#A0A0A0"}}>{title}</p>
      </div>
    )
  }

  return (
    <div className="ui styled accordion">

      <AccordionMenu title="Input" isExpanded={isInputMenuExpanded} onExpand={setIsInputMenuExpanded}>
        <MenuItem title="Project Information" alias="projectInformation" />
        <MenuItem title="Impact Category Selection" alias="impactCategorySelection" />

        <AccordionMenu title="Inventory Analysis" isExpanded={isInventoryAnalysisExpanded} onExpand={setIsInventoryAnalysisExpanded}>
          <MenuItem title="Feed" alias="feed" />
          <MenuItem title="Utility" alias="utility" />
          <MenuItem title="Waste" alias="waste" />
        </AccordionMenu>

        <MenuItem title="Transport Data" alias="transportData" />
      </AccordionMenu>

      <AccordionMenu title="Result" isExpanded={isResultMenuExpanded} onExpand={setIsResultMenuExpanded}>

        <AccordionMenu title="Impact Assesment" isExpanded={isImpactAssesmentMenuExpanded} onExpand={setIsImpactAssesmentMenuExpanded}>
          <MenuItem title="Analysis By Coefficient" alias="analysisByCoefficient" />
          <MenuItem title="Fuel Combustion" alias="fuelCombustion" />
          <MenuItem title="Life Cycle Assessment" alias="lifeCycleAssessment" />
        </AccordionMenu>

        <AccordionMenu title="Summary" isExpanded={isSummaryMenuExpanded} onExpand={setIsSummaryMenuExpanded}>
          <MenuItem title="Analysis By Material" alias="analysisByMaterial" />
          <MenuItem title="Analysis By Category" alias="analysisByCategory" />
          <MenuItem title="Analysis By Manufacturing Stage" alias="analysisByManufacturingStage" />
        </AccordionMenu>

      </AccordionMenu>
    </div>
  );
}

LCASideMenu.defaultProps = {
  selectedPage: "projectInformation",
  onPagePress: (item) => console.log(item)
}
 
export default LCASideMenu;
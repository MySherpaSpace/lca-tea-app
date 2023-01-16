import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AssesmentMethodsList from "../../utils/AssesmentMethods";

import { getNavURL } from "../../utils/appConstants";
import { formatHomeTableDataForExport } from "../../utils/appUtils";

import { update_allowed_lca_pages } from "../../redux/features/allowedSectionPages/allowedLCAPages";
import { update_lca_input_impact_categories, update_lca_input_method } from "../../redux/features/lca/LCAInputSlice";

import AppPageLayout from "../../components/AppPageLayout";
import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";

const getSelectedElements = (list) => {
  let listOfSelected = []
  list.forEach(cat => {
    if(cat.selected){
      listOfSelected.push(cat)
    }
  })
  return listOfSelected
}

function LCAImpactCategoryInformation() {
  const reduxDispatch = useDispatch()
  const navigate = useNavigate()

  const AllowedPages = useSelector(state => state.allowedLCAPages);

  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const [selectedAssesment, setSelectedAssesment] = useState(AssesmentMethodsList[0])
  const [availableImpactCategories, setAvailableImpactCategories] = useState(AssesmentMethodsList[0].impact_categories)
  const [selectedCategories, setSelectedCategories] = useState(getSelectedElements(AssesmentMethodsList[0].impact_categories))

  useEffect(()=>{
    if(!AllowedPages.inputImpactCategoryInformation){
      navigate(-1);
    }
  },[AllowedPages, navigate])

  const handleAssesmentMethodSelect = (event) => {
    const newAssesment = JSON.parse(event.target.value)
    setSelectedAssesment(newAssesment)
    setAvailableImpactCategories(newAssesment.impact_categories)

    const listOfSelected = getSelectedElements(newAssesment.impact_categories)
    // console.log(listOfSelected);
    setSelectedCategories(listOfSelected)
  }

  const handleOnImpactCategorySelection = (catObj) => {
    if(catObj.selected){
      //remove from selected items list
      const newSelectedItems = selectedCategories.filter(cat => cat.category !== catObj.category)
      setSelectedCategories(newSelectedItems);

      //set this item as false in available list
      const updatedAvailableItems = availableImpactCategories.map((cat) => {
        if (cat.category === catObj.category) {
          return { ...cat, selected: false };
        }
    
        return cat;
      });
    
      setAvailableImpactCategories(updatedAvailableItems);
    }else{
      //add in selected items list
      setSelectedCategories([...selectedCategories, catObj]);

      //set this item as true in available list
      const updatedAvailableItems = availableImpactCategories.map((cat) => {
        if (cat.category === catObj.category) {
          return { ...cat, selected: true };
        }
    
        return cat;
      });
      setAvailableImpactCategories(updatedAvailableItems);
    }
  }

  const getTableDataForExport = () => {
    setShowLoadingScreen(true)

    let finalSelectedList = []

    if(selectedCategories.length>0){
      selectedCategories.forEach(cat => {
        finalSelectedList.push(cat.category)
      })
    }

    let thisData = [
      {
        rowHeader: "Assesment Method",
        columns: [{colValue: selectedAssesment.method_name}]
      },
      {
        rowHeader: "Impact Categories",
        columns: [{colValue: finalSelectedList.join(",")}]
      },
    ]
    const thisExportData = formatHomeTableDataForExport(thisData)
    setShowLoadingScreen(false)
    return thisExportData
  }

  const handleImpactCategoryInfoSaveClick = () => {
    setShowLoadingScreen(true)

    const newObj = {
      method_name: selectedAssesment.method_name,
      method_id: selectedAssesment.method_uuid,
    }

    setShowLoadingScreen(false)
    // console.log(newObj);
    const nextUrl = getNavURL("/lca/input-inventory-analysis-feed");
    reduxDispatch(update_allowed_lca_pages({inputInventoryAnalysisFeed: true}))
    reduxDispatch(update_lca_input_method(newObj))
    reduxDispatch(update_lca_input_impact_categories(selectedCategories))
    navigate(nextUrl)
  }

  const handleDataReset = () => {
    setSelectedAssesment(AssesmentMethodsList[0])
    setAvailableImpactCategories(AssesmentMethodsList[0].impact_categories)
    setSelectedCategories([])
  }

  const renderedCheckboxes = availableImpactCategories.map((cat, catIdx)=>{
    const handleCheckboxChange = () => handleOnImpactCategorySelection(cat)
    return(
      <label className="checkbox my-1" key={catIdx}>
        <input type="checkbox" className="mr-2" checked={cat.selected} onChange={handleCheckboxChange}/>
        {cat.category}
      </label>
    )
  })

  const renderedDropdownOptions = AssesmentMethodsList.map((assMethod)=> {
    return <option key={assMethod.method_uuid} value={JSON.stringify(assMethod)}>{assMethod.method_name}</option>
  })

  const exportFileName = `LCA-Input-Project-Information-Export (${new Date().toISOString()})`

  if(!showLoadingScreen){
    return(
      <div>
        <AppPageLayout sideMenu={<LCASideMenu/>}>
          <EditorTopMenu 
          downloadType="table" 
          onDownload={getTableDataForExport} 
          fileName={exportFileName} 
          onReset={handleDataReset}
          onSave={handleImpactCategoryInfoSaveClick}
          />

          <div className="mr-4">
            <div className="box">
              <div className="field">
                <label className="label">Assesment Method</label>
                <div className="control"> 
                  <div className="select is-primary">
                    <select value={JSON.stringify(selectedAssesment)} onChange={handleAssesmentMethodSelect}>
                      {renderedDropdownOptions}
                    </select>
                  </div>
                </div>
              </div>

              <div className="block"/>
              
              <div className="field">
                <label className="label">Impact Categories</label>
              </div>
              <div className="notification">
                <div className="is-flex is-flex-direction-column">
                  {renderedCheckboxes}
                </div>
              </div>
            </div>
          </div>

          <div className='block'/>
          
        </AppPageLayout>
      </div>
    );
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default LCAImpactCategoryInformation;
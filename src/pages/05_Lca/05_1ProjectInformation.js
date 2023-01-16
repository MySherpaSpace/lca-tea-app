import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getNavURL } from "../../utils/appConstants";
import { formatHomeTableDataForExport } from "../../utils/appUtils";

import { selectedProjectIdRedux } from "../../redux/features/allowedTabsSlice";
import { update_allowed_lca_pages } from "../../redux/features/allowedSectionPages/allowedLCAPages";
import { update_lca_input_project_id, update_lca_input_project_info } from "../../redux/features/lca/LCAInputSlice";

import AlertModal from "../../components/AlertModal";
import AppPageLayout from "../../components/AppPageLayout";
import LCASideMenu from "../../components/sideMenus/LCASideMenu";
import EditorTopMenu from "../../components/EditorTopMenu";

function LCAProjectInformation() {
  const reduxDispatch = useDispatch()
  const navigate = useNavigate()

  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const SelectedProjectId = useSelector(selectedProjectIdRedux);

  const todayToDateString = new Date().toLocaleString('en-CA').split(",")[0]
  // console.log(todayToDateString)
  const [quantitativeRef, setQuantitativeRef] = useState("")
  const [periodOfDataCollectionFrom, setPeriodOfDataCollectionFrom] = useState(todayToDateString)
  const [periodOfDataCollectionTo, setPeriodOfDataCollectionTo] = useState(todayToDateString)
  const [functionalValue, setFunctionalValue] = useState(1)
  const [functionalUnit, setFunctionalUnit] = useState("kg")
  const [description, setDescription] = useState("")
  const [goalAndScopeDefinition, setGoalAndScopeDefinition] = useState("")

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)
  const [alertModalButtons, setAlertModalButtons] = useState(null)

  useEffect(()=>{
    reduxDispatch(update_lca_input_project_id(SelectedProjectId))
  },[reduxDispatch, SelectedProjectId])

  const alertModalOpen = (title, content, buttons) => {
    setAlertModalButtons(buttons)
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  const handleQuantitativeRefInput = (e) => setQuantitativeRef(e.target.value);
  const handlePeriodOfDataCollectionFromInput = (e) => setPeriodOfDataCollectionFrom(e.target.value);
  const handlePeriodOfDataCollectionToInput = (e) => setPeriodOfDataCollectionTo(e.target.value);
  const handleFunctionalValueInput = (e) => setFunctionalValue(e.target.value);
  const handleFunctionalUnitInput = (e) => setFunctionalUnit(e.target.value);
  const handleDescriptionInput = (e) => setDescription(e.target.value);
  const handleGoalAndScopeDefinitionInput = (e) => setGoalAndScopeDefinition(e.target.value);

  const getTableDataForExport = () => {
    setShowLoadingScreen(true)
    let thisData = [
      {
        rowHeader: "Quantitative Reference",
        columns: [{colValue: quantitativeRef}]
      },
      {
        rowHeader: "Period of Data Collection",
        columns: [{colValue: periodOfDataCollectionFrom}, {colValue: periodOfDataCollectionTo}]
      },
      {
        rowHeader: "Functional Unit",
        columns: [{colValue: functionalValue}, {colValue: functionalUnit}]
      },
      {
        rowHeader: "Description",
        columns: [{colValue: description}]
      },
      {
        rowHeader: "Goal and Scope Definition",
        columns: [{colValue: goalAndScopeDefinition}]
      }
    ]
    const thisExportData = formatHomeTableDataForExport(thisData)
    setShowLoadingScreen(false)
    return thisExportData
  }

  const handleProjectInfoSaveClick = () => {
    if(!quantitativeRef){
      alertModalOpen("Quantitative Reference is a required input", "Enter value and try again.")
      return;
    }
    if(typeof new Date(periodOfDataCollectionFrom).getMonth !== "function"){
      alertModalOpen("Period of Data Collection From is a required input", "Enter value and try again.")
      return;
    }
    if(typeof new Date(periodOfDataCollectionTo).getMonth !== "function"){
      alertModalOpen("Period of Data Collection To is a required input", "Enter value and try again.")
      return;
    }
    if(functionalValue == null || functionalValue === "" || functionalValue <= 0){
      const thisText = (functionalValue == null || functionalValue === "")? "It's not a number" : "Needs to be larger than 0"
      alertModalOpen(`Functional Value error`, thisText)
      return;
    }
    if(!functionalUnit){
      alertModalOpen("Functional unit is a required input", "Enter value and try again.")
      return;
    }
    if(!description){
      alertModalOpen("Description is a required input", "Enter value and try again.")
      return;
    }
    if(!goalAndScopeDefinition){
      alertModalOpen("Goal and Scope Definition is a required input", "Enter value and try again.")
      return;
    }

    setShowLoadingScreen(true)
    saveProjectInfoData()
  }

  const saveProjectInfoData = () => {
    const newProjectInfoObj = {
      qref:quantitativeRef,
      data_collection_from: periodOfDataCollectionFrom.replace(/-/g,"."),
      data_collection_to: periodOfDataCollectionTo.replace(/-/g,"."),
      functional_value: functionalValue,
      functional_unit: functionalUnit,
      description:description,
      goalscope:goalAndScopeDefinition
    }

    setShowLoadingScreen(false)
    // console.log(newProjectInfoObj);
    const nextUrl = getNavURL("/lca/input-impact-category-information");
    reduxDispatch(update_allowed_lca_pages({inputImpactCategoryInformation: true}))
    reduxDispatch(update_lca_input_project_info(newProjectInfoObj))
    navigate(nextUrl)
  }

  const handleDataReset = () => {
    setQuantitativeRef("")
    setPeriodOfDataCollectionFrom(todayToDateString)
    setPeriodOfDataCollectionTo(todayToDateString)
    setFunctionalValue(1)
    setFunctionalUnit("kg")
    setDescription("")
    setGoalAndScopeDefinition("")
  }

  const alertModal = (
    <AlertModal
    buttons={alertModalButtons}
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );

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
          onSave={handleProjectInfoSaveClick}
          />

          {showAlertModal && alertModal}

          <div className="mr-4">
            <div className="box">
              <div className="field">
                <label className="label">Quantitative Reference</label>
                <div className="control">
                  <input className="input" type="text" value={quantitativeRef} onChange={handleQuantitativeRefInput}/>
                </div>
              </div>
              <div className='block'/>

              <div className="field">
                <label className="label">Period of Data Collection</label>
              </div>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">From</label>
                  </div>
                  <div className="field">
                    <label className="label">To</label>
                  </div>
                </div>  
              </div>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input className="input bulmaCalendar" type="date" value={periodOfDataCollectionFrom} max={periodOfDataCollectionTo} onChange={handlePeriodOfDataCollectionFromInput}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input className="input bulmaCalendar" type="date" value={periodOfDataCollectionTo} min={periodOfDataCollectionFrom} onChange={handlePeriodOfDataCollectionToInput}/>
                    </div>
                  </div>
                </div>  
              </div>

              <div className='block'/>

              <div className="field">
                <label className="label">Functional Unit</label>
              </div>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input className="input" min={1} type="number" value={functionalValue} onChange={handleFunctionalValueInput}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input className="input" type="text" value={functionalUnit} onChange={handleFunctionalUnitInput}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className='block'/>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input className="input" type="text" value={description} onChange={handleDescriptionInput}/>
                </div>
              </div>

              <div className='block'/>

              <div className="field">
                <label className="label">Goal & Scope Definition</label>
                <div className="control">
                  <input className="input" type="text" value={goalAndScopeDefinition} onChange={handleGoalAndScopeDefinitionInput}/>
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
 
export default LCAProjectInformation;
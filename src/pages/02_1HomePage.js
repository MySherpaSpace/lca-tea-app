import "./02_1HomePage.css";

import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

import { VscFileSubmodule } from "react-icons/vsc";
import { AiOutlineLineChart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import ProjectCard from "../components/ProjectCard";
import AlertModal from "../components/AlertModal";

import { formatDigit } from "../utils/appUtils";
import { httpPaths, allowServerComm, getNavURL, isProductionMode } from "../utils/appConstants";

import useAuth from "../hooks/use-auth";
import { 
  reset_allowed_tabs, update_allowed_tabs, update_allowed_tabs_for_dev_mode, update_is_next_tab_allowed, update_selected_project_id, 
  update_selected_project_name 
} from "../redux/features/allowedTabsSlice";

import { BIInOuletSample } from "../utils/testData";
import { restore_projects, create_project, update_project_by_id, delete_project_by_id } from "../redux/features/projectsSlice";
import { update_bi_inlet_object, update_bi_outlet_object } from "../redux/features/basicInfo/basicInfoSlice";
import { reset_allowed_basic_info_pages, update_allowed_basic_info_pages_for_dev_mode } from "../redux/features/allowedSectionPages/allowedBasicInfoPages";
import { reset_allowed_tea_pages, update_allowed_tea_pages_for_dev_mode } from "../redux/features/allowedSectionPages/allowedTEAPages";
import { reset_allowed_lca_pages, update_allowed_lca_pages_for_dev_mode } from "../redux/features/allowedSectionPages/allowedLCAPages";
import { reset_allowed_sensitivity_analysis_pages, update_allowed_sensitivity_analysis_pages_for_dev_mode } from "../redux/features/allowedSectionPages/allowedSensitivityAnalysisPages";
import { reset_allowed_summary_pages, update_allowed_summary_pages_for_dev_mode } from "../redux/features/allowedSectionPages/allowedSummaryPages";


function HomePage() {
  const { userToken } = useAuth();
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [pageState, setPageState] = useState(0) //0: home, 1:new project, 2: start
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)

  const alertModalOpen = (title, content) => {
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  const Projects = useSelector(state => state.projects);

  const restoreProjects = useCallback((list) => reduxDispatch(restore_projects(list)), [reduxDispatch]);
  const createProject = useCallback((newProject) => reduxDispatch(create_project(newProject)), [reduxDispatch]);
  const deleteProjectById = useCallback((id) => reduxDispatch(delete_project_by_id(id)), [reduxDispatch]);
  const updateProjectById = useCallback((id) => reduxDispatch(update_project_by_id(id)), [reduxDispatch]);

  const handleProjectTitleInput = (event) => {
    setProjectTitle(event.target.value)
  }

  const handleProjectDescriptionInput = (event) => {
    setProjectDescription(event.target.value)
  }
  
  const handleProjectFileSubmit = async(event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file.name);
  }

  const onBackPress = () => {
    if(pageState ===1){
      setSelectedFile(null)
      setProjectTitle("")
      setProjectDescription("")
    }
    setPageState(0)
  }

  const extractFileName = (name="") => {
    if(name !== ""){
      let nameArr = name.split("/")

      if(nameArr.length>0){
        return nameArr[nameArr.length-1]
      }

      return name
    }
    return name
  }

  const handleNewProjectSave = (e) => {
    e.preventDefault();

    if(projectTitle === ""){
      alertModalOpen("Title is required")
      return;
    }

    if(!selectedFile){
      alertModalOpen("File missing")
      return;
    }

    let newMsg = {
      project_name: projectTitle,
      project_description: projectDescription,
      file_name: extractFileName(selectedFile),
      email: userToken?.email,
      // path: selectedFile.path,
    }

    const resetNewValues = () => {
      setProjectTitle("")
      setProjectDescription("")
      setSelectedFile(null)
    }

    if(allowServerComm){
      setShowLoadingScreen(true)
      // axios.post(httpPaths["createProject"], newMsg)
      axios.post(httpPaths["createProject"], newMsg)
      .then(()=>{
        alertModalOpen("Successfully created project!")
        resetNewValues()
        setPageState(0)
        setShowLoadingScreen(false)
      }).catch(e => {
        alert("Error on save new project: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      let msgCopy = cloneDeep(newMsg)
      delete newMsg.email;
      delete newMsg.path;
      delete newMsg.file_name;

      let today = new Date();

      createProject({
        ...msgCopy,
        project_id: uuidv4(),
        createtime: `${today.getFullYear()}.${formatDigit(today.getMonth()+1)}.${formatDigit(today.getDate())}`
      })
      alertModalOpen("Successfully created project!")
      resetNewValues()
      setPageState(0)
      setShowLoadingScreen(false)
    }
  }
   
  const handleProjectEdit = (obj) => {    
    setShowLoadingScreen(true)
    let newMsg = {
      email: userToken?.email,
      project_id: obj.id,
      projectId: obj.Id,
      project_name: obj.title,
      project_description: obj.description,
    }
    
    if(allowServerComm){
      axios.put(httpPaths["editProject"], newMsg)
      .then((response)=>{
        const resp = response.data.replace(/\/$/, "")
        obj = JSON.parse(resp);
        // console.log(obj);
        if(obj.result === "valid"){
          updateProjectById({
            project_id: obj.id,
            ...newMsg
          })
          alertModalOpen("Project updated")
          setShowLoadingScreen(false)
        }else{
          alertModalOpen("Could not update project", "Try again later")
          setShowLoadingScreen(false)
        }
      }).catch(e => {
        alert("Error on project edit: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      updateProjectById({
        project_id: obj.id,
        ...newMsg
      })
      setShowLoadingScreen(false)
    }
  }

  const handleProjectDelete = (id,Id,obj) => {
    if(allowServerComm){
      setShowLoadingScreen(true)
      let msg = {
        email: userToken?.email,
        project_id: id,
        projectId: Id
      }
      axios.put(httpPaths["deleteProject"], msg)
      .then((response)=>{
        const resp = response.data.replace(/\/$/, "")
        obj = JSON.parse(resp);
        // console.log(obj);
        if(obj.result === "valid"){
          deleteProjectById({project_id: id})
          setShowLoadingScreen(false)
          alertModalOpen("Project deleted")
        }else{
          alertModalOpen("Could not delete project", "Try again later")
          setShowLoadingScreen(false)
        }
      }).catch(e => {
        alert("Error on project delete: "+e)
        setShowLoadingScreen(false)
      })
    }else{
      deleteProjectById({project_id: id})
    }
  }
  
  const handleGoToStartPageClick = () => {
    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.post(httpPaths["getProjects"], { email: userToken?.email })
      .then((response)=>{
        restoreProjects(response.data)
        setPageState(2)
        setShowLoadingScreen(false)
      }).catch(e => {
        alert("Error on project fetch: "+e)
        setPageState(2)
        setShowLoadingScreen(false)
      })  
    }else{
      setPageState(2)
    }
  }

  const handleProjectStart = (id, name) => {

    setShowLoadingScreen(true)
    const nextUrl = getNavURL("/basic-info/aspen-info-streams-inlet")
    if(isProductionMode){
      reduxDispatch(update_is_next_tab_allowed(false))

      reduxDispatch(reset_allowed_tabs())
      reduxDispatch(reset_allowed_basic_info_pages())
      reduxDispatch(reset_allowed_tea_pages())
      reduxDispatch(reset_allowed_lca_pages())
      reduxDispatch(reset_allowed_summary_pages())
      reduxDispatch(reset_allowed_sensitivity_analysis_pages())
    }else{
      reduxDispatch(update_allowed_tabs_for_dev_mode())
      reduxDispatch(update_allowed_basic_info_pages_for_dev_mode())
      reduxDispatch(update_allowed_tea_pages_for_dev_mode())
      reduxDispatch(update_allowed_lca_pages_for_dev_mode())
      reduxDispatch(update_allowed_summary_pages_for_dev_mode())
      reduxDispatch(update_allowed_sensitivity_analysis_pages_for_dev_mode())
    }
    
    if(allowServerComm){
      axios.post(httpPaths["inOutletStream"], { project_id: id })
      .then((response)=>{
        setPageState(0)
        setShowLoadingScreen(false)
        reduxDispatch(update_selected_project_id(id))
        reduxDispatch(update_selected_project_name(name))
        reduxDispatch(update_allowed_tabs({basicInfo: true}))
        reduxDispatch(update_bi_inlet_object(response.data[0]? response.data[0].u_inlet_strm: []))
        reduxDispatch(update_bi_outlet_object(response.data[1]? response.data[1].u_outlet_strm: []))
        navigate(nextUrl)
      }).catch(e => {
        alert("Error on start: "+ e)
        setShowLoadingScreen(false)
      })
    }else{
      reduxDispatch(update_selected_project_id(id))
      reduxDispatch(update_selected_project_name(name))
      reduxDispatch(update_allowed_tabs({basicInfo: true}))
      reduxDispatch(update_bi_inlet_object(BIInOuletSample[0].u_inlet_strm))
      reduxDispatch(update_bi_outlet_object(BIInOuletSample[1].u_outlet_strm))
      setShowLoadingScreen(false)
      navigate(nextUrl)
    }
  }

  const alertModal = (
    <AlertModal 
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );

  const renderedProjects =   
  // console.log("Projects ",Projects.length,pageState)
  // if(pageState === 2){
  Projects.map((project)=>{
    // console.log("prjt ",project)
    return(
      <ProjectCard
        key={project.project_id}
        title={project.project_name} 
        description={project.project_description} 
        created={project.createtime}
        Id={project.projectId}
        id={project.project_id}
        onStart={handleProjectStart}
        onDelete={handleProjectDelete}
        onEdit={handleProjectEdit}
      />
    )
  })//}

  if(!showLoadingScreen){
    if(pageState === 0){
      return(
        <div className="container content has-text-centered">
          <div className="block"/>

          {showAlertModal && alertModal}
          <div className="features">
            <div className="columns is-mobile is-centered has-text-centered">
              <div className="column is-half">
                <div className="box">
                  <VscFileSubmodule className="icon has-text-primary is-large mb-3"/>
                  <button className="button is-primary" onClick={() => setPageState(1)}>New Project</button>
                </div>
              </div>
    
              <div className="column is-half">
                <div className="box">
                  <AiOutlineLineChart className="icon has-text-info is-large mb-3"/>
                  <button className="button is-info" onClick={handleGoToStartPageClick}>Select Project</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return(
        <div>
          <div className="block"/>
          {showAlertModal && alertModal}
          <div className="columns is-centered">
            <div className="column is-three-quarters">
              <div onClick={onBackPress}>
                <button className="button mb-5">Back</button>
              </div>
  
              {pageState === 1&&(
                <form className="box" onSubmit={handleNewProjectSave}>
                  <div className="field">
                    <label className="label">Title <span className="has-text-danger">*</span></label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Project Title" value={projectTitle} onChange={handleProjectTitleInput}/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Project Description" value={projectDescription} onChange={handleProjectDescriptionInput}/>
                    </div>
                  </div>
                  <div className="file has-name is-justify-content-space-between mt-5">
                    <label className="file-label">

                      <input id="filetest" className="file-input" type="file" name="start file" onChange={handleProjectFileSubmit} accept=".bkp"/> {/*  */}
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                          Choose a file<span className="has-text-danger">&nbsp;*</span>
                        </span>
                      </span>
                      <span className="file-name">
                        {selectedFile? extractFileName(selectedFile):"No file selected"}
                      </span>
                    </label>
                    <button className="button is-primary">Save</button>
                  </div>
                </form>
              )}
              {pageState === 2&&(
                <>
                  {Projects.length>0? (
                    <div className="list has-overflow-ellipsis has-visible-pointer-controls">
                      {renderedProjects}                  
                    </div>
                  ):(
                    <>
                      <div className="block"/>
                      <div className="columns is-centered">
                        <div className="column is-three-quarters has-text-centered">
                          <h1 className="title">No Projects Found</h1>
                          <p className="subtitle">Create a new project to start</p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )
    }
  }else{
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default HomePage;
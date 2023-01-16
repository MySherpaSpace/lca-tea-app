import { Link, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import useAuth from "../hooks/use-auth";

import { update_allowed_tabs, update_is_next_tab_allowed } from "../redux/features/allowedTabsSlice";

import HanhwaLogo from "../img/hanhwa-logo.svg";

import { programmaticTabNav, homeAddress, tabHomePages, getNavURL, isProductionMode } from "../utils/appConstants";

function NavTopBar() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const location = useLocation();

  const AllowedTabs = useSelector(state => state.allowedTabs)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleHamburguerMenu = () => setIsMenuOpen(prev => !prev)

  const { userToken, onLogout } = useAuth();

  const handleLogout = () => onLogout()

  const accountUrl = getNavURL("/account");

  const handleNextTabClick = () => {
    let currentLocation = location.pathname;
    let compareString = currentLocation.split("/")[1]
    if(isProductionMode) compareString = currentLocation.split("/")[2]

    // console.log(compareString);

    if(compareString.includes("basic-info")){
      if(programmaticTabNav){reduxDispatch(update_allowed_tabs({basicInfo: false, tea: true}))}
      navigate(tabHomePages["tea"])

    }else if(compareString.includes("tea")){
      if(programmaticTabNav){reduxDispatch(update_allowed_tabs({tea: false, lca: true}))}
      navigate(tabHomePages["lca"])

    }else if(compareString.includes("lca")){
      if(programmaticTabNav){reduxDispatch(update_allowed_tabs({lca: false, summary: true}))}
      navigate(tabHomePages["summary"])

    }else if(compareString.includes("summary")){
      if(programmaticTabNav){reduxDispatch(update_allowed_tabs({summary: false, sensitivityAnalysis: true}))}
      navigate(tabHomePages["sensitivityAnalysis"])

    }else if(compareString.includes("sensitivity-analysis")){
      if(programmaticTabNav){reduxDispatch(update_allowed_tabs({sensitivityAnalysis: false}))}
      navigate(homeAddress)

    }else{
      navigate(homeAddress)
    }

    if(programmaticTabNav){
      reduxDispatch(update_is_next_tab_allowed(false))
    }
  }

  const handlePrevTabClick = () => {
    let currentLocation = location.pathname;
    let compareString = currentLocation.split("/")[1]
    if(isProductionMode) compareString = currentLocation.split("/")[2]

    // console.log(compareString)

    if(compareString.includes("basic-info")){
      navigate(homeAddress)

    }else if(compareString.includes("tea")){
      navigate(tabHomePages["basicInfo"])

    }else if(compareString.includes("lca")){
      navigate(tabHomePages["tea"])

    }else if(compareString.includes("summary")){
      navigate(tabHomePages["lca"])

    }else if(compareString.includes("sensitivity-analysis")){
      navigate(tabHomePages["summary"])

    }else{
      navigate(homeAddress)
    }
  } 

  const DisplayText = ({label, link}) => {
    const currentLocation = location.pathname
    let compareString = currentLocation.split("/")[1]
    if(isProductionMode) compareString = currentLocation.split("/")[2]

    const displaytextClassName = classNames(
      "navbar-item is-italic",
      compareString.includes(link) && "has-text-link"
    );

    return(
      <div className={displaytextClassName}>
        {label}
      </div>
    );
  }

  const SectionNavButtons = () => {
    if(AllowedTabs.isNextTabAllowed || !programmaticTabNav){
      return(
        <div className="buttons ml-4">
          {/* TAG: Prev Tab Button */}
          {!location.pathname.includes("basic-info") && !isProductionMode &&(
            <button className="button is-primary" onClick={handlePrevTabClick}>
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-arrow-left"></i>
                </span>
                <span>Prev Section</span>
              </span>
            </button>
          )}
          {/* TAG: Next Tab Button */}
          <button className="button is-primary" onClick={handleNextTabClick}>
            <span className="icon-text">
              <span>Next Section</span>
              <span className="icon">
                <i className="fas fa-arrow-right"></i>
              </span>
            </span>
          </button>
        </div>
      );
    }else{
      return <></>
    }
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <img src={HanhwaLogo} width="112" height="28" alt="Hanhwa company logo"/>
        </div>

        <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"  onClick={toggleHamburguerMenu}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isMenuOpen && "is-active"}`}>
        <div className="navbar-start">
          {!(location.pathname === homeAddress) &&(
            <>
            <Link className="navbar-item" to={homeAddress}>
              Home
            </Link>

            {!(location.pathname === accountUrl)&&(
              <>
              <DisplayText label="Basic Information" link="basic-info"/> 
              <DisplayText label="TEA" link={"tea"}/> 
              <DisplayText label="LCA" link={"lca"}/> 
              <DisplayText label="Summary" link={"summary"}/> 
              <DisplayText label="Sensitivity Analysis" link={"sensitivity-analysis"}/> 
              </>
            )}

            <SectionNavButtons/>
          </>
          )}
        </div>

        <div className="navbar-end">          
          {location.pathname !== accountUrl &&(
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Account
              </div>

              <div className="navbar-dropdown is-right">
                <Link className="navbar-item" to={accountUrl}>Information</Link>
                <Link className="navbar-item has-text-danger" onClick={handleLogout}>Log Out</Link>
                <hr className="navbar-divider"/>
                <div className="navbar-item">{userToken?.email}</div>
              </div>              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavTopBar;
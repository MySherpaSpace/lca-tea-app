import "./01_1LoginPage.css";

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";

import axios from "axios";

import HanhwaLogo from "../img/hanhwa-logo.svg"
import AuthLoading from "../components/AuthLoading";
import { httpPaths, allowServerComm, homeAddress, getNavURL } from "../utils/appConstants";
import { processServerResponse } from "../utils/appUtils";
import AlertModal from "../components/AlertModal";

function ResetPwPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = useState("");
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)
  const [alertModalButtons, setAlertModalButtons] = useState(null)

  const alertModalOpen = (title, content, buttons) => {
    setAlertModalButtons(buttons)
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  let from = location.state?.from?.pathname || homeAddress;

  function handleSubmit(event) {
    event.preventDefault();

    if(!userEmail){
      alertModalOpen("Please input email")
      return;
    }

    if(allowServerComm){
      setShowLoadingScreen(true)

      axios.put(httpPaths["resetPw"], {email: userEmail})
      .then((response)=> {
        setShowLoadingScreen(false)
        let isOk = processServerResponse(response)
  
        if(!isOk){
          alertModalOpen("User not found")
        }else{
          alertModalOpen("Check your email for instructions")
          navigate(from, { replace: true });
        }
  
      }).catch(e => {
        alert("Error: "+e)
        setShowLoadingScreen(false)
      });
    }else{
      alertModalOpen("Check your email for instructions", "", [{
        title: "Ok",
        style: "default",
        onClick: () =>  navigate(from, { replace: true })
      }]);
    }
  }

  const handleEmailInput = (event) => {
    setUserEmail(event.target.value)
  }

  const handleCancelClick = () => {
    setShowLoadingScreen(false)
  }
  const loginUrl = getNavURL("/login");

  const alertModal = (
    <AlertModal
    buttons={alertModalButtons}
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );
  
  return(
    <div className="columns is-mobile is-centered is-vcentered">
      <div className="column is-two-fifths">
      {showAlertModal && alertModal}
        <div className="card">
        
          {!showLoadingScreen? (
            <>
              <div className="has-text-centered">
                <img src={HanhwaLogo} alt="Hanhwa logo" className="auth-page-logo"/>
                <p className="title is-5 mt-5">LCA-TEA Platform</p>
              </div>

              <div className="card-content">
                <div className="content">
                  
                  <div className="has-text-centered">
                    We will send instructions to your email on how to reset your password
                  </div>
                  <div className="block"/>

                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input className="input" type="email" placeholder="name@mail.com" value={userEmail} onChange={handleEmailInput}/>
                      </div>
                    </div>

                    <div className="has-text-centered">
                      <button className="button is-primary">Send Email</button>
                    </div>
                  </form>
                </div>
              </div>

              <footer className="card-footer has-text-centered">
                <Link to={loginUrl} className="card-footer-item">Go Back</Link>   
              </footer>
            </>
          ):(
            <AuthLoading onCancelClick={handleCancelClick}/>
          )}

        </div>
      </div>
    </div>
  );
}
 
export default ResetPwPage;
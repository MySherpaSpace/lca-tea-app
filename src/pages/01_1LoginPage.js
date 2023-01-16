import "./01_1LoginPage.css";

import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import { httpPaths, allowServerComm, getNavURL } from "../utils/appConstants";
import { processServerResponse } from "../utils/appUtils";

import axios from "axios";

import useAuth from "../hooks/use-auth";

import HanhwaLogo from "../img/hanhwa-logo.svg"
import AuthLoading from "../components/AuthLoading";
import AlertModal from "../components/AlertModal";

function LoginPage() {
  const { onLogin } = useAuth();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [rememberLogin, setRememberLogin] = useState(false);
  const [isPwOk, setIsPwOk] = useState(null)

  const [isSignUp, setIsSignUp] = useState(false)

  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)

  const alertModalOpen = (title, content) => {
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  useEffect(()=>{
    if(userPassword && userConfirmPassword){
      if(userPassword === userConfirmPassword){
        setIsPwOk(true)
      }else{
        setIsPwOk(false)
      }
    }else{
      setIsPwOk(null)
    }

  },[userPassword, userConfirmPassword])

  const handleSubmit = (event) => {
    event.preventDefault();

    //if one of them is empty
    if(!userEmail || !userPassword){
      alertModalOpen("Enter email and password");
      return;
    }


    let postAddress = httpPaths["login"]

    if(isSignUp){
      if(!userConfirmPassword){
        alertModalOpen("Enter confirm password");
        return;
      }

      if(userPassword.length<=6){
        alertModalOpen("Password should be at least 6 characters");
        return;
      }

      if(userPassword !== userConfirmPassword){
        alertModalOpen("Password and confirm password do not match");
        return;
      }

      postAddress = httpPaths["signUp"]
    }

    let msg = {
      email: userEmail, password: userPassword
    }

    if(allowServerComm){
      setShowLoadingScreen(true);

      axios.post(postAddress, msg)
      .then((response)=>{
        setShowLoadingScreen(false)
  
        let isOk = processServerResponse(response)
  
        if(!isOk){
          if(!isSignUp){
            alertModalOpen("Login details don't match!")
          }else{
            alertModalOpen("User already exists!")
          }
        }else{
          if(!isSignUp){//on login
            onLogin({...msg, remember: rememberLogin})
          }else{//on sign up
            alertModalOpen("Successfully created account! Please log in")
  
            setUserEmail("")
            setUserPassword("")
            setUserConfirmPassword("")
            setIsSignUp(false)
          }
        }
      }).catch(e => {
        alert(`Error on ${isSignUp? "sign up":"log in"}: ${e}`)
        setShowLoadingScreen(false)
      });  
    }else{
      if(!isSignUp){//on login
        onLogin({...msg, remember: rememberLogin})
      }else{//on sign up
        alertModalOpen("Successfully created account! Please log in")
        setUserEmail("")
        setUserPassword("")
        setUserConfirmPassword("")
        setIsSignUp(false)
      }
    }
  }

  const handleEmailInput = (event) => {
    setUserEmail(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setUserPassword(event.target.value)
  }

  const handleConfirmPasswordInput = (event) => {
    setUserConfirmPassword(event.target.value)
  }

  const handleSignUpToggle = () => {
    setIsSignUp(prev => !prev)
  }

  const handleCheckboxchange = (e) => {
    let isChecked = e.target.checked;
    setRememberLogin(isChecked);
  }

  const handleCancelClick = () => {
    setShowLoadingScreen(false)
  }

  const resetUrl = getNavURL("/login/reset");

  const alertModal = (
    <AlertModal
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
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input className="input" type="email" placeholder="name@mail.com" value={userEmail} onChange={handleEmailInput}/>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input className={(isSignUp && userPassword!=="" &&userPassword.length<=6)? "input is-danger" :"input"} type="password" placeholder="********" value={userPassword} onChange={handlePasswordInput}/>
                      </div>
                      {(isSignUp && userPassword!=="" &&userPassword.length<=6)&&(<p className="help is-danger">Password should be at least 6 characters</p>)}
                      {!isSignUp &&(
                        <div className="container is-flex is-justify-content-space-between is-align-items-center mt-2">
                          <label className="checkbox">
                            <input type="checkbox" className="mr-2" onChange={handleCheckboxchange}/>
                            Keep me logged in
                          </label>
                          <Link to={resetUrl} className="is-underlined">Forgot password?</Link>
                        </div>
                      )}
                    </div>

                    {isSignUp &&(
                      <>
                      <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className={`control`}>
                          <input className={`input ${isPwOk===false&&"is-danger"}`} type="password" placeholder="********" value={userConfirmPassword} onChange={handleConfirmPasswordInput}/>
                        </div>
                        {(isPwOk === false)&&(<p className="help is-danger">Passwords do not match</p>)}
                      </div>
                      </>
                    )}

                    <div className="has-text-centered">
                      <button className="button is-primary">{isSignUp? "SignUp" : "Login"}</button>
                    </div>
                  </form>
                </div>
              </div>

              <footer className="card-footer has-text-centered">
                <Link  onClick={handleSignUpToggle} className="card-footer-item">
                  {isSignUp? `Already have an account?\nLogin` :`Don't have an account?\nSign Up`}
                </Link>   
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
 
export default LoginPage;
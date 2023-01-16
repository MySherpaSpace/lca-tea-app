import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { MdEdit } from "react-icons/md";

import axios from "axios";

import useAuth from "../hooks/use-auth";
import { allowServerComm, httpPaths } from "../utils/appConstants";

import AlertModal from "../components/AlertModal";

function AccountPage() {
  const navigate = useNavigate();
  const { userToken, onLogout, updatePassword, updateEmail } = useAuth();

  const [pageMode, setPageMode] = useState("overview")
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)

  const [isPasswordOk, setIsPasswordOk] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const handleCurrentPasswordInput = (event) => setCurrentPassword(event.target.value)

  const [newEmail, setNewEmail] = useState("")
  const handleNewEmailInput = (event) => setNewEmail(event.target.value)
  const [confirmEmail, setConfirmEmail] = useState("")
  const handleConfirmEmailInput = (event) => setConfirmEmail(event.target.value)

  const [newPassword, setNewPassword] = useState("")
  const handleNewPasswordInput = (event) => setNewPassword(event.target.value)
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleConfirmPasswordInput = (event) => setConfirmPassword(event.target.value)

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalTitle, setAlertModalTitle] = useState(null)
  const [alertModalContent, setAlertModalContent] = useState(null)

  const alertModalOpen = (title, content) => {
    setAlertModalTitle(title)
    setAlertModalContent(content)
    setShowAlertModal(true)
  }
  const alertModalClose = () => setShowAlertModal(false);

  const handleLogout = () => onLogout()

  const handleEmailEdit = () => setPageMode("email")
  const handlePasswordEdit = () => setPageMode("password")
  const handlePasswordReset = () => {
    setIsPasswordOk(true)
    setPageMode("reset")
  }

  const onCurrentPasswordSubmit = (event) => {
    event?.preventDefault();
    if(userToken.password === currentPassword){
      setIsPasswordOk(true)
      setCurrentPassword("")
    }else{
      alertModalOpen("Password is incorrect")
      setIsPasswordOk(false)
      setCurrentPassword("")
    }
  }

  const onNewEmailSubmit = (event) => {
    event?.preventDefault();

    if(!confirmEmail){
      alertModalOpen("Enter confirm email");
      return;
    }

    if(newEmail !== confirmEmail){
      alertModalOpen("Emails do not match")
      return
    }

    if(newEmail === userToken?.email){
      alertModalOpen("Error","New email can't be the same as old email")
      return
    }

    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.put(httpPaths["editEmail"], {
        old_email: userToken?.email,
        new_email: newEmail
      }).then((response)=>{
        if(response.data.result === "valid"){
          updateEmail(newEmail)
          alertModalOpen("Success","Email updated")
          setShowLoadingScreen(false)
          handleGoBack()
        }else{
          alertModalOpen("Something went wrong!","Try again later")
          setShowLoadingScreen(false)
        }
      }).catch(e => {
        console.log("Error while sending new email to server "+e);
        setShowLoadingScreen(false)
      })
    }else{
      updateEmail(newEmail)
      alertModalOpen("Success","Email updated")
      setShowLoadingScreen(false)
      handleGoBack()
    }
  }

  const onNewPasswordSubmit = (event) => {
    event?.preventDefault();    

    if(!confirmPassword){
      alertModalOpen("Enter confirm password");
      return;
    }

    if(newPassword.length<=6){
      alertModalOpen("Password should be at least 6 characters");
      return;
    }
        
    if(newPassword !== confirmPassword){
      alertModalOpen("Password and confirm password do not match");
      return
    }

    if(newPassword === userToken?.password){
      alertModalOpen("Error","New password can't be the same as old email")
      return
    }

    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.put(httpPaths["editPw"], {
        email: userToken?.email,
        new_password: newPassword
      }).then((response)=>{
        if(response.data.result === "valid"){
          updatePassword(newEmail)
          alertModalOpen("Success","Password updated")
          setShowLoadingScreen(false)
          handleGoBack()
        }else{
          alertModalOpen("Something went wrong!","Try again later")
          setShowLoadingScreen(false)
        }
      }).catch(e => {
        console.log("Error while sending new password to server "+e);
        setShowLoadingScreen(false)
      })
    }else{
      updatePassword(newEmail)
      alertModalOpen("Success","Password updated")
      setShowLoadingScreen(false)
      handleGoBack()
    }
  }

  const onResetEmailSubmit = (event) => {
    event?.preventDefault();

    if(allowServerComm){
      setShowLoadingScreen(true)
      axios.put(httpPaths["resetPw"], {email: userToken?.email})
      .then((response)=>{
        if(response.data.result === "valid"){
          alertModalOpen("Success","Check your email account for details")
          setShowLoadingScreen(false)
          handleGoBack()
        }else{
          alertModalOpen("Something went wrong!","Try again later")
          setShowLoadingScreen(false)
        }
      }).catch(e => {
        console.log("Error while sending new email to server "+e);
        setShowLoadingScreen(false)
      })
    }else{
      alertModalOpen("Success","Check your email account for details")
      setShowLoadingScreen(false)
      handleGoBack()
    }
  }

  const handleSave = () => {
    if(pageMode!== "overview" && !isPasswordOk){
      onCurrentPasswordSubmit()
    }else if(pageMode === "email"){
      onNewEmailSubmit()
    }else if(pageMode === "password"){
      onNewPasswordSubmit()
    }else if (pageMode === "reset"){
      onResetEmailSubmit()
    }
  }

  const handleGoBack = () => {
    if(pageMode === "overview"){
      navigate(-1)
    }else{
      setPageMode("overview")
      setIsPasswordOk(false)
      setNewEmail("")
      setConfirmEmail("")
      setNewPassword("")
      setConfirmPassword("")
    }
  }

  const overviewShow = (
    <>
      <div className="content is-flex is-justify-content-space-between">
        <p>
          <span><span className="has-text-weight-semibold mr-3">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{userToken?.email}</span>
        </p>
        <button className="button is-primary" onClick={handleEmailEdit}><MdEdit size={20}/></button>
      </div>
      <div className="content is-flex is-justify-content-space-between">
        <p>
          <span><span className="has-text-weight-semibold mr-3">Password&nbsp;&nbsp;&nbsp;</span>*****</span>
        </p>
        <button className="button is-primary" onClick={handlePasswordEdit}><MdEdit size={20}/></button>
      </div>
    </>
  )

  const alertModal = (
    <AlertModal 
    content={alertModalContent}
    title={alertModalTitle}
    onClose={alertModalClose} 
    isOpen={showAlertModal}/>
  );


  if(!showLoadingScreen){
    return(
      <>
        {showAlertModal && alertModal}      
        <div className="block"/>
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  {pageMode === "overview"? "Account Information":pageMode==="email"? "Edit Account Email": pageMode==="password"? "Edit Account Password":"Forgot Password"}
                </p>
              </header>
              <div className="card-content">
                {
                  pageMode === "overview"? 
                    overviewShow 
                      : !isPasswordOk? 
                        (
                          <>
                          <form onSubmit={handleCurrentPasswordInput}>
                            <div className="field">
                              <label className="label">Enter Current Password</label>
                              <div className="control">
                                <input className="input" type="password" value={currentPassword} onChange={handleCurrentPasswordInput}/>
                              </div>
                            </div>
                          </form>
                          <div className="container is-flex is-justify-content-end is-align-items-center">
                            <button className="button is-underlined is-ghost" onClick={handlePasswordReset}>Forgot password?</button>
                          </div>
                          </>
                        ) : pageMode === "email"? 
                          (
                            <form onSubmit={onNewEmailSubmit}>
                              <div className="field">
                                <label className="label">New Account Email</label>
                                <div className="control">
                                  <input className="input" type="email" placeholder="e.g. name@example.com" value={newEmail} onChange={handleNewEmailInput}/>
                                </div>
                              </div>

                              <div className="field">
                                <label className="label">Confirm New Account Email</label>
                                <div className="control">
                                  <input className="input" type="email" placeholder="" value={confirmEmail} onChange={handleConfirmEmailInput}/>
                                </div>
                              </div>
                            </form>
                          ) : pageMode === "password"? 
                            (
                              <form onSubmit={onNewPasswordSubmit}>
                                <div className="field">
                                  <label className="label">New Account Password</label>
                                  <div className="control">
                                    <input className="input" type="password" value={newPassword} onChange={handleNewPasswordInput}/>
                                  </div>
                                </div>

                                <div className="field">
                                  <label className="label">Confirm New Account Password</label>
                                  <div className="control">
                                    <input className="input" type="password" value={confirmPassword} onChange={handleConfirmPasswordInput}/>
                                  </div>
                                </div>
                              </form>
                            ):(
                              <form onSubmit={onResetEmailSubmit}>
                                <div className="field">
                                  <label className="label">{`Send details to ${userToken.email} on how to change your password?`}</label>
                                </div>
                              </form>
                            )
                }
              </div>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <button onClick={handleGoBack} className="button is-ghost">Go Back</button>
                </div>
                <div className="card-footer-item">
                  <button onClick={pageMode === "overview"? handleLogout:handleSave} className="button is-ghost">{pageMode === "overview"? "Log Out":pageMode === "reset"? "Send" :"Save"}</button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </>
    );
  }else{//loading
    return(
      <div className="pageloader is-active has-background-white is-light"><span className="title">Loading...</span></div>
    );
  }
}
 
export default AccountPage;
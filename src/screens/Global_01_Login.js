import "./Global_01_Login.css"
import React, { useState } from 'react';

import AppLogo from "../img/app-logo.png"
 
const LoginPg = ({ onLogin }) => {

  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const onLoginPress = () => onLogin("home")

  const [rememberMe, setRememberMe] = useState(false)

  const onUsernameEnter = (input) => setUserName(input.target.value)
  const onPasswordEnter = (input) => setUserPassword(input.target.value)

  const onRememberMePresss = () => setRememberMe(prev => !prev)
  
  return (
    <div className='card-container'>
        <div className="ui centered card">
          <div style={{paddingTop:20}}>
            <img className="ui centered circular tiny image" src={AppLogo} alt="sherpa space inc logo"/>
          </div>
          <div className='ui centered header'>LCA-TEA App</div>
          <div className='content'>
          <form className="ui form" onSubmit={onLoginPress}>
            <div className="field">
              <label>Username</label>
              <input type="text" placeholder="user@email.com" value={userName} onChange={onUsernameEnter}/>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="ui left icon input">
                <input type="password" placeholder='••••' value={userPassword} onChange={onPasswordEnter}/>
                <i className="lock icon"></i>
              </div>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" tabIndex="0" checked={rememberMe} onChange={onRememberMePresss}/>
                <label>Remember Me</label>
              </div>
            </div>
            <div className='ui center aligned container'>
              <button className="ui button" type="submit">Login</button>
            </div>
          </form>
          </div>
          <div className='extra center aligned content'>
            <a className="ui content" onClick={() => alert("Not available")}>Don't have an account? Register</a>
          </div>
        </div>
    </div>
  );
}

LoginPg.defaultProps = {
  onLogin: () => {}
}
 
export default LoginPg;
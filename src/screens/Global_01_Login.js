import React from 'react';
 
const LoginPg = (props) => {
  const onLoginPress = () => props.onLogin("home")
  
  return (
    <div className="ui placeholder segment">
      <div className="ui two column very relaxed stackable grid">
        <div className="column">
          <div className="ui form">
            <div className="field">
              <label>Username</label>
              <div className="ui left icon input">
                <input type="text" placeholder="Username"/>
                <i className="user icon"></i>
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="ui left icon input">
                <input type="password"/>
                <i className="lock icon"></i>
              </div>
            </div>
            <div className="ui blue submit button" onClick={onLoginPress}>Login</div>
          </div>
        </div>
        <div className="middle aligned column">
          <div className="ui big button">
            <i className="signup icon"></i>
            Sign Up
          </div>
        </div>
      </div>
      <div className="ui vertical divider">
        Or
      </div>
    </div>
  );
}

LoginPg.defaultProps = {
  onLogin: () => {}
}
 
export default LoginPg;
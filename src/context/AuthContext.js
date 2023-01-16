import { cloneDeep } from "lodash";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homeAddress, getNavURL } from "../utils/appConstants";
import { fetchLocalStorageItem, resetLocalStorage, setLocalStorageItem } from "../utils/appUtils";

const AuthContext = createContext(null);

let initToken = {
  email: null,
  password: null,
  isLoading: true,
  isLoggedIn: false
}

function AuthProvider({children}){
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(initToken);

  useEffect(()=>{
    getLoginDetails()
  },[]);

  const getLoginDetails = () => {
    try {
      let authObj = fetchLocalStorageItem("auth")

      if(authObj!=null){
        setUserToken({...authObj, isLoading: false})
      }else{
        setUserToken({...initToken, isLoading: false})
      }
    } catch (error) {
      //DEBUG_LOG:
      console.log(error);
    }
  }

  const handleLogin = (token) => {
    try {
      if(!token){
        return;
      }

      let tokenCopy = cloneDeep(token)
      delete tokenCopy.remember

      tokenCopy = {...tokenCopy, isLoggedIn: true, isLoading: false}

      if(token.remember){        
        setLocalStorageItem("auth", tokenCopy);
      }

      setUserToken(tokenCopy);
    
      navigate(homeAddress, { replace: true });
    } catch (error) {
      //DEBUG_LOG:
      console.log(error);
    }
  };

  const handleLogout = () => {
    try {
      resetLocalStorage()

      setUserToken({...initToken, isLoggedIn:false, isLoading: false});
      const loginUrl = getNavURL("/login")
      navigate(loginUrl);
    } catch (error) {
      //DEBUG_LOG:
      console.log(error);
    }
  };

  const handleUpdateEmail = (newEmail) => {
    try {
      const thisAuth = fetchLocalStorageItem("auth")
      let shouldRemember = false

      if(thisAuth){
        shouldRemember = true
      }

      let tokenCopy = cloneDeep(userToken)

      tokenCopy = {...tokenCopy, email: newEmail}

      if(shouldRemember){        
        setLocalStorageItem("auth", tokenCopy);
      }

      setUserToken(tokenCopy);
    } catch (error) {
      //DEBUG_LOG:
      console.log(error);
    }
  };

  const handleUpdatePassword = (newPass) => {
    try {
      const thisAuth = fetchLocalStorageItem("auth")
      let shouldRemember = false

      if(thisAuth){
        shouldRemember = true
      }

      let tokenCopy = cloneDeep(userToken)

      tokenCopy = {...tokenCopy, password: newPass}

      if(shouldRemember){        
        setLocalStorageItem("auth", tokenCopy);
      }

      setUserToken(tokenCopy);
    } catch (error) {
      //DEBUG_LOG:
      console.log(error);
    }
  };

  const value = {
    userToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
    updateEmail: handleUpdateEmail,
    updatePassword: handleUpdatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
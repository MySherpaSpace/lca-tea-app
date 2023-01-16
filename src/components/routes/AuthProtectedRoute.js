import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import { getNavURL } from "../../utils/appConstants";

function AuthProtectedRoute({ children }) {
  const { userToken } = useAuth();
  // let location = useLocation();

  const loginUrl = getNavURL("/login")

  if (!userToken.isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={loginUrl}/>;
  }

  return children;
}

export default AuthProtectedRoute;
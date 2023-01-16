import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function LCAProtectedRoute({ children }) {
  let location = useLocation();
  const AllowedTabs = useSelector(state => state.allowedTabs);
  const origin = location.state?.from?.pathname || '/';

  if (!AllowedTabs.lca) {
    return <Navigate to={origin}/>;
  }

  return children;
}

export default LCAProtectedRoute;
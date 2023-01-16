import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function BasicInfoProtectedRoute({ children }) {
  const location = useLocation();
  const AllowedTabs = useSelector(state => state.allowedTabs);
  const origin = location.state?.from?.pathname || '/';

  if (!AllowedTabs.basicInfo) {
    return <Navigate to={origin}/>;
  }

  return children;
}

export default BasicInfoProtectedRoute;
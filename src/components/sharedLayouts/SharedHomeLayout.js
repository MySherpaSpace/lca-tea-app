import { Outlet } from "react-router-dom";
import TopNavBar from "../TopNavBar";
import AuthProtectedRoute from "../routes/AuthProtectedRoute";

const SharedHomeLayout = () => {
  return (
    <>
      <AuthProtectedRoute>
        <TopNavBar/>
        <Outlet/>
      </AuthProtectedRoute>
    </>
  );
};
export default SharedHomeLayout;
import { Outlet } from "react-router-dom";

import BasicInfoProtectedRoute from "../routes/BasicInfoProtectedRoute";

const SharedBasicInfoLayout = () => {
  return (
    <>
      <BasicInfoProtectedRoute>
        <Outlet/>
      </BasicInfoProtectedRoute>
    </>
  );
};
export default SharedBasicInfoLayout;
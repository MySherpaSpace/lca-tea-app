import { Outlet } from "react-router-dom";

import SensitivityAnalysisProtectedRoute from "../routes/SensitivityAnalysisProtectedRoute";

const SharedSensitivityAnalysisLayout = () => {
  return (
    <>
      <SensitivityAnalysisProtectedRoute>
        <Outlet/>
      </SensitivityAnalysisProtectedRoute>
    </>
  );
};
export default SharedSensitivityAnalysisLayout;
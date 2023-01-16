import { Outlet } from "react-router-dom";

import SummaryProtectedRoute from "../routes/SummaryProtectedRoute";

const SharedSummaryLayout = () => {
  return (
    <>
      <SummaryProtectedRoute>
        <Outlet/>
      </SummaryProtectedRoute>
    </>
  );
};
export default SharedSummaryLayout;
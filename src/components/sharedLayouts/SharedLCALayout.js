import { Outlet } from "react-router-dom";

import LCAProtectedRoute from "../routes/LCAProtectedRoute";

const SharedLCALayout = () => {
  return (
    <>
      <LCAProtectedRoute>
        <Outlet/>
      </LCAProtectedRoute>
    </>
  );
};
export default SharedLCALayout;
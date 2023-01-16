import { Outlet } from "react-router-dom";

import TEAProtectedRoute from "../routes/TEAProtectedRoute";

const SharedTEALayout = () => {
  return (
    <>
      <TEAProtectedRoute>
        <Outlet/>
      </TEAProtectedRoute>
    </>
  );
};
export default SharedTEALayout;
import { Routes, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "common-components/ProtectedRoute";
import { Profile } from "common-components/Profile";
import { Hidden } from "common-components/Hidden";
import { Sidebar } from "common-components/Sidebar";
import { Orders } from "common-components/Orders";
export const My = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <section className="row sm-column align-start justify-center w12 padding-16 padding-t-32">
        <Hidden hideAt="sm-down">
          <Sidebar />
        </Hidden>
        <Routes>
          <ProtectedRoute
            path="/profile"
            element={<Profile />}></ProtectedRoute>
          <ProtectedRoute path="/orders" element={<Orders />}></ProtectedRoute>
          {pathname === "/my" && <Navigate replace to="/my/profile" />}
        </Routes>
      </section>
    </>
  );
};

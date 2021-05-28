import { useNavigate, Routes } from "react-router-dom";
import { ProtectedRoute } from "Components/ProtectedRoute";
import { Profile } from "Components/Profile";
import { Hidden } from "Components/Hidden";
import { Sidebar } from "Components/Sidebar";
export const My = () => {
  const navigate = useNavigate();
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
        </Routes>
      </section>
    </>
  );
};

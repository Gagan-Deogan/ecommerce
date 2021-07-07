import { Route, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
export const ProtectedRoute = ({ path, ...props }) => {
  const { user } = useAuth();
  return user ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};

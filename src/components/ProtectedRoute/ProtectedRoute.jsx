import { useAuthContext } from "../../Context";
import { Route, Navigate } from "react-router-dom";
export const ProtectedRoute = ({ path, ...props }) => {
  const { user } = useAuthContext();
  return user ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};

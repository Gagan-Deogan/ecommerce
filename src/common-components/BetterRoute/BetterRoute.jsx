import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthProvider";

export const BetterRoute = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const state = location.state || null;
  const { from } = state ?? { from: "/" };
  const { user } = useAuth();
  const { path, type } = { ...props };
  switch (type) {
    case "PROTECTED":
      return user ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: pathname }} replace to="/login" />
      );
    case "PUBLIC-ONLY":
      return !user ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate replace to={from} />
      );
    default:
      <Route path={path} {...props} />;
  }
};

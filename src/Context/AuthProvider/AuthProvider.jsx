import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserDetails } from "services/auth.services";
import { Loader } from "Components/Loader";
import {
  useRequest,
  instance,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "utils";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage?.getItem("Token") || null);
  const [loading, setLoading] = useState(token ? true : false);
  const { request } = useRequest();
  const location = useLocation();
  const { pathname } = location;
  setupAuthHeaderForServiceCalls(token, instance);

  const handleLogout = () => {
    localStorage?.removeItem("Token");
    setUser();
    setToken();
  };

  if (token) {
    setupAuthExceptionHandler(handleLogout, navigate, instance);
  }

  useEffect(() => {
    getUserDetails({
      token,
      user,
      pathname,
      setUser,
      request,
      setLoading,
      navigate,
    });
  }, [token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleLogout,
        setUser,
        setToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

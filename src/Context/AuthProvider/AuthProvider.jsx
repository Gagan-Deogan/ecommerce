import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "utils/auth.services";
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
  const [token, setToken] = useState();
  const { request } = useRequest();

  setupAuthHeaderForServiceCalls(token, instance);

  const handleLogout = () => {
    localStorage?.removeItem("Token");
    setUser();
    setToken();
  };

  useEffect(() => {
    const AuthToken = localStorage?.getItem("Token");
    if (AuthToken) {
      setupAuthExceptionHandler(handleLogout, navigate, instance);
      setToken(AuthToken);
    }
  }, []);

  useEffect(() => {
    getUserDetails(token, user, setUser, request);
  }, [token]);

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

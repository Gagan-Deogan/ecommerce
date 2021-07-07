import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserDetails } from "services/auth.services";
import { Loader } from "components/Loader";
import {
  useRequest,
  instance,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "utils";
const Authcontext = createContext();

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
    <Authcontext.Provider
      value={{
        user,
        token,
        handleLogout,
        setUser,
        setToken,
      }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  return useContext(Authcontext);
};

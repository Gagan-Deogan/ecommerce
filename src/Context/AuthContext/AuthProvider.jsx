import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequest, instance } from "../../utils";
import { useStatus } from "../LoaderContext";
const AuthContext = createContext();

function setupAuthExceptionHandler(handleLogout, navigate, setStatus) {
  const UNAUTHORIZED = 401;
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        handleLogout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { request } = useRequest();
  const { setStatus } = useStatus();

  const handleLogin = async (email, password, setLoginError) => {
    try {
      const { success, data } = await request({
        method: "POST",
        endpoint: "/users/login",
        body: {
          email,
          password,
        },
      });
      if (success) {
        setUser(data);
        localStorage?.setItem("user", JSON.stringify(data));
        navigate("/store");
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage?.removeItem("user");
    setUser();
  };

  useEffect(() => {
    setupAuthExceptionHandler(handleLogout, navigate, setStatus);
    const isAlreadyLoggedIn = JSON.parse(localStorage.getItem("user"));

    if (!!isAlreadyLoggedIn) {
      setUser(isAlreadyLoggedIn);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

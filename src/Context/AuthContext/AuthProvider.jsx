import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../utils";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { request } = useRequest();

  useEffect(() => {
    const isAlreadyLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (!!isAlreadyLoggedIn) {
      setUser(isAlreadyLoggedIn);
    }
  }, []);

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
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/store");
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser();
  };
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

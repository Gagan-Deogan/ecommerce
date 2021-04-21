import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../Utils";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { request, getCancelToken } = useRequest();
  const cancelToken = getCancelToken();
  useEffect(() => {
    const isAlreadyLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (!!isAlreadyLoggedIn) {
      setUser(isAlreadyLoggedIn);
    }
  }, []);

  const handleLogin = async (email, password, from = "/") => {
    try {
      const { success, user } = await request({
        method: "POST",
        endpoint: "/users/login",
        data: {
          email,
          password,
        },
      });
      if (success) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/store");
      }
      // if (data.success) {
      //   setStatus("IDLE");
      //   setHomeProducts({ ...data.data });
      // } else {
      //   console.log("some thing went worng.");
      // }
    } catch (err) {
      // setStatus("IDLE");
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

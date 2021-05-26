import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../Context/AuthContext";
import { LogoIcon, VisibleIcon, VisibleOffIcon } from "../../assests/icons";
import { loginUserWithEmailAndPassword } from "./login.services";
import { useRequest } from "../../utils";
export const Login = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
  const { setUser, setToken } = useAuthContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserWithEmailAndPassword({
      email,
      password,
      setLoginError,
      setUser,
      setToken,
      request,
      navigate,
    });
  };
  return (
    <section className="column justify-center align-center">
      <div className="card column login-container w12 align-center  margin-t-32 padding-64 padding-t-32 bor-rad-8 box-shd">
        <LogoIcon />
        <h3 className="margin-t-8 margin-b-32 primary-color">
          Login to Greenify
        </h3>
        <form className="column" onSubmit={(e) => handleSubmit(e)} action="#">
          <section className="column margin-b-16">
            <label htmlFor="email" className="margin-b-8">
              Email
            </label>
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>
          <section className="column margin-b-16  ">
            <label htmlFor="current-password" className="margin-b-8">
              Password
            </label>
            <div className="position-relative">
              <input
                name="current-password"
                type={!showPassword ? "password" : "text"}
                autoComplete="current-password"
                aria-describedby="password-constraints"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute right padding-8 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword && <VisibleIcon />}
                {!showPassword && <VisibleOffIcon />}
              </span>
            </div>
          </section>
          {loginError && (
            <h6 className="font-xs text-center text-error bold margin-b-8">
              {" "}
              Invalid username or password.
            </h6>
          )}
          <button className="btn-pry-fil w12">Login</button>
        </form>
      </div>
    </section>
  );
};

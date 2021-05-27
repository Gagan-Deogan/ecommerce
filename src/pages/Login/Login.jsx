import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "Context/AuthProvider";
import { LogoIcon, VisibleIcon, VisibleOffIcon } from "assests/icons";
import { loginUserWithEmailAndPassword } from "utils";
import { useRequest } from "utils";
import { Link } from "react-router-dom";
export const Login = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
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
      <div className="login-container column sm-w10 md-w5 w6 align-center margin-t-32 padding-64 padding-t-32 bor-rad-8 box-shd">
        <LogoIcon />
        <h3 className="margin-t-8 margin-b-32 primary-color">
          Login to Greenify
        </h3>
        <form className="column w12" onSubmit={handleSubmit} action="#">
          <section className="column margin-b-16">
            <label htmlFor="email" className="margin-b-8">
              Email
            </label>
            <input
              name="current-email"
              type="email"
              autoComplete="current-email"
              className="w12"
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
                className="w12"
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
        <Link className="font-xs margin-t-16" to="/signup">
          Don't have an account?{" "}
          <span className="primary-color">Signup now!</span>
        </Link>
      </div>
    </section>
  );
};

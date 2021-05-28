import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "Context/AuthProvider";
import { LogoIcon } from "assests/icons";
import { useRequest } from "utils";
import { loginUserWithEmailAndPassword } from "services";
import { Link } from "react-router-dom";
import { Input } from "Components/Input";
import { PasswordInput } from "Components/PasswordInput";
import { Spinner } from "Components/Spinner";
export const Login = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setShowSpinner(true);
      loginUserWithEmailAndPassword({
        email,
        password,
        setLoginError,
        setUser,
        setToken,
        request,
        navigate,
      });
    }
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
            <Input
              name="current-email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>
          <section className="column margin-b-16  ">
            <label htmlFor="current-password" className="margin-b-8">
              Password
            </label>
            <div className="position-relative">
              <PasswordInput
                name="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </section>
          {loginError && (
            <h6 className="font-xs text-center text-error bold margin-b-8">
              Invalid username or password.
            </h6>
          )}
          <button
            className={`btn-pry-fil w12 ${showSpinner && "btn-dis"} `}
            disabled={showSpinner}>
            Login
            {showSpinner && <Spinner />}
          </button>
        </form>
        <Link className="font-xs margin-t-16" to="/signup">
          Don't have an account?{" "}
          <span className="primary-color">Signup now!</span>
        </Link>
      </div>
    </section>
  );
};

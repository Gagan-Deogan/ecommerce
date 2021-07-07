import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "context/AuthProvider";
import { LogoIcon } from "assests/icons";
import { useRequest } from "utils";
import { loginUserWithEmailAndPassword } from "services";
import { Link } from "react-router-dom";
import { Input } from "components/Input";
import { PasswordInput } from "components/PasswordInput";
import { Button } from "components/Button";
export const Login = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <section className="column justify-center align-center">
      <div className="login-container column sm-w10 md-w5 w6 align-center margin-t-32 padding-64 padding-t-32 bor-rad-8 box-shd">
        <LogoIcon />
        <h3 className="margin-t-8 margin-b-32 primary-color">
          Login to Greenify
        </h3>
        <form
          className="column w12"
          onSubmit={(e) => e.preventDefault()}
          action="#">
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
          <h6 className="font-xs text-center text-error bold margin-b-8">
            {loginError}
          </h6>
          <Button
            className="btn-pry-fil w12"
            onClick={() =>
              loginUserWithEmailAndPassword({
                email,
                password,
                setLoginError,
                setUser,
                setToken,
                request,
                navigate,
              })
            }>
            Login
          </Button>
        </form>
        <Link className="font-xs margin-t-16 bold" to="/signup">
          Don't have an account?
          <span className="primary-color"> Signup now!</span>
        </Link>
      </div>
    </section>
  );
};

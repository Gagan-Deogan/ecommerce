import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LogoIcon } from "assests/icons";
import { PasswordInput } from "common-components/PasswordInput";
import { Input } from "common-components/Input";
import { request } from "utils";
import { useAuth } from "context/AuthProvider";
export const Login = () => {
  const [email, setEmail] = useState("Gagan@gmail.com");
  const [password, setPassword] = useState("Gagan@0215");
  const [status, setStatus] = useState("IDLE");
  const [error, setError] = useState("");
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password && status === "IDLE") {
      setStatus("PENDING");
      const res = await request("post", "/users/login", { email, password });
      if ("data" in res) {
        loginUser(res.data);
      } else {
        setError(res.error);
        setStatus("IDLE");
      }
    }
  };

  return (
    <section className="column justify-center align-center">
      <div className="container column sm-w10 md-w6 w5 align-center margin-t-32 padding-64 padding-t-32 bor-rad-8 box-shd">
        <LogoIcon />
        <h3 className="margin-t-8 margin-b-32 primary-color">
          Login to Greenify
        </h3>
        <form
          className="column w12"
          onSubmit={(e) => handleSubmit(e)}
          action="#"
        >
          <div className="column margin-b-16">
            <label htmlFor="email" className="margin-b-8">
              Email
            </label>
            <Input
              name="current-email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="column margin-b-16  ">
            <label htmlFor="current-password" className="margin-b-8">
              Password
            </label>
            <div className="position-relative">
              <PasswordInput
                name="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <h6 className="font-xs text-center text-error bold margin-b-8">
            {error}
          </h6>
          <button className="btn-pry-fil w12" disabled={status === "PENDING"}>
            Login
          </button>
          <Link to="/signup" className="font-xs text-center margin-t-16 bold">
            Don't have an account?
            <span className="margin-l-4 primary-color">Signup now!</span>
          </Link>
        </form>
      </div>
    </section>
  );
};

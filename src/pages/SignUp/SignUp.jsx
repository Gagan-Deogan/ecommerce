import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reducer, initialState } from "./signup.reducer";
import { checkPasswordStrength, request } from "utils";
import { PasswordInput } from "common-components/PasswordInput";
import { Input } from "common-components/Input";
export const Signup = () => {
  const navigate = useNavigate();

  const [
    { email, fullname, password, confirmPassword, status, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const changeEmail = (e) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };

  const changeFullname = (e) => {
    const fullname = e.target.value;
    if (fullname.length < 45) {
      const fullnameWithoutSpace = fullname.trim();
      dispatch({ type: "SET_FULLNAME", payload: fullnameWithoutSpace });
    }
  };

  const changePassword = (e) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const changeConfirmPassword = (e) => {
    dispatch({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value });
  };
  const isPasswordStrong = password && checkPasswordStrength(password);
  const bothPasswordsMatch =
    !!password && !!confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email &&
      fullname &&
      password &&
      isPasswordStrong &&
      bothPasswordsMatch
    ) {
      dispatch({ type: "SET_STATUS", payload: "PENDING" });
      const res = await request("post", "/users/signup", {
        email,
        fullname,
        password,
      });
      dispatch({ type: "SET_STATUS", payload: "IDLE" });
      if ("data" in res) {
        navigate("/login");
      } else {
        dispatch({ type: "SET_ERROR", payload: res.error });
      }
    }
  };

  return (
    <>
      <section className="column justify-center align-center">
        <div className="container column sm-w10 md-w8 w5 align-center margin-t-32 padding-64 padding-t-32 bor-rad-8 box-shd">
          <h3 className="margin-t-8 margin-b-16 primary-color">
            Signup to Greenify
          </h3>
          <form className="column w12" onSubmit={handleSubmit}>
            <div className="column margin-b-16">
              <label htmlFor="new-email " className="margin-b-8">
                Email
              </label>
              <Input
                name="new-email"
                type="email"
                value={email}
                onChange={changeEmail}
                id="email"
                required
              />
            </div>
            <div className="column margin-b-16">
              <label htmlFor="fullname" className="margin-b-8">
                Fullname
              </label>
              <Input
                name="fullname"
                type="text"
                id="fullname"
                value={fullname}
                onChange={changeFullname}
                required={true}
              />
            </div>
            <div className="column margin-b-16">
              <label htmlFor="password" className="margin-b-8">
                Password
              </label>
              <div className="position-relative">
                <PasswordInput
                  name="new-password"
                  onChange={changePassword}
                  error={
                    !isPasswordStrong && password
                      ? "Password is not Strong"
                      : ""
                  }
                />
              </div>
            </div>
            <div className="column margin-b-16">
              <label htmlFor="password" className="margin-b-4">
                Confirm Password
              </label>
              <div className="position-relative">
                <PasswordInput
                  name="confirm-password"
                  onChange={changeConfirmPassword}
                  error={
                    !bothPasswordsMatch && confirmPassword
                      ? "Confirm Password Doesn't Match"
                      : ""
                  }
                />
              </div>
            </div>
            <h6 className="text-center text-error text-sm">{error}</h6>
            <button
              className="sm-btn-pry-fil w12 margin-b-8"
              disabled={status === "PENDING"}>
              Sign Up
            </button>
          </form>
          <Link to="/login" className="font-xs text-center bold">
            Already have an account?
            <span className="margin-l-4 primary-color">Go to Login</span>
          </Link>
        </div>
      </section>
    </>
  );
};

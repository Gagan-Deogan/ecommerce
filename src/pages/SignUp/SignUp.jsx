import "./signup.css";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "Components/PasswordInput";
import { signUpAndLoginUser, useRequest } from "utils";
import { useAuth } from "Context/AuthProvider";
import { Spinner } from "Components/Spinner";
const initial = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  showLoader: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload.email };
    case "CHANGE_NAME":
      return { ...state, name: action.payload.name };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.payload.password };
    case "CHANGE_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload.confirmPassword };
    case "SHOW_LOADER":
      return { ...state, showLoader: true };
    default:
      return state;
  }
};

const isPasswordStrong = (password) => {
  const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const isStrong = password.match(regx);
  return isStrong ? "" : "Password is not Strong";
};

export const SignUp = () => {
  const { request } = useRequest();
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const [
    { name, email, password, confirmPassword, showLoader },
    dispatch,
  ] = useReducer(reducer, initial);

  const passwordError = password && isPasswordStrong(password);
  const confirmPasswordError =
    confirmPassword && confirmPassword !== password && "Password not Matching ";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      dispatch({ type: "SHOW_LOADER" });
      signUpAndLoginUser({
        email,
        name,
        password,
        setUser,
        setToken,
        request,
        navigate,
      });
    }
  };
  return (
    <section className="column justify-center align-center">
      <div className="signup-container column sm-w10 md-w5 w6 align-center margin-t-32 padding-64 padding-t-32 bor-rad-8 box-shd">
        <h3 className="margin-t-8 margin-b-32 primary-color">
          Signup to Greenify
        </h3>
        <form className="column w12" onSubmit={handleSubmit} action="#">
          <section className="column margin-b-16">
            <label htmlFor="new-email" className="margin-b-8">
              Email
            </label>
            <input
              name="new-email"
              autoComplete="new-email"
              type="email"
              value={email}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_EMAIL",
                  payload: { email: e.target.value },
                })
              }
              required
            />
          </section>
          <section className="column margin-b-16">
            <label htmlFor="new-name" className="margin-b-8">
              Name
            </label>
            <input
              name="new-name"
              type="text"
              value={name}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_NAME",
                  payload: { name: e.target.value },
                })
              }
              required
            />
          </section>
          <section className="column margin-b-16">
            <label htmlFor="new-password" className="margin-b-8">
              Password
            </label>
            <div className="position-relative">
              <PasswordInput
                name="new-password"
                onChange={(e) =>
                  dispatch({
                    type: "CHANGE_PASSWORD",
                    payload: { password: e.target.value },
                  })
                }
                error={passwordError}
              />
            </div>
          </section>
          <section className="column margin-b-16">
            <label htmlFor="current-password" className="margin-b-8">
              Confirm Password
            </label>
            <div className="position-relative">
              <PasswordInput
                name="confirm-password"
                onChange={(e) =>
                  dispatch({
                    type: "CHANGE_CONFIRM_PASSWORD",
                    payload: { confirmPassword: e.target.value },
                  })
                }
                error={confirmPasswordError}
              />
            </div>
          </section>
          <button
            className={`sm-btn-pry-fil w12 ${showLoader && "btn-dis"} `}
            disabled={showLoader}>
            Sign Up
            {showLoader && <Spinner />}
          </button>
        </form>
        <Link className="font-xs margin-t-16" to="/login">
          Already have a account?
          <span className="primary-color"> go to Login!</span>
        </Link>
      </div>
    </section>
  );
};

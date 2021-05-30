import "./signup.css";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "Components/PasswordInput";
import { useRequest, isPasswordStrong } from "utils";
import { signUpAndLoginUser } from "services";
import { Input } from "Components/Input";
import { Button } from "Components/Button";
import { reducer, initial } from "./reducer";
import { useSnakbar } from "Context/SnakbarProvider";

export const SignUp = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const { snakbarDispatch } = useSnakbar();
  const [
    { name, email, password, confirmPassword, signUpError },
    dispatch,
  ] = useReducer(reducer, initial);

  const passwordError = password && isPasswordStrong(password);
  const confirmPasswordError =
    confirmPassword && confirmPassword !== password && "Password not Matching ";

  return (
    <section className="column justify-center align-center">
      <div className="signup-container column sm-w10 md-w5 w6 align-center margin-t-32 padding-64 padding-t-32 bor-rad-8 box-shd">
        <h3 className="margin-t-8 margin-b-32 primary-color">
          Signup to Greenify
        </h3>
        <form
          className="column w12"
          onSubmit={(e) => e.preventDefault()}
          action="#">
          <section className="column margin-b-16">
            <label htmlFor="new-email" className="margin-b-8">
              Email
            </label>
            <Input
              name="new-email"
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
            <Input
              name="new-name"
              type="text"
              value={name}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_NAME",
                  payload: { name: e.target.value },
                })
              }
              required={true}
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
          <Button
            className="sm-btn-pry-fil w12"
            onClick={() =>
              signUpAndLoginUser({
                email,
                name,
                password,
                request,
                dispatch,
                navigate,
                snakbarDispatch,
              })
            }>
            Sign Up
          </Button>
          <h6 className="font-xs text-center text-error bold margin-b-8">
            {signUpError}
          </h6>
        </form>
        <Link className="font-xs margin-t-16" to="/login">
          Already have a account?
          <span className="primary-color"> go to Login!</span>
        </Link>
      </div>
    </section>
  );
};

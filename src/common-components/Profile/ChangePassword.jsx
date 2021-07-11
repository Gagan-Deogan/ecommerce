import { useReducer } from "react";
import { PasswordInput } from "common-components/PasswordInput";
import { checkPasswordStrength, request } from "utils";
import { Spinner } from "common-components/Spinner";
import { useSnakbar } from "context/SnakbarProvider";
import { reducer, initialState } from "./changePassword.reducer";

export const ChangePassword = ({ setShowChangePassword }) => {
  const { snakbarDispatch } = useSnakbar();
  const [
    { oldPassword, newPassword, confirmNewPassword, status, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const isPasswordStrong = newPassword && checkPasswordStrength(newPassword);

  const bothPasswordsMatch =
    !!newPassword && !!confirmNewPassword && newPassword === confirmNewPassword;

  const isButtonDisabled =
    status === "PENDING" ||
    !newPassword ||
    !confirmNewPassword ||
    !oldPassword ||
    !isPasswordStrong ||
    !bothPasswordsMatch;

  const handleUpdatePassword = async () => {
    if (!isButtonDisabled) {
      dispatch({ type: "SET_STATUS", payload: "PENDING" });
      const res = await request("put", "/users/change_password", {
        oldPassword,
        newPassword,
      });

      if ("data" in res) {
        snakbarDispatch({ type: "SUCCESS", payload: res.data });
        setShowChangePassword(false);
        return;
      }
      if ("error" in res) {
        dispatch({ type: "SET_STATUS_ERROR", payload: res.error });
      }
    }
  };

  return (
    <>
      <section className="column margin-t-16 margin-b-16">
        <label htmlFor="Current-password" className="margin-b-8 bold">
          Old Password
        </label>
        <div className="position-relative">
          <PasswordInput
            name="Current-password"
            value={oldPassword}
            onChange={(e) => {
              dispatch({
                type: "CHANGE_OLD_PASSWORD",
                payload: { oldPassword: e.target.value },
              });
            }}
            error={error}
          />
        </div>
      </section>
      <section className="column margin-b-16">
        <label htmlFor="new-password" className="margin-b-8 bold">
          New Password
        </label>
        <div className="position-relative">
          <PasswordInput
            name="new-password"
            onChange={(e) => {
              dispatch({
                type: "CHANGE_NEW_PASSWORD",
                payload: { newPassword: e.target.value },
              });
            }}
            error={isPasswordStrong ? "" : "New Password is Not Strong"}
          />
        </div>
      </section>
      <section className="column margin-b-16">
        <label htmlFor="confirm-password" className="margin-b-8 bold">
          Confirm Password
        </label>
        <div className="position-relative">
          <PasswordInput
            name="confirm-password"
            onChange={(e) => {
              dispatch({
                type: "CHANGE_CONFIRM_NEW_PASSWORD",
                payload: { confirmNewPassword: e.target.value },
              });
            }}
            error={bothPasswordsMatch ? "" : "Confirm Password Doesnot Match"}
          />
        </div>
      </section>
      <div className="row">
        <button
          className={`sm-btn-pry-fil margin-r-8 ${
            isButtonDisabled && "btn-dis"
          }`}
          onClick={handleUpdatePassword}
          disabled={status === "PENDING"}>
          Update Password
          {status === "PENDING" && <Spinner />}
        </button>
        <button
          className="sm-btn-pry-fil btn-err "
          onClick={() => setShowChangePassword(false)}>
          Cancel
        </button>
      </div>
    </>
  );
};

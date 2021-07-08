import { useReducer } from "react";
import { PasswordInput } from "common-components/PasswordInput";
import { isPasswordStrong, useRequest } from "utils";
import { Spinner } from "common-components/Spinner";
import { updatePassword } from "services/profile.services";
import { useSnakbar } from "context/SnakbarProvider";
import { reducer, initialState } from "./reducer";
const isDisabledUpdatePasswordBtn = ({
  oldPassword,
  newPassword,
  confirmNewPassword,
  newPasswordError,
  confirmNewPasswordError,
  showSpinner,
}) => {
  return (
    !oldPassword ||
    !newPassword ||
    !confirmNewPassword ||
    newPasswordError ||
    confirmNewPasswordError ||
    showSpinner
  );
};
export const ChangePassword = ({ setShowChangePassword }) => {
  const { request } = useRequest();
  const { snakbarDispatch } = useSnakbar();

  const [
    {
      oldPassword,
      newPassword,
      confirmNewPassword,
      oldPasswordError,
      showSpinner,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const newPasswordError = newPassword && isPasswordStrong(newPassword);
  const confirmNewPasswordError =
    confirmNewPassword &&
    confirmNewPassword !== newPassword &&
    "Password not Matching ";
  const disabled = isDisabledUpdatePasswordBtn({
    oldPassword,
    newPassword,
    newPasswordError,
    confirmNewPassword,
    confirmNewPasswordError,
    showSpinner,
  });

  const updatePasswordBtnStyle = `sm-btn-pry-fil margin-r-8 ${
    disabled && "btn-dis"
  }`;
  const handleUpdatePassword = () => {
    if (!disabled) {
      dispatch({ type: "TOOGLE_SPINNER" });
      updatePassword({
        oldPassword,
        newPassword,
        request,
        dispatch,
        snakbarDispatch,
        setShowChangePassword,
      });
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
            error={oldPasswordError}
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
            error={newPasswordError}
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
            error={confirmNewPasswordError}
          />
        </div>
      </section>
      <div className="row">
        <button
          className={updatePasswordBtnStyle}
          onClick={handleUpdatePassword}>
          Update Password
          {showSpinner && <Spinner />}
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

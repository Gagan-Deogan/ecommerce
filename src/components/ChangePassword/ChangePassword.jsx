import { useState } from "react";
import { PasswordInput } from "Components/PasswordInput";
import { isPasswordStrong } from "utils";

const getChangePasswordBtnStyle = (oldPassword, newPassword) => {};

export const ChangePassword = ({ setShowChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const newPasswordError = newPassword && isPasswordStrong(newPassword);
  const confirmPasswordError =
    confirmPassword &&
    confirmPassword !== newPassword &&
    "Password not Matching ";
  return (
    <>
      <section className="column margin-t-16 margin-b-16">
        <label htmlFor="Current-password" className="margin-b-8">
          Current Password
        </label>
        <div className="position-relative">
          <PasswordInput
            name="Current-password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
      </section>
      <section className="column margin-b-16">
        <label htmlFor="new-password" className="margin-b-8">
          New Password
        </label>
        <div className="position-relative">
          <PasswordInput
            name="new-password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            error={newPasswordError}
          />
        </div>
      </section>
      <section className="column margin-b-16">
        <label htmlFor="confirm-password" className="margin-b-8">
          Confirm Password
        </label>
        <div className="position-relative">
          <PasswordInput
            name="confirm-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            error={confirmPasswordError}
          />
        </div>
      </section>
      <div className="row">
        <button
          className={`sm-btn-pry-fil margin-r-8 ${
            newPasswordError &&
            confirmPasswordError &&
            !oldPassword &&
            "btn-dis"
          } `}
          onClick={() => setShowChangePassword(false)}>
          Change
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

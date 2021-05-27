import { useState } from "react";
import { VisibleIcon, VisibleOffIcon } from "assests/icons";

export const PasswordInput = ({ name, error, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        autoComplete={name}
        aria-describedby={`${name}-constraints`}
        onChange={onChange}
        className="w12"
        required
      />
      <span
        className="position-absolute right padding-8 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}>
        {showPassword && <VisibleIcon />}
        {!showPassword && <VisibleOffIcon />}
      </span>
      <h6 className="font-xs text-error">{error}</h6>
    </>
  );
};

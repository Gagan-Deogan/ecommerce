import { useState } from "react";
import { VisibleIcon, VisibleOffIcon } from "assests/icons";
import { Input } from "common-components/Input";
export const PasswordInput = ({ name, error, onChange, defaultValue }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input
        name={name}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        required
        defaultValue={defaultValue}
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

export const isPasswordStrong = (password) => {
  const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const isStrong = password.match(regx);
  return isStrong ? "" : "Password is not Strong";
};

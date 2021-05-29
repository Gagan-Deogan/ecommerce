export const loginUserWithEmailAndPassword = async ({
  email,
  password,
  setShowSpinner,
  setLoginError,
  setUser,
  setToken,
  request,
  navigate,
}) => {
  const res = await request({
    method: "POST",
    endpoint: "/users/login",
    body: {
      email,
      password,
    },
  });
  setShowSpinner(false);
  if (res && res.success) {
    const { token, user } = res.data;
    setUser(user);
    setToken(token);
    localStorage?.setItem("Token", token);
    navigate("/store");
  }
  if (res && !res.success) {
    setLoginError(res.data);
  }
};

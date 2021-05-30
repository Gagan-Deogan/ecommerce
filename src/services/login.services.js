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
  if (res && res.success) {
    const { token, user } = res.data;
    setUser(user);
    setToken(token);
    localStorage?.setItem("Token", token);
    navigate("/store");
    return;
  }
  if (res && !res.success) {
    setLoginError(res.data);
  }
  return Promise.resolve();
};

export const signUpAndLoginUser = async ({
  email,
  name,
  password,
  setUser,
  setToken,
  request,
  navigate,
  dispatch,
}) => {
  const res = await request({
    method: "POST",
    endpoint: "/users/signup",
    body: {
      email,
      name,
      password,
    },
  });
  dispatch({ type: "TOOGLE_SPINNER" });
  if (res && res.success) {
    const { token, user } = res.data;
    setUser(user);
    setToken(token);
    localStorage?.setItem("Token", token);
    navigate("/store");
  }
  if (res && !res.success) {
    dispatch({ type: "SHOW_SIGNUP_ERROR", payload: { error: res.data } });
  }
};

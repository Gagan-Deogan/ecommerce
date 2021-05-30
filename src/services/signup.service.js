export const signUpAndLoginUser = async ({
  email,
  name,
  password,
  request,
  navigate,
  dispatch,
  snakbarDispatch,
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
  if (res && res.success) {
    snakbarDispatch({ type: "SUCCESS", payload: res.data });
    navigate("/Login");
  }
  if (res && !res.success) {
    dispatch({ type: "SHOW_SIGNUP_ERROR", payload: { error: res.data } });
  }
};

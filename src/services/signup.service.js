export const signUpAndLoginUser = async ({
  email,
  name,
  password,
  setUser,
  setToken,
  request,
  navigate,
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
    const { token, user } = res.data;
    setUser(user);
    setToken(token);
    localStorage?.setItem("Token", token);
    navigate("/store");
  }
};

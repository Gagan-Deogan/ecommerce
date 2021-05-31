export const getUserDetails = async ({
  token,
  user,
  pathname,
  setUser,
  request,
  setLoading,
  navigate,
}) => {
  if (token && !user) {
    setLoading(true);
    const res = await request({ method: "GET", endpoint: "/users/self" });
    setLoading(false);
    if (res && res.success) {
      setUser(res.data);
      navigate(pathname || "/home");
    }
  }
};

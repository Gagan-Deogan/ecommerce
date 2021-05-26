export const getUserDetails = async (token, user, setUser, request) => {
  if (token && !user) {
    const res = await request({ method: "GET", endpoint: "/users/self" });
    if (res && res.success) {
      setUser(res.data);
    }
  }
};

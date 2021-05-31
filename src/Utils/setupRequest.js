export const setupAuthExceptionHandler = (handleLogout, navigate, instance) => {
  const UNAUTHORIZED = 401;
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        handleLogout();
        navigate({ pathname: "/login", loaction: { state: "hello" } });
      }
      return Promise.reject(error);
    }
  );
};
export const setupAuthHeaderForServiceCalls = (token, instance) => {
  if (token) {
    return (instance.defaults.headers.common["Authorization"] = token);
  }
  delete instance.defaults.headers.common["Authorization"];
};

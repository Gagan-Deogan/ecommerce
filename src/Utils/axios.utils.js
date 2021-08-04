import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

export const setupAxiosDefaultHeaders = (token) => {
  axios.defaults.baseURL = REACT_APP_API_KEY;
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};

export const catchAxiosErr = (err) => {
  if (axios.isAxiosError(err)) {
    const serverError = err;
    if (serverError && serverError.response) {
      return { error: serverError.response.data.error };
    }
  }
  return { error: "something went wrong!" };
};

export const request = async (method, endpoint, body, cancelToken) => {
  try {
    const res = await axios[method](endpoint, body, {
      cancelToken: cancelToken,
    });
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};

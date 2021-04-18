import axios from "axios";
const { REACT_APP_API_URL } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 3000,
  headers: { "content-type": "application/json" },
});
export const useRequest = () => {
  const getCancelToken = () => axios.CancelToken.source();

  const request = async ({ method, endpoint, data = {}, cancelToken }) => {
    console.log(method, endpoint, cancelToken);

    switch (method) {
      case "GET": {
        const res = await instance.get(endpoint, {
          cancelToken: cancelToken,
        });
        return res;
      }
      case "POST": {
        const res = await axios.post(endpoint, data, {
          cancelToken: cancelToken,
        });
        return res.data;
      }
      default:
        return null;
    }
  };
  return { request, getCancelToken };
};

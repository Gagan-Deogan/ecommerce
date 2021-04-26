import axios from "axios";
const { REACT_APP_API_URL } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 3000,
  headers: { "content-type": "application/json" },
});
export const useRequest = () => {
  const getCancelToken = () => axios.CancelToken.source();

  const request = async ({ method, endpoint, body = {}, cancelToken }) => {
    switch (method) {
      case "GET": {
        const res = await instance.get(endpoint, body, {
          cancelToken: cancelToken,
        });
        return res.data;
      }
      case "POST": {
        const res = await instance.post(endpoint, body);
        return res.data;
      }
      case "PUT": {
        const res = await instance.put(endpoint, body);
        return res.data;
      }
      case "DELETE": {
        const res = await instance.delete(endpoint);
        return res.data;
      }
      default:
        return null;
    }
  };
  return { request, getCancelToken };
};

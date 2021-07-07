import axios from "axios";
import { useStatus } from "context/LoaderProvider";
const { REACT_APP_API_URL } = process.env;
export const instance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { "content-type": "application/json" },
});

export const useRequest = () => {
  const getCancelToken = () => axios.CancelToken.source();
  const { setStatus } = useStatus();
  const request = async ({ method, endpoint, body = {}, cancelToken }) => {
    try {
      switch (method) {
        case "GET": {
          const res = await instance.get(endpoint, {
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
    } catch (err) {
      if (err?.response?.status === 503) {
        setStatus("ERROR");
      }
      if (err?.response?.status === 422) {
        const res = err.response.data;
        return res;
      }
    }
  };
  return { request, getCancelToken };
};

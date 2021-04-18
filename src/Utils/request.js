import axios from "axios";
const { REACT_APP_API_URL } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

const request = async ({ method, endpoint, data = {} }) => {
  switch (method) {
    case "GET": {
      const res = await instance(data);
      return res.data;
    }
    case "POST": {
      const res = await instance(data);
      return res.data;
    }
    default:
      return null;
  }
};

import axios from "axios";
import { useQuery } from "react-query";
const { REACT_APP_API_KEY } = process.env;

export const useRequest = (endpoint) => {
  const url = `${REACT_APP_API_KEY}${endpoint}`;
  console.log("home", url);
  return useQuery(endpoint, () =>
    axios.get(`${REACT_APP_API_KEY}${endpoint}`).then((res) => res.data.data)
  );
};

import axios from "axios";
import { useQuery } from "react-query";

export const useRequest = (endpoint) => {
  return useQuery(endpoint, () =>
    axios
      .get(`https://my-second-project-ecd14.ue.r.appspot.com/${endpoint}`)
      .then((res) => res.data.data)
  );
};

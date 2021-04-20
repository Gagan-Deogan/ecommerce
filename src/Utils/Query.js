import { useLocation } from "react-router-dom";

export const useQuery = () => {
  const query = new URLSearchParams(useLocation().search);

  const queryParser = (key) => {
    try {
      const queryString = query.get(key);
      if (!queryString) return JSON.parse(queryString);
      return null;
    } catch (err) {
      return null;
    }
  };

  const queryEncoder = (query) => {
    try {
      return JSON.stringify(query);
    } catch (err) {
      return null;
    }
  };

  return { query, queryParser, queryEncoder };
};

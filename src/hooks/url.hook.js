import { useLocation } from "react-router-dom";

export const useURL = () => {
  const query = new URLSearchParams(useLocation().search);

  const urlParser = (key) => {
    try {
      const queryString = query.get(key);
      if (queryString) return JSON.parse(queryString);
      return null;
    } catch (err) {
      return null;
    }
  };

  const urlEncoder = (query) => {
    try {
      return JSON.stringify(query);
    } catch (err) {
      return null;
    }
  };

  return { query, urlParser, urlEncoder };
};

import axios from "axios";
import { useQuery } from "react-query";
const { REACT_APP_API_KEY } = process.env;
const fetchPorducDetails = (productId) =>
  axios
    .get(`${REACT_APP_API_KEY}/products/${productId}`)
    .then((res) => res.data.data);

export const useProduct = (productId) => {
  return useQuery(["products", productId], () => fetchPorducDetails(productId));
};

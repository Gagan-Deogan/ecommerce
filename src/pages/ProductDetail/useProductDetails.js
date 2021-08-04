import axios from "axios";
import { useQuery } from "react-query";

const fetchPorducDetails = (productId) =>
  axios
    .get(
      `https://my-second-project-ecd14.ue.r.appspot.com/products/${productId}`
    )
    .then((res) => res.data.data);

export const useProduct = (productId) => {
  return useQuery(["products", productId], () => fetchPorducDetails(productId));
};

export {
  getPriceByAddingProduct,
  getPricesByRemovingProduct,
  getTotalPrices,
} from "./pricesCalculators";

export { debounce } from "./debounce";
export { isInWishlist, isInCart } from "./getProductWithFlag";

export { checkPasswordStrength } from "./checkPasswordStrength";
export {
  getSortedData,
  getProductByRating,
  getFilterbyAvalibility,
  getFilterByOffer,
  getFilterbyLabel,
  getFiltedByAllFilters,
  getNewUrl,
} from "./filters.utils";

export { setupAxiosDefaultHeaders, request } from "./axios.utils";

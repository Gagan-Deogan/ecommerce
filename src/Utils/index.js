export {
  getPriceByAddingProduct,
  getPricesByRemovingProduct,
  getTotalPrices,
} from "./pricesCalculators";

export { debounce } from "./debounce";

export { useQuery } from "./query.hook";

export { instance, useRequest } from "./request.hook";

export { isInWishlist, isInCart } from "./getProductWithFlag";

export {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./setupRequest";

export { isPasswordStrong } from "./isPasswordStrong";
export { checkPasswordStrength } from "./checkPasswordStrength";
export {
  getSortedData,
  getProductByRating,
  getFilterbyAvalibility,
  getFilterByOffer,
  getFilterbyLabel,
  applyFilterToUrl,
} from "./filters";

export { setupAxiosDefaultHeaders, request } from "./axios.utils";

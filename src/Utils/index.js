export {
  getPriceByAddingProduct,
  getPricesByRemovingProduct,
  getTotalPrices,
} from "./pricesCalculators";

export { debouncing } from "./debouncing";

export { useQuery } from "./query.hook";

export { instance, useRequest } from "./request.hook";

export {
  isProductInCartOrWishlist,
  getCartItemWithWishlistFlag,
  getProductsWithWishlistFlag,
} from "./getProductWithFlag";

export {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./setupRequest";

export { isPasswordStrong } from "./isPasswordStrong";

export {
  getSortedData,
  getProductByRating,
  getFilterbyAvalibility,
  getFilterByOffer,
  getFilterbyLabel,
  applyFilterToUrl,
} from "./filters";

export {
  getPriceByAddingProduct,
  getPricesByRemovingProduct,
  getTotalPrices,
} from "./pricesCalculators";

export { debouncing } from "./Debouncing";

export { useQuery } from "./Query";

export { instance, useRequest } from "./request";

export {
  getProductWithFlags,
  getProductWithWishlistFlag,
} from "./getProductWithFlags";

export {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./setupRequest";

export {
  betterHandleWishList,
  handleAddToCart,
  betterHandleQuantityChange,
  handleRemoveFromCart,
  handleSaveForLater,
} from "./cart.service";

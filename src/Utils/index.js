export {
  getPriceByAddingProduct,
  getPricesByRemovingProduct,
  getTotalPrices,
} from "./pricesCalculators";

export { debouncing } from "./debouncing";

export { useQuery } from "./query.hook";

export { instance, useRequest } from "./request.hook";

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

export { getUserDetails } from "./auth.services";
export { loginUserWithEmailAndPassword } from "./login.services";
export { signUpAndLoginUser } from "./signup.service";

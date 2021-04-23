export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        cartList: action.payload.cartList,
        wishList: action.payload.wishList,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartList: state.cartList.concat([
          { details: { ...action.payload }, quantity: 1, inCartlist: true },
        ]),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartList: state.cartList.filter(
          (product) => product.details._id !== action.payload
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product.details._id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product.details._id === action.payload && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishList: [
          ...state.wishList,
          { details: { ...action.payload }, inWishlist: true },
        ],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (product) => product.details._id !== action.payload
        ),
      };
    case "SAVE_FOR_LATER":
      const details = action.payload;
      const productSaveForLater = {
        cartList: state.cartList.filter(
          (product) => product.details._id !== details._id
        ),
        wishList: state.wishList.concat([
          {
            details: details,
            inWishlist: true,
            quantity: 0,
            inCartlist: false,
          },
        ]),
      };
      return productSaveForLater;
    default:
      return state;
  }
};

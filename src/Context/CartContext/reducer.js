export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        cartlist: action.payload.cartlist,
        wishlist: action.payload.wishlist,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartlist: state.cartlist.concat([
          { details: { ...action.payload }, quantity: 1, inCartlist: true },
        ]),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartlist: state.cartlist.filter(
          (product) => product.details._id !== action.payload
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartlist: state.cartlist.map((product) =>
          product.details._id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cartlist: state.cartlist.map((product) =>
          product.details._id === action.payload && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          { details: action.payload, inWishlist: true },
        ],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.details._id !== action.payload._id
        ),
      };
    case "SAVE_FOR_LATER":
      const details = action.payload;
      const productSaveForLater = {
        cartlist: state.cartlist.filter(
          (product) => product.details._id !== details._id
        ),
        wishlist: state.wishlist.concat([
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

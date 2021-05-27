export const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
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
    case "TOOGLE_PRODUCT_FROM_WISHLIST":
      const selectProduct = state.wishlist.find(
        (product) => product.details._id === action.payload.product._id
      );
      if (selectProduct) {
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (product) => product._id !== selectProduct._id
          ),
        };
      }
      return {
        ...state,
        wishlist: [...state.wishlist, { details: action.payload.product }],
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

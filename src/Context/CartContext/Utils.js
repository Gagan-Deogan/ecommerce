export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cartList: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartList: state.cartList.concat([
          { ...action.payload, quantity: 1, inCart: true },
        ]),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartList: state.cartList.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product._id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product._id === action.payload && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishList: [...state.wishList, { ...action.payload, inWish: true }],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "SAVE_FOR_LATER":
      const saveProduct = action.payload;
      const productSaveForLater = {
        cartList: state.cartList.filter(
          (product) => product._id !== saveProduct._id
        ),
        wishList: state.wishList.concat([
          { ...saveProduct, inWish: true, quantity: 0, inCart: false },
        ]),
      };
      return { ...productSaveForLater };
    default:
      return state;
  }
};
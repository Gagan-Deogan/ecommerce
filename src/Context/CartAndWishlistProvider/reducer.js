import {
  getPriceByAddingProduct,
  getPricesByRemovingProduct,
  getTotalPrices,
} from "utils";

export const intialState = {
  cartDetails: {
    cartItems: [],
    totalEffectivePrice: 0,
    totalDiscount: 0,
    totalPrice: 0,
  },
  wishlist: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART": {
      const newCartItems = action.payload.cartItems;
      const wishlist = action.payload.wishlist;
      const {
        newTotalPrice,
        newTotalDiscount,
        newTotalEffectivePrice,
      } = getTotalPrices(newCartItems);
      return {
        cartDetails: {
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
          totalDiscount: newTotalDiscount,
          totalEffectivePrice: newTotalEffectivePrice,
        },
        wishlist,
      };
    }

    case "ADD_TO_CART": {
      const { product } = action.payload;
      const newCartItems = state.cartDetails.cartItems.concat([
        {
          product: product,
          quantity: 1,
        },
      ]);
      const {
        newTotalPrice,
        newTotalDiscount,
        newTotalEffectivePrice,
      } = getPriceByAddingProduct(
        state.cartDetails.totalPrice,
        state.cartDetails.totalDiscount,
        state.cartDetails.totalEffectivePrice,
        product
      );
      return {
        ...state,
        cartDetails: {
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
          totalDiscount: newTotalDiscount,
          totalEffectivePrice: newTotalEffectivePrice,
        },
      };
    }
    case "REMOVE_FROM_CART": {
      const { product } = action.payload;
      const newCartItems = state.cartDetails.cartItems.filter(
        (item) => item.product._id !== product._id
      );
      const {
        newTotalPrice,
        newTotalDiscount,
        newTotalEffectivePrice,
      } = getPricesByRemovingProduct(
        state.cartDetails.totalPrice,
        state.cartDetails.totalDiscount,
        state.cartDetails.totalEffectivePrice,
        product
      );
      return {
        ...state,
        cartDetails: {
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
          totalDiscount: newTotalDiscount,
          totalEffectivePrice: newTotalEffectivePrice,
        },
      };
    }
    case "INCREMENT_QUANTITY": {
      const newCartItems = state.cartDetails.cartItems.map((item) =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const {
        newTotalPrice,
        newTotalDiscount,
        newTotalEffectivePrice,
      } = getTotalPrices(newCartItems);
      return {
        ...state,
        cartDetails: {
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
          totalDiscount: newTotalDiscount,
          totalEffectivePrice: newTotalEffectivePrice,
        },
      };
    }
    case "DECREMENT_QUANTITY": {
      const selectedItem = state.cartDetails.cartItems.find(
        (item) => item.product._id === action.payload.productId
      );
      if (selectedItem.quantity > 1) {
        const newCartItems = state.cartDetails.cartItems.map((item) =>
          item.product._id === action.payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        const {
          newTotalPrice,
          newTotalDiscount,
          newTotalEffectivePrice,
        } = getTotalPrices(newCartItems);
        return {
          ...state,
          cartDetails: {
            cartItems: newCartItems,
            totalPrice: newTotalPrice,
            totalDiscount: newTotalDiscount,
            totalEffectivePrice: newTotalEffectivePrice,
          },
        };
      }
      return state;
    }
    case "TOOGLE_PRODUCT_FROM_WISHLIST": {
      const selectProduct = state.wishlist.find(
        (product) => product._id === action.payload.product._id
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
        wishlist: state.wishlist.concat([action.payload.product]),
      };
    }
    case "SAVE_FOR_LATER": {
      const { product } = action.payload;
      const newCartItems = state.cartDetails.cartItems.filter(
        (item) => item.product._id !== product._id
      );
      const {
        newTotalPrice,
        newTotalDiscount,
        newTotalEffectivePrice,
      } = getTotalPrices(newCartItems);
      const newWishlist = state.wishlist.concat([product]);

      return {
        cartDetails: {
          cartItems: newCartItems,
          totalPrice: newTotalPrice,
          totalDiscount: newTotalDiscount,
          totalEffectivePrice: newTotalEffectivePrice,
        },
        wishlist: newWishlist,
      };
    }
    default:
      return state;
  }
};

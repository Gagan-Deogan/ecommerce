const initialFilters = {
  sortBy: "",
  showRating: null,
  showInvertory: true,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "FIILTER_BY_RATINGS":
      return { ...state, showRating: action.payload };
    case "TOGGLE_INVENTORY":
      return { ...state, showInvertory: !state.showInvertory };
    case "INITIAL":
      return { ...initialFilters };
    default:
      return state;
  }
};

export const getProductWithFlags = (cartList, wishList, products) => {
  const productsIdInCart = cartList.map((item) => item.details._id);
  const productsIdInWishList = wishList.map((item) => item.details._id);
  return products.map((product) => {
    const productWithInCartFlag = productsIdInCart.includes(product._id)
      ? { details: { ...product }, inCartlist: true }
      : { details: product };
    return productsIdInWishList.includes(productWithInCartFlag.details._id)
      ? { ...productWithInCartFlag, inWishlist: true }
      : productWithInCartFlag;
  });
};

export const getSortedData = (products, sortBy) => {
  switch (sortBy) {
    case "LH":
      return products.sort(
        (a, b) => a.details.effectivePrice - b.details.effectivePrice
      );
    case "HL":
      return products.sort(
        (a, b) => b.details.effectivePrice - a.details.effectivePrice
      );
    default:
      return products;
  }
};

export const getFilterByCategories = (products, showCatagoeries) => {
  if (showCatagoeries.length > 0)
    return products.filter((product) =>
      showCatagoeries.includes(product.category)
    );
  return products;
};

export const getProductByRating = (products, showRating) => {
  if (showRating !== null)
    return products.filter((product) => product.details.rating >= showRating);
  return products;
};

export const getFilterbyAvalibility = (products, showInvertory) => {
  if (!showInvertory)
    return products.filter((product) => product.details.avalibility === true);
  return products;
};

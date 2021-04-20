export let initialFilters = {
  sortBy: "",
  showRating: 0,
  showInvertory: true,
  category: null,
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
  const productsIdInCart = cartList.map((item) => item._id);
  const productsIdInWishList = wishList.map((item) => item._id);
  return products.map((product) => {
    const productWithInCartFlag = productsIdInCart.includes(product._id)
      ? { ...product, inCart: true }
      : product;
    return productsIdInWishList.includes(productWithInCartFlag._id)
      ? { ...productWithInCartFlag, inWish: true }
      : productWithInCartFlag;
  });
};

export const getSortedData = (products, sortBy) => {
  switch (sortBy) {
    case "LH":
      return products.sort((a, b) => a.effectivePrice - b.effectivePrice);
    case "HL":
      return products.sort((a, b) => b.effectivePrice - a.effectivePrice);
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
    return products.filter((product) => product.rating >= showRating);
  return products;
};

export const getFilterbyAvalibility = (products, showInvertory) => {
  if (!showInvertory)
    return products.filter((product) => product.avalibility === true);
  return products;
};

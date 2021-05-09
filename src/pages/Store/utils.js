const initialFilters = {
  sortBy: "",
  showRating: null,
  showInvertory: true,
  showOffer: false,
  showNew: false,
  showBestSeller: false,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "FIILTER_BY_RATINGS":
      return { ...state, showRating: action.payload };
    case "TOGGLE_INVENTORY":
      return { ...state, showInvertory: !state.showInvertory };
    case "TOGGLE_SHOW_OFFER":
      return { ...state, showOffer: !state.showOffer };
    case "TOGGLE_SHOW_NEW":
      return { ...state, showNew: !state.showNew };
    case "TOGGLE_SHOW_BESTSELLER":
      return { ...state, showBestSeller: !state.showBestSeller };
    case "INITIAL":
      return { ...initialFilters };
    default:
      return state;
  }
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
export const getFilterByOffer = (product, showOffer) => {
  if (showOffer) return product.filter((product) => product.discount > 0);
  return product;
};

export const getFilterbyLabel = (product, showBestSeller, showNew) => {
  const showTheseLabels = [];
  if (showBestSeller) {
    showTheseLabels.push("Best Seller");
  }
  if (showNew) {
    showTheseLabels.push("New");
  }
  if (showTheseLabels.length) {
    return product.filter((product) => showTheseLabels.includes(product.label));
  }
  return product;
};

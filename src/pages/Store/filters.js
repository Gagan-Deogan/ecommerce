import { discountCalculator } from "../../Utils/discountCalculator";

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

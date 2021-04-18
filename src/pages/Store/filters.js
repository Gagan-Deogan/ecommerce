import { discountCalculator } from "../../Utils/discountCalculator";

export const getSortedData = (products, sortBy) => {
  if (sortBy && sortBy === "LH") {
    return products.sort((a, b) => {
      const aPrice =
        a.discount === 0 ? a.price : discountCalculator(a.discount, a.price);
      const bPrice =
        b.discount === 0 ? b.price : discountCalculator(b.discount, b.price);
      return aPrice - bPrice;
    });
  } else if (sortBy && sortBy === "HL") {
    return products.sort((a, b) => {
      const aPrice =
        a.discount === 0 ? a.price : discountCalculator(a.discount, a.price);
      const bPrice =
        b.discount === 0 ? b.price : discountCalculator(b.discount, b.price);
      return bPrice - aPrice;
    });
  }
  return products;
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
    return products.filter((product) => product.inStock === true);
  return products;
};

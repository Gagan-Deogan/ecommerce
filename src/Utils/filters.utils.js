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

export const getNewUrl = ({
  categoryId,
  urlEncoder,
  sortBy,
  showRating,
  showInvertory,
  showOffer,
  showNew,
  showBestSeller,
}) => {
  const categoryQuery = categoryId ? `category=${urlEncoder(categoryId)}&` : "";
  const sortQuery =
    sortBy === "LH" || sortBy === "HL" ? `sortBy=${urlEncoder(sortBy)}` : "";
  const ratingQuery = showRating ? `&showRating=${urlEncoder(showRating)}` : "";
  const inventoryQuery = `&showInvertory=${urlEncoder(showInvertory)}`;
  const discountQuery = `&showOffer=${showOffer}`;
  const newQuery = `&showNew=${showNew}`;
  const BestSellerQuery = `&showBestSeller=${showBestSeller}`;
  return `?${
    categoryQuery +
    sortQuery +
    ratingQuery +
    inventoryQuery +
    discountQuery +
    newQuery +
    BestSellerQuery
  }`;
};

export const getFiltedByAllFilters = ({
  sortBy,
  showRating,
  showInvertory,
  showOffer,
  showBestSeller,
  showNew,
  products,
}) => {
  const sortedData = getSortedData(products, sortBy);
  const filterByRating = getProductByRating(sortedData, showRating);
  const filterByInventory = getFilterbyAvalibility(
    filterByRating,
    showInvertory
  );
  const filterbyOffer = getFilterByOffer(filterByInventory, showOffer);
  return getFilterbyLabel(filterbyOffer, showBestSeller, showNew);
};

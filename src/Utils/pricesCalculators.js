export const getPriceByAddingProduct = (
  totalPrice,
  totalDiscount,
  totalEffectivePrice,
  product
) => {
  const newTotalPrice = totalPrice + product.price;
  const newTotalDiscount =
    totalDiscount + product.price - product.effectivePrice;
  const newTotalEffectivePrice = totalEffectivePrice + product.effectivePrice;

  return { newTotalPrice, newTotalDiscount, newTotalEffectivePrice };
};
export const getPricesByRemovingProduct = (
  totalPrice,
  totalDiscount,
  totalEffectivePrice,
  product
) => {
  const newTotalPrice = totalPrice - product.price;
  const newTotalDiscount =
    totalDiscount - Math.abs(product.price - product.effectivePrice);
  const newTotalEffectivePrice = totalEffectivePrice - product.effectivePrice;

  return { newTotalPrice, newTotalDiscount, newTotalEffectivePrice };
};

export const getTotalPrices = (cartItems) => {
  const priceReducer = (acc, item) => {
    return {
      newTotalEffectivePrice:
        acc.newTotalEffectivePrice +
        item.product.effectivePrice * item.quantity,
      newTotalDiscount:
        acc.newTotalDiscount +
        (item.product.price - item.product.effectivePrice) * item.quantity,
      newTotalPrice: acc.newTotalPrice + item.product.price * item.quantity,
    };
  };
  return cartItems.reduce(priceReducer, {
    newTotalEffectivePrice: 0,
    newTotalDiscount: 0,
    newTotalPrice: 0,
  });
};

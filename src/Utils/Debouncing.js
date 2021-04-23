export const useDebouncing = (someExpensiveFunction, difference) => {
  let timer;
  return function (product, inWishlist) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      someExpensiveFunction(product, inWishlist);
    }, difference);
  };
};

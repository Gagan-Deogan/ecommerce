export const debouncing = (someExpensiveFunction, difference) => {
  let timer;
  return function ({ ...rest }) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      someExpensiveFunction({ ...rest });
    }, difference);
  };
};

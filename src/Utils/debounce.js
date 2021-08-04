export function debounce(func, delay = 300) {
  let timerId;
  return function (...rest) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...rest);
    }, delay);
  };
}

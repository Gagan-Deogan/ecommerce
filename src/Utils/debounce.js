export function debounce(func, wait) {
  let timerId;
  return function (...rest) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...rest);
    }, wait);
  };
}

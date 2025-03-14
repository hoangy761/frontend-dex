let timeout: NodeJS.Timeout;
// eslint-disable-next-line no-unused-vars
const useDebounce = (callback: (...args: React.ChangeEvent<HTMLInputElement>[]) => void, delay: number) => {
  return function (...args: React.ChangeEvent<HTMLInputElement>[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebounce;

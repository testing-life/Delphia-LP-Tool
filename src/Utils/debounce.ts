const debounce = (callback: (arg: any) => void, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export default debounce;

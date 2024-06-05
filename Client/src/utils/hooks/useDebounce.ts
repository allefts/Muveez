import { useEffect, useState } from "react";

const useDebounce = (val: string, delay = 1500) => {
  const [debouncedValue, setDeboucedValue] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDeboucedValue(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);

  return debouncedValue;
};

export { useDebounce };

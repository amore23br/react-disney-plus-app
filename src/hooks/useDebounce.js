import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // delay(ex.0.5초) 후에 handler함수 실행
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // setTimeout 실행 후에 clear 필요
    return () => {
      clearTimeout(handler);
    };
    // value,delay 바뀔때마다 함수 재실행
  }, [value, delay]);

  return debounceValue;
};

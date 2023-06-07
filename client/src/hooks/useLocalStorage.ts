import { useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving data from localStorage: ${error}`);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      if (typeof window === "undefined") return;

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving data to localStorage: ${error}`);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

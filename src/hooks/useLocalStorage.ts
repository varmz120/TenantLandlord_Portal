export const useLocalStorage = () => {
  //const [value, setValue] = useState<string | null>(null);

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    //setValue(value);
  };

  const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    //setValue(null);
  };

  return { setItem, getItem, removeItem }; // removed value
};

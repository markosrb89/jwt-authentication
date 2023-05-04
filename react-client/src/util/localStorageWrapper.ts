export function getLocalStorageWrapper<T extends string>() {
  const setItem = (key: T, data: string | number | boolean | object) => {
    return setItemUnsafe(key, data);
  };

  const setItemUnsafe = (
    key: string,
    data: string | number | boolean | object
  ) => {
    try {
      let strData = String(data);
      if (typeof data === "object") {
        strData = JSON.stringify(data);
      }
      localStorage.setItem(key, strData);
    } catch (e) {
      console.error(e);
    }
  };

  const getItem = (key: T) => {
    return getItemUnsafe(key);
  };

  const getItemUnsafe = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const removeItem = (key: T) => {
    removeItemUnsafe(key);
  };

  const removeItemUnsafe = (key: string) => {
    localStorage.removeItem(key);
  };

  const localStorageWrapper = {
    setItem,
    setItemUnsafe,
    getItem,
    getItemUnsafe,
    removeItem,
    removeItemUnsafe,
  };

  return localStorageWrapper;
}

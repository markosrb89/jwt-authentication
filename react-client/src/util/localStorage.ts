import { getLocalStorageWrapper } from "./localStorageWrapper";

type LocalStorageKey = "x-access-token";

const localStorageWrapper = getLocalStorageWrapper<LocalStorageKey>();

export const getItem = localStorageWrapper.getItem;
export const getItemUnsafe = localStorageWrapper.getItemUnsafe;
export const setItem = localStorageWrapper.setItem;
export const setItemUnsafe = localStorageWrapper.setItemUnsafe;
export const removeItem = localStorageWrapper.removeItem;
export const removeItemUnsafe = localStorageWrapper.removeItemUnsafe;

export default getLocalStorageWrapper<LocalStorageKey>();

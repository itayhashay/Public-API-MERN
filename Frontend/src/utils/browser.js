import { defaultSearchByValues, defaultSearchValue } from "./constants/search";
import RoutesUrls from "./constants/routes";
import * as USER_TYPES from "./constants/userTypes";
import { parseJwt } from "./logic";

export const initSearchStorgeData = () => {
  localStorage.setItem("searchInput", defaultSearchValue);
  localStorage.setItem("searchBy", JSON.stringify(defaultSearchByValues));
};

export const getSearchStorgeData = () => {
  const searchInputStg = localStorage.getItem("searchInput");
  const searchByStg = localStorage.getItem("searchBy");
  return {
    searchInputStg,
    searchByStg,
  };
};

export const setSearchStorgeData = (searchValue, searchBy) => {
  localStorage.setItem("searchInput", searchValue);
  localStorage.setItem("searchBy", JSON.stringify(searchBy));
};

export const redirectToPath = (pathname) => {
  window.location.href = `${window.location.origin}/${pathname}`;
};

export const setUserDataStorage = (userInfo) => {
  localStorage.setItem("userData", JSON.stringify(userInfo));
};

export const setUserTokenStorage = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getConnectedUsername = () => {
  const userData = getUserDataStorage();
  return userData ? userData.username : "";
};

export const getUserDataStorage = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

export const getUserTokenStorage = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const getUserToken = () => {
  const token = getUserTokenStorage();
  return token ? token : false;
};

export const checkIfAdmin = () => {
  const userToken = getUserToken();
  if (userToken !== false) {
    const userData = parseJwt(userToken);
    return userData.userType === USER_TYPES.ADMIN;
  }
  return false;
};

export const checkIfUserConnected = () => {
  const userToken = getUserToken();
  return userToken !== false;
};

export const clearStorage = () => {
  localStorage.clear();
};

export const authenticateUser = () => {
  const userToken = getUserToken();
  if (userToken === false) {
    redirectToPath(`${RoutesUrls.USER_FORM}/${RoutesUrls.LOGIN}`);
    return false;
  } else return true;
};

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

export const setUserDataStorage = (userInfo, token) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      userInfo,
      token,
    })
  );
};

export const getConnectedUsername = () => {
  const userData = getUserDataStorage();
  if (userData && userData.userInfo) {
    return userData.userInfo.username;
  } else {
    return "";
  }
};

export const getUserDataStorage = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

export const getUserToken = () => {
  const userData = getUserDataStorage();
  if (userData) {
    return userData.token;
  } else {
    return false;
  }
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

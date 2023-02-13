import { defaultSearchByValues, defaultSearchValue } from "./constants/search";

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

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./searchInputStyles";
import { Container, FilterContainer, TitleText, checkboxStyle } from "./styles";

import { toasterMessage } from "../../../utils/toasterMessage";
import { toasterTypes } from "../../../utils/constants/toaster";
import RoutesUrls from "../../../utils/constants/routes";
import {
  defaultSearchByValues,
  defaultSearchValue,
} from "../../../utils/constants/search";
import {
  initSearchStorgeData,
  getSearchStorgeData,
  setSearchStorgeData,
} from "../../../utils/browser";

const Searchbar = () => {
  const [searchBy, setSearchBy] = useState(defaultSearchByValues);
  const [isValid, setIsValid] = useState(true);
  const searchInputRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const trueParameters = Object.values(searchBy).filter((p) => p);
    if (trueParameters.length === 0)
      toasterMessage(toasterTypes.ERROR, `Must pick at least one!`);

    setIsValid(trueParameters.length !== 0);
  }, [searchBy]);

  useEffect(() => {
    if (location.pathname === `/${RoutesUrls.SEARCH_RESULTS}`) {
      getDataFromStorage();
    } else {
      initializeSearch();
    }
  }, [location]);

  const getDataFromStorage = () => {
    const { searchInputStg, searchByStg } = getSearchStorgeData();
    if (searchInputStg) {
      searchInputRef.current.value = searchInputStg;
    }
    if (searchByStg) {
      setSearchBy(JSON.parse(searchByStg));
    }
  };

  const initializeSearch = () => {
    initSearchStorgeData();
    searchInputRef.current.value = defaultSearchValue;
    setSearchBy(defaultSearchByValues);
  };

  const handleChange = (event) => {
    setSearchBy({
      ...searchBy,
      [event.target.name]: event.target.checked,
    });
  };

  const handleKeyDown = (event) => {
    const searchValue = searchInputRef.current.value;
    const { Name, Category, UploadBy } = searchBy;

    if (event.key !== "Enter" || searchValue === defaultSearchValue) return;

    setSearchStorgeData(searchValue, searchBy);
    window.location.href = `${RoutesUrls.SEARCH_RESULTS}?q=${searchValue}&name=${Name}&category=${Category}&uploadby=${UploadBy}`;
  };

  const { Name, Category, UploadBy } = searchBy;

  return (
    <Container>
      <Search sx={{ margin: "0 35px" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onKeyDown={handleKeyDown}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          inputRef={searchInputRef}
        />
      </Search>
      <FilterContainer>
        <TitleText>Search by:</TitleText>
        <FormControl
          required
          error={isValid}
          component="fieldset"
          sx={{ m: 3, margin: 0 }}
          variant="standard"
        >
          <FormGroup sx={{ flexDirection: "row" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Name}
                  onChange={handleChange}
                  name="Name"
                  sx={checkboxStyle}
                />
              }
              label="Name"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Category}
                  onChange={handleChange}
                  name="Category"
                  sx={checkboxStyle}
                />
              }
              label="Category"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={UploadBy}
                  onChange={handleChange}
                  name="UploadBy"
                  sx={checkboxStyle}
                />
              }
              label="UploadBy"
            />
          </FormGroup>
        </FormControl>
      </FilterContainer>
    </Container>
  );
};

export default Searchbar;

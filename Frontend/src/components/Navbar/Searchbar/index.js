import { useState, useEffect } from "react";
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

const Searchbar = () => {
  const [searchBy, setSearchBy] = useState({
    Name: true,
    Category: true,
    UploadBy: true,
  });

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const trueParameters = Object.values(searchBy).filter((p) => p);
    if (trueParameters.length === 0)
      toasterMessage(toasterTypes.ERROR, `Must pick at least one!`);

    setIsValid(trueParameters.length !== 0);
  }, [searchBy]);

  const handleChange = (event) => {
    setSearchBy({
      ...searchBy,
      [event.target.name]: event.target.checked,
    });
  };

  const { Name, Category, UploadBy } = searchBy;

  return (
    <Container>
      <Search sx={{ margin: "0 35px" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
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

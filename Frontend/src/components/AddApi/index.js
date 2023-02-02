import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Categories from "../../utils/constants/categories";

import {
  Container,
  FormContainer,
  TitleText,
  FieldContainer,
  FieldsContainer,
  FieldName,
} from "./styles";

const AddApi = () => {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Container>
      <FormContainer>
        <TitleText>Add New Api</TitleText>
        <FieldsContainer>
          <FieldContainer>
            <FieldName>Api Name: </FieldName>
            <TextField
              id="standard-basic"
              variant="standard"
              sx={{
                width: "-webkit-fill-available",
              }}
            />
          </FieldContainer>
          <FieldContainer>
            <FieldName>Api Description: </FieldName>
            <TextField
              id="standard-basic"
              variant="standard"
              sx={{
                width: "-webkit-fill-available",
              }}
            />
          </FieldContainer>
          <FieldContainer>
            <FieldName>Api Url: </FieldName>
            <TextField
              id="standard-basic"
              variant="standard"
              sx={{
                width: "-webkit-fill-available",
              }}
            />
          </FieldContainer>
          <FieldContainer>
            <FieldName>Category: </FieldName>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 120,
                margin: 0,
                width: "-webkit-fill-available",
              }}
            >
              <InputLabel id="demo-simple-select-standard-label"></InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={handleChange}
                label=""
              >
                {Categories.map((category) => {
                  return (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </FieldContainer>
        </FieldsContainer>
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </FormContainer>
    </Container>
  );
};

export default AddApi;

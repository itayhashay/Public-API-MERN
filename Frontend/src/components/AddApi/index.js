import { useState, useRef } from "react";
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
import { addNewApi } from "../../utils/api";
import { toasterMessage } from "../../utils/toasterMessage";
import { toasterTypes } from "../../utils/constants/toaster";

const AddApi = () => {
  const [category, setCategory] = useState("");
  const apiNameRef = useRef(null);
  const apiDescRef = useRef(null);
  const apiUrlRef = useRef(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const onSubmit = async () => {
    const data = {
      name: apiNameRef.current.value,
      description: apiDescRef.current.value,
      url: apiUrlRef.current.value,
      category: category,
      img: "",
    };

    await addNewApi(data);

    toasterMessage(
      toasterTypes.SUCCESS,
      `Api ${data.name} Created successfuly!`
    );
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
              inputRef={apiNameRef}
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
              inputRef={apiDescRef}
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
              inputRef={apiUrlRef}
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
        <Button variant="contained" onClick={onSubmit} endIcon={<SendIcon />}>
          Send
        </Button>
      </FormContainer>
    </Container>
  );
};

export default AddApi;

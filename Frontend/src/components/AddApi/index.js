import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {
  Container,
  FormContainer,
  TitleText,
  FieldContainer,
  FieldsContainer,
  FieldName,
} from "./styles";
import { addNewApi, getAllCategories } from "../../utils/api";
import { toasterTypes } from "../../utils/constants/toaster";
import RoutesUrls from "../../utils/constants/routes";
import { toasterAndRedirect } from "../../utils/logic";

const AddApi = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const apiNameRef = useRef(null);
  const apiDescRef = useRef(null);
  const apiUrlRef = useRef(null);

  useEffect(() => {
    getAllCategories().then((categories) => setCategoriesList(categories));
  }, []);

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

    toasterAndRedirect(
      {
        toasterType: toasterTypes.SUCCESS,
        message: `Api ${data.name} Created successfuly!`,
      },
      RoutesUrls.LATEST_APIS
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
                {categoriesList.map((category) => {
                  return (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
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

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "./styles";
import { addNewApi, getApiById, getAllCategories } from "../../utils/api";
import { toasterTypes } from "../../utils/constants/toaster";
import RoutesUrls from "../../utils/constants/routes";
import { toasterAndRedirect } from "../../utils/logic";
import * as FORM_FLAGS from "../../utils/flags/formFlags";

const DEFAULT_VALUEES = {
  name: "",
  description: "",
  url: "",
  category: "",
};

const ApiForm = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [flag, setFlag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState(DEFAULT_VALUEES);
  const params = useParams();

  useEffect(() => {
    const fetchApiData = async (id) => {
      const apiData = await getApiById(id);
      return apiData;
    };
    const apiId = params.id;

    if (apiId) {
      setFlag(FORM_FLAGS.EDIT);
      fetchApiData(apiId).then((data) => {
        setApiData(data);
      });
    } else {
      setFlag(FORM_FLAGS.ADD);
    }
    setIsLoading(false);

    getAllCategories().then((categories) => setCategoriesList(categories));
  }, []);

  const handleInputChange = (event) => {
    setApiData({
      ...apiData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async () => {
    await addNewApi({ ...apiData, img: "" });

    toasterAndRedirect(
      {
        toasterType: toasterTypes.SUCCESS,
        message: `Api ${apiData.name} Created successfuly!`,
      },
      RoutesUrls.LATEST_APIS
    );
  };

  return (
    <Container>
      <FormContainer>
        <TitleText>{flag} Api</TitleText>
        <FieldsContainer>
          <FieldContainer>
            <TextField
              id="standard-basic"
              value={apiData.name}
              onChange={handleInputChange}
              label="Name"
              name="name"
              variant="standard"
              sx={{
                width: "-webkit-fill-available",
              }}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              id="standard-basic"
              value={apiData.description}
              onChange={handleInputChange}
              label="Description"
              name="description"
              variant="standard"
              sx={{
                width: "-webkit-fill-available",
              }}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              id="standard-basic"
              value={apiData.url}
              onChange={handleInputChange}
              label="Url"
              name="url"
              variant="standard"
              sx={{
                width: "-webkit-fill-available",
              }}
            />
          </FieldContainer>
          <FieldContainer>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 120,
                margin: 0,
                width: "-webkit-fill-available",
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                id="demo-simple-select-standard-label"
                value={apiData.category}
                onChange={handleInputChange}
                label="Category"
                name="category"
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

export default ApiForm;

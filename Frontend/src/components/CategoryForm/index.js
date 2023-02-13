import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Container,
  FormContainer,
  TitleText,
  FieldContainer,
  FieldsContainer,
} from "./styles";
import { getCategoryById, addNewCategory, editCategory } from "../../utils/api";
import { toasterMessage } from "../../utils/toasterMessage";
import { toasterTypes } from "../../utils/constants/toaster";
import RoutesUrls from "../../utils/constants/routes";
import Spinner from "../Spinner";
import Genders from "../../utils/constants/genders";
import { toasterAndRedirect } from "../../utils/logic";
import DialogModal from "../DialogModal";
import * as FORM_FLAGS from "../../utils/flags/formFlags";

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [flag, setFlag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCategoryData = async (id) => {
      const categoryData = await getCategoryById(id);
      return categoryData;
    };
    const categoryId = params.id;

    if (categoryId) {
      setFlag(FORM_FLAGS.EDIT);
      fetchCategoryData(categoryId).then((data) => setCategoryData(data));
    } else {
      setFlag(FORM_FLAGS.ADD);
    }
    setIsLoading(false);
  }, [params]);

  const handleInputChange = (event) => {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async () => {
    switch (flag) {
      case FORM_FLAGS.ADD:
        await addNewCategory(categoryData);
        break;
      case FORM_FLAGS.EDIT:
        await editCategory(params.id, categoryData);
        break;
      default:
        break;
    }

    const actionLabel = flag === FORM_FLAGS.ADD ? "Created" : "Edited";

    toasterAndRedirect(
      {
        toasterType: toasterTypes.SUCCESS,
        message: `Category ${actionLabel} successfuly!`,
      },
      RoutesUrls.MANAGE_CATEGORIES
    );
  };

  return (
    <Container>
      <FormContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TitleText>{flag} Category</TitleText>
            <FieldsContainer>
              <FieldContainer>
                <TextField
                  sx={{ width: "100%" }}
                  value={categoryData.name}
                  variant="standard"
                  label="Category Name"
                  name="name"
                  onChange={handleInputChange}
                />
              </FieldContainer>
              <FieldContainer>
                <TextField
                  sx={{ width: "100%" }}
                  value={categoryData.description}
                  variant="standard"
                  label="Description"
                  name="description"
                  onChange={handleInputChange}
                />
              </FieldContainer>
              <Button
                variant="contained"
                onClick={onSubmit}
                sx={{ marginTop: "10px" }}
              >
                {flag}
              </Button>
            </FieldsContainer>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

export default CategoryForm;

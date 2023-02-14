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
import { editUser, getUserById } from "../../utils/api";
import { toasterMessage } from "../../utils/toasterMessage";
import { toasterTypes } from "../../utils/constants/toaster";
import RoutesUrls from "../../utils/constants/routes";
import Spinner from "../Spinner";
import Genders from "../../utils/constants/genders";
import { toasterAndRedirect } from "../../utils/logic";
import DialogModal from "../DialogModal";
import * as FORM_FLAGS from "../../utils/flags/formFlags";

const UserForm = () => {
  const [userBaseInfo, setUserBaseInfo] = useState({});
  const [userNewInfo, setUserNewInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birthday: null,
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async (id) => {
      const userData = await getUserById(id);
      return userData;
    };
    const userId = params.id;

    if (userId === "profile") {
      setFlag(FORM_FLAGS.PROFILE);
      fetchUserData("63e9512605360c2670eb7a89").then(
        // TODO: Change to connected userID
        (data) => setUserFirstData(data)
      );
    } else if (userId) {
      setFlag(FORM_FLAGS.EDIT);
      fetchUserData(userId).then((data) => setUserFirstData(data));
    } else {
      setFlag(FORM_FLAGS.ADD);
    }
    setIsLoading(false);
  }, [params]);

  const setUserFirstData = (userData) => {
    setUserBaseInfo(userData);
    setUserNewInfo(userData);
  };

  const handleChangeBirthday = (newValue) => {
    setUserNewInfo({
      ...userNewInfo,
      birthday: newValue,
    });
  };

  const handleInputChange = (event) => {
    setUserNewInfo({
      ...userNewInfo,
      [event.target.name]: event.target.value,
    });
  };

  const isDataChanged = () => {
    return (
      userNewInfo.firstName !== userBaseInfo.firstName ||
      userNewInfo.lastName !== userBaseInfo.lastName ||
      userNewInfo.username !== userBaseInfo.username ||
      userNewInfo.email !== userBaseInfo.email ||
      userNewInfo.birthday !== userBaseInfo.birthday ||
      userNewInfo.gender !== userBaseInfo.gender
    );
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      const isChange = isDataChanged();
      if (isChange) {
        setIsModalOpen(true);
      } else {
        setIsEditMode(false);
      }
    } else setIsEditMode(true);
  };

  const onCancel = () => {
    const isChange = isDataChanged();
    if (!isChange) {
      setIsEditMode(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const discardChanges = () => {
    setUserNewInfo(userBaseInfo);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const saveUserChanges = async () => {
    await editUser("6373b5a91876e3d4dac2201f", userNewInfo);
    toasterAndRedirect(
      {
        toasterType: toasterTypes.SUCCESS,
        message: "User edited successfuly!",
      },
      RoutesUrls.PROFILE
    );
  };

  const onSubmit = async () => {
    const isChange = isDataChanged();
    if (!isChange) {
      toasterMessage(toasterTypes.INFO, "User info hasn't changed.");
      setIsEditMode(false);
    } else {
      await saveUserChanges();
    }
  };

  const isUserProfile = flag === FORM_FLAGS.PROFILE;

  return (
    <Container>
      <FormContainer
        className={`profile-form ${
          isEditMode || !isUserProfile ? `edit-mode` : ""
        }`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TitleText>
              {isUserProfile ? "User Profile" : `${flag} User`}
            </TitleText>
            {isUserProfile && (
              <FormControlLabel
                value="end"
                control={
                  <Switch
                    color="primary"
                    checked={isEditMode}
                    onChange={toggleEditMode}
                  />
                }
                label="Edit Mode"
                labelPlacement="start"
                sx={{ position: "absolute", top: "30px", right: "30px" }}
              />
            )}
            <FieldsContainer>
              <FieldContainer>
                <TextField
                  disabled={isUserProfile && !isEditMode}
                  value={userNewInfo.firstName}
                  variant="standard"
                  label="First Name"
                  name="firstName"
                  onChange={handleInputChange}
                />
              </FieldContainer>
              <FieldContainer>
                <TextField
                  disabled={isUserProfile && !isEditMode}
                  value={userNewInfo.lastName}
                  variant="standard"
                  label="Last Name"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </FieldContainer>
              <FieldContainer>
                <TextField
                  disabled={isUserProfile && !isEditMode}
                  value={userNewInfo.username}
                  variant="standard"
                  label="User Name"
                  name="username"
                  onChange={handleInputChange}
                />
              </FieldContainer>
              <FieldContainer>
                <TextField
                  disabled={isUserProfile && !isEditMode}
                  value={userNewInfo.email}
                  variant="standard"
                  label="Email"
                  name="email"
                  onChange={handleInputChange}
                />
              </FieldContainer>
              <FieldContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Birthday"
                    inputFormat="MM/DD/YYYY"
                    value={userNewInfo.birthday}
                    disabled={isUserProfile && !isEditMode}
                    onChange={handleChangeBirthday}
                    renderInput={(params) => (
                      <TextField variant="standard" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </FieldContainer>
              <FieldContainer>
                <FormControl
                  className="gender-select-fc"
                  variant="standard"
                  disabled={isUserProfile && !isEditMode}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={userNewInfo.gender}
                    onChange={handleInputChange}
                    label="Gender"
                    name="gender"
                  >
                    {Genders.map((gender) => {
                      return <MenuItem value={gender}>{gender}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </FieldContainer>
              {isUserProfile ? (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    visibility: isEditMode ? "visiable" : "hidden",
                    marginTop: "10px",
                  }}
                >
                  <Button onClick={onCancel}>Cancel</Button>
                  <Button variant="contained" onClick={onSubmit}>
                    Save
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{ marginTop: "10px" }}
                >
                  {flag}
                </Button>
              )}
            </FieldsContainer>
          </>
        )}
      </FormContainer>
      <DialogModal
        isOpen={isModalOpen}
        title="Edit User"
        message="Are you sure you want to delete all your changes?"
        onAgree={discardChanges}
        onCancel={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default UserForm;

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
import { toasterAndRedirect, removeSpaceBetweenWords } from "../../utils/logic";
import DialogModal from "../DialogModal";
import * as FORM_FLAGS from "../../utils/flags/formFlags";
import * as USER_FIELDS from "../../utils/constants/userFormField";
import {
  ALL_FIELDS,
  DEFAULT_VALUEES,
} from "../../utils/constants/userFormField";

const UserForm = () => {
  const [userBaseInfo, setUserBaseInfo] = useState({});
  const [userNewInfo, setUserNewInfo] = useState(DEFAULT_VALUEES);
  const [formfields, setFormfields] = useState([]);
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

    switch (userId) {
      case RoutesUrls.SIGN_UP:
        setFlag(FORM_FLAGS.SIGN_UP);
        setFormfields(USER_FIELDS.SIGN_UP_FIELDS);
        setUserFirstData(DEFAULT_VALUEES);
        break;
      case RoutesUrls.LOGIN:
        setFlag(FORM_FLAGS.LOGIN);
        setFormfields(USER_FIELDS.LOGIN_FIELDS);
        setUserFirstData(DEFAULT_VALUEES);
        break;
      case RoutesUrls.PROFILE:
        setFlag(FORM_FLAGS.PROFILE);
        setFormfields(USER_FIELDS.PROFILE_FIELDS);
        fetchUserData("63e9512605360c2670eb7a89").then(
          // TODO: Change to connected userID
          (data) => setUserFirstData(data)
        );
        break;
      case undefined:
        setFormfields(USER_FIELDS.ADD_FIELDS);
        setFlag(FORM_FLAGS.ADD);
        setUserFirstData(DEFAULT_VALUEES);
        break;
      default:
        setFlag(FORM_FLAGS.EDIT);
        setFormfields(USER_FIELDS.EDIT_FIELDS);
        fetchUserData(userId).then((data) => setUserFirstData(data));
        break;
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

  const allFormFields = [
    {
      fieldName: ALL_FIELDS.FIRST_NAME,
      content: (
        <TextField
          disabled={isUserProfile && !isEditMode}
          value={userNewInfo.firstName}
          variant="standard"
          label="First Name"
          name="firstName"
          onChange={handleInputChange}
        />
      ),
    },
    {
      fieldName: ALL_FIELDS.LAST_NAME,
      content: (
        <TextField
          disabled={isUserProfile && !isEditMode}
          value={userNewInfo.lastName}
          variant="standard"
          label="Last Name"
          name="lastName"
          onChange={handleInputChange}
        />
      ),
    },
    {
      fieldName: ALL_FIELDS.USER_NAME,
      content: (
        <TextField
          disabled={isUserProfile && !isEditMode}
          value={userNewInfo.username}
          variant="standard"
          label="User Name"
          name="username"
          onChange={handleInputChange}
        />
      ),
    },
    {
      fieldName: ALL_FIELDS.PASSWORD,
      content: (
        <TextField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          variant="standard"
          value={userNewInfo.password}
          onChange={handleInputChange}
        />
      ),
    },
    {
      fieldName: ALL_FIELDS.RE_PASSWORD,
      content: (
        <TextField
          label="Re-Password"
          type="password"
          name="rePassword"
          autoComplete="current-password"
          variant="standard"
          value={userNewInfo.rePassword}
          onChange={handleInputChange}
        />
      ),
    },
    {
      fieldName: ALL_FIELDS.EMAIL,
      content: (
        <TextField
          disabled={isUserProfile && !isEditMode}
          value={userNewInfo.email}
          variant="standard"
          label="Email"
          name="email"
          onChange={handleInputChange}
        />
      ),
    },
    {
      fieldName: ALL_FIELDS.BIRTHDAY,
      content: (
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
      ),
    },
    {
      fieldName: ALL_FIELDS.GENDER,
      content: (
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
      ),
    },
  ];

  return (
    <Container>
      <FormContainer
        className={`profile-form ${
          isEditMode || !isUserProfile ? `edit-mode` : ""
        } ${removeSpaceBetweenWords(flag)}-form`}
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
              {allFormFields
                .filter((field) => formfields.includes(field.fieldName))
                .map((field) => {
                  return (
                    <FieldContainer key={field.fieldName}>
                      {field.content}
                    </FieldContainer>
                  );
                })}
              {isUserProfile ? (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    visibility: isEditMode ? "visiable" : "hidden",
                    margin: "10px 0",
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
                  sx={{ margin: "10px 0" }}
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

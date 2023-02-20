import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import {
  DividerLine,
  UserSection,
  HelloUserContainer,
  UserNameText,
  HelloText,
} from "./styles";
import Searchbar from "./Searchbar";
import RoutesUrls from "../../utils/constants/routes";
import { getConnectedUsername } from "../../utils/browser";

export const Navbar = () => {
  const [connectedUserName, setConnectedUserName] = useState("");

  useEffect(() => {
    const username = getConnectedUsername();
    setConnectedUserName(username);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "4vh" }}
          >
            <Link className="navbar-link" to="">
              Public API
            </Link>
          </Typography>
          <Searchbar />
          <Box sx={{ flexGrow: 4 }} />
          <UserSection>
            {connectedUserName === "" ? (
              <>
                <Link
                  className="navbar-link"
                  to={`${RoutesUrls.USER_FORM}/${RoutesUrls.LOGIN}`}
                >
                  <Button color="inherit" sx={{ fontSize: "2vh" }}>
                    Log in
                  </Button>
                </Link>
                <DividerLine />
                <Link
                  className="navbar-link"
                  to={`${RoutesUrls.USER_FORM}/${RoutesUrls.SIGN_UP}`}
                >
                  <Button color="inherit" sx={{ fontSize: "2vh" }}>
                    Sign up
                  </Button>
                </Link>{" "}
              </>
            ) : (
              <HelloUserContainer>
                <HelloText>Hello,</HelloText>
                <UserNameText>{connectedUserName}</UserNameText>
                <PersonIcon />
              </HelloUserContainer>
            )}
          </UserSection>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

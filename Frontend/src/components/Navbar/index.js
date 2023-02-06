import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DividerLine, UserSection } from "./styles";
import Searchbar from "./Searchbar";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "4vh" }}
          >
            Public API
          </Typography>
          <Searchbar />
          <Box sx={{ flexGrow: 4 }} />
          <UserSection>
            <Button color="inherit" sx={{ fontSize: "2vh" }}>
              Log in
            </Button>
            <DividerLine />
            <Button color="inherit" sx={{ fontSize: "2vh" }}>
              Sign up
            </Button>
          </UserSection>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

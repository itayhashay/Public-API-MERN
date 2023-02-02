import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DividerLine, UserSection } from "./styles";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Public API
          </Typography>
          <UserSection>
            <Button color="inherit">Log in</Button>
            <DividerLine />
            <Button color="inherit">Sign up</Button>
          </UserSection>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { Drawer, DrawerHeader } from "./styles";
import {
  AdminMenuItems,
  MenuItems,
  UserMenuActions,
} from "../../utils/constants/sidebarItems";
import RoutesUrls from "../../utils/constants/routes";
import { clearStorage, checkIfAdmin } from "../../utils/browser";
import { toasterAndRedirect } from "../../utils/logic";
import { toasterTypes } from "../../utils/constants/toaster";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = checkIfAdmin();
    setIsAdmin(isAdmin);
  }, []);

  const ToogleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    clearStorage();
    toasterAndRedirect(
      {
        toasterType: toasterTypes.SUCCESS,
        message: `Logged Out successfuly`,
      },
      `${RoutesUrls.USER_FORM}/${RoutesUrls.LOGIN}`
    );
  };

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={ToogleDrawer}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {isAdmin && (
          <List>
            {AdminMenuItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                <Link className="sidebar-link" to={`${item.urlName}`}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.displayName}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
        {isAdmin && <Divider />}
        <List>
          {MenuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <Link className="sidebar-link" to={`${item.urlName}`}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.displayName}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {UserMenuActions.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              {item.urlName === RoutesUrls.LOGOUT ? (
                <ListItemButton
                  onClick={() => logout()}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.displayName}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              ) : (
                <Link className="sidebar-link" to={`${item.urlName}`}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.displayName}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

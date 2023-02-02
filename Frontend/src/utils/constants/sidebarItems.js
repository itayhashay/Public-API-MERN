import RoutesUrls from "../constants/routes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CodeIcon from "@mui/icons-material/Code";
import CategoryIcon from "@mui/icons-material/Category";

export const MenuItems = [
  {
    id: 1,
    displayName: "Latest APIs",
    urlName: RoutesUrls.LATEST_APIS,
    icon: <AccessTimeIcon />,
  },
  {
    id: 2,
    displayName: "Best Rated APIs",
    urlName: RoutesUrls.BEST_RATED_APIS,
    icon: <ThumbUpIcon />,
  },
  {
    id: 3,
    displayName: "Random API",
    urlName: RoutesUrls.RANDOM_API,
    icon: <ShuffleIcon />,
  },
  {
    id: 4,
    displayName: "Bookmarks",
    urlName: RoutesUrls.BOOKMARKS,
    icon: <FavoriteIcon />,
  },
  {
    id: 5,
    displayName: "Add API",
    urlName: RoutesUrls.ADD_API,
    icon: <AddIcon />,
  },
];

export const UserMenuActions = [
  {
    id: 1,
    displayName: "Profile",
    urlName: RoutesUrls.PROFILE,
    icon: <AccountCircleIcon />,
  },
  {
    id: 2,
    displayName: "Logout",
    urlName: RoutesUrls.LOGOUT,
    icon: <LogoutIcon />,
  },
];

export const AdminMenuItems = [
  {
    id: 1,
    displayName: "Dashboard",
    urlName: RoutesUrls.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    displayName: "Manage APIs",
    urlName: RoutesUrls.MANAGE_APIS,
    icon: <CodeIcon />,
  },
  {
    id: 3,
    displayName: "Manage Users",
    urlName: RoutesUrls.MANAGE_USERS,
    icon: <PeopleIcon />,
  },
  {
    id: 4,
    displayName: "Manage Categories",
    urlName: RoutesUrls.MANAGE_CATEGORIES,
    icon: <CategoryIcon />,
  },
];

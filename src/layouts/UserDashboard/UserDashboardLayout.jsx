import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
  IconButton,
  Avatar,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  Badge,
  CircularProgress,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { IoNotificationsCircleOutline, IoPower } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import NotifyBell from "../../assets/img/notify-bell.png";
import Profile from "../../assets/img/profile.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { resetChatState } from "@/store/chatSlice";
import { persistor } from "@/store/store";

const drawerWidth = 230; // Define the sidebar width
const TopBar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const unreadNotifications = useSelector((state) => state.notification.unread);

  const location = useLocation();
  const dispatch = useDispatch();

  // Define a mapping of paths to display names
  const pathToNameMap = {
    "/user-dashboard/": "Dashboard",
    "/user-dashboard/user-profile": "Profile",
    "/user-dashboard/user-account": "Settings",
    "/inbox": "Inbox",
    "/user-dashboard/user-list": "Favorite Listing",
    "/user-dashboard/user-booking": "Booking History",
    "/user-dashboard/user-rating": "Review & Rating",
    "/user-dashboard/user-notification": "Notification",
    "/user-dashboard/user-help": " ",
    "/user-dashboard/edit-profile": "Edit Profile",
    "/User-dashboard/User-account": "Setting",
    "/user-dashboard/user-disputes": "Disputes",
    "/user-dashboard/add-disputes": "Add Disputes",
    "/user-dashboard/dispute-details": "Dispute Detail",
    "/user-dashboard/user-client": "vendors",
    "/user-dashboard/vendor-profile": "Profile",
    // Add more paths and names as needed
  };

  // Get the current path name or fallback to a default
  const currentPathName = pathToNameMap[location.pathname] || "Dashboard";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("token-removed"));
    dispatch(logout());
    dispatch(resetChatState());
    persistor.purge();
    dispatch(apiSlice.util.resetApiState());
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#1E1E1E" : "#F7F7F7",
        color: (theme) =>
          theme.palette.mode === "dark" ? theme.palette.text.primary : "#000",
        height: "74px",
        width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        left: isMobile ? 0 : `${drawerWidth}px`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 1px 4px rgba(255,255,255,0.08)"
            : "0px 1px 4px rgba(0,0,0,0.1)",
      }}
      elevation={0}
    >
      <Toolbar sx={{ height: "100%" }} disableGutters>
        <div className="w-full flex items-center justify-between px-4">
          <p className="sm:text-2xl font-medium">{currentPathName}</p>
          <div className="flex items-center justify-end sm:gap-2 w-1/2">
            {/* <div className="xl:block hidden">
              <form action="">
                <div className="flex lg:w-96 md:w-60 items-center border rounded-3xl p-2 bg-white shadow-[0px_14px_30px_0px_#8383830D]">
                  <label htmlFor="">
                    <IoIosSearch />
                  </label>
                  <input
                    type="search"
                    className="px-3 w-full bg-transparent"
                    placeholder="Start searching here..."
                  />
                </div>
              </form>
            </div> */}
            <div className="relative">
              <Link
                to="/user-dashboard/user-notification"
                className="bg-white sm:p-3 p-2 border block rounded-full relative"
              >
                <img
                  src={NotifyBell}
                  alt=""
                  className="w-[15px] max-w-[15px] h-[15px] rounded-[50%] object-contain"
                />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications.length > 50
                      ? "50+"
                      : unreadNotifications.length}
                  </span>
                )}
              </Link>
            </div>
            <div>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <div className="flex items-center border rounded-3xl py-2 sm:px-3 px-2 bg-white sm:gap-2">
                  <div className="relative">
                    <img
                      src={user.profilePicture || Profile}
                      alt=""
                      className="sm:w-[30px] w-[20px] sm:max-w-[30px] max-w-[20px] sm:h-[30px] h-[20px] rounded-[50%]"
                    />
                    <div className="absolute w-[10px] h-[10px] bg-[#20C54C] rounded-full border-white border-2 shadow bottom-0 left-0"></div>
                  </div>
                  <FaCaretDown className="text-[#4A4A4A] sm:text-xl" />
                </div>
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  sx={{ fontFamily: "tt_chocolates" }}
                  onClick={() => {
                    navigate("/user-dashboard/user-profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/user-dashboard/user-profile");
                  }}
                  sx={{ fontFamily: "tt_chocolates" }}
                >
                  My account
                </MenuItem>
                <MenuItem
                  sx={{ fontFamily: "tt_chocolates" }}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
            {isMobile && (
              <IconButton onClick={onMenuClick}>
                <RxHamburgerMenu />
              </IconButton>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const UserDashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <TopBar onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#121212" : "#ffff",
          px: 3,
          py: 4,
          minHeight: "100vh",
          ml: !isMobile && `${drawerWidth}px`,
          paddingRight: !isMobile ? "24px" : "8px",
          paddingLeft: !isMobile ? "24px" : "8px",
          color: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </div>
  );
};

export default UserDashboardLayout;

import React, { useContext, useState } from "react";
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
import Setting from "../../assets/img/setting.png";
import CountryFilter from "../../components/adminDashboard/CountryFilter";
import CityFilter from "../../components/adminDashboard/CityFilter";
import { useSelector } from "react-redux";
import { ThemeContext } from "@/components/ThemeProvider";

const drawerWidth = 240;
const TopBar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const unreadNotifications = useSelector((state) => state.notification.unread);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();

  // Define a mapping of paths to display names
  const pathToNameMap = {
    "/admin-dashboard/dashboard": "Dashboard",
    "/admin-dashboard/service-management": "Services Management",
    "/admin-dashboard/Admin-Notifications": "Notification",
    "/admin-dashboard/add-Payment": "Add Payment",
    "/admin-dashboard/setting": "Settings",
    "/admin-dashboard/edit-setting": "Edit Settings",
    "/admin-dashboard/payment-gateway": "Payment Gateway",
    "/admin-dashboard/manage-country": "Manage Country",
    "/admin-dashboard/contact-support": "Contact Support",
    "/admin-dashboard/Add-New-Vendor": "Add New Vendor",
    "/admin-dashboard/Vendor-details": "Vendor Detail",
    "/admin-dashboard/Sub-Admins": "Sub Admins",
    "/admin-dashboard/Add-New-Sub-Admin": "New Sub Admin",
    "/admin-dashboard/booking": "Booking Detail",
    "/admin-dashboard/reports-and-analytics": "Report Analytics",
    "/admin-dashboard/review-list": "Review List",
    "/admin-dashboard/Add-Country": "Add Country",
    "/admin-dashboard/add-new-user": "Add New User",
    "/admin-dashboard/New-Request-Profile": "Vendor - Kevin",
    "/admin-dashboard/service-detail": "Service Detail",
    "/admin-dashboard/Vendor-Management": "Vendor",
    "/admin-dashboard/add-new-vendor": "Add Vendor",
    "/admin-dashboard/Add-New-Staff": "Add Member",
    "/admin-dashboard/finance": "Finance",
    "/admin-dashboard/Venue-Reports-Details": "Venue Report",
    "/admin-dashboard/export-venue-reports": "Venue Report",
    "/admin-dashboard/edit-profile": "Edit Profile",
    "/admin-dashboard/admin-profile": "Profile",
    "/admin-dashboard/Admin-Booking-Details": "Booking Detail",
    "/admin-dashboard/manage-city": "Manage City",
    "/admin-dashboard/add-city": "Add City",
    "/admin-dashboard/Tax-Profile": "Profile Detail",
    "/admin-dashboard/ID-Verification-Details": "Vendor",
    "/admin-Dashboard/calendar": "Calendar",
    "/admin-dashboard/User-Management": "User Management",
    "/admin-dashboard/promo-discount": "Discount",
    "/admin-dashboard/add-discount": "Discount",
    "/admin-dashboard/admin-dispute": "Disputes",
    "/admin-dashboard/dispute-details": "Disputes Details",
    "/admin-dashboard/accounts": "Accounts",
    "/admin-dashboard/vendor-account-profile": "Profile",
    "/admin-dashboard/accounts-profile": "Profile",
    "/admin-dashboard/pricing": "Pricing",
    "/admin-dashboard/advertisement": "Advertisement",
    "/admin-dashboard/templates": "Templates",
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
        <div className="w-full flex gap-2 items-center justify-between px-4">
          <p className="md:text-2xl font-medium max-w-max w-full">
            {currentPathName}
          </p>
          <div className="flex w-full items-center justify-end gap-2 ">
            {/* <div className="lg:block hidden">
              <CountryFilter />
            </div>
            <div className="lg:block hidden">
              <CityFilter />
            </div> */}
            {/* <div className={`${"xl:block hidden"}`}>
              <form action="">
                <div className="flex  md:w-60 items-center border rounded-3xl p-2 bg-white shadow-[0px_14px_30px_0px_#8383830D]">
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
            <div className="hidden md:block">
              <Link
                to="/admin-dashboard/setting"
                className="bg-white p-3 border block rounded-full"
              >
                <img
                  src={Setting}
                  alt=""
                  className="w-4 h-4 max-w-4 object-contain"
                />
              </Link>
            </div>
            <div className="hidden md:block relative">
              <Link
                to="/admin-dashboard/Admin-Notifications"
                className="bg-white p-3 border block rounded-full relative"
              >
                <img
                  src={NotifyBell}
                  alt="Notifications"
                  className="w-4 h-4 object-contain"
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
            <Link
              to="/admin-dashboard/admin-profile"
              className="flex items-center justify-end gap-2"
            >
              <div>
                <h6 className="text-[#000] text-nowrap sm:text-lg text-xs dark:text-white">
                  Hey, {user?.firstName}
                </h6>
                <p className="text-[#8A8A8A] text-nowrap sm:text-sm text-xs dark:text-white">
                  {user?.role}
                </p>
              </div>
              <div>
                <img
                  src={user?.profilePicture || Profile}
                  alt=""
                  className="w-12 h-12  rounded-full"
                />
              </div>
            </Link>
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

const AdminLayout = () => {
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

export default AdminLayout;

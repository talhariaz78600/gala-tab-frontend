import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logout from "../../assets/img/logout.png";
import AccountDetail from "../../assets/img/account-detail.png";
import InboxDash from "../../assets/img/inbox.png";
import Profile from "../../assets/img/profile-dashboard.png";
import Calendar from "../../assets/img/Calendar.png";
import BookingsRequest from "../../assets/img/Bookings-Request.png";
import ConfirmBookings from "../../assets/img/Confirm-Bookings.png";
import ServicesListings from "../../assets/img/Services-Listings.png";

import staffIcon from "../../assets/img/staff.png";
import Payout from "../../assets/img/Pay-out.png";
import help from "../../assets/img/Help.png";
import Setting from "../../assets/img/setting.png";
import discount from "../../assets/img/discount.png";
import despute from "../../assets/img/despute.png";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { persistor } from "@/store/store";
import { apiSlice } from "@/api/apiSlice";
import { resetChatState } from "@/store/chatSlice";

const drawerWidth = 230;

const VendorSidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("token-removed"));
    dispatch(logout());
    dispatch(resetChatState());
    persistor.purge();
    dispatch(apiSlice.util.resetApiState());
    navigate("/");
  };

  const sideNavItems = [
    {
      text: "Dashboard",
      image: AccountDetail,
      path: "/vendor-dashboard/dashboard",
    },
    {
      text: "Inbox",
      image: InboxDash,
      path: "/Vendor-Inbox",
    },
    {
      text: "Calendar",
      image: Calendar,
      path: "/vendor-dashboard/calendar",
    },
    {
      text: "Bookings Request",
      image: BookingsRequest,
      path: "booking-requests",
    },
    {
      text: "Confirm Bookings",
      image: ConfirmBookings,
      path: "Confirm-Bookings",
    },
    {
      text: "Completed Bookings",
      image: ConfirmBookings,
      path: "complete-Bookings",
    },
    {
      text: "Services Listings",
      image: ServicesListings,
      path: "service-listing",
    },
    {
      text: "Staff",
      image: staffIcon,
      path: "Staff",
    },
    {
      text: "Pay out",
      image: Payout,
      path: "PayOut-Details",
    },
    {
      text: "Dispute",
      image: despute,
      path: "vendor-dispute",
    },
    {
      text: "Promo Discount Code",
      image: discount,
      path: "promo-discount",
    },
    {
      text: "Profile",
      image: Profile,
      path: "Vendor-Profile",
    },
    {
      text: "Report & Analytics",
      image: Profile,
      path: "vendor-report",
    },
    // {
    //   text: "All Clients",
    //   image: Profile,
    //   path: "all-client",
    // },
  ];

  const sideNavItemsbottom = [
    {
      text: "Setting",
      image: Setting,
      path: "Vendor-Account",
    },
    {
      text: "Help",
      image: help,
      path: "vendor-help-center",
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        paddingTop: isMobile ? "20px" : 0,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box className="logo flex py-3 items-center justify-center ">
        <Link
          to="/vendor-dashboard/dashboard"
          className="bg-gradient-to-b from-gray-500 to-gray-900 text-white font-semibold py-3 px-8 rounded-full border-4 border-black shadow-md"
        >
          Gala Tab
        </Link>
      </Box>
      <div className="h-[calc(100%-160px)] flex flex-col justify-between overflow-y-auto">
        <List
          sx={{
            padding: "0 13px",
          }}
        >
          {sideNavItems.map((item) => (
            <ListItem
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-2"
              sx={{
                color:
                  location.pathname === item.path
                    ? isDarkMode
                      ? "#000"
                      : "#fff"
                    : theme.palette.text.primary,
                backgroundColor:
                  location.pathname === item.path
                    ? isDarkMode
                      ? "#fff"
                      : "#000"
                    : "transparent",
                padding: "8px 8px",
                "&.active": {
                  backgroundColor: isDarkMode ? "#fff" : "#000",
                  color: isDarkMode ? "#000" : "#fff",
                  borderRadius: "20px",
                },
              }}
            >
              <div
                className={`p-3 shadow-lg rounded-xl ${
                  location.pathname === item.path ? "bg-white" : "bg-white"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "14px",
                    textTransform: "capitalize",
                    fontFamily: "tt_chocolates",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <List sx={{ padding: "0 13px" }}>
          {sideNavItemsbottom.map((item) => (
            <ListItem
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-2"
              sx={{
                color:
                  location.pathname === item.path
                    ? isDarkMode
                      ? "#000"
                      : "#fff"
                    : theme.palette.text.primary,
                backgroundColor:
                  location.pathname === item.path
                    ? isDarkMode
                      ? "#fff"
                      : "#000"
                    : "transparent",
                padding: "8px 8px",
                "&.active": {
                  backgroundColor: isDarkMode ? "#fff" : "#000",
                  color: isDarkMode ? "#000" : "#fff",
                  borderRadius: "20px",
                },
              }}
            >
              <div
                className={`p-3 shadow-lg rounded-xl ${
                  location.pathname === item.path ? "bg-white" : "bg-white"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "14px",
                    textTransform: "capitalize",
                    fontFamily: "tt_chocolates",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <Box className="flex cursor-pointer py-3 items-center justify-center ">
          <div
            onClick={handleLogout}
            className={`w-[90%] border mx-auto my-2 rounded-md px-5 py-3 flex items-center justify-center gap-x-2 ${
              isDarkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "text-black bg-white"
            }`}
          >
            <img src={Logout} alt="Logout" className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </div>
        </Box>
      </div>
    </Box>
  );

  return isMobile ? (
    <Drawer
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "none",
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default VendorSidebar;

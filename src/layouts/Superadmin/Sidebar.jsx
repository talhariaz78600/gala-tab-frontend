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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { persistor } from "@/store/store";
import { apiSlice } from "@/api/apiSlice";
import { sideNavItems } from "@/lib/adminSideNav";
import { resetChatState } from "@/store/chatSlice";

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("token-removed"));
    dispatch(logout());
    dispatch(resetChatState());
    persistor.purge();
    dispatch(apiSlice.util.resetApiState());
    navigate("/");
  };

  const tabPermissions = user?.templateId?.tabPermissions || [];

  const filteredNavItems =
    user.adminRole === "admin"
      ? sideNavItems
      : sideNavItems.filter((item) => tabPermissions.includes(item.id));

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        paddingTop: isMobile ? "20px" : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box className="logo flex py-3 items-center justify-center">
        <Link
          to="/admin-dashboard/dashboard"
          className="bg-gradient-to-b from-gray-500 to-gray-900 text-white font-semibold py-3 px-8 rounded-full border-4 border-black shadow-md"
        >
          Gala Tab
        </Link>
      </Box>
      <List
        sx={{
          flexGrow: 1,
          padding: "0 13px",
          maxHeight: "calc(100% - 160px)",
          overflowY: "auto",
        }}
      >
        {filteredNavItems.map((item) => {
          const isActive =
            item.activePaths?.includes(location.pathname) ||
            location.pathname === item.path;
          return (
            <ListItem
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-2"
              sx={{
                color: isActive
                  ? isDarkMode
                    ? "#000"
                    : "#fff"
                  : theme.palette.text.primary,
                backgroundColor: isActive
                  ? isDarkMode
                    ? "#fff"
                    : "#000"
                  : "transparent",
                borderRadius: "20px",
                padding: "8px 8px",
                "&.active": {
                  backgroundColor: isDarkMode ? "#fff" : "#000",
                  color: isDarkMode ? "#000" : "#fff",
                },
              }}
            >
              <div className="p-3 shadow-lg rounded-xl bg-white">
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
          );
        })}
      </List>
      <div className="px-3">
        <Box className="flex cursor-pointer py-3 items-center justify-center">
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

export default Sidebar;

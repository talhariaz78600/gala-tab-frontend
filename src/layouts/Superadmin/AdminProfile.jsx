import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EditProfileInformation from "./AdminProfile/EditProfileInformation";
import NotificationSetting from "./AdminProfile/NotificationSetting";
import { UserProfile } from "../UserDashboard";
import Security from "@/components/User/EditProfile/Security";
import AdminNotification from "@/components/adminDashboard/AdminNotification";
import { ThemeContext } from "@/components/ThemeProvider";
import { useContext } from "react";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{
        flex: 1,
        backgroundColor: isDark ? "#1F2937" : "#F3F4F6",
        borderRadius: "18px",
        marginLeft: "16px",
        padding: "14px",
        minHeight: "calc(100dvh - 125px)",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AdminProfile = () => {
  const [value, setValue] = React.useState(0);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const user = useSelector((state) => state.auth.user);
  const isSubAdmin = user?.adminRole === "subAdmin";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        height: "calc(100dvh - 130px)",
        boxSizing: "border-box",
        overflow: "hidden",
        "@media (max-width: 768px)": {
          flexDirection: "column",
          height: "auto",
        },
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          backgroundColor: isDark ? "#1f2937" : "#f7f7f7",
          borderRadius: "8px",
          maxWidth: "220px",
          minWidth: "180px",
          padding: "15px 0px 15px 15px",
          color: isDark ? "#E5E7EB" : "#333",
          "& .MuiTab-root": {
            textAlign: "start",
            justifyContent: "center",
            alignItems: "flex-start",
            color: isDark ? "#E5E7EB" : "#333",
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "none",
            padding: "8px 16px",
            fontFamily: "tt_chocolates",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDark ? "#374151" : "#e5e5e5",
              borderRadius: "12px 0 0 12px",
            },
          },
          "& .Mui-selected": {
            backgroundColor: "#000",
            color: "#fff !important",
            borderRadius: "12px 0px 0px 12px",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "@media (max-width: 768px)": {
            flexDirection: "row",
            maxWidth: "none",
            padding: "10px 0",
            alignItems: "center",
            "& .Mui-selected": {
              backgroundColor: "#000",
              color: "#fff !important",
              borderRadius: "12px",
            },
            "& .MuiTab-root": {
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "6px 12px",
            },
          },
        }}
      >
        <Tab label="Profile Information" {...a11yProps(0)} />
        <Tab label="Security" {...a11yProps(1)} />
        {!isSubAdmin && <Tab label="Notifications Setting" {...a11yProps(2)} />}
      </Tabs>

      <TabPanel value={value} index={0}>
        <UserProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Security />
      </TabPanel>
      {!isSubAdmin && (
        <TabPanel value={value} index={2}>
          <AdminNotification />
        </TabPanel>
      )}
    </Box>
  );
};

export default AdminProfile;

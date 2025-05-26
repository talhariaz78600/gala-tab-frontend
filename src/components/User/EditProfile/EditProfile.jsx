import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EditProfileInformation from "./EditProfileInformation";
import Security from "./Security";
import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeProvider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="bg-[#f7f7f7] dark:bg-gray-800 flex-1 rounded-[20px] md:ms-4 p-2 box-border"
    >
      {value === index && (
        <div className="h-full md:min-h-[calc(100dvh-150px)] p-4 overflow-auto">
          {children}
        </div>
      )}
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

const EditProfile = () => {
  const [value, setValue] = React.useState(0);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

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
          backgroundColor: isDark ? "#1f2937" : "#f7f7f7", // Tailwind gray-800 for dark, light gray for light
          borderRadius: "8px",
          maxWidth: "220px",
          minWidth: "180px",
          padding: "15px 0px 15px 15px",
          color: isDark ? "#E5E7EB" : "#333", // light text in dark mode

          "& .MuiTab-root": {
            textAlign: "start",
            justifyContent: "center",
            alignItems: "flex-start",
            color: isDark ? "#E5E7EB" : "#333", // dynamic text color
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "none",
            padding: "8px 16px",
            fontFamily: "tt_chocolates",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDark ? "#374151" : "#e5e5e5", // Tailwind gray-700 for dark hover
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
            flexDirection: "row", // horizontal layout for tabs
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
        <Tab label="Edit Profile Information" {...a11yProps(0)} />
        <Tab label="Security" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EditProfileInformation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Security />
      </TabPanel>
    </Box>
  );
};

export default EditProfile;

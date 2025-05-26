import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EditProfileInformation from "./EditProfileTab/EditProfileInformation";
import Security from "./EditProfileTab/Security";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="bg-[#f7f7f7] flex-1 rounded-[20px] md:ms-4 p-2 box-border"
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

const EditVendorProfile = () => {
  const [value, setValue] = React.useState(0);

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
          backgroundColor: "#f7f7f7",
          borderRadius: "8px",
          maxWidth: "220px",
          minWidth: "180px",
          padding: "15px 0px 15px 15px",
          "& .MuiTab-root": {
            textAlign: "start",
            justifyContent: "center",
            alignItems: "flex-start",
            color: "#333",
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "none",
            padding: "8px 16px",
            fontFamily: "tt_chocolates",
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
            orientation: "horizontal",
            maxWidth: "none",
            padding: "10px",
            alignItems: "center",
            borderRadius: "20px",
            "& .MuiTab-root": {
              width: "100%",
              textAlign: "center",
              alignItems: "center",
              borderRadius: "12px 12px 12px 12px",
              maxWidth:"100%",
            },
            "& .Mui-selected": {
              backgroundColor: "#000",
              color: "#fff !important",
            },
            "& .MuiTabs-scroller": {
              width: "100%",
            },
            "& .MuiTabs-flexContainer": {
              alignItems: "center",
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

export default EditVendorProfile;

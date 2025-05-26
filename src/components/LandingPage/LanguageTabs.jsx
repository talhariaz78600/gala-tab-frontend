import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Language from "./Language";
import Currency from "./Currency";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, overflowY: "auto", maxHeight: "calc(80vh - 90px)" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LanguageTabs() {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FCFCFC",
        border: "1px solid",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
          boxShadow: "0px 34px 74px 0px #0000000D",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#3551B6",
              height: "4px",
              borderRadius: "19px",
            },
          }}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: {
                xs: "flex-start", // For extra-small screens
                sm: "center", // For small screens and above
              },
            },
            "& .MuiTab-root": {
              fontFamily: "tt_chocolates",
              fontSize: { xs: "18px", sm: "22px" },
              padding: "30px 12px",
            },
            "& .Mui-selected": {
              fontWeight: "600",
              color: "#3551B6",
            },
          }}
        >
          <Tab label="Languages and Region" {...a11yProps(0)} />
          <Tab label="Currency" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Language />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Currency />
      </CustomTabPanel>
    </Box>
  );
}

import React, { useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeProvider";

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
      {value === index && <Box sx={{}}>{children}</Box>}
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

const CustomTabs = ({ tabs, panels, setcurrentTab }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("activeTab");
  const [value, setValue] = React.useState(Number(dataParam) || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (setcurrentTab) {
      setcurrentTab(newValue);
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Box className="d-md-flex justify-content-between mt-2">
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "black",
                  display: "none",
                },
              }}
              aria-label="custom tabs"
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab}
                  style={{
                    backgroundColor: "transparent",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: value === index ? "600" : "400",
                    color: isDark
                      ? value === index
                        ? "#ffffff"
                        : "#d1d5db"
                      : value === index
                      ? "#000000"
                      : "#737373",
                    borderBottom:
                      value === index
                        ? `2px solid ${isDark ? "#ffffff" : "#012241"}`
                        : "none",
                  }}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
        </Box>
        {panels.map((panel, index) => (
          <CustomTabPanel value={value} index={index} key={index}>
            {panel}
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
};

export default CustomTabs;

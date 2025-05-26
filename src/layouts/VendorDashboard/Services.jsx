import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import ServiceDetails from "../../components/VendorDashboard/ServiceDetails";
import SetPricing from "../../components/VendorDashboard/SetPricing";
import FAQs from "../../components/VendorDashboard/FAQs";

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
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
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

export default function Services() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: "10px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#3551B6",
              height: "5px",
              borderRadius: "99px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontSize: "20px",
              fontWeight: "500",
              textTransform: "capitalize",
              margin: "0 12px",
              fontFamily: "tt_chocolates",
            },
            "& .Mui-selected": {
              color: "#3551B6",
            },
          }}
        >
          <Tab label="Service Detail" {...a11yProps(0)} />
          <Tab label="Set Pricing" {...a11yProps(1)} />
          <Tab label="Add FAQ" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <div className="mt-6">
        <CustomTabPanel value={value} index={0}>
          <ServiceDetails />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SetPricing />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <FAQs />
        </CustomTabPanel>
      </div>
    </Box>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TrendingTab from "./TrendingTab";
import { useGetTopicsListQuery } from "@/api/apiSlice";

import Loader from "@/components/loader/Loader";

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

export default function HelpTab() {
  const [value, setValue] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState("");

  const { data, isLoading } = useGetTopicsListQuery({
    topicType: activeFilter,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setActiveFilter("");
    } else if (newValue === 1) {
      setActiveFilter("vendor");
    } else if (newValue === 2) {
      setActiveFilter("customer");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          fontFamily: "tt_chocolates",
          maxWidth: "fit-content",
          margin: "0 auto",
          borderRadius: "8px",
          boxShadow: "0px 11px 23px 0px #0000000D",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          variant="scrollable"
          scrollButtons="false"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#3551B6",
              height: "4px",
              borderRadius: "19px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontSize: "20px",
              fontWeight: "500",
              margin: "0 8px",
              paddingLeft: "28px",
              paddingRight: "28px",
              lineHeight: "1.5",
              color: "black",
              textTransform: "capitalize",
              fontFamily: "tt_chocolates",
            },
            "& .Mui-selected": {
              fontSize: "20px",
              fontWeight: "600",
              color: "#3551B6",
            },
          }}
        >
          <Tab label="All Topic’s" {...a11yProps(0)} />
          <Tab label="Vendor Helps" {...a11yProps(1)} />
          <Tab label="User Helps" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <div className="mt-16">
        <CustomTabPanel value={value} index={0}>
          <TrendingTab data={data?.data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TrendingTab data={data?.data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TrendingTab data={data?.data} />
        </CustomTabPanel>
      </div>

      <Loader loading={isLoading} />
    </Box>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AllTopicsContent from "./AllTopicsContent";
import TrendingContent from "./TrendingContent";
import VendorHelp from "./VendorHelp";
import UserHelp from "./UserHelp";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function AllTopicsTabs() {
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
    <Box sx={{ width: "100%", margin: "0px 15px" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
          maxWidth: "fit-content",
          fontFamily: "tt_chocolates",
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
              fontFamily: "tt_chocolates",
              height: "4px",
              borderRadius: "19px",
            },
          }}
          sx={{
            fontFamily: "tt_chocolates",
            "& .MuiTab-root": {
              fontSize: "20px",
              fontWeight: "500",
              paddingLeft: "28px",
              paddingRight: "28px",
              color: "black",
              lineHeight: "1.5",
              textTransform: "capitalize",
              fontFamily: "tt_chocolates",
            },
            "& .Mui-selected": {
              fontSize: "24px",
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
      <div className="mt-5">
        <CustomTabPanel value={value} index={0}>
          <AllTopicsContent data={data?.data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllTopicsContent data={data?.data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllTopicsContent data={data?.data} />
        </CustomTabPanel>
      </div>
      <Loader loading={isLoading} />
    </Box>
  );
}

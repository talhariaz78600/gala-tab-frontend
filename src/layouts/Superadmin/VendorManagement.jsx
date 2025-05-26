import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import VendorsQuickfilters from "../../components/adminDashboard/VendorsQuickfilters";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import { Link } from "react-router";
import ManageVendorTable from "../../components/adminDashboard/ManageVendorTable";
import NewRequestTable from "../../components/adminDashboard/NewRequestTable";
import IDVarificationTable from "../../components/adminDashboard/IDVarificationTable";
import TaxForumTable from "../../components/adminDashboard/TaxForumTable";
import { ThemeContext } from "@/components/ThemeProvider";

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
      {value === index && <Box>{children}</Box>}
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

export default function VendorManagement() {
  const [value, setValue] = React.useState(0);
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className={`min-h-[calc(100vh-130px)] rounded-[20px] ${
        isDarkMode ? "bg-[#1E1E1E]" : "bg-[#F7F7F7]"
      }`}
    >
      <Box sx={{ width: "100%" }}>
        <div
          className={`p-5 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`flex items-center flex-wrap-reverse justify-between rounded-[10px] ${
              isDarkMode ? "bg-[#2A2A2A]" : "bg-white"
            }`}
          >
            <Box sx={{ maxWidth: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="basic tabs example"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "capitalize",
                    fontFamily: "tt_chocolates",
                    fontSize: "20px",
                    fontWeight: "500",
                    margin: "15px",
                    color: isDarkMode ? "#fff" : "#000",
                    "&.Mui-selected": {
                      color: "#3551B6",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#3551B6",
                    height: "5px",
                    borderRadius: "999px",
                  },
                }}
              >
                <Tab label="All Vendors" {...a11yProps(0)} />
                <Tab label="New Requests" {...a11yProps(1)} />
                <Tab label="ID Verification" {...a11yProps(2)} />
                <Tab label="Tax Forums" {...a11yProps(3)} />
              </Tabs>
            </Box>
          </div>
        </div>
        <div className="p-5">
          <CustomTabPanel value={value} index={0}>
            <ManageVendorTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <NewRequestTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <IDVarificationTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <TaxForumTable />
          </CustomTabPanel>
        </div>
      </Box>
    </div>
  );
}

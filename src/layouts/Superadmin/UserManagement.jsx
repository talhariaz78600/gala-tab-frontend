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
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import AllUsersTable from "../../components/adminDashboard/AllUsersTable";

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

export default function UserManagement() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-[#F7F7F7] min-h-[calc(100vh-130px)] rounded-[20px]">
      <Box sx={{ width: "100%" }}>
        <div className="p-5 border-b">
          <div className="flex items-center flex-wrap-reverse justify-between bg-white rounded-[10px]">
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
                    color: "#000",
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
                <Tab label="All Users" {...a11yProps(0)} />
                <Tab label="Venue Manager" {...a11yProps(1)} />
                <Tab label="Vendor Manager" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <div className="px-4 ms-auto my-3">
              <div className="flex flex-wrap-reverse justify-end items-center gap-4">
                <BasicSelect />
                <DateRangePicker />
                <Link
                  to="/admin-dashboard/add-new-user"
                  className="font-medium border border-black p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                >
                  Add New User
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <CustomTabPanel value={value} index={0}>
            <AllUsersTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllUsersTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AllUsersTable />
          </CustomTabPanel>
        </div>
      </Box>
    </div>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProfileDetails from "../../components/adminDashboard/ProfileDetails";
import ListingDetails from "../../components/adminDashboard/ListingDetails";
import StaffList from "../../components/adminDashboard/StaffList";
import Reports from "../../components/adminDashboard/Reports";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router";
import { useGetUserDetailsQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
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

export default function VendorDetails() {
  const location = useLocation();
  const params = useParams();
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const { id } = params;

  const { data, isLoading } = useGetUserDetailsQuery(id);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px] p-3">
      <div className="">
        <Link to="/admin-dashboard/Vendor-Management">
          <IoMdArrowRoundBack className="bg-white text-black  p-2 shadow-sm rounded-full text-4xl" />
        </Link>
      </div>
      <Box sx={{ width: "100%" }}>
        <div className=" mt-3">
          <div className="flex items-center flex-wrap-reverse justify-between bg-white dark:bg-gray-800 p-3 rounded-[10px]">
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
                <Tab label="Profile Details" {...a11yProps(0)} />
                <Tab label="Listing Details" {...a11yProps(1)} />
                <Tab label="Staff" {...a11yProps(2)} />
                <Tab label="Reports" {...a11yProps(3)} />
              </Tabs>
            </Box>
          </div>
        </div>
        <div className="p-5">
          <CustomTabPanel value={value} index={0}>
            <ProfileDetails data={data?.data} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ListingDetails />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <StaffList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Reports userData={data?.data} />
          </CustomTabPanel>
        </div>
      </Box>
      <Loader loading={isLoading} />
    </div>
  );
}

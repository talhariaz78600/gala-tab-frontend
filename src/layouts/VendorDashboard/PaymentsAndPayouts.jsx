import * as React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ManagePayments from "../../components/VendorDashboard/ManagePayments";
import SetupPayOuts from "../../components/VendorDashboard/SetupPayOuts";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";
import HelpButton from "../../components/VendorDashboard/HelpButton";
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
      {value === index && <Box sx={{ paddingTop: "24px" }}>{children}</Box>}
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

export default function PaymentsAndPayouts() {
  const [value, setValue] = React.useState(0);
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="mt-4">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link
              to="/vendor-dashboard/vendor-account"
              className="text-[28px] leading-normal font-semibold"
            >
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium text-lg">
              Payments Method Setup
            </Link>
          </div>
          <div className="mt-6">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    backgroundColor: isDark ? "#000" : "#fff",
                    borderRadius: "10px",
                    "& .MuiTab-root": {
                      fontFamily: "tt_chocolates",
                      fontSize: "16px",
                      textTransform: "capitalize",
                      color: isDark ? "#ffff" : "#818181",
                      margin: "0 12px",
                      paddingTop: "25px",
                      paddingBottom: "25px",
                      fontWeight: "400",
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: isDark ? "#ffff" : "#000000",
                      fontWeight: "600",
                    },
                  }}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#000000",
                      height: "5px",
                      borderRadius: "999px",
                    },
                  }}
                >
                  <Tab label="Payments" {...a11yProps(0)} />
                  {/* <Tab label="Payouts" {...a11yProps(1)} /> */}
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <ManagePayments />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <SetupPayOuts />
              </CustomTabPanel>
            </Box>
          </div>
          <div className="flex justify-end my-8">
            <HelpButton path="/vendor-dashboard/vendor-help-center" />
          </div>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import General from "../../components/adminDashboard/General";
import SiteConfiguration from "../../components/adminDashboard/SiteConfiguration";
import Payment from "../../components/adminDashboard/Payment";
import AdminNotification from "../../components/adminDashboard/AdminNotification";
import { ThemeContext } from "@/components/ThemeProvider";
import NewsLetterSettings from "./NewsLetterSettings";
import { useSelector } from "react-redux";
import PaymentGatewayTable from "@/components/adminDashboard/PaymentGatewayTable";

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

export default function Setting() {
  const [value, setValue] = React.useState(0);
  const { theme } = React.useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const user = useSelector((state) => state.auth.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isSubAdmin = user?.adminRole === "subAdmin";

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
                aria-label="settings tabs"
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
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Site Configuration" {...a11yProps(1)} />
                {!isSubAdmin && <Tab label="Payment" {...a11yProps(2)} />}
                {!isSubAdmin && <Tab label="Notification" {...a11yProps(3)} />}
                {!isSubAdmin && <Tab label="New Letter" {...a11yProps(4)} />}
              </Tabs>
            </Box>
          </div>
        </div>

        <div className="p-5">
          <CustomTabPanel value={value} index={0}>
            <General />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SiteConfiguration />
          </CustomTabPanel>
          {!isSubAdmin && (
            <CustomTabPanel value={value} index={2}>
              <PaymentGatewayTable />
            </CustomTabPanel>
          )}
          {!isSubAdmin && (
            <CustomTabPanel value={value} index={3}>
              <AdminNotification />
            </CustomTabPanel>
          )}
          {!isSubAdmin && (
            <CustomTabPanel value={value} index={4}>
              <NewsLetterSettings />
            </CustomTabPanel>
          )}
        </div>
      </Box>
    </div>
  );
}

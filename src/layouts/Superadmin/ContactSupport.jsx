import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FAQs from "../../components/VendorDashboard/FAQs";
import ContactInbox from "./ContactInbox";
import AdminFaqs from "./AdminFaqs/AdminFaqs";
import Topics from "./Topics";
import { useLocation } from "react-router";
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

export default function ContactSupport() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const chatId = location?.state?.chatId;
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
                <Tab label="Contact Support" {...a11yProps(0)} />
                <Tab label="Faqs & Training" {...a11yProps(1)} />
                <Tab label="Topics" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </div>
        </div>
        <div className="p-5">
          <CustomTabPanel value={value} index={0}>
            <ContactInbox chatId={chatId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AdminFaqs />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Topics />
          </CustomTabPanel>
        </div>
      </Box>
    </div>
  );
}

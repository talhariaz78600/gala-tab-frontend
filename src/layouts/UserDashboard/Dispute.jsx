import * as React from "react";
import { Link } from "react-router";
import DisputeTable from "../../components/UserDashboard/DisputeTable";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
      {value === index && <Box sx={{ padding: "20px" }}>{children}</Box>}
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

export default function Dispute() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/user-dashboard/add-disputes"
          className="font-medium border border-black bg-white py-3 px-5 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
        >
          Add Dispute
        </Link>
      </div>
      <div className="min-h-[calc(100dvh-200px)] mt-5 bg-[#F7F7F7] rounded-[20px]">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", padding: "20px" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{
                sx: {
                  backgroundColor: "#3551B6",
                  height: "5px",
                  borderRadius: "99px",
                },
              }}
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #E7E7E7",
                borderRadius: "10px",
                "& .MuiTab-root": {
                  textTransform: "capitalize",
                  fontFamily: "tt_chocolates",
                  margin: "12px",
                  fontSize: "20px",
                  color: "#000000",
                  fontWeight: "400",
                },
                "& .Mui-selected": {
                  color: "#3551B6",
                  fontWeight: "600",
                },
              }}
            >
              <Tab label="ALL" {...a11yProps(0)} />
              <Tab label="Under Review" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <DisputeTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DisputeTable />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}

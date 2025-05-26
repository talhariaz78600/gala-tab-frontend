import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PhotoStudio from "./GatewayTab/PhotoStudio";
import Event from "./GatewayTab/Event";
import Party from "./GatewayTab/Party";
import ConferenceRoom from "./GatewayTab/ConferenceRoom";
import DanceStudio from "./GatewayTab/DanceStudio";
import CorporateEvent from "./GatewayTab/CorporateEvent";
import RoofTop from "./GatewayTab/RoofTop";
import RecordingStudio from "./GatewayTab/RecordingStudio";
import FileStudio from "./GatewayTab/FileStudio";
import Polygon from "../../assets/img/Polygon.png";

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

export default function GatewayTabs() {
  const [value, setValue] = React.useState(0);
  const tabsContainerRef = React.useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollableContainer =
        tabsContainerRef.current.querySelector(".MuiTabs-scroller");

      if (scrollableContainer) {
        const scrollAmount = 100;
        scrollableContainer.scrollTo({
          left:
            scrollableContainer.scrollLeft +
            (direction === "left" ? -scrollAmount : scrollAmount),
          behavior: "smooth",
        });
      } else {
        console.warn("Scrollable container not found!");
      }
    }
  };

  const tabStyles = {
    minHeight: "35px !important",
    fontFamily: "tt_chocolates !important",
    fontWeight: "400 !important",
    textTransform: "none !important",
    padding: "10px 20px !important",
    backgroundColor: "#E7E7E7",
    color: "#000",
    fontSize: "20px",
    borderRadius: "25px",
    margin: "0 6px",
    "&.Mui-selected": {
      backgroundColor: "#1C1C1C",
      color: "#fff",
    },
  };

  return (
    <div>
      <div className="md:flex items-center pb-5 justify-between">
        <div>
          <h4 className="font-bold text-3xl">
            Inspiration for future getaways
          </h4>
        </div>
        <div className="flex items-center gap-5 md:mt-0 mt-4 justify-end">
          <div>
            <select
              name=""
              id=""
              className="bg-white border p-3 focus-none rounded-lg shadow-xl"
            >
              <option value="" selected hidden>
                Select Country
              </option>
            </select>
          </div>
          <div className="flex items-center gap-5">
            <FaArrowLeft
              className="bg-white border p-2 text-5xl rounded-lg shadow-xl cursor-pointer"
              onClick={() => scrollTabs("left")}
            />
            <FaArrowRight
              className="bg-white border p-2 text-5xl rounded-lg shadow-xl cursor-pointer"
              onClick={() => scrollTabs("right")}
            />
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%", marginTop: "12px" }}>
        <Box
          ref={tabsContainerRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="basic tabs example"
            TabIndicatorProps={{ sx: { display: "none" } }}
            sx={{
              "& .MuiTabs-scroller": {
                paddingBottom: "10px",
              },
              "& .MuiTab-root": {
                overflow: "visible",
              },
              "& .Mui-selected": {
                position: "relative",
                "&::after": {
                  position: "absolute",
                  content: '""',
                  bottom: "-12px",
                  zIndex: "-1",
                  right: "10px",
                  width: "20px",
                  height: "20px",
                  backgroundImage: `url(${Polygon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                },
              },
            }}
          >
            <Tab label="Photo Studios" {...a11yProps(0)} sx={tabStyles} />
            <Tab label="Events" {...a11yProps(1)} sx={tabStyles} />
            <Tab label="Parties" {...a11yProps(2)} sx={tabStyles} />
            <Tab label="Conference Rooms" {...a11yProps(3)} sx={tabStyles} />
            <Tab label="Dance Studios" {...a11yProps(4)} sx={tabStyles} />
            <Tab label="Corporate Events" {...a11yProps(5)} sx={tabStyles} />
            <Tab label="Rooftops" {...a11yProps(6)} sx={tabStyles} />
            <Tab label="Recording Studios" {...a11yProps(7)} sx={tabStyles} />
            <Tab label="File Studios" {...a11yProps(8)} sx={tabStyles} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PhotoStudio />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Event />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Party />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <ConferenceRoom />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <DanceStudio />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <CorporateEvent />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <RoofTop />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <RecordingStudio />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={8}>
          <FileStudio />
        </CustomTabPanel>
      </Box>
      <div className="text-center mt-9">
        <button className="text-lg font-medium text-white bg-[#1C1C1C] px-12 py-2 rounded-lg shadow-lg">
          Show more
        </button>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import FilterIcon from "../../assets/img/filters-icon.svg";
import SelectMap from "./SelectMap";
import TimerSet from "../../layouts/LandingPage/TimerSet";
import SelectGuest from "./SelectGuests";
import { useNavigate } from "react-router";
import { IoCloseCircle } from "react-icons/io5";
import listImgTwo from "../../assets/img/venues.png";
import listImgThree from "../../assets/img/decorations.png";
import Catering from "../../assets/img/catering.png";
import pc from "../../assets/img/pc.png";
import fashion from "../../assets/img/fashion.png";
import cakeImg from "../../assets/img/cake.png";
import equipment from "../../assets/img/equipment.png";
import staff from "../../assets/img/staff.png";
import beauty from "../../assets/img/beauty.png";
import entertainment from "../../assets/img/entertainment.png";
import transportation from "../../assets/img/transportation.png";
import { styled } from "@mui/material/styles";
import { FaChevronDown } from "react-icons/fa6";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Modal } from "@mui/material";
import Venue from "../../layouts/LandingPage/Filteraccordion/Venue";
import Decoration from "../../layouts/LandingPage/Filteraccordion/Decoration";
import CateringAcc from "../../layouts/LandingPage/Filteraccordion/CateringAcc";
import Djs from "../../layouts/LandingPage/Filteraccordion/Djs";
import Fashion from "../../layouts/LandingPage/Filteraccordion/Fashion";
import Cake from "../../layouts/LandingPage/Filteraccordion/Cake";
import Equipment from "../../layouts/LandingPage/Filteraccordion/Equipment";
import Beauty from "../../layouts/LandingPage/Filteraccordion/Beauty";
import Transportation from "../../layouts/LandingPage/Filteraccordion/Transportation";
import Entertainment from "../../layouts/LandingPage/Filteraccordion/Entertainment";
import Staff from "../../layouts/LandingPage/Filteraccordion/Staff";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "#9A9A9A",
  width: "100%",
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#FF9900",
    fontFamily: "tt_chocolates",
  },
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  fontFamily: "tt_chocolates",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  "& .MuiTypography-root": {
    fontFamily: "tt_chocolates",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <FaChevronDown className="text-black" sx={{ fontSize: "0.9rem" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function MapFilter() {
  const [shareopen, setshareOpen] = React.useState(false);
  const handleshareOpen = () => setshareOpen(true);
  const handleshareClose = () => setshareOpen(false);
  const [expanded, setExpanded] = React.useState("panel1");
  const navigate = useNavigate();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [isMapVisible, setIsMapVisible] = useState(false);

  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const [isSelectGuestVisible, setIsSelectGuestVisible] = useState(false);

  const containerRef = useRef(null);

  const toggleSelectGuestVisibility = () => {
    setIsSelectGuestVisible((prev) => !prev);
    setIsMapVisible(false);
    setIsTimerVisible(false);
  };
  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
    setIsSelectGuestVisible(false);
    setIsTimerVisible(false);
  };
  const toggleTimerVisibility = () => {
    setIsTimerVisible((prev) => !prev);
    setIsSelectGuestVisible(false);
    setIsMapVisible(false);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsMapVisible(false);
      setIsTimerVisible(false);
      setIsSelectGuestVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="">
      <form action="/after-listining-search">
        <div className="flex md:flex-row sm:flex-col-reverse flex-row-reverse max-w-[1300px] gap-2 mx-auto">
          <div className="flex flex-wrap relative lg:flex-nowrap justify-center w-full my-1 items-center gap-x-4 border border-[#CDCDCD] rounded-[15px] shadow-lg px-2 bg-white">
            <div className="flex flex-wrap items-center lg:divide-x w-full">
              <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
                <select
                  className="appearance-none text-[#000] font-semibold bg-white text-xs focus-none w-full text-center min-[480px]:text-start"
                  name="select-activity"
                  id="select-activity"
                >
                  <option value="" selected hidden disabled>
                  What are you planning?
                  </option>
                  <option value="">Option 1</option>
                  <option value="">Option 1</option>
                  <option value="">Option 1</option>
                  <option value="">Option 1</option>
                </select>
              </div>
              <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
                <p className="font-semibold text-xs" onClick={toggleMapVisibility}>Where?</p>
              </div>
              <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
                <p className="font-semibold text-xs" onClick={toggleTimerVisibility}>Select Date & Time</p>
              </div>
              <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
                <p className="font-semibold text-xs" onClick={toggleSelectGuestVisibility}>Total Guests</p>
              </div>
            </div>
            <div className="absolute right-0 top-full z-50" ref={containerRef}>
              {isMapVisible && (
                <div>
                  <SelectMap />
                </div>
              )}
              {isTimerVisible && (
                <div>
                  <TimerSet />
                </div>
              )}
              {isSelectGuestVisible && (
                <div> 
                  <SelectGuest />
                </div>
              )}
            </div>
            <div>
              <button className="py-2 px-7 bg-black text-xs text-white rounded-full font-semibold my-2 shadow-[0px_16px_24px_0px_rgba(0,0,0,0.2)]">
                Search
              </button>
            </div>
          </div>
          <div>
          <div
            className="flex my-1 items-center border px-6 py-2 border-[#CDCDCD] cursor-pointer shadow-md rounded-[15px] bg-white"
            onClick={handleshareOpen}
          >
            <img className="size-4 me-2" src={FilterIcon} alt="img" />
            <p className="font-medium leading-normal text-[12px]">Filters</p>
          </div>
          </div>
        </div>
      </form>
      <Modal
        open={shareopen}
        onClose={handleshareClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2, fontFamily: "tt_chocolates" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] bg-white rounded-[20px]">
          <div className="flex justify-between items-center border-b p-3">
            <div>
              <h4 className="font-semibold text-xl">Filters</h4>
            </div>
            <div className=" cursor-pointer" onClick={handleshareClose}>
              <IoCloseCircle className="text-xl text-[#979797]" />
            </div>
          </div>
          <div className="p-2">
            <div
              className="p-3"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={listImgTwo}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Venues</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Venue />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={listImgThree}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Decorations</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Decoration />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={Catering}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Catering</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <CateringAcc />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={pc}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">DJ's</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Djs />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel5d-content"
                  id="panel5d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={entertainment}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Entertainment</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Entertainment />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel6"}
                onChange={handleChange("panel6")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel6d-content"
                  id="panel6d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={transportation}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Transportation</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Transportation />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel7"}
                onChange={handleChange("panel7")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel7d-content"
                  id="panel7d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={beauty}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Beauty</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Beauty />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel8"}
                onChange={handleChange("panel8")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel8d-content"
                  id="panel8d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={staff}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Staff</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Staff />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel9"}
                onChange={handleChange("panel9")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel9d-content"
                  id="panel9d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={equipment}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Equipment</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Equipment />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel10"}
                onChange={handleChange("panel10")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel10d-content"
                  id="panel10d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={cakeImg}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Cake</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Cake />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ marginBottom: "12px", border: "0px" }}
                expanded={expanded === "panel11"}
                onChange={handleChange("panel11")}
              >
                <AccordionSummary
                  sx={{ borderRadius: "10px" }}
                  aria-controls="panel11d-content"
                  id="panel11d-header"
                >
                  <Typography component="span">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={fashion}
                          alt=""
                          className="w-4 h-4 object-contain max-w-[16px]"
                        />
                      </div>
                      <div>
                        <p className="font-lg font-medium">Fashion</p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ border: "0px" }}>
                  <Typography>
                    <Fashion />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

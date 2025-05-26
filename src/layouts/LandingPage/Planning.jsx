import React from "react";
import {useNavigate } from "react-router";
import {IoCloseCircle,} from "react-icons/io5";
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

import LikeButton from "../../components/LandingPage/LikeButton";
import { IoShareSocialOutline } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { FaChevronDown } from "react-icons/fa6";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, { accordionSummaryClasses,} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Modal } from "@mui/material";
import Venue from "./Filteraccordion/Venue";
import Decoration from "./Filteraccordion/Decoration";
import CateringAcc from "./Filteraccordion/CateringAcc";
import Djs from "./Filteraccordion/Djs";
import Fashion from "./Filteraccordion/Fashion";
import Cake from "./Filteraccordion/Cake";
import Equipment from "./Filteraccordion/Equipment";
import Beauty from "./Filteraccordion/Beauty";
import Transportation from "./Filteraccordion/Transportation";
import Entertainment from "./Filteraccordion/Entertainment";
import Staff from "./Filteraccordion/Staff";


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "#9A9A9A",
  width: "100%",
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#FF9900",
    fontFamily: 'tt_chocolates'
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
  '& .MuiTypography-root': {
    fontFamily: 'tt_chocolates'
  }
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

const Planning = () => {
  const [shareopen, setshareOpen] = React.useState(false);
  const handleshareOpen = () => setshareOpen(true);
  const handleshareClose = () => setshareOpen(false);
  const [expanded, setExpanded] = React.useState("panel1");
  const navigate = useNavigate();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  return (
    <div>
      <div className="flex items-center gap-2">
        <LikeButton />
        <button onClick={handleshareOpen}>
          <IoShareSocialOutline className="text-xl" />
        </button>
      </div>
      <Modal
        open={shareopen}
        onClose={handleshareClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2,fontFamily: 'tt_chocolates' }}
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
          <div className="p-3" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel1d-content" id="panel1d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={listImgTwo} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Venues</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Venue />
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel2d-content" id="panel2d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={listImgThree} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Decorations</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Decoration />
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel3d-content" id="panel3d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={Catering} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Catering</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <CateringAcc />
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel4d-content" id="panel4d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={pc} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">DJ's</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Djs/>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel5d-content" id="panel5d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={entertainment} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Entertainment</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Entertainment/>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel6d-content" id="panel6d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={transportation} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Transportation</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Transportation/>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel7d-content" id="panel7d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={beauty} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Beauty</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Beauty/>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel8d-content" id="panel8d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={staff} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Staff</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Staff/>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel9d-content" id="panel9d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={equipment} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Equipment</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Equipment/>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel10d-content" id="panel10d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={cakeImg} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Cake</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Cake/>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: '12px', border: '0px' }} expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
              <AccordionSummary sx={{ borderRadius: '10px' }} aria-controls="panel11d-content" id="panel11d-header">
                <Typography component="span">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={fashion} alt="" className="w-4 h-4 object-contain max-w-[16px]" />
                    </div>
                    <div>
                      <p className="font-lg font-medium">Fashion</p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ border: '0px' }}>
                <Typography>
                  <Fashion/>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Planning;

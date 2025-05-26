import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import UserTraining from "./UserTraining";
import HelpSupport from "./HelpSupport";
import SubAccordians from "./SubAccordians";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  fontFamily: "tt_chocolates",
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
  fontFamily: "tt_chocolates",
}));

export default function HelpAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        sx={{ marginBottom: "12px", border: "0px", borderRadius: "10px",fontFamily:"tt_chocolates" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #D5D5D5",
            borderRadius: "10px",
            fontFamily: "tt_chocolates",
          }}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography
            sx={{
              fontFamily: "tt_chocolates",
              fontWeight: "600",
              fontSize: "18px",
            }}
            className="font-semibold"
            component="span"
          >
            Users Trainings
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "0px",
            padding: "12px 0px",
            backgroundColor: "#F7F7F7",
          }}
        >
          <Typography>
            <UserTraining />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ marginBottom: "12px", border: "0px", borderRadius: "10px" }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #D5D5D5",
            borderRadius: "10px",
            fontFamily: "tt_chocolates",
          }}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography
            sx={{
              fontFamily: "tt_chocolates",
              fontWeight: "600",
              fontSize: "18px",
            }}
            className="font-semibold"
            component="span"
          >
            Help & Support Center
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "0px",
            padding: "12px 0px",
            backgroundColor: "#F7F7F7",
          }}
        >
          <Typography>
            <HelpSupport />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ marginBottom: "12px", border: "0px", borderRadius: "10px" }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #D5D5D5",
            borderRadius: "10px",
            fontFamily: "tt_chocolates",
          }}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography
            sx={{
              fontFamily: "tt_chocolates",
              fontWeight: "600",
              fontSize: "18px",
            }}
            className="font-semibold"
            component="span"
          >
            Getting Started as a Vendor
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "0px",
            padding: "12px 0px",
            backgroundColor: "#F7F7F7",
          }}
        >
          <div className="px-5 sm:px-10">
            <SubAccordians />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

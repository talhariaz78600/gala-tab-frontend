import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const SubAccordiansData = [
  {
    label: "How do I sign up as a vendor?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Managing Your Vendor Profile?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Orders and Payments?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Technical Assistance?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Policies and Guidelines?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Marketing and Promotions?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Customer Reviews and Feedback?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Account and Subscription?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Vendor Support?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Platform Features?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
  {
    label: "Legal and Compliance?",
    Question: "Q: 1. What should I do if I can't access my vendor account?",
    Answer:
      "Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password. If the issue persists, contact support.Click Forgot Password on the login page, enter your registered email, and follow the instructions to reset your password.If the issue persists, contact support.",
  },
];

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

export default function SubAccordians() {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>
      {SubAccordiansData.map((item, index) => (
        <Accordion
          key={`panel${index + 1}`}
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
          sx={{ border: "0px" }}
        >
          <AccordionSummary
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #D5D5D5",
              fontFamily: "tt_chocolates",
            }}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
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
              {item.label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: "0px",
              padding: "12px 0px",
              backgroundColor: "#F7F7F7",
            }}
          >
            <div className="px-5">
              <p className="text-[#04AEEF] font-medium">{item.Question}</p>
              <p className="mt-2">{item.Answer}</p>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

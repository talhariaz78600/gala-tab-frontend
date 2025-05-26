import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ThemeContext } from "@/components/ThemeProvider";

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

export default function SubAccordians({ data }) {
  const [expanded, setExpanded] = React.useState("");
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {data?.length === 0 && (
        <p className="p-2 px-4 text-gray-600 dark:text-gray-300">
          No data found
        </p>
      )}
      {data?.map((item, index) => (
        <Accordion
          key={`panel${index + 1}`}
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
          sx={{
            border: 0,
            backgroundColor: isDark ? "#1f2937" : "#fff",
            borderRadius: "10px",
            marginBottom: "8px",
            boxShadow: isDark ? "0 0 0 1px #374151" : "0 0 0 1px #D5D5D5",
          }}
        >
          <AccordionSummary
            sx={{
              backgroundColor: isDark ? "#374151" : "#fff",
              border: `1px solid ${isDark ? "#4B5563" : "#D5D5D5"}`,
              fontFamily: "tt_chocolates",
              borderRadius: "10px",
              color: isDark ? "#F9FAFB" : "#111827",
            }}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography
              sx={{
                fontFamily: "tt_chocolates",
                fontWeight: 600,
                fontSize: "18px",
              }}
              className="font-semibold"
              component="span"
            >
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: 0,
              padding: "12px 0px",
              backgroundColor: isDark ? "#1f2937" : "#F7F7F7",
              color: isDark ? "#E5E7EB" : "#111827",
            }}
          >
            <div className="px-5">
              <p className="text-[#04AEEF] font-medium">{item.question}</p>
              <p className="mt-2">{item.answer}</p>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

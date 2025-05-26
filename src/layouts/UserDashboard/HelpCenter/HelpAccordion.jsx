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
import { FaSearch } from "react-icons/fa";
import { useGetAllfaqsListQuery, useGetTopicsListQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { useSelector } from "react-redux";
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

export default function HelpAccordions({ faqType }) {
  const [expanded, setExpanded] = React.useState("panel1");
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";
  const user = useSelector((state) => state.auth.user);
  const { data: topics, isLoading: topicsLoading } = useGetTopicsListQuery({
    topicType: user?.role,
  });

  const { data, isLoading } = useGetAllfaqsListQuery({
    faqType,
    search: delayedSearch,
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const textOnlyFaqs = data?.data?.filter((item) => item.dataType === "text");
  const trainingFaqs = data?.data?.filter(
    (item) => item.dataType === "training"
  );
  return (
    <div>
      <div className="max-w-xl mx-auto mt-4">
        <h4 className="font-semibold md:text-[34px] text-lg text-[#043B6A] text-center dark:text-white">
          How can we help you?
        </h4>
        <div className="mt-4">
          <form action="">
            <div className="bg-white p-2 border flex rounded-[10px] shadow-[0px_10px_20px_0px_#00000012]">
              <label htmlFor="">
                <FaSearch className="bg-[#043B6A] text-white p-2 text-4xl rounded-lg" />
              </label>
              <input
                type="search"
                name=""
                id=""
                className="w-full px-3 text-black"
                placeholder="Search help By Issue name"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <Accordion
          sx={{
            marginBottom: "12px",
            border: 0,
            borderRadius: "10px",
            backgroundColor: isDark ? "#1f2937" : "#fff",
            color: isDark ? "#F9FAFB" : "#1F2937",
          }}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            sx={{
              backgroundColor: isDark ? "#374151" : "#fff",
              border: `1px solid ${isDark ? "#4B5563" : "#D5D5D5"}`,
              borderRadius: "10px",
              fontFamily: "tt_chocolates",
              color: isDark ? "#F9FAFB" : "#1F2937",
            }}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography
              sx={{
                fontFamily: "tt_chocolates",
                fontWeight: 600,
                fontSize: "18px",
                color: isDark ? "#F9FAFB" : "#1F2937",
              }}
              className="font-semibold"
              component="span"
            >
              Users Trainings
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              border: 0,
              padding: "12px 0px",
              backgroundColor: isDark ? "#1E293B" : "#F7F7F7", // dark:bg-slate-800
              color: isDark ? "#F9FAFB" : "#1F2937",
            }}
          >
            <Typography>
              <UserTraining data={trainingFaqs} />
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            marginBottom: "12px",
            border: 0,
            borderRadius: "10px",
            backgroundColor: isDark ? "#1f2937" : "#fff",
            color: isDark ? "#F9FAFB" : "#1F2937",
          }}
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            sx={{
              backgroundColor: isDark ? "#374151" : "#fff",
              border: `1px solid ${isDark ? "#4B5563" : "#D5D5D5"}`,
              borderRadius: "10px",
              fontFamily: "tt_chocolates",
              color: isDark ? "#F9FAFB" : "#1F2937",
            }}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography
              sx={{
                fontFamily: "tt_chocolates",
                fontWeight: 600,
                fontSize: "18px",
                color: isDark ? "#F9FAFB" : "#1F2937",
              }}
              className="font-semibold"
              component="span"
            >
              Help & Support Center
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: 0,
              padding: "12px 0px",
              backgroundColor: isDark ? "#1E293B" : "#F7F7F7", // dark:bg-slate-800
              color: isDark ? "#F9FAFB" : "#1F2937",
            }}
          >
            <Typography>
              <HelpSupport data={topics?.data || []} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "12px",
            border: 0,
            borderRadius: "10px",
            backgroundColor: isDark ? "#1f2937" : "#fff",
            color: isDark ? "#F9FAFB" : "#1F2937",
          }}
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            sx={{
              backgroundColor: isDark ? "#374151" : "#fff",
              border: `1px solid ${isDark ? "#4B5563" : "#D5D5D5"}`,
              borderRadius: "10px",
              fontFamily: "tt_chocolates",
              color: isDark ? "#F9FAFB" : "#1F2937",
            }}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography
              sx={{
                fontFamily: "tt_chocolates",
                fontWeight: 600,
                fontSize: "18px",
                color: isDark ? "#F9FAFB" : "#1F2937",
              }}
              className="font-semibold"
              component="span"
            >
              FAQs
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: 0,
              padding: "12px 0px",
              backgroundColor: isDark ? "#1E293B" : "#F7F7F7", // dark:bg-slate-800
              color: isDark ? "#F9FAFB" : "#1F2937",
            }}
          >
            <div className="px-5 sm:px-10">
              <SubAccordians data={textOnlyFaqs} />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <Loader loading={isLoading || topicsLoading} />
    </div>
  );
}

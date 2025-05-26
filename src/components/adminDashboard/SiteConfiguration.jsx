import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import GeneralSettingsForm from "../GeneralSettingsForm";
import { Switch } from "@mui/material";
import { ThemeContext } from "../ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "10px",
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
  flexDirection: "row-reverse",
  fontFamily: "tt_chocolates",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "#fff",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "10px",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#F7F7F7",
}));

export default function SiteConfiguration() {
  const [expanded, setExpanded] = React.useState("panel1");
  const { theme: appTheme, toggleTheme } = React.useContext(ThemeContext);
  const muiTheme = useTheme();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <h4 className="font-semibold text-xl dark:text-white">
        All General & Site Settings
      </h4>
      <div className="mt-3">
        {/* General Settings */}
        <Accordion
          sx={{ mb: 2 }}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography
              sx={{
                fontFamily: "tt_chocolates",
                fontWeight: 600,
                fontSize: "18px",
              }}
              className="dark:text-white"
            >
              General Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GeneralSettingsForm />
          </AccordionDetails>
        </Accordion>

        {/* Theme Customization */}
        <Accordion
          sx={{ mb: 2 }}
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography
              sx={{
                fontFamily: "tt_chocolates",
                fontWeight: 600,
                fontSize: "18px",
              }}
              className="dark:text-white"
            >
              Theme Customization
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg dark:text-white">Theme</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose between light and dark mode.
                </p>
              </div>
              <div className="flex items-center space-x-3 bg-gray-200 dark:bg-gray-700 rounded-full p-1 w-max select-none">
                {/* Light Label with Sun Icon */}
                <button
                  onClick={() => appTheme !== "light" && toggleTheme()}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full cursor-pointer transition-colors duration-300 ${
                    appTheme === "light"
                      ? "bg-white dark:bg-gray-900 text-yellow-500 shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-900/50"
                  }`}
                  aria-label="Switch to light mode"
                >
                  <FaSun />
                  <span className="font-semibold">Light</span>
                </button>

                {/* Toggle Switch */}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  role="switch"
                  aria-checked={appTheme === "dark"}
                  className="relative w-14 h-8 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center cursor-pointer transition-colors duration-500"
                >
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 ${
                      appTheme === "dark" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>

                {/* Dark Label with Moon Icon */}
                <button
                  onClick={() => appTheme !== "dark" && toggleTheme()}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full cursor-pointer transition-colors duration-300 ${
                    appTheme === "dark"
                      ? "bg-gray-900 text-indigo-400 shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-900/30 dark:hover:bg-gray-700/50"
                  }`}
                  aria-label="Switch to dark mode"
                >
                  <FaMoon />
                  <span className="font-semibold">Dark</span>
                </button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

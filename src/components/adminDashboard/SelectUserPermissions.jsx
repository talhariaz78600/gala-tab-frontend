import * as React from "react";
import { styled } from "@mui/material/styles";
import { FaChevronRight } from "react-icons/fa";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import UserPermissions from "../../assets/img/UserPermissions.png";
import ViewIcon from "../../assets/img/ViewIcon.png";
import edit from "../../assets/img/edit.png";
import del from "../../assets/img/del.png";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: "10px",
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <FaChevronRight style={{ fontSize: "20px", color: "#000000" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#F7F7F7",
  border: "1px solid #D5D5D5",
  borderRadius: "10px",
  flexDirection: "row-reverse",
  boxShadow: "0px 0px 30px 0px #5C5C5C26",
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
  paddingLeft: "0px",
  paddingRight: "0px",
}));

export default function SelectUserPermissions({ data, heading }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center gap-2">
              <img src={UserPermissions} alt="img" />
              <p className="text-[24px] font-semibold">{heading}</p>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <img src={ViewIcon} alt="img" />
                <p className="text-lg font-semibold">View</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={edit} alt="img" />
                <p className="text-lg font-semibold">Edit</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={edit} alt="img" />
                <p className="text-lg font-semibold">Create</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={del} alt="img" />
                <p className="text-lg font-semibold">Delete</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="pb-10">
            {data.map((Permission, index) => {
              const formatedLabel = Permission.label.replace(/\s+/g, "-");
              const formatedHeading = heading.replace(/\s+/g, "-");
              return (
                <div className="border-b">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex items-center gap-2 p-4">
                      <img
                        className="size-6 min-w-6 object-contain"
                        src={Permission.icon}
                        alt="img"
                      />
                      <p className="text-lg font-medium">{Permission.label}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4">
                      <div>
                        <input
                          className="size-6 min-w-6 accent-black"
                          type="checkbox"
                          name={`${formatedHeading}-${formatedLabel}-View`}
                          id={`${formatedHeading}-${formatedLabel}-View`}
                        />
                      </div>
                      <div>
                        <input
                          className="size-6 min-w-6 accent-black"
                          type="checkbox"
                          name={`${formatedHeading}-${formatedLabel}-edit`}
                          id={`${formatedHeading}-${formatedLabel}-edit`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

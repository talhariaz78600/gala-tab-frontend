import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { CircularProgress, Modal } from "@mui/material";
import AddAmenities from "../../../components/VendorDashboard/AddAmenities";
import { useFormContext } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetAmenitiesQuery } from "@/api/apiSlice";
import { ThemeContext } from "@/components/ThemeProvider";

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

const AmenitiesDetail = () => {
  const { data, isLoading } = useGetAmenitiesQuery();
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  register("venuesAmenities", {
    validate: (value) =>
      value && value.length > 0
        ? true
        : "At least one amenity must be selected.",
  });
  const selectedAmenities = watch("venuesAmenities") || [];
  const [expanded, setExpanded] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [currentAmenity, setCurrentAmenity] = React.useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setCurrentAmenity(id);
  };
  const handleClose = () => setOpen(false);

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
            Step 06
          </p>
          <div>
            <h2 className="text-[#171717] dark:text-white font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">
              Show off Your Offers Amenities!
            </h2>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              Got more perks? No problem - add extra amenities anytime after you
              publish!
            </p>
          </div>
        </div>
        <div>
          <div className="bg-[#F7F7F7] dark:bg-[#171717] p-3 h-[420px] overflow-y-auto rounded-lg">
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <CircularProgress size={30} />
              </div>
            ) : data?.data?.length > 0 ? (
              data.data.map((category, catIndex) => (
                <Accordion
                  key={category._id}
                  className="mb-3"
                  expanded={expanded === category._id}
                  onChange={handleAccordionChange(category._id)}
                  sx={{
                    backgroundColor: isDark ? "#1e293b" : "#F7F7F7", // dark:bg-slate-800
                    color: isDark ? "#F1F5F9" : "#000000", // dark:text-slate-100
                    border: `1px solid ${isDark ? "#334155" : "#ccc"}`, // darker border in dark
                    borderRadius: "10px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{ color: isDark ? "#F1F5F9" : "#000" }}
                      />
                    }
                    aria-controls={`panel${catIndex}-content`}
                    id={`panel${catIndex}-header`}
                    sx={{
                      fontFamily: "tt_chocolates",
                      backgroundColor: isDark ? "#334155" : "#F7F7F7",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: "tt_chocolates",
                        color: isDark ? "#F1F5F9" : "#000",
                      }}
                    >
                      {category.name}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      backgroundColor: isDark ? "#1e293b" : "#F7F7F7",
                      border: "none",
                      fontFamily: "tt_chocolates",
                      color: isDark ? "#F1F5F9" : "#000",
                    }}
                  >
                    <div className="grid lg:grid-cols-3 gap-4">
                      {category.categories.map((option) => (
                        <div
                          key={option._id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id={`option-${option._id}`}
                            className="accent-black w-5 h-5 min-w-5"
                            {...register("venuesAmenities")}
                            value={option._id}
                            checked={selectedAmenities.includes(option._id)}
                            onChange={(e) => {
                              const newSelected = e.target.checked
                                ? [...selectedAmenities, option._id]
                                : selectedAmenities.filter(
                                    (id) => id !== option._id
                                  );
                              setValue("venuesAmenities", newSelected, {
                                shouldDirty: true,
                              });
                            }}
                          />
                          <label
                            className={`text-sm sm:text-base ${
                              isDark ? "text-slate-200" : "text-black"
                            }`}
                            htmlFor={`option-${option._id}`}
                          >
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-10">
                      <button
                        type="button"
                        className="text-white bg-black p-3 rounded-[8px]"
                        onClick={() => handleOpen(category._id)}
                      >
                        Add Amenities
                      </button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No data available
              </p>
            )}
          </div>
          {errors.venuesAmenities && (
            <p className="text-red-500 text-sm mt-2">
              {errors.venuesAmenities.message}
            </p>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white rounded-[20px]">
          <AddAmenities
            handleClose={handleClose}
            currentAmenity={currentAmenity}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AmenitiesDetail;

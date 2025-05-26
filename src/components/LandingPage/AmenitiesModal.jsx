import { CircularProgress, Modal } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import listImgTwo from "../../assets/img/venues.png";
import { useGetAmenitiesQuery } from "@/api/apiSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

const AmenitiesModal = ({
  shareopen,
  handleshareClose,
  updateFilter,
  datetime,
  selectedGuests,
  keyword,
}) => {
  const { data, isLoading } = useGetAmenitiesQuery();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [expanded, setExpanded] = useState(null);
  const [open, setOpen] = useState(false);
  const [noOfCapacity, setNoOfCapacity] = useState(1);
  const [noOfRestrooms, setNoOfRestrooms] = useState(1);
  const handleDecrease = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  const handleIncrease = (setter, value) => {
    setter(value + 1);
  };

  const handleChange = (e, setter) => {
    const val = e.target.value.replace(/\D/g, "");
    setter(val === "" ? 0 : parseInt(val));
  };
  const renderInputBlock = (label, value, setter) => (
    <div>
      <p className="text-sm font-semibold mb-1">{label}</p>
      <div className="flex items-center justify-between gap-3">
        <BiSolidMinusCircle
          className={`text-2xl ${
            value === 0 ? "text-[#9A9A9A]" : "cursor-pointer"
          }`}
          onClick={() => handleDecrease(setter, value)}
        />
        <input
          type="text"
          value={value < 10 ? `0${value}` : value}
          onChange={(e) => handleChange(e, setter)}
          size={value.toString().length}
          className="font-bold text-base bg-transparent border-b border-[#9A9A9A] text-center min-w-[20px]"
        />
        <BiSolidPlusCircle
          className="text-2xl cursor-pointer"
          onClick={() => handleIncrease(setter, value)}
        />
      </div>
    </div>
  );
  // Local state to manage selected checkboxes
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  // Toggle checkbox
  const handleAmenityToggle = (id) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedAmenities((prev) => [...prev, id]);
    }
  };

  return (
    <Modal
      open={shareopen}
      onClose={handleshareClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ m: 2, fontFamily: "tt_chocolates" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] bg-white dark:bg-gray-800 rounded-[20px]">
        <div className="flex justify-between items-center border-b p-3">
          <h4 className="font-semibold text-xl">Filters</h4>
          <div className="cursor-pointer" onClick={handleshareClose}>
            <IoCloseCircle className="text-xl text-[#979797]" />
          </div>
        </div>
        <div className="p-2">
          <div className="flex items-center p-2 px-10 gap-12">
            {renderInputBlock("Capacity", noOfCapacity, setNoOfCapacity)}
            {renderInputBlock("Restrooms", noOfRestrooms, setNoOfRestrooms)}
          </div>
          <div className="p-3" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] p-3 h-[420px] overflow-y-auto rounded-lg">
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
                  >
                    <AccordionSummary
                      sx={{
                        border: "1px solid #ccc",
                        backgroundColor: isDark ? "#1f2937" : "#F7F7F7", // Tailwind's gray-800
                        color: isDark ? "#fff" : "#000",
                        borderRadius: "10px",
                      }}
                      expandIcon={
                        <ExpandMoreIcon htmlColor={isDark ? "#fff" : "#000"} />
                      }
                      aria-controls={`panel${catIndex}-content`}
                      id={`panel${catIndex}-header`}
                    >
                      <Typography
                        sx={{
                          backgroundColor: isDark ? "#1f2937" : "#F7F7F7",
                          color: isDark ? "#fff" : "#000",
                          fontFamily: "tt_chocolates",
                        }}
                        component="span"
                      >
                        {category.name}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        backgroundColor: isDark ? "#111827" : "#F7F7F7", // darker background
                        color: isDark ? "#fff" : "#000",
                        fontFamily: "tt_chocolates",
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
                              className={`w-5 h-5 min-w-5 ${
                                isDark ? "accent-white" : "accent-black"
                              }`}
                              value={option._id}
                              checked={selectedAmenities.includes(option._id)}
                              onChange={() => handleAmenityToggle(option._id)}
                            />
                            <label
                              htmlFor={`option-${option._id}`}
                              className={`text-sm sm:text-base ${
                                isDark ? "text-white" : "text-black"
                              }`}
                            >
                              {option.name}
                            </label>
                          </div>
                        ))}
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
          </div>
          <div className="flex justify-end gap-4 px-10 pb-6 mt-4">
            <button
              onClick={() => {
                console.log({
                  noOfRestrooms,
                  noOfCapacity,
                  ids: selectedAmenities,
                });
                updateFilter({
                  datetime,
                  guests: selectedGuests,
                  keyword,
                  noOfRestrooms,
                  noOfCapacity,
                  ids: selectedAmenities,
                });

                handleshareClose();
              }}
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
            >
              Filter
            </button>
            <button
              onClick={() => {
                setNoOfCapacity(1);
                setNoOfRestrooms(1);
                setSelectedAmenities([]);
              }}
              className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AmenitiesModal;

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
import fashion from "../../assets/img/fashion.png";
import cakeImg from "../../assets/img/cake.png";
import equipment from "../../assets/img/equipment.png";
import staff from "../../assets/img/staff.png";
import beauty from "../../assets/img/beauty.png";
import entertainment from "../../assets/img/entertainment.png";
import transportation from "../../assets/img/transportation.png";
import { styled } from "@mui/material/styles";
import { FaChevronDown, FaLocationDot } from "react-icons/fa6";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Chip, Modal } from "@mui/material";
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
import AmenitiesModal from "./AmenitiesModal";
import {
  useGetSelectCityListQuery,
  useGetSelectCountryListQuery,
} from "@/api/apiSlice";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

const GoogleAutoCompleteInput = ({ placeholder, onPlaceSelected }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places)
      return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["(regions)"],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        onPlaceSelected(place);
      }
    });

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <FaLocationDot className="absolute left-3  text-xl text-gray-400 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full text-black   rounded-xl pl-10 pr-4 "
      />
    </div>
  );
};

export default function Filters({ updateFilter, mode = "simple", filter }) {
  const [shareopen, setshareOpen] = React.useState(false);
  const handleshareOpen = () => setshareOpen(true);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const whereRef = useRef(null);

  const [datetime, setDatetime] = useState({
    date: "",
    checkInTime: "",
    checkOutTime: "",
  });
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
  });
  const [selectedGuests, setSelectedGuests] = useState(0);
  const navigate = useNavigate();

  const [isMapVisible, setIsMapVisible] = useState(false);

  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const [isSelectGuestVisible, setIsSelectGuestVisible] = useState(false);

  const [keyword, setKeyword] = useState("");

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
  const handlePlaceSelected = (place) => {
    if (!place.geometry || !place.address_components) {
      console.log("Invalid place data.");
      return;
    }

    const getComponent = (type) => {
      const component = place.address_components.find((comp) =>
        comp.types.includes(type)
      );
      return component ? component.long_name : null;
    };

    const city =
      getComponent("locality") || getComponent("administrative_area_level_2");
    const state = getComponent("administrative_area_level_1");
    const country = getComponent("country");

    setLocation({
      city: city || "",
      state: state || "",
      country: country || "",
    });
  };

  const handleSearch = () => {
    updateFilter({ datetime, selectedGuests, keyword, location });
  };

  const chipStyle = {
    backgroundColor: isDark ? "#1f2937" : "black",
    color: "#fff",
    fontWeight: 500,
    "& .MuiChip-deleteIcon": {
      color: "#fff",
    },
  };

  return (
    <div className="mycontainer">
      <div
        className={`flex flex-wrap xl:flex-nowrap max-w-[1300px] mx-auto ${
          mode === "map" ? "flex-row-reverse gap-2" : "flex-row"
        }`}
      >
        <div
          className="flex my-1 items-center me-4 border px-6 py-2 border-[#CDCDCD] cursor-pointer shadow-md rounded-[15px] bg-white"
          onClick={handleshareOpen}
        >
          <img className="size-5 me-2" src={FilterIcon} alt="img" />
          <p className="font-medium leading-normal text-[18px] text-black ">
            Filters
          </p>
        </div>
        <div className="flex flex-wrap relative lg:flex-nowrap justify-center w-full my-1 items-center gap-x-4 border border-[#CDCDCD] rounded-[15px] shadow-lg px-3 py-2 bg-white">
          <div className="flex flex-wrap lg:divide-x w-full my-2">
            <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
              <p className="font-semibold text-black ">
                What are you planning?
              </p>
              <input
                type="text"
                name="activity"
                id="activity"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter Keyword"
                className=" text-black  text-sm w-full text-center min-[480px]:text-start   px-3 py-2"
              />
            </div>
            <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
              <p className="font-semibold mb-1 text-black ">Where?</p>
              <GoogleAutoCompleteInput
                placeholder="Select your Location"
                onPlaceSelected={handlePlaceSelected}
              />
            </div>
            <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
              <p className="font-semibold text-black ">Select Date & Time</p>

              {!datetime?.date &&
              !datetime?.checkInTime &&
              !datetime?.checkOutTime ? (
                <p
                  className="text-sm  text-[#C5C5C6] text-center min-[480px]:text-start cursor-pointer pt-1"
                  onClick={toggleTimerVisibility}
                >
                  Add Dates & Time
                </p>
              ) : (
                <div
                  className="mt-2 text-xs bg-gray-100 rounded-lg p-2 space-y-1 text-center min-[480px]:text-start cursor-pointer"
                  onClick={toggleTimerVisibility}
                >
                  {datetime?.date && (
                    <p className="text-black">
                      <span className="font-medium text-black">Date:</span>{" "}
                      {datetime.date}
                    </p>
                  )}
                  {datetime?.checkInTime && (
                    <p className="text-black">
                      <span className="font-medium text-black">Check In:</span>{" "}
                      {datetime.checkInTime}
                    </p>
                  )}
                  {datetime?.checkOutTime && (
                    <p className="text-black">
                      <span className="font-medium text-black">Check Out:</span>{" "}
                      {datetime.checkOutTime}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="w-full text-center min-[480px]:text-start min-[480px]:w-1/2 sm:w-1/3 md:w-1/4 p-2 lg:py-0">
              <p className="font-semibold text-black ">Total Guests</p>
              {selectedGuests === 0 ? (
                <p
                  className="text-sm text-[#C5C5C6] text-center min-[480px]:text-start cursor-pointer pt-1"
                  onClick={toggleSelectGuestVisibility}
                >
                  Add Guest
                </p>
              ) : (
                <p
                  onClick={toggleSelectGuestVisibility}
                  className="text-sm text-[#C5C5C6] text-center min-[480px]:text-start pt-1 cursor-pointer"
                >
                  {selectedGuests} Guests Selected
                </p>
              )}
            </div>
          </div>
          <div className="absolute right-0 top-full z-50" ref={containerRef}>
            {isTimerVisible && (
              <div>
                <TimerSet onChange={setDatetime} />
              </div>
            )}
            {isSelectGuestVisible && (
              <div>
                <SelectGuest onChange={(count) => setSelectedGuests(count)} />
              </div>
            )}
          </div>
          <div>
            <button
              onClick={handleSearch}
              className="py-2 px-7 bg-black text-white rounded-md font-semibold my-2 shadow-[0px_16px_24px_0px_rgba(0,0,0,0.2)]"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Selected Filters */}
      {(filter?.date ||
        filter?.checkInTime ||
        filter?.checkOutTime ||
        filter?.guests ||
        filter?.keyword ||
        filter?.noOfRestrooms ||
        filter?.noOfCapacity ||
        filter?.city ||
        filter?.state ||
        filter?.country ||
        filter?.selectedGuests > 0 ||
        (filter?.ids && filter?.ids.length > 0)) && (
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {filter.date && (
            <Chip
              sx={chipStyle}
              label="Date"
              onDelete={() => updateFilter({ date: "" })}
            />
          )}
          {filter.checkInTime && (
            <Chip
              sx={chipStyle}
              label="Check-in Time"
              onDelete={() => updateFilter({ checkInTime: "" })}
            />
          )}
          {filter.checkOutTime && (
            <Chip
              sx={chipStyle}
              label="Check-out Time"
              onDelete={() => updateFilter({ checkOutTime: "" })}
            />
          )}
          {filter.guests > 0 && (
            <Chip
              sx={chipStyle}
              label="Guests"
              onDelete={() => updateFilter({ ...filter, guests: "" })}
            />
          )}
          {filter.keyword && (
            <Chip
              sx={chipStyle}
              label={filter.keyword}
              onDelete={() => updateFilter({ ...filter, keyword: "" })}
            />
          )}
          {filter.selectedGuests > 0 && (
            <Chip
              sx={chipStyle}
              label="Guests"
              onDelete={() => updateFilter({ ...filter, selectedGuests: "" })}
            />
          )}
          {filter.noOfRestrooms > 0 && (
            <Chip
              sx={chipStyle}
              label="Restrooms"
              onDelete={() => updateFilter({ ...filter, noOfRestrooms: "" })}
            />
          )}
          {filter.noOfCapacity > 0 && (
            <Chip
              sx={chipStyle}
              label="Capacity"
              onDelete={() => updateFilter({ ...filter, noOfCapacity: "" })}
            />
          )}
          {(filter.city || filter.state || filter.country) && (
            <Chip
              sx={chipStyle}
              label={`Location: ${filter.city || ""}${
                filter.city && filter.state ? ", " : ""
              }${filter.state || ""}${
                (filter.city || filter.state) && filter.country ? ", " : ""
              }${filter.country || ""}`}
              onDelete={() =>
                updateFilter({ ...filter, city: "", state: "", country: "" })
              }
            />
          )}
          {filter.ids?.length > 0 && (
            <Chip
              sx={chipStyle}
              label="Amenities"
              onDelete={() => updateFilter({ ...filter, ids: [] })}
            />
          )}
        </div>
      )}
      {shareopen && (
        <AmenitiesModal
          shareopen={shareopen}
          handleshareClose={() => setshareOpen(false)}
          updateFilter={updateFilter}
          datetime={datetime}
          selectedGuests={selectedGuests}
          keyword={keyword}
        />
      )}
    </div>
  );
}

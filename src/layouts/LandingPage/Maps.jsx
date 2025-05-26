import Navbar from "../../components/LandingPage/Navbar";
import Filters from "../../components/LandingPage/Filters";
import React, { useState } from "react";
import LocationIcon from "../../assets/img/location-icon.svg";
import DecorationIcon from "../../assets/img/Decoration-icon.svg";
import CateringIcon from "../../assets/img/catering-icon.svg";
import CakesIcon from "../../assets/img/cakes-icon.svg";
import DjIcon from "../../assets/img/dj-icon.svg";
import EntertainmentIcon from "../../assets/img/entertainment-icon.svg";
import PhotographyIcon from "../../assets/img/photography-icon.svg";
import TransportationIcon from "../../assets/img/Transportaion-icon.svg";
import BeautyIcon from "../../assets/img/beauty-icon.svg";
import StaffIcon from "../../assets/img/staff-icon.svg";
import FashionIcon from "../../assets/img/Fashion-icon.svg";
import EquipmentIcon from "../../assets/img/Equipment-icon.svg";
import LocationIconWhite from "../../assets/img/location-icon-white.svg";
import DecorationIconWhite from "../../assets/img/Decoration-icon-white.svg";
import CateringIconWhite from "../../assets/img/catering-icon-white.svg";
import CakesIconWhite from "../../assets/img/cakes-icon-white.svg";
import DjIconWhite from "../../assets/img/dj-icon-white.svg";
import EntertainmentIconWhite from "../../assets/img/entertainment-icon-white.svg";
import PhotographyIconWhite from "../../assets/img/photography-icon-white.svg";
import TransportationIconWhite from "../../assets/img/Transportaion-icon-white.svg";
import BeautyIconWhite from "../../assets/img/beauty-icon-white.svg";
import StaffIconWhite from "../../assets/img/staff-icon-white.svg";
import FashionIconWhite from "../../assets/img/Fashion-icon-white.svg";
import EquipmentIconWhite from "../../assets/img/Equipment-icon-white.svg";
import MapsFilters from "../../components/LandingPage/MapsFilters";
import MapComponent from "./MapComponent";
import ListingCard from "./ListiningCard";
import SliderImg from "../../assets/img/slider-img.png";
import SliderImgTwo from "../../assets/img/slider-img2.png";
import SliderImgThree from "../../assets/img/slider-img3.png";
import { FaListUl } from "react-icons/fa6";
import { Link } from "react-router";
import MapFilter from "../../components/LandingPage/MapFilter";
import {
  useGetLandingServiceQuery,
  useGetMapServiceListQuery,
  useGetServiceTypeQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";

const mapContainerStyle = {
  width: "100%",
  height: "100dvh",
  borderRadius: "12px",
};

// Map center location
const center = {
  lat: 46.1603291,
  lng: -1.1574211,
};
export default function Maps() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const { data, isLoading } = useGetServiceTypeQuery();

  const [filter, setFilter] = useState({
    date: "",
    checkInTime: "",
    checkOutTime: "",
    guests: "",
    keyword: "",
    noOfRestrooms: "",
    noOfCapacity: "",
    ids: [],
    city: "",
    state: "",
    country: "",
  });

  const { data: landingServiceData, isLoading: landingServiceLoading } =
    useGetMapServiceListQuery({
      serviceTypeId: selectedId,
      selectedDate: filter?.selectedDate,
      checkInTime: filter?.checkInTime,
      checkOutTime: filter?.checkOutTime,
      guests: filter?.selectedGuests,
      keyword: filter?.keyword,
      noOfRestrooms: filter?.noOfRestrooms,
      noOfCapacity: filter?.noOfCapacity,
      ids: filter?.ids,
      city: filter?.city,
      state: filter?.state,
      country: filter?.country,
    });

  // Function to update the filter state from child
  const updateFilter = (newFilter) => {
    setFilter((prevFilter) => {
      const updated = {
        ...prevFilter,
        ...newFilter,
      };

      if (newFilter.datetime) {
        updated.date = newFilter.datetime.date ?? prevFilter.date;
        updated.checkInTime =
          newFilter.datetime.checkInTime ?? prevFilter.checkInTime;
        updated.checkOutTime =
          newFilter.datetime.checkOutTime ?? prevFilter.checkOutTime;
      }

      if (newFilter.location) {
        updated.city = newFilter.location.city ?? prevFilter.city;
        updated.state = newFilter.location.state ?? prevFilter.state;
        updated.country = newFilter.location.country ?? prevFilter.country;
      }

      delete updated.datetime;
      delete updated.location;

      return updated;
    });
  };

  return (
    <div className="h-dvh relative">
      <div className="w-full">
        <MapComponent
          listings={landingServiceData?.data || []}
          mapContainerStyle={mapContainerStyle}
          center={center}
        />
      </div>
      <div className="absolute w-full top-0">
        <div className="mt-4 my-container">
          <div className="flex sm:flex-row flex-col gap-3 px-2 items-center">
            <div className="text-center">
              <Link
                to="/"
                className="bg-gradient-to-b from-gray-400 to-gray-800 inline-block text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
              >
                Gala Tab
              </Link>
            </div>
            <div className="w-full">
              <Filters updateFilter={updateFilter} mode="map" filter={filter} />
            </div>
          </div>
          <div className="mycontainer xl:flex justify-center overflow-x-auto scroll-y-hidden">
            <div className="bg-white p-3 rounded-[15px]">
              <div className="overflow-x-auto scroll-y-hidden">
                <div className="flex gap-3">
                  {isLoading
                    ? Array(4)
                        .fill()
                        .map((_, index) => (
                          <div
                            key={index}
                            className="sm:size-[70px] size-[60px] sm:min-w-[70px] min-w-[60px] bg-gray-300 rounded-full animate-pulse"
                          ></div>
                        ))
                    : data?.data?.map((item) => (
                        <MapsFilters
                          key={item._id}
                          content={item.name}
                          src0={item.blackIcon}
                          src1={item.whiteIcon}
                          active={selectedId === item._id}
                          onClick={() => setSelectedId(item._id)}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2">
        <Link
          to="/"
          className="flex items-center gap-2 text-white bg-black py-3 px-6 rounded-full text-[12px] font-medium"
        >
          Show list <FaListUl />
        </Link>
      </div>

      <Loader loading={landingServiceLoading} />
    </div>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabItem from "./TabItem";
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
import VanueTab from "./VanueTab";
import { CiMap } from "react-icons/ci";
import { Link } from "react-router";
import {
  useGetLandingServiceQuery,
  useGetServiceTypeQuery,
} from "@/api/apiSlice";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import TabCardSkeleton from "./TabCardSkeleton";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MapTypes({ filter }) {
  const [value, setValue] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const { data, isLoading } = useGetServiceTypeQuery();
  const [page, setPage] = useState(1);
  const [allListings, setAllListings] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const {
    data: landingServiceData,
    isLoading: landingServiceLoading,
    refetch,
  } = useGetLandingServiceQuery({
    page,
    limit,
    serviceTypeId: selectedServiceId,
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

  const handleChange = (event, newValue) => {
    const selectedId = data?.data?.[newValue]?._id;
    setValue(newValue);
    setSelectedServiceId(selectedId);
  };

  useEffect(() => {
    setPage(1);
    setAllListings([]);
    setHasMore(true);
  }, [
    selectedServiceId,
    filter?.selectedDate,
    filter?.checkInTime,
    filter?.checkOutTime,
    filter?.guests,
    filter?.keyword,
    filter?.noOfCapacity,
    filter?.noOfRestrooms,
    filter?.ids,
    filter?.city,
    filter?.state,
    filter?.country,
  ]);

  useEffect(() => {
    if (landingServiceData?.data) {
      setAllListings((prev) => {
        const existingIds = new Set(prev.map((item) => item._id));
        const newData = landingServiceData.data.filter(
          (item) => !existingIds.has(item._id)
        );
        return [...prev, ...newData];
      });

      setHasMore(
        landingServiceData.currentPage < landingServiceData.totalPages
      );
    }
  }, [landingServiceData]);

  const handleLikeUpdate = (serviceId, userId) => {
    setAllListings((prevListings) =>
      prevListings.map((listing) => {
        if (listing._id === serviceId) {
          const alreadyLiked = listing.likedBy.includes(userId);
          return {
            ...listing,
            likedBy: alreadyLiked
              ? listing.likedBy.filter((id) => id !== userId)
              : [...listing.likedBy, userId],
          };
        }
        return listing;
      })
    );
  };

  return (
    <div className="border-t border-[#CDCDCD] pt-4 mt-6">
      <div className="mycontainer">
        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs
              value={value === false ? false : value}
              onChange={handleChange}
              variant="scrollable"
              TabIndicatorProps={{ sx: { display: "none" } }}
            >
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <Tab
                      key={index}
                      label={
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={80}
                          sx={{ borderRadius: "999px", marginBottom: "10px" }}
                        />
                      }
                      disabled
                    />
                  ))
                : data?.data?.map((item, index) => (
                    <Tab
                      key={item._id}
                      label={
                        <TabItem
                          content={item.name}
                          active={value === index}
                          src0={item.blackIcon}
                          src1={item.whiteIcon}
                        />
                      }
                      {...a11yProps(index)}
                    />
                  ))}
            </Tabs>
          </Box>

          <div className="flex justify-center mt-1 ">
            <Link
              to="./maps"
              className="flex items-center text-white text-lg bg-[#1C1C1C] py-3 px-5 shadow-[0px_19px_34px_0px_#00000033] rounded-full"
            >
              Show map <CiMap className="ms-2 text-[24px]" />
            </Link>
          </div>

          {!landingServiceLoading ? (
            <>
              <CustomTabPanel value={value} index={value}>
                {landingServiceData?.data?.length > 0 ? (
                  <VanueTab
                    listingData={allListings}
                    onLikeUpdate={handleLikeUpdate}
                  />
                ) : (
                  <p className="text-center text-gray-500 py-6">
                    No Data Found
                  </p>
                )}
              </CustomTabPanel>

              {hasMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={isLoading}
                    className="bg-[#1C1C1C] text-white font-medium text-lg py-3 px-6 rounded-lg disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "Show more"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-wrap">
              {[...Array(5)].map((_, index) => (
                <TabCardSkeleton key={index} />
              ))}
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}

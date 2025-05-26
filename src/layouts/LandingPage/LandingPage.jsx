import React, { useEffect } from "react";
import Carousel from "./LandingPageComponent/Carousel";
import VendorWelcome from "./LandingPageComponent/VendorWelcome";
import TabFilter from "./LandingPageComponent/TabFilter";
import Filters from "../../components/LandingPage/Filters";
import MapTypes from "../../components/LandingPage/MapTypes";
import TestimonialsCard from "./LandingPageComponent/TestimonialsCard";
import ImgGallary from "../../components/LandingPage/ImgGallary";
import { Modal } from "@mui/material";
import PrivacyPopUp from "../../components/LandingPage/PrivacyPopUp";
import { useState } from "react";
import NewsletterSection from "./NewLetterSection";

const LandingPage = () => {
  const [Privacyopen, setPrivacyOpen] = React.useState(false);
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

  const handlePrivacyClose = () => setPrivacyOpen(false);
  useEffect(() => {
    // Check if cookie consent has been given
    const cookieConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="));

    // Only show modal if no consent has been given
    const localStorageConsent = localStorage.getItem("cookieConsent");

    if (!cookieConsent && !localStorageConsent) {
      setPrivacyOpen(true);
    }
  }, []);

  return (
    <div className="container-fluid w-full justify-center items-center">
      <div className="mycontainer ">
        <h1 className="font-extrabold dark:text-white text-[rgba(28,28,28,1)] my-3 leading-normal text-pretty max-w-[950px] mx-auto text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] text-center">
          Effortlessly Book Venues and Vendor's Today
        </h1>
      </div>
      <Filters updateFilter={updateFilter} filter={filter} />
      <MapTypes filter={filter} />
      {/* Header Section */}

      <div className="mycontainer flex flex-col justify-center items-center sapce-y-8 ">
        <p className="text-[28px] dark:text-white   sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[65px] leading-normal font-bold text-[#1C1C1C] mt-12 ">
          Made In Gala Tab
        </p>

        <p className="paragraph dark:text-white text-[#171717] sm:text-[18px] leaidng-normal text-center">
          From indie films to boardroom decisions, remarkable things are Gala
          Tab
        </p>
      </div>

      {/* Carousel Section */}
      <div className="mycontainer">
        <div className="mt-12">
          <Carousel />
        </div>
      </div>
      {/* VendorWelcome Section */}
      <div className=" bg-gradient-to-t from-[#f2f6f9] to-white-100 mt-20 py-10">
        <VendorWelcome />
      </div>

      {/* Why Gala Tab Section */}
      <div className="mt-8 py-12">
        <div className="mycontainer">
          <div className="flex flex-wrap items-center mx-[-16px]">
            <div className="w-full lg:w-1/2 p-4">
              <div>
                <p className="font-bold text-center dark:text-white sm:text-start text-[#1C1C1C] leading-normal text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[55px]">
                  Why Gala Tab
                </p>

                <p className="sm:text-[18px] dark:text-white text-center sm:text-start">
                  Discover hand-picked vendors right at your fingertips: Gain
                  access to premium vendors specializing in Venues catering,
                  entertainment, decor, and much more—all conveniently located
                  in a single platform!
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-4 mt-12 lg:mt-0">
              <div>
                <ImgGallary />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TabFilter Section */}
      <div className=" mt-14">
        <TabFilter />
      </div>
      <div>
        <NewsletterSection />
      </div>
      <div className="mycontainer">
        <div className="mt-20 mb-10">
          <p className="text-[36px] leading-normal md:text-[45px] font-medium">
            Client's Reviews
          </p>
          <TestimonialsCard />
        </div>
      </div>
      <Modal
        open={Privacyopen}
        onClose={handlePrivacyClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] -translate-y-1/2 w-[calc(100%-50px)] max-w-[1200px] max-h-[80dvh] overflow-y-auto scroll-x-hidden rounded-[30px] outline-none">
          <PrivacyPopUp handleClose={handlePrivacyClose} />
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;

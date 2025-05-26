import React from "react";
import { FiShare2 } from "react-icons/fi";
import { Link } from "react-router";
import { TbUsersGroup } from "react-icons/tb";
import { BsGrid } from "react-icons/bs";
import VenueDetails from "../../components/VendorDashboard/VenueDetails";
import OfferAmenities from "../../components/VendorDashboard/OfferAmenities";
import OfferServices from "../../components/VendorDashboard/OfferServices";
import GuestInfoDetails from "../../components/VendorDashboard/GuestInfoDetails";
import ReviewsOverview from "../../components/VendorDashboard/ReviewsOverview";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function BookingDetails() {
  const addressdettails = [
    {
      title: "Street Address:",
      desc: "Tub Top",
    },
    {
      title: "City:",
      desc: "Pakistan,Sialkot",
    },
    {
      title: "State:",
      desc: "Sialkot",
    },
    {
      title: "Town:",
      desc: "City York",
    },
    {
      title: "Zip Code:",
      desc: "54,000",
    },
  ];
  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] rounded-[20px]">
      <div className="p-5 border-b flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Link to="/vendor-dashboard/Confirm-Bookings"><IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" /></Link>
        </div>
        <h2 className="text-[28px] leading-normal font-semibold">
          Booking Details
        </h2>
        <div className="flex items-center justify-end flex-wrap-reverse gap-4 ms-auto">
          <Link className="flex items-center border border-black rounded-[8px] font-medium py-2 px-4">
            <FiShare2 className="me-2" /> <span>100 People Share Venue</span>
          </Link>
          <Link className="flex items-center border border-black rounded-[8px] font-medium py-2 px-4">
            <TbUsersGroup className="me-2" />{" "}
            <span>100 People Favorites Venue</span>
          </Link>
          <Link className="flex items-center bg-white border border-black rounded-[8px] font-medium py-2 px-4 shadow-[0px_10px_20px_0px_#0000001A]">
            Create Invoice
          </Link>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between gap-4 flex-wrap">
          <h2 className="sm:text-[28px] text-xl leading-normal font-semibold">
            Venue Booking Details
          </h2>
          <div className="flex items-center justify-end gap-4 ms-auto flex-wrap">
            <div className="flex items-center">
              <p className="sm:text-[24px] me-2 font-semibold">Status:</p>
              <p className="sm:text-[20px] font-medium text-[#24D17A]">Booked</p>
            </div>
            <div>
              <Link className="flex items-center text-[#3551B6] border py-2 px-4 rounded-[8px] border-[#3551B6] text-xs font-semibold">
                <BsGrid className="me-2 text-black text-base" /> Show all photos
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <VenueDetails />
        </div>
        <div className="mt-5 border-b pb-4 border-[#D6D6D6]">
          <p className="sm:text-[24px] text-lg font-semibold">Address Details</p>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
            {addressdettails.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <p className="sm:text-[24px] font-semibold">{item.title}</p>
                <p className="sm:text-[20px] font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 border-b pb-5">
          <p className="sm:text-[24px] font-semibold">
            Offer Amenities and Services Details
          </p>
          <div className="mt-5">
            <OfferAmenities />
          </div>
          <div className="mt-5">
            <OfferServices />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <p className="text-[24px] font-semibold">
              Guest Information Details
            </p>
            <Link to="/vendor-inbox" className="py-4 px-5 text-white bg-black font-semibold rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] ms-auto">
              Jump to Inbox
            </Link>
          </div>
          <div className="mt-5 border-b pb-5">
            <GuestInfoDetails />
          </div>
        </div>
        <div className="mt-8">
          <ReviewsOverview />
        </div>
      </div>
    </div>
  );
}

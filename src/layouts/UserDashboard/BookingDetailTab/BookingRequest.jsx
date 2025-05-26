import React from "react";
import ImgList from "../../../assets/img/list-detail2.png";
import LikeButton from "../../../components/LandingPage/LikeButton";
import { FaStar } from "react-icons/fa";
import ProfileName from "../../../assets/img/profile-name.png";
import Profile from "../../../assets/img/profile.png";
import { Link } from "react-router";
import CancelBookingModal from "../../../components/UserDashboard/CancelBookingModal";

const BookingRequest = () => {
  const Data = [
    {
      id: 1,
      serviceName: "Service Name",
      status: "Booking Confirm",
      rating: 5.0,
      description: "Decoration Wedding...",
      vendorName: "requestpersonname",
      totalGuests: 243,
      verified: true,
    },
    {
      id: 2,
      serviceName: "Service Name",
      status: "Booking Confirm",
      rating: 5.0,
      description: "Decoration Wedding...",
      vendorName: "requestpersonname",
      totalGuests: 243,
      verified: true,
    },
  ];
  return (
    <div>
      <div className="grid xl:grid-cols-2 gap-4">
        {Data.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-white rounded-xl grid lg:grid-cols-2 gap-4"
          >
            <div className="relative">
              <img src={ImgList} alt="" className="h-full w-full" />
              {item.verified && (
                <div className="absolute top-2 left-3">
                  <p className="text-[#1C1C1C] text-xs font-medium bg-white p-2 rounded-md">
                    Verified listing
                  </p>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <LikeButton />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <h5 className="font-medium text-base">
                      {item.serviceName}
                    </h5>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-base">Status:</h5>
                      <p className="text-[#34A853] text-sm font-medium">
                        {item.status}
                      </p>
                      <FaStar className="text-[#FF9900]" />
                      <p>{item.rating}</p>
                    </div>
                  </div>
                </div>
                <p className="text-[#484848] font-medium text-sm">
                  {item.description}
                </p>
                <div>
                  <h5 className="font-medium text-base">Vendor Profile</h5>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="relative">
                      <img
                        src={Profile}
                        alt=""
                        className="w-20 h-20 object-cover rounded-full"
                      />
                      <div className="absolute bottom-0 right-0">
                        <img src={ProfileName} alt="" />
                      </div>
                    </div>
                    <div>
                      <h6 className="text-sm">{item.vendorName}</h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <h4 className="text-base font-medium">Total Guests:</h4>
                    <p className="text-[#484848] text-sm font-medium">
                      {item.totalGuests}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <Link
                    to="/user-inbox"
                    className="bg-[#000] border border-black text-white py-2 w-full inline-block text-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                  >
                    Jump to Inbox
                  </Link>
                </div>
                <div>
                  <CancelBookingModal />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequest;

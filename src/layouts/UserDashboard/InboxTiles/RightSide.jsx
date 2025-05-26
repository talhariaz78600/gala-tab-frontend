import React from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import ListDetail from "../../../assets/img/list-detail2.png";
import { Link } from "react-router";
import Profile from "../../../assets/img/profile.png";
import { PiUsersThree } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";

const RightSide = () => {
  return (
    <div>
      <div className="bg-white shadow rounded-xl">
        <div className="p-3 flex justify-between">
          <div className="flex items-center gap-2">
            <div>
              <img
                src={ListDetail}
                alt=""
                className="w-14 h-14 object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-[#484848] font-medium text-sm">Decoration</p>
            </div>
          </div>
          <div>
            <Link to="#">
              <LuSquareArrowOutUpRight />
            </Link>
          </div>
        </div>
        <div className="grid min-[430px]:grid-cols-2 gap-3 border-t p-3">
          <div>
            <h6 className="font-semibold text-base">Total Booking</h6>
            <p className="text-[#34A853] text-base font-medium">
              08 / this month
            </p>
          </div>{" "}
          <div>
            <h6 className="font-semibold text-base">Status</h6>
            <p className="text-[#34A853] text-base font-medium">Available</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-xl mt-3">
        <div className="flex flex-wrap items-center justify-between p-3 gap-2">
          <div>
            <h6 className="text-lg font-semibold">Booking Details</h6>
          </div>
          <div className="flex ms-auto items-center gap-2">
            <p className="text-[#3551B6] font-medium text-sm">Go Calendar </p>
            <Link to="#">
              <LuSquareArrowOutUpRight className="text-[#3551B6]" />
            </Link>
          </div>
        </div>
        <div className="grid min-[430px]:grid-cols-2 gap-3 p-3">
          <div>
            <h6 className="font-semibold text-base">Vendor Name</h6>
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={Profile}
                  alt=""
                  className="size-8 max-w-8 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">requestperson.....</p>
              </div>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-base">Total Guest</h6>
            <div className="flex items-center gap-2">
              <div>
                <PiUsersThree />
              </div>
              <div>
                <p className="font-medium text-sm">211</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid min-[430px]:grid-cols-2 gap-3 p-3">
          <div>
            <h6 className="font-semibold text-base">Total Time</h6>
            <div className="flex items-center gap-2">
              <div>
                <FaRegClock />
              </div>
              <div>
                <p className="font-medium text-sm">4hr min</p>
              </div>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-base">Price</h6>
            <div className="flex items-center gap-2">
              <div>
                <FiDollarSign />
              </div>
              <div>
                <p className="font-medium text-sm">$657</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid min-[430px]:grid-cols-2 gap-3 p-3">
          <div>
            <h6 className="font-semibold text-base">Check-In Date</h6>
            <p className="text-[#34A853] text-base font-medium">11/13/2024</p>
          </div>{" "}
          <div>
            <h6 className="font-semibold text-base">Time Duration</h6>
            <p className="text-[#34A853] text-base font-medium">
              09:00AM to 04:00PM
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg mt-3 shadow-lg p-3">
          <div className="flex items-center justify-between gap-2 border-b pb-3">
              <div>
                  <h4 className="font-semibold text-lg">Chat Members</h4>
              </div>
              <div>
                <Link to='#' className="bg-black text-white py-2 px-5 rounded-lg">Add Users</Link>
              </div>
          </div>
          <div className="mt-3">
            <p className="font-semibold text-sm">Total Exciting Users</p>
            <div>
            <div className="flex items-center gap-2">
              <div>
                <PiUsersThree />
              </div>
              <div>
                <p className="font-medium text-sm">211</p>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default RightSide;

import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import PhoneIcon from "../../assets/img/phone-icon-black.png";
import { Link, useNavigate } from "react-router";
import { FiChevronRight } from "react-icons/fi";

export default function SearchTips({ data }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-3 gap-y-10 sm:mt-12 mb-5 sm:ps-5">
      <div>
        <div className="text-center md:text-start">
          <h3 className="lg:text-4xl text-[#1C1C1C] font-semibold sm:text-3xl">
            {data?.name || "N/A"}
          </h3>
          <p className="mt-3 font-medium sm:text-lg text-[#1C1C1C]">
            Browse our full library of topics.
          </p>
          <Link
            to={"/alltopics"}
            className="mt-7 py-3 px-10 font-medium text-lg sm:text-xl bg-black text-white rounded-md inline-block"
          >
            Browse all topics
          </Link>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <div className="bg-white p-4 max-w-[370px] border border-[#EBEBEB] shadow-[0px_20px_34px_0px_#0000000F] rounded-2xl">
          <img src={PhoneIcon} alt="img" />
          <p className="font-semibold text-xl sm:text-2xl mt-4 text-[#1C1C1C]">
            Need to get in touch?
          </p>
          <p className="sm:text-lg mt-4 text-[#1C1C1C]">
            We’ll start with some questions and get you to the right place.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-[#1C1C1C] text-white py-3 px-8 font-medium sm:text-[medium] inline-block shadow-[0px_18px_20px_0px_#0000001A] mt-4 rounded-md"
          >
            Contact Us
          </button>
          <p className="mt-5 sm:text-lg text-[#1C1C1C]">
            You can also  give us feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

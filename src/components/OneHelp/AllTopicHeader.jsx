import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import HeaderImg from "../../assets/img/all-topic-header-img.png";

export default function AllTopicHeader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-3 gap-y-10 mt-12 mb-5 sm:ps-5">
      <div>
        <div className="text-center md:text-start">
          <h3 className="text-3xl text-[#1C1C1C] font-semibold sm:text-4xl ">
            All topics
          </h3>
          <p className="mt-7 sm:text-lg text-[#1C1C1C] ">
            Browse our full library of help topics.
          </p>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <div className="max-w-[370px]">
          <img
            className="w-full h-full object-contain"
            src={HeaderImg}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

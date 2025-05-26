import React from "react";
import { Link } from "react-router";

export default function InThisArticle() {
  const thisArticalList = [
    "Search by Vendors",
    "Search by date range and Time duration",
    "Search by date range and Time duration",
    "Search by date range and Time duration",
    "Search by date range and Time duration",
    "Search by date range and Time duration",
    "Search by date range and Time duration",
    "Search by date range and Time duration",
  ];
  return (
    <div className="text-white">
      <h3 className="text-[30px] sm:text-[40px] lg:text-[50px] font-semibold text-center sm:text-start">
        In this article
      </h3>
      <div className="flex flex-wrap mt-8 mx-[-16px]">
        <div className="w-full lg:w-1/3 py-6 px-4">
          <div className="flex flex-col max-w-[380px] mx-auto sm:mx-0 text-center sm:text-start">
            <p className="text-2xl sm:text-[30px] md:text-[40px] font-semibold leading-normal">
              Need to get in touch?
            </p>
            <p className="text-lg mt-8 md:text-2xl">
              We’ll start with some questions and get you to the right place.
            </p>
            <div className="mt-8">
              <Link className="bg-white text-[#1C1C1C] sm:text-lg font-medium py-3 px-16 rounded-[7px] inline-block">
                Contact Us
              </Link>
            </div>
            <p className="mt-8 sm:text-lg">
              You can also <Link to="#" className="font-bold underline">give us feedback.</Link>
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/3 py-6 px-4">
          <div className="grid md:grid-cols-2 gap-4 mx-auto max-w-[800px]">
            {thisArticalList.map((item, index) => (
              <div
                key={index}
                className="border border-[#464646] rounded-[10px] p-6 hover:bg-[#2A2A2A]"
              >
                <Link className="sm:text-lg border-b border-b-gray-100">{item}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

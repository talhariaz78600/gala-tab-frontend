import React from "react";
import HeaderBase from "../../assets/img/header-base.png";
import { IoIosSearch } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import HappyCustomer from "../../assets/img/happy-customer.png";
import Shoot from "../../assets/img/shoot.png";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import StudioOne from "../../assets/img/studio-1.png";
import StudioTwo from "../../assets/img/studio-2.png";
import StudioThree from "../../assets/img/studio-3.png";
import StudioFour from "../../assets/img/studio-4.png";
import PhotoShoot from "../../components/LandingPage/PhotoShoot";
import { FaStar } from "react-icons/fa6";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import FaqsSection from "../../components/LandingPage/FaqsSection";
import Review from "../../components/Country/Review";
import GatewayTabs from "../../components/Country/GatewayTabs";
import Pagination from "../../components/LandingPage/Pagination";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "#9A9A9A",
  width: "100%",
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#FF9900",
  },
}));

const CountryBase = () => {
  const faqData = [
    {
      question: "How much does a photo studio cost to rent in Dallas?",
      answer:
        "Photo Studios in Dallas average $105 per hour to rent, but it's easy to spend less or more depending on what you're looking for.",
    },
    {
      question: "What is the best time to rent a photo studio?",
      answer:
        "The best time to rent a photo studio depends on your availability, but weekdays typically have lower rates compared to weekends.",
    },
    {
      question: "How long can I rent a photo studio?",
      answer:
        "Photo studio rental periods vary, but most studios offer hourly rates with a minimum of 2 hours. Some also offer half-day or full-day rentals.",
    },
  ];
  return (
    <div>
      <div className="py-20 bg-white">
        <div className="mycontainer">
          <div className="grid lg:grid-cols-2 xl:gap-12 gap-3 py-14">
            <div>
              <h3 className="font-bold xl:text-6xl text-4xl text-[#171717]">
                Rent a photo studio in United States
              </h3>
              <p className="mt-3 xl:text-lg text-sm">
                Discover thousands of unique photo studios for rent perfect for
                your next film or photo shoot.
              </p>
              <div className="py-3 px-3 rounded-xl border bg-white flex items-center mt-4 shadow-md">
                <IoIosSearch className="text-4xl pe-3 border-r" />
                <input
                  type="text"
                  className="px-3 font-medium"
                  defaultValue="Photo Studio"
                  placeholder="Photo Studio"
                />
              </div>
              <div className="py-3 px-3 rounded-xl border bg-white flex items-center mt-4 shadow-md">
                <CiLocationOn className="text-4xl pe-3 border-r" />
                <input
                  type="text"
                  className="px-3 font-medium"
                  defaultValue="United States"
                  placeholder="United States"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <div className="flex items-center bg-white shadow-xl rounded-xl p-2">
                  <div>
                    <img src={HappyCustomer} alt="" />
                  </div>
                  <div className="ps-2">
                    <h4 className="font-semibold text-xl">500+</h4>
                    <p className="font-medium text-[#818181]">
                      Happy Customers
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-white shadow-xl rounded-xl p-2">
                  <div>
                    <img src={Shoot} alt="" />
                  </div>
                  <div className="ps-2">
                    <h4 className="font-semibold text-xl">1000+</h4>
                    <p className="font-medium text-[#818181]">
                      Ready For Your Shoot
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:block hidden">
              <img
                src={HeaderBase}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F7] py-20">
        <div className="mycontainer">
          <div className="bg-white border shadow-xl py-2 px-4 rounded-lg flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <Link to="" className="inline-block font-medium text-lg">
                  Home
                </Link>
              </div>
              <div>
                <FiChevronRight />
              </div>
              <div>
                <Link to="" className="inline-block font-medium text-lg">
                  Locations
                </Link>
              </div>
              <div>
                <FiChevronRight />
              </div>
              <div>
                <Link to="" className="inline-block font-medium text-lg">
                  City address here
                </Link>
              </div>
              <div>
                <FiChevronRight />
              </div>
              <div>
                <Link
                  to=""
                  className="inline-block font-medium text-lg text-[#3551B6]"
                >
                  Photo studio
                </Link>
              </div>
            </div>
            <div className="">
              <select
                name=""
                id=""
                className="border p-2 focus-none rounded-lg font-medium"
              >
                <option value="">Photo Studios</option>
                <option value="">Events</option>
                <option value="">Parties</option>
                <option value="">Conference Rooms</option>
                <option value="">Dance Studios</option>
                <option value="">Corporate Events</option>
                <option value="">Rooftops</option>
                <option value="">Recording Studios</option>
                <option value="">Film Studios</option>
                <option value="">Meeting</option>
                <option value="">Video Shoot</option>
                <option value="">Baby Shower</option>
                <option value="">Workshop</option>
                <option value="">Wedding Reception</option>
                <option value="">Live Music</option>
                <option value="">Bridal Shower</option>
                <option value="">Engagement party</option>
                <option value="">Graduation party</option>
                <option value="">Film Shoot</option>
              </select>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-12 pt-8">
            <div>
              <h3 className="text-4xl font-semibold">
                Rent a photo studio in United States
              </h3>
              <p className="text-lg mt-4">
                Event Hub is the easiest way to book unique spaces for photo
                shoots. We also have spaces for meetings and events.
              </p>
              <div className="mt-7">
                <button className="bg-[#1C1C1C] text-white font-medium py-2 px-7 rounded-lg shadow-xl">
                  Discover space near me
                </button>
              </div>
            </div>
            <div className="lg:col-start-2 lg:col-end-4">
              <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 lg:gap-2 xl:gap-1">
                <div className="xl:px-3">
                  <div className="bg-[#1C1C1C] p-4 rounded-[35px] h-full">
                    <div className="bg-white p-2 rounded-[25px] h-36 flex flex-col justify-center">
                      <img src={StudioOne} alt="" className="mx-auto " />
                    </div>
                    <div className="mt-6">
                      <h2 className="font-bold text-4xl text-white">50</h2>
                      <p className="text-lg text-white pe-13 mt-5 font-medium">
                        Countries Eventhub Operates in
                      </p>
                    </div>
                  </div>
                </div>
                <div className="xl:px-3">
                  <div className="bg-[#1C1C1C] p-4 rounded-[35px] h-full">
                    <div className="bg-white p-2 rounded-[25px] h-36 flex flex-col justify-center">
                      <img src={StudioTwo} alt="" className="mx-auto " />
                    </div>
                    <div className="mt-6">
                      <h2 className="font-bold text-4xl text-white">50</h2>
                      <p className="text-lg text-white pe-13 mt-5 font-medium">
                        Number of Complete Projects.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="xl:px-3">
                  <div className="bg-[#1C1C1C] p-4 rounded-[35px] h-full">
                    <div className="bg-white p-2 rounded-[25px] h-36 flex flex-col justify-center">
                      <img src={StudioThree} alt="" className="mx-auto " />
                    </div>
                    <div className="mt-6">
                      <h2 className="font-bold text-4xl text-white">50</h2>
                      <p className="text-lg text-white pe-13 mt-5 font-medium">
                        Bookings Per Month
                      </p>
                    </div>
                  </div>
                </div>
                <div className="xl:px-3">
                  <div className="bg-[#1C1C1C] p-4 rounded-[35px] h-full">
                    <div className="bg-white p-2 rounded-[25px] h-36 flex flex-col justify-center">
                      <img src={StudioFour} alt="" className="mx-auto " />
                    </div>
                    <div className="mt-6">
                      <h2 className="font-bold text-4xl text-white">50</h2>
                      <p className="text-lg text-white pe-13 mt-5 font-medium">
                        Preferred Partners
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <div className="pt-20">
          <h4 className="font-bold text-4xl">Popular photo shoot locations</h4>
          <PhotoShoot />
        </div>
        <div className="mt-10">
          <Pagination />
        </div>
      </div>
      <div className="mycontainer">
        <div className="rounded-2xl justify-center items-center mx-auto pt-20">
          <FaqsSection faqData={faqData} />
        </div>
      </div>
      <div className="mycontainer">
        <div className="py-20">
          <h4 className="sm:text-4xl text-2xl font-bold">
            Reviews for photo studios
          </h4>
          <div className="">
            <div className="flex items-center gap-2 mt-6">
              <p className="text-[#484848] font-semibold">Reviews</p>
              <p className="text-[#484848] font-semibold flex items-center gap-2">
                <FaStar className="text-yellow-600" />
                5.0
              </p>
            </div>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 md:gap-12 gap-3 mt-5">
              <div>
                <div className="sm:flex items-center gap-4">
                  <div className="w-full">
                    <p className="text-[#484848] font-semibold me-9">
                      Amenities
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <BorderLinearProgress variant="determinate" value={50} />
                    <p className="text-[#484848] font-semibold">5.0</p>
                  </div>
                </div>
                <div className="sm:flex items-center gap-4 mt-2">
                  <div className="w-full">
                    <p className="text-[#484848] font-semibold me-9">
                      Communication
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <BorderLinearProgress variant="determinate" value={50} />
                    <p className="text-[#484848] font-semibold">5.0</p>
                  </div>
                </div>
                <div className="sm:flex items-center gap-4 mt-2">
                  <div className="w-full">
                    <p className="text-[#484848] font-semibold me-9">
                      Value for Money
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <BorderLinearProgress variant="determinate" value={50} />
                    <p className="text-[#484848] font-semibold">5.0</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="sm:flex items-center gap-4">
                  <div className="w-full">
                    <p className="text-[#484848] font-semibold me-9">Hygiene</p>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <BorderLinearProgress variant="determinate" value={50} />
                    <p className="text-[#484848] font-semibold">5.0</p>
                  </div>
                </div>
                <div className="sm:flex items-center gap-4 mt-2">
                  <div className="w-full">
                    <p className="text-[#484848] font-semibold me-9">
                      Location of Photo Studios
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <BorderLinearProgress variant="determinate" value={50} />
                    <p className="text-[#484848] font-semibold">5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Review />
            <div className="text-start mt-9">
              <button className="text-lg font-medium text-white bg-[#1C1C1C] px-12 py-2 rounded-lg shadow-lg">
              See All 100+ views
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-14">
        <div className="mycontainer">
          <GatewayTabs />
        </div>
      </div>
    </div>
  );
};
export default CountryBase;

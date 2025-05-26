import React from "react";
import { IoArrowUp } from "react-icons/io5";
import EventsSlider from "./EventsSlider";
import LanguageButton from "../../../components/LandingPage/LanguageButton";

function TabFilter() {
  return (
    <>
      <div className="py-12">
        <div className="mycontainer">
          <div className="flex flex-wrap justify-between mt-8 items-center rounded-lg">
            {/* Left Text Section */}
            <div className="xl:w-1/2 ">
              <div className="flex flex-col sm:flex-row items-center max-w-[746px] ms-auto p-3 ps-5">
                <div>
                  <p className="text-[30px] sm:text-[40px] md:text-[50px]">
                    Together, let's make you event unforgettable! with a
                    <span className="text-[#757575] dark:text-white ms-2 me-2">
                      ultimate party
                    </span>
                    experience!
                  </p>
                </div>

                {/* Middle View All Button */}
                <div className="mx-8 mt-8 sm:mt-0">
                  <button
                    className="relative w-20 h-20 flex flex-col justify-center items-center text-black transition"
                    style={{
                      background: "white",
                      borderTop: "1px solid #828282",
                      borderRight: "1px solid #828282",
                      borderBottom: "none",
                      borderLeft: "1px solid #828282",
                      borderRadius: "50%",
                      transform: "rotate(40deg)",
                    }}
                    onClick={() => onTabChange(tabs[0].name)}
                  >
                    {/* Icon */}
                    <IoArrowUp size={24} className="" />
                    {/* Text */}
                    <span className="mb-3">View All</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full ms-auto ps-3">
              <div className="bg-black pb-[80px] pt-6 px-6 rounded-[40px]">
                <EventsSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabFilter;

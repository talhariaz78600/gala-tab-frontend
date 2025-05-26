import React from "react";
import FaqsSection from "../../components/LandingPage/FaqsSection";
import ContactImage from "../../assets/img/faq.png";
import HappyCustomer from "../../assets/img/happy-customer.png";
import Shoot from "../../assets/img/shoot.png";
import searchIcon from "../../assets/img/searchIcon.png";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import TestimonialsCard from "./LandingPageComponent/TestimonialsCard";
import { useGetAllfaqsListQuery } from "@/api/apiSlice";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";

function FAQs() {
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const { data, isLoading } = useGetAllfaqsListQuery({
    faqType: "landing",
    search: delayedSearch,
  });

  return (
    <div>
      <div className="bg-[#F5F5F5]">
        <div className="mycontainer">
          <div className="grid lg:grid-cols-2 xl:gap-12 gap-3">
            <div className="flex flex-col justify-center items-center md:items-start  pt-10">
              <h3 className="text-3xl sm:text-5xl xl:text-6xl text-black  font-semibold ">
                We've got answers!
              </h3>
              <p className="xl:text-lg text-sm mt-9 text-black">
                Read the frequently asked questions to make an informed
                decision!
              </p>
              <div className="py-3 pl-6 pr-3 rounded-full border bg-white flex items-center mt-8 shadow-md w-full max-w-lg">
                <input
                  type="text"
                  className="flex-grow px-3 text-black font-medium outline-none border-l "
                  placeholder="Search FAQ question here 🙋"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <img src={searchIcon} className="text-4xl ps-3 " />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-9 w-full max-w-lg">
                <div className="flex items-center bg-white shadow-xl rounded-xl p-2">
                  <div>
                    <img src={HappyCustomer} alt="" />
                  </div>
                  <div className="ps-2">
                    <h4 className="font-semibold text-xl text-black">500+</h4>
                    <p className="font-medium text-[#818181]">
                      Happy Customers
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-white shadow-xl rounded-xl p-2">
                  <div>
                    <img src={Shoot} alt="" className="" />
                  </div>
                  <div className="ps-2">
                    <h4 className="font-semibold text-xl text-black">1000+</h4>
                    <p className="font-medium text-[#818181]">
                      Ready For Your Shoot
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center flex md:justify-end pt-10">
              <img
                src={ContactImage}
                alt=""
                className="w-full max-w-md md:max-w-lg mt-[30px] md:mt-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <div className=" ms-8 flex justify-start items-center ps-5">
          <p className="text-3xl md:text-5xl font-semibold mt-20">
            About Gala Tab
          </p>
        </div>

        <div className="rounded-2xl justify-center items-center mx-auto mt-10">
          <FaqsSection faqData={data?.data} />
        </div>
      </div>
      <div className="mycontainer">
        <div className="mt-20 mb-10">
          <p className="text-3xl md:text-5xl font-semibold">
            Client's Testimonials
          </p>
          <TestimonialsCard />
        </div>
      </div>
    </div>
  );
}

export default FAQs;

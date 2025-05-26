import React from "react";
import VendorImg from "../../../assets/img/vendor-img.png";
import PLayBtn from "../../../assets/img/Play-Btn.png";
import { useNavigate } from "react-router";

const VendorWelcome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center mycontainer px-6 py-12 rounded-lg">
      <div className="lg:w-1/2">
        <div className="max-w-[550px] mx-auto sm:mx-0 text-center sm:text-start">
          <p className="text-[28px] dark:text-white sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[65px] leading-[1.1] font-bold text-[#1C1C1C]">
            Welcome Gala Tab Earn Income as a Vendor
          </p>
          <p className="sm:text-[18px] dark:text-white font-medium text-[#171717] mt-6">
            Put your space to work.
          </p>
          <p className="sm:text-[18px] dark:text-white text-[#171717] mt-6">
            Earn extra income by opening your doors to personal and professional
            <br /> gatherings in your area.
          </p>
          <button
            onClick={() => handleNavigation("/auth/welcome")}
            className="px-6 py-3 bg-black sm:text-[18px] font-medium shadow-[0px_11.72px_20px_0px_#00000024] text-white rounded-lg mt-10"
          >
            List your space
          </button>
        </div>
      </div>

      {/* Right Video Card */}
      <div>
        <div className="max-w-[450px] mx-auto mt-12 lg:mt-0">
          <div className="bg-white shadow-[0px_0px_40px_0px_#5E5E5E1A] border border-[#E7E7E7] rounded-[20px] p-4">
            <div className="relative rounded-[15px] overflow-hidden aspect-[1.7/1]">
              {/* Video Thumbnail */}
              <img
                src={VendorImg}
                alt="Video Placeholder"
                className="object-cover h-full w-full rounded-lg"
              />
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center backdrop-brightness-[0.8]">
                <button className="bg-white rounded-full flex items-center justify-center">
                  <img className="rounded-full" src={PLayBtn} alt="img" />
                </button>
              </div>
            </div>
            {/* Testimonial */}
            <p className="sm:text-[24px] mt-4 font-semibold text-[#18181B] leading-tight">
              "I can’t tell how easy it was to Create your account as a Vendor"
            </p>
            <p className="font-bold mt-3 text-[#12141D] ">John Alex</p>
            <p className="text[#171717]">Cofounder at Event Hub</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorWelcome;

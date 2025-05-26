import React from "react";
import { FaCircle } from "react-icons/fa";
import image from "../../assets/img/FooterImage.png";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer bg-[#1c1c1c] text-white py-10 bottom-0 w-full">
      <div className="mycontainer">
        <div className="px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10 py-10">
            <div className="space-y-5">
              <h3 className="text-[18px] sm:text-[20px] font-medium">
                Vendors
              </h3>
              <ul className="sm:text-[18px] text-[#D6D6D6] space-y-2 cursor-pointer">
                <li onClick={() => handleNavigation("/")}>All Vendor's</li>
                <li onClick={() => handleNavigation("/")}>All Venue's</li>
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-[18px] sm:text-[20px] font-medium">
                Company
              </h3>
              <ul className="sm:text-[18px] text-[#D6D6D6] space-y-2">
                <li
                  className="cursor-pointer"
                  onClick={() => handleNavigation("/about")}
                >
                  About
                </li>
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-[18px] sm:text-[20px] font-medium">
                Support
              </h3>
              <ul className="sm:text-[18px] text-[#D6D6D6] space-y-2">
                <li
                  className="cursor-pointer"
                  onClick={() => handleNavigation("/help")}
                >
                  Help Center
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => handleNavigation("/faqs")}
                >
                  FAQs
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] sm:text-[20px] font-medium">
                Contact Us
              </h3>
              <ul className="sm:text-[18px] text-[#D6D6D6] space-y-2">
                <li
                  className="cursor-pointer"
                  onClick={() => handleNavigation("/contact")}
                >
                  Email
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-full bg-[#9c9d9d] p-[1px] mt-20"></div>
          <div className="flex justify-center items-center gap-3 text-center sm:text-[18px] mt-4">
            <div className="flex text-[#9C9D9D] underline items-center gap-1">
              <p>English (US)</p>
              <FaCircle size={5} className="text-[#9c9d9d]" />
              <p>Your Privacy Choices</p>
            </div>
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoGlobeOutline } from "react-icons/io5";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Toggle icons
import { Modal } from "@mui/material";
import LanguageTabs from "./LanguageTabs";
import { useSelector } from "react-redux";
import { currentUser } from "@/store/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to toggle Navbar
  const location = useLocation(); // Get current location

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const user = useSelector(currentUser);

  const [Langopen, setLangOpen] = React.useState(false);

  const handleLangOpen = () => setLangOpen(true);
  const handleLangClose = () => setLangOpen(false);

  let backgroundClass = "bg-white dark:bg-gray-600"; // Default background

  if (location.pathname === "/about") {
    backgroundClass = "bg-[#F5F5F5]";
  } else if (location.pathname === "/faqs") {
    backgroundClass = "bg-[#F5F5F5]";
  } else if (location.pathname === "/contact") {
    backgroundClass = "bg-[#f7f7f7]";
  } else if (location.pathname === "/help") {
    backgroundClass = "bg-[#f7f7f7]";
  } else if (location.pathname === "/alltopics") {
    backgroundClass = "bg-[#f7f7f7]";
  } else if (location.pathname === "/onehelp") {
    backgroundClass = "bg-[#f7f7f7]";
  } else if (location.pathname === "/maps") {
    backgroundClass = "bg-transparent";
  }

  return (
    <div className={`${backgroundClass} py-5`}>
      <div className="mycontainer">
        <div className="border rounded-[10px] shadow-md bg-white dark:bg-gray-800">
          {/* Header Section */}
          <div className="flex justify-between items-center p-3">
            <div className="flex md:w-1/2 items-center">
              {/* Logo */}
              <Link
                to="/"
                className="bg-gradient-to-b from-gray-400 to-gray-800 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
              >
                Gala Tab
              </Link>
              {/* <div className="hidden md:flex mx-4 w-full">
                <div className="border w-full flex items-center py-4 px-3 rounded-full shadow-[0px_14px_30px_0px_rgba(131,131,131,0.05)] h-100">
                  <CiSearch className="text-lg" />
                  <input
                    className="focus:outline-none w-full text-sm ps-2 placeholder:font-light placeholder:text-[#C5C5C6] placeholder:text-[16px]"
                    placeholder="Search by keyword"
                    type="search"
                    name="headersearch"
                    id="headersearch"
                  />
                </div>
              </div> */}
            </div>

            {/* Toggle Button: Visible only on `md` and below */}
            <div className="md:hidden flex items-center text-black text-2xl">
              {/* <div className="relative mx-2">
                <Link to="/cart" className="mx-3">
                  <IoCartOutline className="text-[20px] sm:text-[24px]" />
                </Link>
                <div className="absolute top-6 -right-2">
                  <p className="bg-black text-white text-xs rounded-full px-1">
                    0
                  </p>
                </div>
              </div> */}
              <div>
                <button onClick={handleLangOpen} className="mx-2">
                  <IoGlobeOutline className="text-[20px] sm:text-[24px]" />
                </button>
              </div>
              <button className="ms-2" onClick={toggleNavbar}>
                {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>

            {/* Desktop View: Always Visible */}
            <div className="hidden md:flex items-center">
              {/* <div className="relative">
                <Link to="/cart" className="mx-3">
                  <IoCartOutline className="text-[20px] sm:text-[24px]" />
                </Link>
                <div className="absolute top-4 -right-2">
                  <p className="bg-black text-white text-xs rounded-full px-1">
                    0
                  </p>
                </div>
              </div> */}
              <button onClick={handleLangOpen} className="mx-3">
                <IoGlobeOutline className="text-[20px] sm:text-[24px]" />
              </button>
              {user.isAuthenticated ? (
                <button
                  onClick={() => {
                    navigate(
                      user.userType === "vendor"
                        ? "/vendor-dashboard/dashboard"
                        : user.userType === "customer"
                        ? "/user-dashboard/dashboard"
                        : "/admin-dashboard/dashboard"
                    );
                  }}
                  className="rounded-md text-xs sm:text-[18px] leading-normal shadow-[0px_16px_24px_0px_rgba(0,0,0,0.2)] bg-[#000] text-white border border-[#000] px-4 sm:px-6 py-3 ms-2"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/auth/welcome/login"
                    className="rounded-md text-xs sm:text-[18px] leading-normal bg-[#E7E7E7] dark:bg-gray-800 border border-[#D4D7E3] px-4 sm:px-6 py-3 mx-3"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth/welcome"
                    className="rounded-md text-xs sm:text-[18px] leading-normal shadow-[0px_16px_24px_0px_rgba(0,0,0,0.2)] bg-[#000] text-white border border-[#000] px-4 sm:px-6 py-3 ms-2"
                  >
                    Sign Up
                  </Link>{" "}
                </>
              )}
            </div>
          </div>

          <div
            className={`${isOpen ? "block" : "hidden"} md:hidden p-3 border-t`}
          >
            {/* Icons Row */}
            <div className="flex justify-center mt-4">
              <Link className="rounded-md leading-normal bg-[#E7E7E7] border border-[#D4D7E3] px-6 py-3 mx-2">
                Log In
              </Link>
              <Link className="rounded-md leading-normal bg-[#000] text-white border border-[#000] px-6 py-3 ms-2">
                Sign Up
              </Link>
            </div>

            {/* Search Bar */}
            <div className="border flex items-center mt-4 mb-2 py-2 px-3 rounded-full shadow-md">
              <CiSearch />
              <input
                className="focus:outline-none w-full ps-2 placeholder:text-[#C5C5C6]"
                placeholder="Search by keyword"
                type="search"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={Langopen}
        onClose={handleLangClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] -translate-y-1/2 w-[calc(100%-50px)] max-w-[1200px] max-h-[80dvh]">
          <LanguageTabs />
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;

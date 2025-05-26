import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router";

const WelcomeMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-5 md:h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-lg mx-auto px-5">
        <div className="w-full border rounded-xl shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div></div>
            <div>
              <h2 className="font-semibold sm:text-2xl text-lg">
                Create your account
              </h2>
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <IoCloseCircle className="text-3xl text-slate-400" />
            </div>
          </div>
          <div className="md:px-20 sm:px-14 xs:px-5 px-3">
            <h2 className="xl:text-6xl md:text-5xl text-2xl font-semibold text-[#1C1C1C] dark:text-white text-center mb-3 mt-5">
              Gala Tab
            </h2>
            <p className="text-center xl:text-2xl md:text-lg my-8 text-[#313957] dark:text-white">
              Woohoo! You’re on your way to saving time and money. Let's get
              started and make property management a breeze!
            </p>
          </div>
          <div className="my-9 max-w-screen-sm mx-auto px-9">
            <Link
              to="/auth/welcome/role"
              className="font-medium text-white bg-[#1C1C1C] drop-shadow-2xl w-full block text-center py-3 rounded-lg"
            >
              Continue
            </Link>
          </div>
          <div className="py-5 bg-[#E7E7E9] dark:bg-gray-800 rounded-b-lg">
            <p className="text-center font-medium xs:text-sm text-xs">
              Designed By Fabulous Technology Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;

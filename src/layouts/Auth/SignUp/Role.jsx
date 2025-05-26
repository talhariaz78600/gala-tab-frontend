import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import Customer from "../../../assets/img/customer.png";
import Vendor from "../../../assets/img/vendor.png";
import { Link, useNavigate } from "react-router-dom";

const Role = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "customer") {
      navigate("/auth/welcome/signup", { state: { role: selectedRole } });
    } else if (selectedRole === "vendor") {
      navigate("/auth/welcome/signup", { state: { role: selectedRole } });
    } else {
      alert("Please select a role to continue.");
    }
  };

  return (
    <div className="py-5 md:h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-lg mx-auto px-5">
        <div className="w-full border rounded-xl shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between border-b p-4">
            <div></div>
            <div>
              <h2 className="font-semibold sm:text-2xl text-lg">
                Select Your Role
              </h2>
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <IoCloseCircle className="text-3xl text-slate-400" />
            </div>
          </div>
          <div className="md:px-20 sm:px-14 xs:px-5 px-3 sm:mt-16 mt-6">
            <h2 className="xl:text-6xl md:text-5xl text-4xl font-semibold text-gray-900 dark:text-white text-center mb-3">
              Gala Tab
            </h2>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center gap-6 mt-9 px-3">
            <div
              className={`sm:w-64 w-56 min-h-20 h-full px-2 py-5 rounded-3xl transition 
  bg-gray-200 dark:bg-gray-800 
  ${
    selectedRole === "customer"
      ? "border-black dark:border-white"
      : "border-[#CDCDCD] dark:border-gray-600"
  } border-2`}
            >
              <label
                htmlFor="customer"
                className="mx-auto cursor-pointer"
                onClick={() => handleRoleChange("customer")}
              >
                <div>
                  <img
                    src={Customer}
                    alt="Customer"
                    className="mx-auto mr-5 sm:w-50 w-40"
                  />
                </div>
                <p className="text-center mt-4 text-2xl text-[#1C1C1C] dark:text-white font-semibold">
                  Customer
                </p>
              </label>
              <input
                type="radio"
                id="customer"
                className="hidden"
                name="gala-role"
              />
            </div>
            <div
              className={`sm:w-64 w-56 min-h-20 h-full px-2 py-5 rounded-3xl transition 
  bg-gray-200 dark:bg-gray-800 
  ${
    selectedRole === "vendor"
      ? "border-black dark:border-white"
      : "border-[#CDCDCD] dark:border-gray-600"
  } border-2`}
            >
              <label
                htmlFor="vendor"
                onClick={() => handleRoleChange("vendor")}
                className="cursor-pointer"
              >
                <div>
                  <img
                    src={Vendor}
                    alt="Vendor"
                    className="mx-auto sm:w-50 w-28"
                  />
                </div>
                <p className="text-center mt-4 text-2xl text-[#1C1C1C] dark:text-white font-semibold">
                  Vendor
                </p>
              </label>
              <input
                type="radio"
                id="vendor"
                className="hidden"
                name="gala-role"
              />
            </div>
          </div>
          <div className="my-12 max-w-screen-sm mx-auto px-9">
            <button
              onClick={handleContinue}
              className="font-medium text-white bg-[#1C1C1C] drop-shadow-[0px 16px 24px 0px #00000033] w-full block text-center py-3 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;

import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PayoneerStepper from "../../components/VendorDashboard/payoneerStepper/PayoneerStepper";

export default function PayoneerCardSetup() {
  return (
    <div>
      <div className="bg-[#F7F7F7]">
        <div className="mycontainer">
          <div className="flex items-center justify-between py-3">
            <div>
              <Link
                to="#"
                className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
              >
                Gala Tab
              </Link>
            </div>
            <div className="flex items-center justify-end ms-auto gap-2">
              <div className="hidden sm:block">
                <form action="">
                  <div className="flex w-[350px] items-center border rounded-3xl p-2 bg-white shadow-[0px_14px_30px_0px_#8383830D]">
                    <label htmlFor="">
                      <IoIosSearch />
                    </label>
                    <input
                      type="search"
                      className="px-3 w-full bg-transparent"
                      placeholder="Start searching here..."
                    />
                  </div>
                </form>
              </div>
              <IconButton>
                <NotificationsNoneIcon />
              </IconButton>
              <Avatar />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="mycontainer">
          <p className="font-semibold text-[28px]">Payoneer card Setup</p>
          <div className="mt-4">
            <PayoneerStepper />
          </div>
        </div>
      </div>
    </div>
  );
}

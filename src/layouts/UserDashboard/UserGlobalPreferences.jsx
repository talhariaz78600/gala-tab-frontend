import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import globIcon from "../../assets/img/glob-icon.png";
import callIcons from "../../assets/img/callIcons.png";
import LanguageModal from "../../components/VendorDashboard/LanguageModal";
import CurrencyModal from "../../components/VendorDashboard/CurrencyModal";
import TimeZoneModal from "../../components/VendorDashboard/TimeZoneModal";
import UserTopBar from "../../components/UserDashboard/UserTopBar";
import HelpButton from "../../components/VendorDashboard/HelpButton";

export default function UserGlobalPreferences() {
  return (
    <div>
      <UserTopBar />
      <div className="mt-8">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link
              to="/user-dashboard/user-account"
              className="sm:text-[28px] text-lg leading-normal font-semibold"
            >
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium sm:text-lg">
              Global Preferences
            </Link>
          </div>
          <div className="mt-12">
            <p className="sm:text-[28px] text-lg leading-normal font-semibold">
              Global Preferences
            </p>
            <div className="mt-5 border-b pb-5">
              <p className="text-[20px] font-semibold">Preferred language</p>
              <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                <p className="sm:text-lg font-medium">English</p>
                <LanguageModal />
              </div>
            </div>
            <div className="mt-5 border-b pb-5">
              <p className="text-[20px] font-semibold">Preferred currency</p>
              <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                <p className="sm:text-lg font-medium">United States dollar</p>
                <CurrencyModal />
              </div>
            </div>
            <div className="mt-5 border-b pb-5">
              <p className="text-[20px] font-semibold">Time zone</p>
              <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                <p className="sm:text-lg font-medium">(GMT+5)</p>
                <TimeZoneModal />
              </div>
            </div>
            <div className="flex justify-between items-end my-10 gap-4 flex-wrap">
              <div className="max-w-[450px] w-full bg-[#F7F7F7] rounded-[10px] p-3">
                <div>
                  <img src={globIcon} alt="img" />
                </div>
                <p className="sm:text-[24px] text-lg font-semibold mt-3">
                  Your global preferences
                </p>
                <p className="sm:text-lg mt-2">
                  Changing your currency updates how you see prices. You can
                  change how you get payments in your payments & payouts
                  preferences.
                </p>
              </div>
              <div className="ms-auto">
                <HelpButton path="/user-dashboard/user-help" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

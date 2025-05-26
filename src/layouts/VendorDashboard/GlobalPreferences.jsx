import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import globIcon from "../../assets/img/glob-icon.png";
import callIcons from "../../assets/img/callIcons.png";
import LanguageModal from "../../components/VendorDashboard/LanguageModal";
import CurrencyModal from "../../components/VendorDashboard/CurrencyModal";
import TimeZoneModal from "../../components/VendorDashboard/TimeZoneModal";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";
import { ThemeContext } from "@/components/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import UserTopBar from "@/components/UserDashboard/UserTopBar";
import { useSelector } from "react-redux";

export default function GlobalPreferences() {
  const { theme: appTheme, toggleTheme } = React.useContext(ThemeContext);
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      {user.role === "vendor" ? <VendorTopBar /> : <UserTopBar />}

      <div className="mt-8">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link
              to="/vendor-dashboard/vendor-account"
              className="text-[28px] leading-normal font-semibold"
            >
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium text-lg">
              Global Preferences
            </Link>
          </div>
          <div className="mt-12">
            <p className="text-[28px] leading-normal font-semibold">
              Global Preferences
            </p>
            <div className="mt-5 border-b pb-5">
              <p className="text-[20px] font-semibold">Preferred language</p>
              <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                <p className="text-lg font-medium">English</p>
                <LanguageModal />
              </div>
            </div>
            <div className="mt-5 border-b pb-5">
              <p className="text-[20px] font-semibold">Preferred currency</p>
              <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                <p className="text-lg font-medium">United States dollar</p>
                <CurrencyModal />
              </div>
            </div>
            <div className="mt-5 border-b pb-5">
              <p className="text-[20px] font-semibold">Time zone</p>
              <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                <p className="text-lg font-medium">(GMT+5)</p>
                <TimeZoneModal />
              </div>
            </div>
            <div className="mt-5 border-b pb-5">
              <p className="text-[20px] font-semibold">Theme</p>
              <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                <div>
                  <p className="text-lg font-medium">Select Mode</p>
                </div>
                <div className="flex items-center space-x-3 bg-gray-200 dark:bg-gray-700 rounded-full p-1 w-max select-none">
                  {/* Light Label with Sun Icon */}
                  <button
                    onClick={() => appTheme !== "light" && toggleTheme()}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full cursor-pointer transition-colors duration-300 ${
                      appTheme === "light"
                        ? "bg-white dark:bg-gray-900 text-yellow-500 shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-900/50"
                    }`}
                    aria-label="Switch to light mode"
                  >
                    <FaSun />
                    <span className="font-semibold">Light</span>
                  </button>

                  {/* Toggle Switch */}
                  <button
                    onClick={toggleTheme}
                    aria-label="Toggle dark mode"
                    role="switch"
                    aria-checked={appTheme === "dark"}
                    className="relative w-14 h-8 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center cursor-pointer transition-colors duration-500"
                  >
                    <span
                      className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 ${
                        appTheme === "dark" ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>

                  {/* Dark Label with Moon Icon */}
                  <button
                    onClick={() => appTheme !== "dark" && toggleTheme()}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full cursor-pointer transition-colors duration-300 ${
                      appTheme === "dark"
                        ? "bg-gray-900 text-indigo-400 shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-900/30 dark:hover:bg-gray-700/50"
                    }`}
                    aria-label="Switch to dark mode"
                  >
                    <FaMoon />
                    <span className="font-semibold">Dark</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end my-10 gap-4 flex-wrap">
              <div className="max-w-[450px] w-full bg-[#F7F7F7] dark:bg-gray-800 rounded-[10px] p-3">
                <div>
                  <img src={globIcon} alt="img" />
                </div>
                <p className="text-[24px] font-semibold mt-3">
                  Your global preferences
                </p>
                <p className="text-lg mt-2">
                  Changing your currency updates how you see prices. You can
                  change how you get payments in your payments & payouts
                  preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

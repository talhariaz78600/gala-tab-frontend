import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCircleExclamation } from "react-icons/fa6";
import sendIcongreen from "../../assets/img/sendIcongreen.png";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";
import { Link } from "react-router";

export default function FormW9() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setToday(currentDate);
  }, []);

  return (
    <div>
      <VendorTopBar />
      <div className="mt-16">
        <div className="mycontainer">
          <div>
            <div className="flex justify-between items-center">
              <p className="text-[28px] font-semibold">Add tax info</p>
              <Link to="/vendor-dashboard/vendor-account">
                <AiFillCloseCircle className="text-[24px] text-[#C13515]" />
              </Link>
            </div>
            <p className="text-lg mt-3">
              Make sure all details are entered accurately before you sign and
              submit.
            </p>
          </div>
          <div className="py-12 px-4 bg-[#F7F7F7] rounded-[10px] mt-5">
            <form action="">
              <div className="max-w-[700px] mx-auto">
                <p className="leading-normal font-semibold text-[28px]">
                  Substitute Form W-9
                </p>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="businessname">
                    Taxpayer or business name
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] invalid:bg-[#C135151A] invalid:border-[#C13515] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    required
                    type="text"
                    name="businessname"
                    id="businessname"
                  />
                  <div className="hidden invalid:block">
                    <div className="flex items-center ps-2 mt-1 text-[#C13515]">
                      <FaCircleExclamation className="me-2" />
                      <p>Taxpayer or business name is required.</p>
                    </div>
                  </div>
                  <style jsx>{`
                    input:invalid + div {
                      display: block;
                    }
                  `}</style>
                </div>
                <div className="mt-5">
                  <label
                    className="font-medium ps-2"
                    htmlFor="Disregardedentity"
                  >
                    Disregarded entity name (optional)
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    type="text"
                    name="Disregardedentity"
                    id="Disregardedentity"
                  />
                  <p className="text-xs mt-1">
                    You only need to fill this out if you have a DBA name, trade
                    name or disregarded entity name.
                  </p>
                </div>
                <div className="mt-5">
                  <label
                    className="font-medium ps-2"
                    htmlFor="Taxclassification"
                  >
                    Tax classification
                  </label>
                  <select
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012] focus:outline-none "
                    name="Taxclassification"
                    id="Taxclassification"
                  >
                    <option value="Choose" selected hidden disabled>
                      Choose
                    </option>
                    <option value="Individual/soleproprietor">
                      Individual / sole proprietor
                    </option>
                    <option value="LLC">LLC</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Scorporation">S corporation</option>
                    <option value="Trust">Trust / Gala Tab</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <p className="leading-normal font-semibold text-[24px] mt-8">
                  Tax ID number
                </p>
                <p className="text-lg">
                  Individuals should provide a SSN. Registered businesses should
                  add their EIN.
                </p>
                <div className="mt-3 flex flex-wrap items-center -mx-3">
                  <div className="w-full min-[480px]:w-1/2 p-3">
                    <label
                      className="flex items-center bg-[#F3F3F3] p-3 w-full border border-[#D4D7E3] rounded-[10px]"
                      htmlFor="SSN"
                    >
                      <input
                        className="me-3"
                        type="radio"
                        name="SSN"
                        id="SSN"
                      />
                      <div>
                        <p className="text-lg">SSN</p>
                        <p className="text-xs">Social Security Number</p>
                      </div>
                    </label>
                  </div>
                  <div className="w-full min-[480px]:w-1/2 p-3">
                    <label
                      className="flex items-center bg-[#F3F3F3] p-3 w-full border border-[#D4D7E3] rounded-[10px]"
                      htmlFor="EIN"
                    >
                      <input
                        className="me-3"
                        type="radio"
                        name="SSN"
                        id="EIN"
                      />
                      <div>
                        <p className="text-lg">EIN</p>
                        <p className="text-xs">
                          Employer Identification Number
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="SSN">
                    SSN
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] invalid:bg-[#C135151A] invalid:border-[#C13515] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    required
                    type="text"
                    name="SSN"
                    id="SSN"
                  />
                  <div className="hidden invalid:block">
                    <div className="flex items-center ps-2 mt-1 text-[#C13515]">
                      <FaCircleExclamation className="me-2" />
                      <p>Invalid format. Please try again.</p>
                    </div>
                  </div>
                  <style jsx>{`
                    input:invalid + div {
                      display: block;
                    }
                  `}</style>
                </div>
                <p className="leading-normal font-semibold text-lg mt-8">
                  Form 1099 delivery
                </p>
                <div className="mt-5 flex flex-col gap-4">
                  <div>
                    <label
                      className="flex items-center bg-[#F3F3F3] p-3 w-full border border-[#D4D7E3] rounded-[10px]"
                      htmlFor="mail"
                    >
                      <input
                        className="me-3"
                        type="radio"
                        name="delivery"
                        id="mail"
                      />
                      <div>
                        <p className="text-lg font-semibold">
                          Deliver by email
                        </p>
                        <p className="text-xs leading-normal max-w-[500px]">
                          Your form will be mailed to the address above. You’ll
                          also get an email when your form is available for
                          download on Gala Tab.com.
                        </p>
                      </div>
                    </label>
                  </div>
                  <div>
                    <label
                      className="flex items-center bg-[#F3F3F3] p-3 w-full border border-[#D4D7E3] rounded-[10px]"
                      htmlFor="email"
                    >
                      <input
                        className="me-3"
                        type="radio"
                        name="delivery"
                        id="email"
                      />
                      <div>
                        <p className="text-lg font-semibold">
                          Deliver electronically only
                        </p>
                        <p className="text-xs leading-normal max-w-[500px]">
                          We’ll notify you by email when an electronic copy of
                          your form is available for download on Gala Tab com.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                <p className="leading-normal font-semibold text-[24px] mt-8">
                  Address
                </p>
                <div className="flex justify-end">
                  <div className="bg-[#32F0CD] flex items-center ms-auto p-1 rounded-full shadow-[0px_14px_30px_0px_#0000001A]">
                    <img className="ms-auto" src={sendIcongreen} alt="img" />
                    <p className="text-xs font-medium mx-2">
                      Use my current location as a site office
                    </p>
                  </div>
                </div>
                <div>
                  <label className="font-medium ps-2" htmlFor="Country">
                    Country / region
                  </label>
                  <select
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012] focus:outline-none "
                    name="Country"
                    id="Country"
                  >
                    <option value="UnitedStates">United States</option>
                    <option value="France">France</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="StreetAddress">
                    Street Address
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    type="text"
                    placeholder="Add here"
                    name="StreetAddress"
                    id="StreetAddress"
                  />
                </div>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="Apt">
                    Apt, suite, etc. (if applicable)
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    type="text"
                    placeholder="Add here"
                    name="Apt"
                    id="Apt"
                  />
                </div>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="City">
                    City
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    type="text"
                    placeholder="Add here"
                    name="City"
                    id="City"
                  />
                </div>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="State">
                    State / territory
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    type="text"
                    placeholder="Add here"
                    name="State"
                    id="State"
                  />
                </div>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="ZIPCode">
                    ZIP Code
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] invalid:bg-[#C135151A] invalid:border-[#C13515] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    required
                    type="text"
                    name="ZIPCode"
                    id="ZIPCode"
                  />
                  <div className="hidden invalid:block">
                    <div className="flex items-center ps-2 mt-1 text-[#C13515]">
                      <FaCircleExclamation className="me-2" />
                      <p>Zip is required.</p>
                    </div>
                  </div>
                  <style jsx>{`
                    input:invalid + div {
                      display: block;
                    }
                  `}</style>
                </div>
                <p className="leading-normal font-semibold text-[24px] mt-8">
                  Sign and date Form W-9
                </p>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="Sign">
                    Sign
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    type="text"
                    placeholder="Add here"
                    name="Sign"
                    id="Sign"
                  />
                </div>
                <div className="mt-5">
                  <label className="font-medium ps-2" htmlFor="Date">
                    Date
                  </label>
                  <input
                    className="block border w-full px-4 py-6 border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]"
                    type="date"
                    placeholder="Add here"
                    name="Date"
                    id="Date"
                    defaultValue={today}
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-between mt-16">
                <button className="min-w-[150px] bg-[#E7E7E7] border border-[#D5D5D5] rounded-full p-3 font-medium">
                  Cancel
                </button>
                <button className="min-w-[150px] bg-[#000000] border border-[#000000] rounded-full p-3 font-semibold text-white shadow-[0px_10px_17px_0px_#FD636312]">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

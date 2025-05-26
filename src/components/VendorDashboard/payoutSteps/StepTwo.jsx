import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link } from "react-router";
import payoneerBg from "../../../assets/img/payoneer-bg.png";
import down from "../../../assets/img/down.png";

export default function StepTwo({ onBack }) {
  return (
    <div>
      <div className="flex items-center flex-wrap-reverse gap-3 justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div>
          <p className="font-semibold sm:text-[28px] text-lg">Let's add a payout method</p>
          <p className="sm:text-lg mt-3">
            To start, let us know where you'd like us to send your money.
          </p>
        </div>
        <div className="ms-auto">
          <button onClick={onBack}>
            <RiCloseCircleFill className="sm:text-[24px] text-[#C13515]" />
          </button>
        </div>
      </div>
      <div className="max-w-[700px] mx-auto mt-6">
        <div>
          <label className="sm:text-lg font-medium" htmlFor="Region">
            Billing country/region
          </label>
          <select
            style={{
              backgroundImage: `url(${down})`,
              backgroundPosition: "right 20px center",
            }}
            className="sm:p-5 p-3 pe-12 block w-full rounded-[10px] bg-[#F3F3F3] border focus:outline-none border-[#D4D7E3] bg-no-repeat appearance-none"
            name="Region"
            id="Region"
          >
            <option disabled hidden selected value="Select Country">
              Select Country
            </option>
            <option value="">United Stated</option>
            <option value="">New Zealand</option>
            <option value="">Oman</option>
            <option value="">Niue</option>
            <option value="">Pakistan</option>
            <option value="">New Zealand</option>
            <option value="">Oman</option>
            <option value="">Niue</option>
          </select>
          <p className="text-[14px]">
            This is where you opened your financial account.
            <Link to="#" className="text-[14px] text-[#3551B6] font-medium">
              More info
            </Link>
          </p>
        </div>
        <div>
          <p className="text-lg font-medium mt-3">How you'll get paid</p>
          <p className="mt-2 text-[14px]">Payouts will be sent in USD.</p>
          <div className="mt-2">
            <label
              className="flex md:flex-row flex-row-reverse md:items-center justify-between rounded-[10px] border border-dashed bg-[#FDFDFD] border-[#CECECE] p-4"
              htmlFor="Payoneer"
            >
              <div className="flex md:flex-row flex-col items-center gap-4">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[24px]">Payoneer</p>
                  <img
                    className="size-20 max-w-20 shadow-[0px_20px_34px_0px_#7D7D7D26]"
                    src={payoneerBg}
                    alt="payoneer"
                  />
                </div>
                <div>
                  <ul className=" list-disc list-inside">
                    <li>Prepaid debit Mastercard</li>
                    <li>24 hours or less</li>
                    <li>Payoneer fees may apply</li>
                  </ul>
                </div>
              </div>
              <div>
                <input
                  className="size-6 accent-black"
                  type="radio"
                  name="Payoneer"
                  id="Payoneer"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link } from "react-router";
import down from "../../../assets/img/down.png";

export default function StepThree({ onBack }) {
  return (
    <div>
      <div className="flex items-center flex-wrap-reverse gap-3 justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div>
          <p className="font-semibold sm:text-[28px] text-base">
            Who owns this Payoneer account?
          </p>
          <p className="text-lg mt-3">
            This is the name that will be associated with your Payoneer account.
          </p>
        </div>
        <div className="ms-auto">
          <button onClick={onBack}>
            <RiCloseCircleFill className="text-[24px] text-[#C13515]" />
          </button>
        </div>
      </div>
      <div className="max-w-[700px] mx-auto mt-6">
        <label className="sm:text-lg font-medium" htmlFor="Region">
          Whose bank account is it?
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
            Select One
          </option>
          <option value="">Kevin</option>
          <option value="">New account holder</option>
        </select>
        <p className="text-[14px]">
          Choose from people you’ve added to your Host account{" "}
          <Link to="#" className="text-[14px] text-[#3551B6] font-medium">
            More info
          </Link>
        </p>
      </div>
    </div>
  );
}

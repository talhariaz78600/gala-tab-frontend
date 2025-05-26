import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

export default function OtpModal({ handleClose }) {
  return (
    <div>
      <form action="/Request-Data-Progress">
        <div className="p-4 flex flex-row-reverse justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
          <p className="text-[26px] w-[calc(100%-24px)] text-center font-semibold">
            Confirm account{" "}
          </p>
          <button>
            <FaArrowLeft className="text-[24px]" onClick={handleClose} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-[24px] font-semibold">
            Enter your verification code
          </p>
          <div className="mt-4">
            <p className="text-lg text-[#484848]">
              A code was sent to XXX-XXX-2121
            </p>
          </div>
          <div className="grid grid-cols-6 sm:gap-6 gap-2 mt-9">
            <div className="border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center">
              <input
                type="text"
                className="border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center"
                maxLength={1}
              />
            </div>
            <div className="border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center">
              <input
                type="text"
                className="border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center"
                maxLength={1}
              />
            </div>
            <div className="border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center">
              <input
                type="text"
                className="border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center"
                maxLength={1}
              />
            </div>
            <div className="border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center">
              <input
                type="text"
                className="border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center"
                maxLength={1}
              />
            </div>
            <div className="border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center">
              <input
                type="text"
                className="border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center"
                maxLength={1}
              />
            </div>
            <div className="border-gray-400 border bg-slate-300 rounded-xl xs:p-3 p-2 flex items-center justify-center">
              <input
                type="text"
                className="border-b border-b-gray-700 bg-slate-300 sm:w-4 w-3 sm:mb-4 text-center"
                maxLength={1}
              />
            </div>
          </div>
          <div className="mt-8">
            <p className="text-[#484848] text-lg font-medium">
              Didn't get a text?{" "}
              <Link className="font-bold underline">Send again</Link>
            </p>
          </div>
          <div className="mt-8">
            <Link className="font-semibold text-[#484848] text-lg underline">
              Try another option
            </Link>
          </div>
          <div className="grid mt-8">
            <button
              type="submit"
              className="bg-[#1C1C1C] border border-[#1C1C1C] rounded-[10px] py-3 px-6 font-medium text-white shadow-[0px_11.72px_20px_0px_#00000024]"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

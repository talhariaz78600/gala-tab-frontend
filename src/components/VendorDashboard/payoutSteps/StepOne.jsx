import React from "react";
import { Link } from "react-router";

export default function StepOne({ onClick }) {
  return (
    <div>
      <div className="flex items-center flex-wrap-reverse gap-3 justify-between border-b border-[#CDCDCD] pb-5 mt-4">
        <div>
          <p className="font-semibold sm:text-[28px] text-lg">How you’ll get paid</p>
          <p className="sm:text-lg text-sm mt-3">
            Add at least one payout method so we know where to send your money.
          </p>
        </div>
        <div className="ms-auto">
          <button
            onClick={onClick}
            className="inline-block bg-black text-white sm:text-lg text-sm py-3 px-4 rounded-[10px]"
          >
            Set up payouts
          </button>
        </div>
      </div>
      <div className="sm:mt-[100px] mt-5">
        <div className="sm:max-w-[800px] bg-[#F7F7F7] p-6 mx-auto rounded-[10px]">
          <p className="text-[24px] font-semibold">Need help?</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
            <div>
              <Link className="w-full flex justify-center border text-sm sm:text-base border-black underline rounded-[8px] font-medium p-3 shadow-[0px_10px_17px_0px_#FD636312] bg-white">
                When you'll get your payout
              </Link>
            </div>
            <div>
              <Link className="w-full flex justify-center border text-sm sm:text-base border-black underline rounded-[8px] font-medium p-3 shadow-[0px_10px_17px_0px_#FD636312] bg-white">
                How payouts work
              </Link>
            </div>
            <div>
              <Link className="w-full flex justify-center border text-sm sm:text-base text-center border-black underline rounded-[8px] font-medium p-3 shadow-[0px_10px_17px_0px_#FD636312] bg-white">
                Go to your transaction history
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

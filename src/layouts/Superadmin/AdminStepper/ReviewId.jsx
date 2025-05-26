import React from "react";
import { Link, useNavigate } from "react-router";
import Verified from "../../../assets/img/review.png";

const ReviewId = () => {
  const navigate = useNavigate();
  return (
    <div className="py-7 w-full">
      <div className="max-w-lg mx-auto py-6 px-2">
        <h4 className="text-center sm:text-4xl text-2xl font-semibold text-[#171717]">
          We’re reviewing your ID
        </h4>
        <p className="text-center mt-3 sm:text-lg">
          Thanks for completing this important step. We’ll let you know soon if
          we need any more info from you.
        </p>
        <p className="text-center mt-3 sm:text-lg">
          In the meantime, you can pick up where you left off.
        </p>
        <div className="mt-4">
          <img
            src={Verified}
            alt=""
            className="mx-auto w-full h-[400px] object-contain"
          />
        </div>
        {/* <div className="">
          <button className="w-full rounded-full text-white bg-black py-2">
            Done
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ReviewId;

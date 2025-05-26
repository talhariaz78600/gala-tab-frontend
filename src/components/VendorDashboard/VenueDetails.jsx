import React from "react";
import VanueImg1 from "../../assets/img/list-detail2.png";
import { Link } from "react-router";
import { BsGrid } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

export default function VenueDetails({ data, reviews }) {
  const vanueimages = data?.media.slice(0, 5);

  return (
    <div className="flex flex-wrap justify-between gap-y-7">
      <div className="w-full xl:w-[450px] grid grid-cols-1 min-[380px]:grid-cols-2 gap-4">
        {vanueimages?.map((media, index) => (
          <div className="aspect-[1/.6] sm:first:col-span-2" key={index}>
            {media.type === "video" ? (
              <video
                src={media.url}
                controls
                className="w-full h-full object-cover rounded-[20px]"
              />
            ) : (
              <img
                src={media.url}
                alt={`Venue Image ${index + 1}`}
                className="w-full h-full object-cover rounded-[20px]"
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-full xl:w-[calc(100%-470px)]">
        <h2 className="font-semibold text-[24px] sm:text-[34px]">
          {data?.title || "N/A"}
        </h2>
        <p className="text-[20px] sm:text-[24px] font-semibold mt-2">
          Apartment Description
        </p>
        <p className="mt-5 text-[15px] leading-normal">
          {data?.description || "N/A"}
        </p>

        <div className="mt-5 bg-[#E7E7E7] dark:bg-gray-800 p-3 rounded-[8px]">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-lg font-medium ">Reviews</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 items-center">
            <FaStar className="text-[#FF9900]" />
            <p className="font-medium"> {reviews?.averageRating || 0}</p>
            <p className="font-medium">Reviews</p>
            <p className="font-medium ">
              {" "}
              {reviews?.totalReviews || 0} reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Profile from "../../assets/img/profile.png";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const Review = ({ reviews }) => {
  const [expandedComments, setExpandedComments] = useState({});

  const toggleComment = (index) => {
    setExpandedComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const backgroundClass =
    location.pathname === "/vendor-dashboard/client-profile"
      ? "bg-[#fff]"
      : location.pathname === "/faqs"
      ? "bg-[#F5F5F5]"
      : "bg-[#F7F7F7]";

  return (
    <div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-6">
        {reviews?.length === 0 ? (
          <h1 className="text-center ">No reviews yet</h1>
        ) : null}

        {reviews?.map((review, index) => {
          const isExpanded = expandedComments[index];
          return (
            <div key={index} className={`${backgroundClass} rounded-xl p-3`}>
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full size-12 max-w-12"
                    src={review?.reviewer?.profilePicture || Profile}
                    alt="profile"
                  />
                  <div>
                    <h6 className="font-semibold text-base text-[#484848]">
                      {review?.reviewer?.firstName} {review?.reviewer?.lastName}
                    </h6>
                    <p className="text-black">{review?.country}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-[#FF9900]"
                            : "text-[#CDCDCD]"
                        }
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <GoDotFill className="text-xs text-[#484848]" />
                    <p className="text-[#9A9A9A]">{review.rating}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-[#9A9A9A]">{review.date}</p>
                <div className="text-sm text-[#9A9A9A] mt-3 mb-2">
                  <p className={isExpanded ? "" : "line-clamp-4"}>
                    {review.comment}
                  </p>
                  {review.comment.length > 200 && (
                    <button
                      onClick={() => toggleComment(index)}
                      className="text-blue-600 mt-1 text-sm font-medium"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;

import React, { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import decoration from "../../assets/img/decoration.png";
import { Link } from "react-router";
import guestimg from "../../assets/img/guest-img.png";
import StarRating from "./StarRating";
import { Avatar } from "@mui/material";
import Profile from "../../assets/img/profile.png";
import { useSelector } from "react-redux";
import { useReviewCreateMutation, useReviewEditMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export default function AddReviewModal({ handleClose, data }) {
  const user = useSelector((state) => state.auth.user);
  const [sentiment, setSentiment] = useState("positive");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);

  const [reviewCreate, { isLoading: isReviewCreateLoading }] =
    useReviewCreateMutation();
  const [reviewUpdate, { isLoading: isReviewUpdateLoading }] =
    useReviewEditMutation();

  const handleSubmit = async () => {
    const trimmedReview = review.trim();

    if (trimmedReview.length < 10) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const response = data?.review
        ? await reviewUpdate({
            id: data.review._id,
            data: {
              comment: trimmedReview,
              rating,
              reviewType: sentiment,
              reviewOn: data._id,
            },
          })
        : await reviewCreate({
            comment: trimmedReview,
            rating,
            reviewType: sentiment,
            reviewOn: data._id,
          });

      if (response?.data?.status === "success") {
        toast.success(
          `Review ${data?.review ? "updated" : "added"} successfully!`
        );
        handleClose();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to submit review. Please check your connection.");
      console.error("Review submission error:", err);
    }
  };

  useEffect(() => {
    if (data?.review) {
      setReview(data.review.comment || "");
      setSentiment(data.review.reviewType || "");
      setRating(data.review.rating || 0);
    } else {
      setReview("");
      setSentiment("positive");
      setRating(0);
    }
  }, [data]);

  return (
    <div>
      <div>
        <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
          <div className=" w-full sm:w-[calc(100%-52px)]">
            <p className="text-base min-[480px]:text-[20px] sm:text-[24px] text-center font-semibold">
              {data?.review ? "Edit" : "Add"} Review and Rating Details
            </p>
          </div>
          <button className="ms-auto mb-1 sm:mb-0">
            <RiCloseCircleFill
              className="text-[24px] text-[#D92D20]"
              onClick={handleClose}
            />
          </button>
        </div>
        <div className="p-4 max-h-[calc(100vh-200px)] scroll-x-hidden overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-[#F7F7F7] dark:bg-gray-800 border border-[#D5D5D5] p-3 rounded-[20px]">
              <div className="flex items-center justify-between gap-2">
                <p className="sm:text-lg font-semibold">Service Details</p>
              </div>
              <div className="flex items-center justify-between gap-4 mt-2 flex-wrap">
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <img
                    className="w-[150px] rounded-[10px] aspect-video object-cover"
                    src={data?.service.media.find((img) => img.cover)?.url}
                    alt="img"
                  />
                  <div className="max-w-[130px]">
                    <p className="font-medium text-nowrap overflow-hidden text-ellipsis">
                      {data.service.title}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="text-lg font-semibold">Status</p>
                    <p className="font-medium text-[#34A853]"> {data.status}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F7F7F7] dark:bg-gray-800 border border-[#D5D5D5] p-3 rounded-[20px]">
              <div className="flex items-center justify-between gap-4 mt-2 flex-wrap">
                <div>
                  <p className="sm:text-lg font-semibold">Vendor Details</p>
                  <div className="flex flex-wrap items-center gap-2 mt-6">
                    <Avatar
                      src={data?.vendor?.profilePicture || Profile}
                      alt=""
                      className="w-20 h-20 object-cover  cursor-pointer"
                    />
                    <div className="max-w-[200px]">
                      <p className="font-medium text-nowrap overflow-hidden text-ellipsis">
                        {data.vendor.firstName} {data.vendor.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 border-b pb-3 border-[#CDCDCD]">
            <div className="grid md:grid-cols-2 gap-y-4">
              <div>
                <p className="text-[24px] font-semibold">Total Reviews</p>
                <div className="flex items-center gap-3">
                  <p className="text-[30px] font-semibold">
                    {data?.reviewCount || 0}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[24px] font-semibold">Average Rating</p>
                <div className="flex items-center flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-[30px] font-semibold">
                      {data?.averageRating || 0}
                    </p>
                    <StarRating
                      isInteractive={false}
                      rating={data.averageRating}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xl font-bold">Add Review and Rating</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <Avatar
                  src={data?.vendor?.profilePicture || Profile}
                  sx={{ width: 60, height: 60 }}
                />
                <div>
                  <p className="text-[20px] font-semibold leading-none">
                    {data.vendor.firstName} {data.vendor.lastName}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {data.service.title}
                  </p>
                </div>
              </div>

              {/* Rating Section */}
              <div>
                <p className="text-lg font-semibold mb-1">Give Rating</p>
                <StarRating
                  isInteractive={true}
                  rating={rating}
                  onRatingChange={setRating}
                />
              </div>

              {/* Sentiment Selector */}
              <div>
                <p className="text-lg font-semibold mb-1">Review Sentiment</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSentiment("positive")}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      sentiment === "positive"
                        ? "bg-green-100 text-green-700 border-green-400"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Positive
                  </button>
                  <button
                    onClick={() => setSentiment("negative")}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      sentiment === "negative"
                        ? "bg-red-100 text-red-700 border-red-400"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Negative
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <div>
                <label
                  className="text-[#0C1421] dark:text-white text-lg font-medium ps-1"
                  htmlFor="Add-Review"
                >
                  Add Review
                </label>
                <textarea
                  className="block w-full border border-[#D4D7E3] text-black rounded-[10px] placeholder:text-[#6A798F] focus:outline-none resize-none p-4 bg-[#F3F3F3]"
                  name="Add-Review"
                  id="Add-Review"
                  placeholder="Type here"
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>

                {error && (
                  <p className="text-sm text-red-500 mt-1">
                    Description is required and must be at least 10 characters
                    long.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={handleSubmit}
                className="text-medium text-white border border-black p-4 bg-black rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
              >
                Save
              </button>
              <button
                onClick={handleClose}
                className="text-medium text-white border border-black p-4 bg-[#D92D20] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <Loader loading={isReviewCreateLoading || isReviewUpdateLoading} />
    </div>
  );
}

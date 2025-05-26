import React from "react";
import { FaStar } from "react-icons/fa";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Profile from "../../assets/img/profile.png";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "#9A9A9A",
  width: "100%",
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#FF9900",
  },
}));

const reviews = [
  {
    id: 1,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Aayush",
    country: "Pakistan",
    rating: 4.8,
    stars: 4,
    date: "November - 2024",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function ReviewsOverview() {
  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-[#484848] font-semibold">Reviews</p>
          <p className="text-[#484848] font-semibold flex items-center gap-2">
            <FaStar className="text-yellow-600" />
            5.0
          </p>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 lg:gap-12 gap-3 mt-5">
          <div>
            <div className="sm:flex items-center gap-4">
              <div className="w-full">
                <p className="text-[#484848] font-semibold me-9">Amenities</p>
              </div>
              <div className="flex items-center gap-3 w-full">
                <BorderLinearProgress variant="determinate" value={50} />
                <p className="text-[#484848] font-semibold">5.0</p>
              </div>
            </div>
            <div className="sm:flex items-center gap-4 mt-2">
              <div className="w-full">
                <p className="text-[#484848] font-semibold me-9">
                  Communication
                </p>
              </div>
              <div className="flex items-center gap-3 w-full">
                <BorderLinearProgress variant="determinate" value={50} />
                <p className="text-[#484848] font-semibold">5.0</p>
              </div>
            </div>
            <div className="sm:flex items-center gap-4 mt-2">
              <div className="w-full">
                <p className="text-[#484848] font-semibold me-9">
                  Value for Money
                </p>
              </div>
              <div className="flex items-center gap-3 w-full">
                <BorderLinearProgress variant="determinate" value={50} />
                <p className="text-[#484848] font-semibold">5.0</p>
              </div>
            </div>
          </div>
          <div>
            <div className="sm:flex items-center gap-4">
              <div className="w-full">
                <p className="text-[#484848] font-semibold me-9">Hygiene</p>
              </div>
              <div className="flex items-center gap-3 w-full">
                <BorderLinearProgress variant="determinate" value={50} />
                <p className="text-[#484848] font-semibold">5.0</p>
              </div>
            </div>
            <div className="sm:flex items-center gap-4 mt-2">
              <div className="w-full">
                <p className="text-[#484848] font-semibold me-9">
                  Location of Photo Studios
                </p>
              </div>
              <div className="flex items-center gap-3 w-full">
                <BorderLinearProgress variant="determinate" value={50} />
                <p className="text-[#484848] font-semibold">5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#ffffff] rounded-xl p-3">
              <div className="flex flex-wrap-reverse items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      className="rounded-full size-12 max-w-12"
                      src={Profile}
                      alt="profile"
                    />
                  </div>
                  <div>
                    <h6 className="font-semibold text-base text-[#484848]">
                      {review.name}
                    </h6>
                    <p>{review.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ms-auto">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < review.stars
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
                <p className="text-sm text-[#9A9A9A] mt-3 mb-5">
                  {review.comment}
                </p>
                <Link to="#" className="text-sm text-black underline">
                  See more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-12 mb-3">
        <button className="text-lg font-medium text-white bg-[#1C1C1C] px-12 py-2 rounded-lg shadow-lg">
          Show more
        </button>
      </div>
    </div>
  );
}

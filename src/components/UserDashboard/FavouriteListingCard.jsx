import React from "react";
import { FaShareNodes, FaStar } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import ProfileBg from "../../assets/img/card-profile-bg.png";
import { Link, useNavigate } from "react-router";
import LikeButton from "../LandingPage/LikeButton";
import SimpleSlider from "../LandingPage/SimpleSlider";
import { useSelector } from "react-redux";
import { useCreateRecentViewedListingMutation } from "@/api/apiSlice";

export default function FavouriteListingCard({
  id,
  media = [],
  title,
  rating,
  location,
  price,
  Profile,
  likedByData,
  onLikeUpdate,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [createRecentViewedListing] = useCreateRecentViewedListingMutation();

  const handleNavigation = async (path) => {
    await createRecentViewedListing({ serviceId: id });
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Extract URLs safely from media
  const imageUrls = media.slice(0, 4).map((img) => img?.url);
  return (
    <div>
      <div className="landing-page-tab-card">
        <div
          onClick={() => handleNavigation(`/listing-detail/${id}`)}
          className="border p-2 rounded-[10px] bg-white dark:bg-[#202224] cursor-pointer"
        >
          <div className="relative">
            {imageUrls.length > 0 ? (
              <SimpleSlider images={imageUrls} />
            ) : (
              <div className="h-[200px] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No Images Available</p>
              </div>
            )}
            <div className="absolute p-2 bg-[rgba(255,255,255,.9)] text-black top-[8px] left-[8px] rounded-[5px]">
              <p className="text-xs font-medium">Verified listing</p>
            </div>
            {user && (
              <div className="absolute bottom-[8px] right-[8px]">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-2 items-center"
                >
                  <LikeButton
                    likedByData={likedByData}
                    serviceID={id}
                    onLikeUpdate={onLikeUpdate}
                  />
                </div>
              </div>
            )}

            {Profile && (
              <div className="absolute bottom-[8px] left-[8px]">
                <div className="relative">
                  <img className="max-h-[70px]" src={ProfileBg} alt="bg" />
                  {Profile && (
                    <img
                      className="size-[30px] object-cover rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      src={Profile}
                      alt="profile"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="py-3 px-1">
            <div className="flex justify-between">
              <p className="font-medium truncate">{title}</p>

              <div className="flex items-center ms-2">
                <FaStar className="text-[#FF9900] me-1" />
                <p className="text-xs font-medium">{rating}</p>
              </div>
            </div>
            {location && (
              <div className="flex items-center mt-2">
                <IoLocationOutline className="me-2" />
                <p className="text-xs font-medium truncate">{location}</p>
              </div>
            )}
            {price && (
              <div className="mt-3">
                <p className="font-medium">Starting ${price}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import DashboardTwo from "../../assets/img/dashboard-img2.png";
import DashboardThree from "../../assets/img/dashboard-img3.png";
import DashboardOne from "../../assets/img/dashboard-img1.png";
import Profile from "../../assets/img/profile.png";
import TabCardImg from "../../assets/img/tabcard-img.png";
import FavouriteListingCard from "../../components/UserDashboard/FavouriteListingCard";
import AdvertisementSlider from "../../components/UserDashboard/AdvertisementSlider";
import {
  useGetAdvertisementListQuery,
  useGetCustomerDashboardAnalyticsQuery,
} from "@/api/apiSlice";
import { useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";

const UserDash = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading } = useGetCustomerDashboardAnalyticsQuery();
  const { data: advertisement, isLoading: advertisementLoading } =
    useGetAdvertisementListQuery({
      page: 1,
      limit: 50,
    });

  const dashboardData = [
    {
      title: "Total Favorite Listings",
      value: data?.data?.favouriteListingsCount || 0,
      image: DashboardThree,
    },
    {
      title: "Total Staff",
      value: data?.data?.totalStaff || 0,
      image: DashboardOne,
    },
  ];

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#202224] min-h-[calc(100dvh-130px)] sm:p-5 p-3 rounded-[20px]">
      <div>
        <h4 className="font-semibold text-[#303C6C] dark:text-white text-2xl">
          Welcome to Your Dashboard!
        </h4>
        <p>Hi {user?.firstName}, 👋</p>
        <p>We’re glad to see you! </p>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-4 gap-4">
          {dashboardData.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1f2937] shadow-sm rounded-xl p-3 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold sm:text-base text-xs text-[#202224] dark:text-white">
                  {item.title}
                </p>
                <p className="text-2xl font-semibold">{item.value}</p>
              </div>
              <div className="p-2 rounded-md bg-transparent dark:bg-white">
                <img
                  src={item.image}
                  alt=""
                  className="w-[20px] h-[20px] max-w-[20px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <AdvertisementSlider advertisements={advertisement?.data || []} />
      </div>
      <div className="mt-12">
        <div className="grid xl:grid-cols-2 gap-4">
          <div className="border p-4 rounded-[20px] dark:bg-gray-800">
            <p className="text-lg font-semibold">Top Vendor Listings</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {data?.data?.ListingwithmoreBookings?.length === 0 && (
                <p className="text-center">No data found</p>
              )}
              {data?.data?.ListingwithmoreBookings?.map((card, index) => (
                <FavouriteListingCard
                  key={index}
                  id={card._id}
                  media={card?.media}
                  title={card?.title}
                  rating={card?.rating || 0}
                  location={card.location?.country}
                  price={card?.totalPrice}
                  Profile={card?.vendorId?.profilePicture}
                  likedByData={card?.likedBy}
                />
              ))}
            </div>
          </div>
          <div className="border p-4 rounded-[20px] dark:bg-gray-800">
            <p className="text-lg font-semibold">Recently viewed</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {data?.data?.lastviewlistings?.length === 0 && (
                <p className="text-center">No data found</p>
              )}
              {data?.data?.lastviewlistings?.map((card, index) => (
                <FavouriteListingCard
                  key={index}
                  id={card._id}
                  media={card?.media}
                  title={card?.title}
                  rating={card?.rating}
                  location={card.location?.country}
                  price={card?.totalPrice}
                  Profile={card?.vendorId?.profilePicture}
                  likedByData={card?.likedBy}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Loader loading={isLoading || advertisementLoading} />
    </div>
  );
};

export default UserDash;

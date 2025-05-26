import React, { useState } from "react";
import TabCard from "../../components/LandingPage/TabCard";
import Profile from "../../assets/img/profile.png";
import TabCardImg from "../../assets/img/tabcard-img.png";
import FavouriteListingCard from "../../components/UserDashboard/FavouriteListingCard";
import { useGetLikeServiceListQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";

const FavouriteListing = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetLikeServiceListQuery({
    page: page + 1,
    limit,
  });

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-xl min-h-[calc(100dvh-130px)]">
      <div>
        <h4 className="p-4 border-b sm:text-[28px] text-lg font-semibold">
          Your Favourites Listings
        </h4>
      </div>
      <div className="p-3">
        <div className="-mx-3 flex flex-wrap">
          {data?.data?.length === 0 && (
            <div className="text-center p-5">
              <p className="text-[#1C1C1C] dark:text-white text-sm font-medium">
                No data found
              </p>
            </div>
          )}
          {data?.data?.map((card, index) => (
            <TabCard
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
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalCount}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <Loader loading={isLoading} />
    </div>
  );
};

export default FavouriteListing;

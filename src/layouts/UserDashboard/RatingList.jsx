import React, { useState } from "react";
import ImgList from "../../assets/img/list-detail2.png";
import LikeButton from "../../components/LandingPage/LikeButton";
import ProfileName from "../../assets/img/profile-name.png";
import Profile from "../../assets/img/profile.png";
import { Avatar, Modal } from "@mui/material";
import AddReviewModal from "../../components/UserDashboard/AddReviewModal";
import { useGetBookingListCustomerQuery } from "@/api/apiSlice";
import { format } from "date-fns";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";
import { useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";

const RatingList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const { data, isLoading } = useGetBookingListCustomerQuery({
    page: page + 1,
    limit,
    status: "completed",
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [openaddrating, setOpenaddrating] = React.useState(false);
  const handleOpenaddrating = () => setOpenaddrating(true);
  const handleCloseaddrating = () => setOpenaddrating(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-xl">
        <div>
          <h4 className="p-4 border-b lg:text-3xl text-xl font-semibold">
            Reviews & Ratings Listings
          </h4>
        </div>
        <div className="p-3">
          <div className="grid xl:grid-cols-2 gap-4">
            {data?.bookings?.length === 0 && (
              <div className="text-center">
                <p className="text-[#1C1C1C] dark:text-white text-sm font-medium">
                  No data found
                </p>
              </div>
            )}
            {data?.bookings?.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl grid lg:grid-cols-2 gap-4"
              >
                <div className="relative">
                  {(() => {
                    const coverMedia = item?.service?.media?.find(
                      (m) => m.cover
                    );
                    if (!coverMedia) return null;
                    return coverMedia.type === "video" ? (
                      <video
                        src={coverMedia.url || "/video-default.png"}
                        className="h-[200px] w-full object-cover rounded-[10px]"
                        controls
                      />
                    ) : (
                      <img
                        src={coverMedia.url || "/video-default.png"}
                        alt="Cover"
                        className="h-[200px] w-full object-cover rounded-[10px]"
                      />
                    );
                  })()}

                  {item.verified && (
                    <div className="absolute top-2 left-3">
                      <p className="text-[#1C1C1C] text-xs font-medium bg-white p-2 rounded-md">
                        Verified listing
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between">
                      <div>
                        <h5 className="font-medium text-base">
                          {item.service.title}
                        </h5>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-base">Status:</h5>
                          <p className="text-[#34A853] text-sm font-medium">
                            {item.status}
                          </p>

                          <FaStar className="text-[#FF9900]" />

                          <p>
                            {item?.review?.rating
                              ? item.review.rating
                              : "Not reviewed yet"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-base">
                            Total Price:
                          </h5>
                          <p className="text-[#34A853] text-sm font-medium">
                            {item.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#484848] dark:text-white font-medium text-sm">
                      {item.service.description}
                    </p>
                    <div>
                      <h5 className="font-medium text-base">Vendor Profile</h5>
                      <div className="flex items-center gap-3 mt-5">
                        <div className="relative">
                          <Avatar
                            onClick={() =>
                              navigate("/user-dashboard/vendor-profile", {
                                state: { id: item?.vendor?._id },
                              })
                            }
                            src={item?.vendor?.profilePicture || Profile}
                            alt=""
                            className="w-20 h-20 object-cover  cursor-pointer"
                          />
                          <div className="absolute bottom-0 right-0">
                            <img src={ProfileName} alt="verified" />
                          </div>
                        </div>
                        <div>
                          <h6 className="text-sm">
                            {item.vendor.firstName} {item.vendor.lastName}
                          </h6>
                        </div>
                      </div>
                      <div className="my-3">
                        <h4 className="text-base text-[#20C54C] font-medium">
                          Successfully Complete
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="grid  gap-4">
                    {item?.review ? (
                      <div>
                        <button
                          onClick={() => {
                            setSelectedCard(item);
                            handleOpenaddrating();
                          }}
                          className="bg-[#D92D20] border border-black text-white py-2 w-full inline-block text-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                        >
                          Edit Review
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => {
                            setSelectedCard(item);
                            handleOpenaddrating();
                          }}
                          className="bg-[#000] border border-black text-white py-2 w-full inline-block text-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                        >
                          Add Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PaginationComponent
            currentPage={page}
            totalPages={data?.total}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <Loader loading={isLoading} />
        </div>
      </div>
      <Modal
        open={openaddrating}
        onClose={handleCloseaddrating}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1100px] bg-white dark:bg-[#1C1C1C] rounded-[20px]">
          <AddReviewModal
            handleClose={handleCloseaddrating}
            data={selectedCard}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RatingList;

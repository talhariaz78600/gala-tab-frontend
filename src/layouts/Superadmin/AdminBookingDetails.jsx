import React from "react";
import { FiShare2 } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { TbCheck, TbUsersGroup } from "react-icons/tb";
import { BsGrid } from "react-icons/bs";
import VenueDetails from "../../components/VendorDashboard/VenueDetails";
import OfferAmenities from "../../components/VendorDashboard/OfferAmenities";
import OfferServices from "../../components/VendorDashboard/OfferServices";
import GuestInfoDetails from "../../components/VendorDashboard/GuestInfoDetails";
import ReviewsOverview from "../../components/VendorDashboard/ReviewsOverview";
import {
  useGetLandingServiceDetailsQuery,
  useGetServiceReviewListQuery,
  useGetSinglePayoutQuery,
} from "@/api/apiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "@/store/authSlice";
import { useEffect } from "react";
import Review from "@/components/Country/Review";
import ShareModal from "../LandingPage/ShareModal";
import Loader from "@/components/loader/Loader";
import SendPaymentModal from "./SendPaymentModal";

export default function AdminBookingDetails() {
  const location = useLocation();
  const bookingData = location?.state?.data;

  const mode = location?.state?.mode;
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetLandingServiceDetailsQuery(id);
  const { data: PayOutDetails, isLoading: payoutLoading } =
    useGetSinglePayoutQuery(bookingData?._id, {
      skip: bookingData?.status !== "completed" || mode !== "all",
    });

  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const { data: reviews, isLoading: reviewLoading } =
    useGetServiceReviewListQuery({
      serviceId: id,
      page,
      limit,
    });

  const [shareopen, setshareOpen] = React.useState(false);
  const handleshareOpen = () => setshareOpen(true);
  const handleshareClose = () => setshareOpen(false);
  const [expanded, setExpanded] = React.useState("panel1");
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const handleLogin = () => {
    setOpenModal(false);
    navigate("/auth/welcome/login");
  };

  const navigate = useNavigate();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const listingUrl = `${window.location.origin}/listing-detail/${data?.data?.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(listingUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = (platform) => {
    const shareUrl = window.location.href;
    const shareText = `Check this out: ${shareUrl}`;

    switch (platform) {
      case "email":
        window.open(
          `mailto:?subject=Check this out&body=${shareText}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "messages":
        window.open(`sms:?&body=${encodeURIComponent(shareText)}`, "_blank");
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent("Check this out!")}`,
          "_blank"
        );
        break;
      default:
        console.warn("Unsupported share platform:", platform);
    }
  };

  useEffect(() => {
    if (reviews?.reviews) {
      setAllReviews((prev) => {
        const existingIds = new Set(prev.map((r) => r._id));
        const newReviews = reviews.reviews.filter(
          (r) => !existingIds.has(r._id)
        );
        return [...prev, ...newReviews];
      });

      const totalPages = Math.ceil(reviews.totalReviews / limit);
      setHasMore(page < totalPages);
    }
  }, [reviews, page, limit]);

  const addressdettails = [
    {
      title: "Street Address:",
      desc: `${data?.data?.location?.address || "N/A"}`,
    },
    {
      title: "City:",
      desc: `${data?.data?.location?.city || "N/A"}`,
    },
    {
      title: "State:",
      desc: `${data?.data?.location?.state || "N/A"}`,
    },
    {
      title: "Zip Code:",
      desc: `${data?.data?.location?.postalCode || "N/A"}`,
    },
  ];
  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] dark:bg-[#1D1D1D] rounded-[20px]">
      <div className="p-5 border-b flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-[22px] sm:text-[28px] leading-normal font-semibold">
          Booking Details
        </h2>
        <div className="flex items-center justify-end flex-wrap-reverse gap-4 ms-auto">
          {data?.data?.likedBy.length > 0 && (
            <p className="flex items-center border border-black rounded-[8px] font-medium py-2 px-4">
              <TbUsersGroup className="me-2" />{" "}
              <span className="text-sm sm:text-base">
                {data?.data?.likedBy.length} People Favorites Venue
              </span>
            </p>
          )}
          <button
            onClick={handleshareOpen}
            className="flex items-center border border-black rounded-[8px] font-medium py-2 px-4"
          >
            <FiShare2 className="me-2" />{" "}
            <span className="text-sm sm:text-base"> Share Venue </span>
          </button>
        </div>
      </div>
      {bookingData?.status === "completed" && mode === "all" && (
        <div>
          <div className="p-5 border-b flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-[18px] sm:text-[24px] leading-normal font-semibold">
              Price Beakdown
            </h2>
            {PayOutDetails?.data?.payment?.status === "completed" ? (
              <p className="flex items-center border bg-[#24D17A] text-white  rounded-[8px] font-medium py-2 px-4">
                <TbCheck className="me-2" />{" "}
                <span className="text-sm sm:text-base">Payment Completed</span>
              </p>
            ) : (
              user.role === "admin" && (
                <button
                  onClick={handleOpen}
                  className="flex items-center border bg-[#24D17A] text-white rounded-[8px] font-medium py-2 px-4"
                >
                  Send to Vendor
                </button>
              )
            )}
          </div>
          <div>
            <div className="py-2 px-5 border-b flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-[12px] sm:text-[18px] leading-normal font-semibold">
                Description
              </h2>
              <h2 className="text-[12px] sm:text-[18px] leading-normal font-semibold">
                Amount
              </h2>
            </div>
            <div className="py-2 px-5 border-b flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-[12px] sm:text-[18px] leading-normal ">
                Booking Price
              </h2>
              <h2 className="text-[12px] sm:text-[18px] leading-normal ">
                $ {PayOutDetails?.data?.totalPrice || 0}
              </h2>
            </div>
            <div className="py-2 px-5 border-b flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-[12px] sm:text-[18px] leading-normal ">
                Admin Fee ({" "}
                {PayOutDetails?.data?.totalPrice
                  ? (
                      ((PayOutDetails?.data?.totalPrice -
                        (PayOutDetails?.data?.payment?.amount || 0)) /
                        PayOutDetails?.data?.totalPrice) *
                      100
                    ).toFixed(2)
                  : "0.00"}
                %)
              </h2>
              <h2 className="text-[12px] sm:text-[18px] leading-normal ">
                ${" "}
                {Number(
                  (PayOutDetails?.data?.totalPrice || 0) -
                    (PayOutDetails?.data?.payment?.amount || 0)
                ).toFixed(2)}
              </h2>
            </div>
            <div className="py-2 px-5 border-b flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-[12px] sm:text-[18px] leading-normal ">
                Vendor Amount ({" "}
                {PayOutDetails?.data?.totalPrice
                  ? (
                      ((PayOutDetails?.data?.payment?.amount || 0) /
                        PayOutDetails?.data?.totalPrice) *
                      100
                    ).toFixed(2)
                  : "0.00"}
                %)
              </h2>
              <h2 className="text-[12px] sm:text-[18px] leading-normal ">
                ${Number(PayOutDetails?.data?.payment?.amount || 0).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between gap-4 flex-wrap">
          <h2 className="text-[22px] sm:text-[28px] leading-normal font-semibold">
            Venue Booking Details
          </h2>
          <div className="flex items-center justify-end gap-4 ms-auto flex-wrap">
            <div className="flex items-center">
              <p className="text-[24px] me-2 font-semibold">Status:</p>
              <p className="text-[20px] font-medium text-[#24D17A]">
                {bookingData?.status}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <VenueDetails data={data?.data} reviews={reviews} />
        </div>
        <div className="mt-5 border-b pb-4 border-[#D6D6D6]">
          <p className="text-[20px] sm:text-[24px] font-semibold">
            Address Details
          </p>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
            {addressdettails.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <p className="text-[20px] sm:text-[24px] font-semibold">
                  {item.title}
                </p>
                <p className="text-base sm:text-[20px] font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 border-b pb-5">
          <p className="text-[20px] sm:text-[24px] font-semibold">
            Offer Amenities and Services Details
          </p>
          <div className="mt-5">
            <OfferAmenities
              title="Offer Amenities"
              data={data?.data?.venuesAmenities}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <p className="text-[20px] sm:text-[24px] font-semibold">
              Guest Information Details
            </p>
          </div>
          <div className="mt-5 border-b pb-5">
            <GuestInfoDetails bookingData={bookingData} />
          </div>
        </div>
        <div className="mt-8">
          <Review reviews={allReviews} />
          <div className="text-center mt-9">
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={reviewLoading}
                  className="text-lg font-medium text-white bg-[#1C1C1C] px-12 py-2 rounded-lg shadow-lg disabled:opacity-50"
                >
                  {reviewLoading ? "Loading..." : "Show more Reviews"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SendPaymentModal
        open={openModal}
        handleClose={handleClose}
        data={PayOutDetails?.data}
      />

      <ShareModal
        open={shareopen}
        onClose={handleshareClose}
        data={data?.data}
        reviews={reviews}
        handleCopyLink={handleCopyLink}
        handleShare={handleShare}
      />
      <Loader loading={isLoading || payoutLoading} />
    </div>
  );
}

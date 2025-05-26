import React, { useEffect } from "react";
import listImg from "../../assets/img/default-image.jpg";
import { Link, useNavigate, useParams } from "react-router";
import {
  IoCloseCircle,
  IoCopy,
  IoGridOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import listImgTwo from "../../assets/img/list-detail2.png";
import listImgThree from "../../assets/img/list-detail3.png";
import listImgFour from "../../assets/img/list-detail4.png";
import listImgFive from "../../assets/img/list-detail5.png";
import listImgSix from "../../assets/img/list-detail6.png";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { FaFacebook, FaFacebookMessenger, FaStar } from "react-icons/fa";
import LikeButton from "../../components/LandingPage/LikeButton";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import Scale from "../../assets/img/scale.png";
import Shower from "../../assets/img/shower.png";
import { styled } from "@mui/material/styles";
import { FaChevronDown } from "react-icons/fa6";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import MapTab from "../../assets/img/map-tab.png";
import FaqsSection from "../../components/LandingPage/FaqsSection";
import Review from "../../components/Country/Review";
import LinearProgress from "@mui/material/LinearProgress";
import { Button, colors, Modal, Box } from "@mui/material";
import { IoIosChatboxes, IoMdMail } from "react-icons/io";
import IOSSwitch from "../../components/VendorDashboard/BlackCheckbox";
import {
  useGetLandingServiceDetailsQuery,
  useGetServiceReviewListQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { useSelector } from "react-redux";
import { currentUser } from "@/store/authSlice";
import { useState } from "react";
import ShareModal from "./ShareModal";
import { toast } from "react-toastify";
import { MdAccessTime, MdCalendarToday } from "react-icons/md";
import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeProvider";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  fontFamily: "tt_chocolates",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <FaChevronDown className="text-black" sx={{ fontSize: "0.9rem" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ListingServiceDetail = () => {
  const params = useParams();
  const { id } = params;
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { data, isLoading } = useGetLandingServiceDetailsQuery(id);
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
  const user = useSelector(currentUser);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);
  const handleLogin = () => {
    setOpenModal(false);
    navigate("/auth/welcome/login");
  };

  const navigate = useNavigate();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const details = [
    {
      id: 1,
      icon: <FaUsers />,
      text: `${data?.data?.noOfCapacity || ""} People`,
    },
    // { id: 2, icon: <IoTimeOutline />, text: "4hr min" },
    // { id: 3, icon: <img src={Scale} alt="" />, text: "2000 sqft" },
    {
      id: 4,
      icon: <img src={Shower} alt="" className="dark:invert" />,
      text: `${data?.data?.noOfRestrooms || ""} Restrooms`,
    },
  ];

  const mediaToShow = data?.data?.media.slice(0, 5);

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

  const sortedServiceDays = [...(data?.data?.serviceDays || [])].sort(
    (a, b) =>
      dayOrder.indexOf(
        a.day.charAt(0).toUpperCase() + a.day.slice(1).toLowerCase()
      ) -
      dayOrder.indexOf(
        b.day.charAt(0).toUpperCase() + b.day.slice(1).toLowerCase()
      )
  );

  return (
    <div>
      <div className="py-14">
        <div className="mycontainer">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div>
                {(() => {
                  const coverMedia = data?.data?.media?.find((m) => m.cover);
                  if (!coverMedia) return null;

                  return coverMedia.type === "video" ? (
                    <video
                      src={coverMedia.url || "/video-default.png"}
                      className="w-12 h-12 object-cover rounded"
                      controls={false}
                    />
                  ) : (
                    <img
                      src={coverMedia.url || "/video-default.png"}
                      alt="Cover"
                      className="w-12 h-12 object-cover rounded"
                    />
                  );
                })()}
              </div>
              <div>
                <p className="text-sm">Listed By:</p>
                <h6 className="font-bold text-[#484848] dark:text-white text-lg">
                  {data?.data?.vendorId?.fullName}
                </h6>
              </div>
            </div>

            <div>
              <button
                onClick={() =>
                  navigate("/more-photo", {
                    state: { data: data?.data, reviews: reviews },
                  })
                }
                className="text-[#3551B6] flex items-center gap-2 font-semibold text-sm border border-[#3551B6] py-2 px-4 rounded-lg"
              >
                <IoGridOutline className="text-black" /> Show all photos
              </button>
            </div>
          </div>
          <div className="grid lg:grid-rows-2 lg:grid-flow-col sm:grid-cols-3 grid-cols-2 gap-3 mt-5">
            {mediaToShow?.map((media, index) => (
              <div
                key={media._id}
                className={`${index === 0 ? "lg:row-span-2" : ""}`}
              >
                {media.type === "video" ? (
                  <video
                    controls
                    className={`w-full object-cover rounded-xl ${
                      index === 0 ? "h-full lg:h-[500px]" : "h-[240px]"
                    }`}
                  >
                    <source src={media.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={media.url}
                    alt={`Media ${index + 1}`}
                    className={`w-full object-cover rounded-xl ${
                      index === 0 ? "h-full lg:h-[500px]" : "h-[240px]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4 mt-5">
            <div className="xl:col-start-1 xl:col-end-3">
              <div className="bg-[#F7F7F7] px-4 py-6 border border-black rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-[24px] font-semibold  text-[#484848]">
                    {data?.data.title || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LikeButton
                    likedByData={data?.data?.likedBy}
                    serviceID={id}
                  />
                  <button onClick={handleshareOpen}>
                    <IoShareSocialOutline className="text-xl text-black" />
                  </button>
                </div>
              </div>
              <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3 mt-3">
                {details.map((item) => (
                  <div
                    key={item.id}
                    className="border border-black py-2 rounded-xl px-2 flex items-center gap-2 justify-center"
                  >
                    {item.icon}
                    <p className="font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h5 className="font-semibold text-[24px]">
                  Apartment Description
                </h5>
                <p className="text-sm mt-6">{data?.data?.description}</p>
                <p className="text-sm mt-4">{data?.data?.venueDescription}</p>
              </div>
              <div className="mt-8">
                <Accordion
                  sx={{
                    border: 0,
                    marginBottom: "10px",
                    backgroundColor: isDark ? "#1f2937" : "#fff",
                    color: isDark ? "#fff" : "#000",
                  }}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    sx={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      backgroundColor: isDark ? "#111827" : "#f9f9f9",
                      color: isDark ? "#fff" : "#000",
                    }}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <p
                      className={`font-medium text-lg ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Offered Amenities
                    </p>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      border: 0,
                      backgroundColor: isDark ? "#1f2937" : "#fff",
                      color: isDark ? "#fff" : "#000",
                    }}
                  >
                    <Typography component="div">
                      {data?.data?.venuesAmenities?.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-3 gap-y-12 main-font">
                          {data.data.venuesAmenities.map((item) => (
                            <div key={item._id}>
                              <p
                                className={`font-medium sm:text-lg text-sm ${
                                  isDark ? "text-white" : "text-[#535353]"
                                }`}
                              >
                                {item.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p
                          className={`text-base ${
                            isDark ? "text-white" : "text-[#535353]"
                          }`}
                        >
                          No amenities available.
                        </p>
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  sx={{
                    border: 0,
                    marginBottom: "10px",
                    backgroundColor: isDark ? "#1f2937" : "#fff",
                    color: isDark ? "#fff" : "#000",
                  }}
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    sx={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      backgroundColor: isDark ? "#111827" : "#f9f9f9",
                      color: isDark ? "#fff" : "#000",
                    }}
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                  >
                    <p
                      className={`font-medium text-lg ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Rules and regulations
                    </p>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      border: 0,
                      backgroundColor: isDark ? "#1f2937" : "#fff",
                      color: isDark ? "#fff" : "#000",
                    }}
                  >
                    <Typography>
                      <div>
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 main-font">
                          <div>
                            <p className="text-lg font-semibold">Photography</p>
                            <p className="text-md">{`${
                              data?.data?.photography
                                ? "Allowed"
                                : "Not Allowed"
                            } `}</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Smoking</p>
                            <p className="text-md">{`${
                              data?.data?.drugsAllowed
                                ? "Allowed"
                                : "Not Allowed"
                            } `}</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold">
                              Events/Parties
                            </p>
                            <p className="text-md">{`${
                              data?.data?.eventAllowed
                                ? "Allowed"
                                : "Not Allowed"
                            } `}</p>
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <div>
              <div className="bg-[#E7E7E7] rounded-lg p-3">
                <p className="text-lg text-[#484848] font-medium">Reviews</p>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-600" />
                  <p className="font-medium text-[#484848]">
                    {reviews?.averageRating || 0}
                  </p>
                  <p className="font-medium text-[#484848]">Reviews</p>

                  <p className="font-medium text-[#484848] ">
                    {reviews?.totalReviews || 0} reviews
                  </p>
                </div>
              </div>

              <div className="bg-white shadow-lg border rounded-lg p-5 mt-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <MdCalendarToday className="text-black" />
                  Service Days
                </h2>

                <div className="grid grid-cols-1  gap-4">
                  {sortedServiceDays.map((dayItem) => {
                    const formattedDay =
                      dayItem.day.charAt(0).toUpperCase() +
                      dayItem.day.slice(1).toLowerCase();

                    return (
                      <div
                        key={dayItem.id}
                        className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-black text-lg font-medium capitalize">
                            {formattedDay}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MdAccessTime className="text-black" />
                          {dayItem.startTime} - {dayItem.endTime}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white shadow-lg border rounded-lg p-3 mt-4">
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      src={
                        data?.data?.media?.find((item) => item.cover)?.url ||
                        listImg
                      }
                      alt=""
                      className="w-24 h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-lg text-black">
                      {data?.data?.title}{" "}
                    </h5>
                    <p className="flex items-center gap-1 text-[#5E5E5E] font-medium text-sm">
                      <PiMedalMilitaryFill /> Vendor
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-4">
                  {/* Check-in & Checkout */}
                  <div className="rounded-xl border border-gray-300 dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm text-gray-700 dark:text-gray-300 font-semibold main-font">
                          CHECK-IN TIME
                        </h6>
                        <p className="text-sm text-gray-800 dark:text-white main-font">
                          {data?.data?.checkInTime || "—"}
                        </p>
                      </div>
                      <div>
                        <h6 className="text-sm text-gray-700 dark:text-gray-300 font-semibold main-font">
                          CHECKOUT TIME
                        </h6>
                        <p className="text-sm text-gray-800 dark:text-white main-font">
                          {data?.data?.checkOutTime || "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="rounded-xl border border-gray-300 dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-sm">
                    <div>
                      <h6 className="text-sm text-gray-700 dark:text-gray-300 font-semibold main-font">
                        GUESTS
                      </h6>
                      <p className="text-sm text-gray-800 dark:text-white main-font">
                        {data?.data?.maxGuests} guests
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="my-3"></hr>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-base text-black">
                      Total Price
                    </h5>
                  </div>
                  <div>
                    <p className="font-medium text-base text-black ">
                      $ {data?.data?.totalPrice}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (user.isAuthenticated) {
                        if (user.userType === "customer") {
                          navigate("/request-book", {
                            state: { data: data?.data, reviews },
                          });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          setOpenModal(true);
                        }
                      } else {
                        navigate("/auth/welcome/login");
                      }
                    }}
                    className="text-lg flex justify-center font-medium py-2 bg-black text-white w-full rounded-lg"
                  >
                    Request to Book
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-14">
            <div className="mycontainer">
              <FaqsSection faqData={data?.data?.faqs} />
            </div>
          </div>
          <div className="py-14">
            <div className="mycontainer">
              <h4 className="sm:text-4xl text-2xl font-bold">Reviews</h4>
              <div className="">
                <div className="flex items-center gap-2 mt-6">
                  <p className="text-[#484848] font-semibold dark:text-white">
                    Reviews
                  </p>
                  <p className="text-[#484848] font-semibold dark:text-white flex items-center gap-2">
                    <FaStar className="text-yellow-600" />
                    {reviews?.averageRating || 0}
                  </p>
                </div>
              </div>
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
        </div>
      </div>
      {/* Share Modal */}
      <ShareModal
        open={shareopen}
        onClose={handleshareClose}
        data={data?.data}
        reviews={reviews}
        handleCopyLink={handleCopyLink}
        handleShare={handleShare}
      />

      {/* Login Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "90%",
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2} color="error">
            Only customers can book.
          </Typography>
          <Typography fontSize={14} mb={3} sx={{ color: "black" }}>
            Please log in with a customer account to proceed with the booking.
          </Typography>
          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#000",
              color: "white",
              "&:hover": { bgcolor: "#333" },
              textTransform: "capitalize",
            }}
          >
            Login
          </Button>
        </Box>
      </Modal>

      <Loader loading={isLoading || reviewLoading} />
    </div>
  );
};

export default ListingServiceDetail;

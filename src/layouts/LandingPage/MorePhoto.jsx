import React from "react";
import listImgTwo from "../../assets/img/list-detail2.png";
import listImgThree from "../../assets/img/list-detail3.png";
import listImgFour from "../../assets/img/list-detail4.png";
import listImgFive from "../../assets/img/list-detail5.png";
import listImgSix from "../../assets/img/list-detail6.png";
import LikeButton from "../../components/LandingPage/LikeButton";
import {
  IoCaretBack,
  IoCloseCircle,
  IoCopy,
  IoLogoWhatsapp,
  IoShareSocialOutline,
} from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { Modal } from "@mui/material";
import { FaFacebook, FaFacebookMessenger, FaStar } from "react-icons/fa";
import { IoIosChatboxes, IoMdMail } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import ShareModal from "./ShareModal";

const MorePhoto = () => {
  const location = useLocation();
  const data = location.state?.data;
  const reviews = location.state?.reviews;

  const [shareopen, setshareOpen] = React.useState(false);
  const [Likeopen, setLikeOpen] = React.useState(false);

  const handleshareOpen = () => setshareOpen(true);
  const handleshareClose = () => setshareOpen(false);

  const handleLikeOpen = () => setLikeOpen(true);
  const handleLikeClose = () => setLikeOpen(false);

  const listingUrl = `${window.location.origin}/listing-detail/${data?.id}`;

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

  return (
    <div>
      <div className="py-12">
        <div className="mycontainer">
          <div>
            <Link to={-1} className=" flex items-center">
              <IoCaretBack />
              <p className="ms-1">Listing Detail</p>
            </Link>
          </div>
          <div className="bg-[#F7F7F7] p-3 border border-black rounded-lg flex items-center mt-5 justify-between">
            <div>
              <p className="font-semibold">{data?.title}</p>
              <p>{data?.location?.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleshareOpen}>
                <IoShareSocialOutline className="text-xl" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {data?.media?.map((item, index) => (
              <div
                key={item._id || index}
                className="overflow-hidden rounded-xl shadow-md group"
              >
                {item.type === "video" ? (
                  <video
                    controls
                    className="w-full h-64 object-cover rounded-xl"
                  >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={item.url}
                    alt={`Media ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShareModal
        open={shareopen}
        onClose={handleshareClose}
        data={data}
        reviews={reviews}
        handleCopyLink={handleCopyLink}
        handleShare={handleShare}
      />

      <Modal
        open={Likeopen}
        onClose={handleLikeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[550px] bg-white rounded-[20px]">
          <div>
            <div className="flex justify-between items-center border-b p-3">
              <div>
                <h4 className="font-semibold text-[26px]">Create Wishlist</h4>
              </div>
              <div onClick={handleLikeClose} className="cursor-pointer">
                <IoCloseCircle className="text-xl text-[#C13515]" />
              </div>
            </div>
            <div className="p-3">
              <form action="">
                <div>
                  <label className="text-lg" htmlFor="">
                    Name
                  </label>
                  <input
                    type="text"
                    className="bg-[#F7FBFF] px-2 py-3 w-full border rounded-lg text-lg"
                    placeholder="Rooms, 2024"
                  />
                  <span className="text-sm">11/50 charachters</span>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <div>
                    <input
                      onClick={handleLikeClose}
                      type="reset"
                      className="underline cursor-pointer"
                      value="Clear"
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="bg-[#1C1C1C] py-2 px-7 text-white rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MorePhoto;

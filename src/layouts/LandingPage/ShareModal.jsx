import React from "react";
import { Modal } from "@mui/material";
import { FaFacebook, FaFacebookMessenger, FaStar } from "react-icons/fa";
import { IoIosChatboxes, IoMdMail } from "react-icons/io";
import {
  IoCaretBack,
  IoCloseCircle,
  IoCopy,
  IoLogoWhatsapp,
  IoShareSocialOutline,
} from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";

import { Link } from "react-router-dom";

const ShareModal = ({
  open,
  onClose,
  data,
  reviews,
  handleCopyLink,
  handleShare,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="share-modal-title"
      aria-describedby="share-modal-description"
      sx={{ m: 2 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[550px] bg-white dark:bg-[#1e1e1e] rounded-[20px] shadow-xl dark:shadow-black/50">
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 p-3">
          <h4 className="font-semibold text-[26px] text-gray-900 dark:text-white">
            Share this experience
          </h4>
          <div onClick={onClose} className="cursor-pointer">
            <IoCloseCircle className="text-xl text-[#979797] dark:text-gray-400" />
          </div>
        </div>

        <div className="p-4">
          <div className="p-4 bg-[#E7E7E7] dark:bg-gray-700 rounded-[8px] mb-4">
            <div className="flex items-center gap-4 flex-wrap">
              <img
                src={
                  data?.media?.find((img) => img.cover)?.url || "/fallback.jpg"
                }
                alt="cover"
                className="w-24 h-16 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h5 className="font-medium text-lg text-[#484848] dark:text-gray-200 truncate">
                  {data?.title}
                </h5>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <FaStar className="text-yellow-600" />
                  <p className="text-sm font-medium text-[#484848] dark:text-gray-300">
                    {reviews?.averageRating || 0}
                  </p>
                  <p className="text-sm font-medium text-[#484848] dark:text-gray-300">
                    Reviews
                  </p>
                  <p className="text-sm text-[#484848] dark:text-gray-300 font-medium">
                    {reviews?.totalReviews || 0} reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid min-[480px]:grid-cols-2 sm:grid-cols-3 gap-4">
            <ShareButton
              icon={<IoCopy />}
              label="Copy link"
              onClick={handleCopyLink}
            />
            <ShareButton
              icon={<IoMdMail />}
              label="Email"
              onClick={() => handleShare("email")}
            />
            <ShareButton
              icon={<IoLogoWhatsapp />}
              label="WhatsApp"
              onClick={() => handleShare("whatsapp")}
            />
            <ShareButton
              icon={<FaFacebook />}
              label="Facebook"
              onClick={() => handleShare("facebook")}
            />
            <ShareButton
              icon={<IoIosChatboxes />}
              label="Messages"
              onClick={() => handleShare("messages")}
            />
            <ShareButton
              icon={<FaTelegramPlane />}
              label="Telegram"
              onClick={() => handleShare("telegram")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const ShareButton = ({ icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-3 border border-black dark:border-gray-400 justify-center py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition text-black dark:text-gray-200"
  >
    {icon}
    <p>{label}</p>
  </button>
);

export default ShareModal;

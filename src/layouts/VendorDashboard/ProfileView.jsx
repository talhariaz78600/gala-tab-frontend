import React, { useState } from "react";
import Profile from "../../assets/img/profile.png";
import { GoDotFill } from "react-icons/go";
import ProfileName from "../../assets/img/profile-name.png";
import { Link, useLocation } from "react-router";
import { IoPencil } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import MailAddressOne from "../../assets/img/mail-address-1.png";
import MailAddressTwo from "../../assets/img/mail-address-2.png";
import MailAddressThree from "../../assets/img/mail-address-3.png";
import MailAddressFour from "../../assets/img/mail-address-4.png";
import MailAddressFive from "../../assets/img/mail-address-5.png";
import HelpButton from "../../components/VendorDashboard/HelpButton";
import { ReviewList } from "../Superadmin";
import Review from "../../components/Country/Review";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RiCloseCircleFill } from "react-icons/ri";
import Rating from "@mui/material/Rating";
import { Margin } from "@mui/icons-material";
import { useGetUserProfileDetailQuery } from "@/api/apiSlice";
import ProfileDetails from "@/components/adminDashboard/ProfileDetails";

const ProfileView = () => {
  const location = useLocation();
  const { id } = location.state;

  const { data, isLoading } = useGetUserProfileDetailQuery(id);

  const user = data?.data;

  return (
    <div>
      <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] sm:p-5 p-3 min-h-[calc(100dvh-130px)] rounded-[20px] flex flex-col">
        <div>
          <h4 className="font-semibold sm:text-3xl text-xl text-black dark:text-white">
            About Profile
          </h4>

          <ProfileDetails data={user} />
        </div>
        <div className="flex justify-end mt-auto">
          <div className="mt-10">
            <HelpButton path="/vendor-dashboard/vendor-help-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

import Profile from "../../assets/img/profile.png";
import ProfileName from "../../assets/img/profile-name.png";
import { Link } from "react-router";
import { IoPencil } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import MailAddressOne from "../../assets/img/mail-address-1.png";
import MailAddressTwo from "../../assets/img/mail-address-2.png";
import MailAddressThree from "../../assets/img/mail-address-3.png";
import MailAddressFour from "../../assets/img/mail-address-4.png";
import MailAddressFive from "../../assets/img/mail-address-5.png";
import HelpButton from "../../components/VendorDashboard/HelpButton";
import CurrentUserProfile from "@/components/User/CurrentUserProfile";

const VendorProfile = () => {
  return (
    <>
      <CurrentUserProfile />
    </>
  );
};

export default VendorProfile;

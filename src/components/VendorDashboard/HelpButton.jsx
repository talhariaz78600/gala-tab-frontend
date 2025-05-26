import React from "react";
import { Link } from "react-router";
import callIcons from "../../assets/img/callIcons.png";

export default function HelpButton({ user }) {
  const getHelpPath = (role) => {
    switch (role) {
      case "customer":
        return "/user-dashboard/user-help";
      case "vendor":
        return "/vendor-dashboard/vendor-help-center";
      case "admin":
        return "/admin-dashboard/contact-support";
      default:
        return "/";
    }
  };

  return (
    <Link
      to={getHelpPath(user?.role)}
      className="flex items-center gap-2 bg-black py-3 px-5 rounded-full cursor-pointer"
    >
      <img src={callIcons} alt="img" />
      <p className="text-sm text-white font-medium">Help</p>
    </Link>
  );
}

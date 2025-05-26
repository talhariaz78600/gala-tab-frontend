import React from "react";
import MailAddressOne from "../../assets/img/mail-address-1.png";
import MailAddressTwo from "../../assets/img/mail-address-2.png";
import MailAddressThree from "../../assets/img/mail-address-3.png";
import MailAddressFour from "../../assets/img/mail-address-4.png";
import MailAddressFive from "../../assets/img/mail-address-5.png";

export default function PersonalInfo({ data }) {
  const userDetails = [
    {
      label: "First Name",
      value: `${data?.firstName} `,
      icon: MailAddressOne,
    },
    {
      label: "Last Name",
      value: `${data?.lastName}`,
      icon: MailAddressOne,
    },
    {
      label: "Email",
      value: `${data?.email}`,
      icon: MailAddressTwo,
    },
    {
      label: "Office Number",
      value: `${data?.officeContact || "Not Available"}`,
      icon: MailAddressThree,
    },
    {
      label: "Mobile Number",
      value: `${data?.contact}`,
      icon: MailAddressThree,
    },
    {
      label: "Emergency Number",
      value: `${data?.emergencyContact || "Not Available"}`,
      icon: MailAddressThree,
    },
    {
      label: "Company Name",
      value: `${data?.companyName || "Not Available"}`,
      icon: MailAddressFour,
    },
    {
      label: "Mailing Address",
      value: `${data?.address?.mailingAddress || "Not Available"}`,
      icon: MailAddressFive,
    },
    {
      label: "Country",
      value: `${data?.country?.country || "Not Available"}`,
      icon: MailAddressFive,
    },
    {
      label: "City",
      value: `${data?.city?.city || "Not Available"}`,
      icon: MailAddressFive,
    },
  ];
  return (
    <div>
      <h4 className="text-[#303C6C] dark:text-white font-bold text-[20px]">
        Personal Information
      </h4>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 gap-4 mt-4">
        {userDetails.map((detail, index) => (
          <div key={index}>
            <h6 className="text-[#303C6C] dark:text-white text-lg font-medium">
              {detail.label}
            </h6>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={detail.icon}
                alt=""
                className="w-4 h-4 object-contain invert-0 dark:invert"
              />
              <p className="text-[#202224] dark:text-gray-300 font-medium text-base">
                {detail.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

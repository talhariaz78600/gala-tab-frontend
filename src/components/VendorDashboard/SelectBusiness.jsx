import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import CustomRadio from "./CustomRadio";
import LocationIcon from "../../assets/img/location-icon.svg";
import LocationIconWhite from "../../assets/img/location-icon-white.svg";
import DecorationIcon from "../../assets/img/Decoration-icon.svg";
import DecorationIconWhite from "../../assets/img/Decoration-icon-white.svg";
import CateringIcon from "../../assets/img/catering-icon.svg";
import CateringIconWhite from "../../assets/img/catering-icon-white.svg";
import CakesIcon from "../../assets/img/cakes-icon.svg";
import CakesIconWhite from "../../assets/img/cakes-icon-white.svg";
import DjIcon from "../../assets/img/dj-icon.svg";
import DjIconWhite from "../../assets/img/dj-icon-white.svg";
import EntertainmentIcon from "../../assets/img/entertainment-icon.svg";
import EntertainmentIconWhite from "../../assets/img/entertainment-icon-white.svg";
import PhotographyIcon from "../../assets/img/photography-icon.svg";
import PhotographyIconWhite from "../../assets/img/photography-icon-white.svg";
import TransportationIcon from "../../assets/img/Transportaion-icon.svg";
import TransportationIconWhite from "../../assets/img/Transportaion-icon-white.svg";
import BeautyIcon from "../../assets/img/beauty-icon.svg";
import BeautyIconWhite from "../../assets/img/beauty-icon-white.svg";
import StaffIcon from "../../assets/img/staff-icon.svg";
import StaffIconWhite from "../../assets/img/staff-icon-white.svg";
import FashionIcon from "../../assets/img/Fashion-icon.svg";
import FashionIconWhite from "../../assets/img/Fashion-icon-white.svg";

export default function SelectBusiness() {
  const [selectedRadio, setSelectedRadio] = useState(null);
  const handleReset = () => {
    setSelectedRadio(null);
  };

  const businesstypes = [
    {
      name: "SelectBusiness",
      label: "Venues",
      img1: LocationIcon,
      img2: LocationIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Decoration",
      img1: DecorationIcon,
      img2: DecorationIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Catering",
      img1: CateringIcon,
      img2: CateringIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Cakes",
      img1: CakesIcon,
      img2: CakesIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "DJ's",
      img1: DjIcon,
      img2: DjIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Entertainment",
      img1: EntertainmentIcon,
      img2: EntertainmentIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Photography & Videography",
      img1: PhotographyIcon,
      img2: PhotographyIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Transportation",
      img1: TransportationIcon,
      img2: TransportationIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Beauty",
      img1: BeautyIcon,
      img2: BeautyIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Staff",
      img1: StaffIcon,
      img2: StaffIconWhite,
    },
    {
      name: "SelectBusiness",
      label: "Fashion",
      img1: FashionIcon,
      img2: FashionIconWhite,
    },
  ];

  const formatId = (label) => label.replace(/\s+/g, "-");

  return (
    <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC]">
      <div className="flex items-center justify-between p-5 border-b border-[#CDCDCD]">
        <p className="text-[#3551B6] text-[20px] font-semibold">
          Select Business
        </p>
        <button>
          <IoCloseCircle className="text-[#979797] text-[28px]" />
        </button>
      </div>
      <form action="">
        <div className="grid grid-cols-3 gap-4 p-5">
          {businesstypes.map((business, index) => (
            <CustomRadio
              key={index}
              id={formatId(business.label) + "radio"}
              name={business.name}
              label={business.label}
              img1={business.img1}
              img2={business.img2}
              selected={selectedRadio === business.label}
              onChange={() => setSelectedRadio(business.label)}
            />
          ))}
        </div>
        <div className="flex items-center justify-between px-5 p-5 mt-5">
          <button
            type="button"
            onClick={handleReset}
            className="font-medium underline"
          >
            Clear
          </button>
          <button
            type="submit"
            className="font-medium text-white bg-black py-3 px-10 rounded-[7px]"
          >
            Show Calendar Result
          </button>
        </div>
      </form>
    </div>
  );
}

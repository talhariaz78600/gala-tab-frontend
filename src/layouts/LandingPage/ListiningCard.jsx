import * as React from "react";
import { FaStar, FaHeart, FaShareNodes } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import icon from "../../assets/img/buttonIcon.png";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom"; // Correct import

export default function ListingCard(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [isLiked, setIsLiked] = React.useState(false);

  // Toggle the like state
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full p-3">
      <div className="border rounded-md shadow-md p-2 bg-white sliders">
        {/* Image & Carousel */}
        <div className="relative">
          <Slider {...settings}>
            {props.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={props.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <p className="p-2 shadow-xl bg-white rounded-xl text-[#1C1C1C] font-medium text-xs">
                    Verified listing
                  </p>
                </div>
                <div className="flex justify-between bg-zinc-200/40 absolute bottom-0 w-full p-2">
                  <div className="flex items-center">
                    <FiUsers className="text-white" />
                    <p className="text-white ps-2">
                      {Array.isArray(props.guests)
                        ? props.guests[index]
                        : props.guests}{" "}
                      Guests
                    </p>
                  </div>
                  <div>
                    <p className="text-white ps-2">
                      {Array.isArray(props.price)
                        ? props.price[index]
                        : props.price}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="flex gap-2 items-center">
                    <Link to="#">
                      <FaShareNodes className="text-white opacity-[0.8] hover:opacity-[1]" />
                    </Link>
                    <div
                      className="bg-white bg-opacity-90 rounded-full p-2 cursor-pointer shadow"
                      onClick={toggleLike}
                    >
                      <FaHeart
                        className={`transition-colors duration-300 ${
                          isLiked ? "text-red-500" : "text-[#616250]"
                        }`}
                        size={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Details */}
        <div className="mt-2">
          <h4 className="font-medium text-lg text-[#1C1C1C]">{props.title}</h4>
          <div className="flex items-center gap-2">
            <IoLocationOutline />
            <p className="font-medium text-sm">{props.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-600" />
            <p className="font-medium text-sm text-[#484848]">5.0</p>
            <p className="font-medium text-sm text-[#484848]">Reviews</p>
            <Link
              to="#"
              className="font-medium text-sm text-[#484848] underline"
            >
              {props.reviews} reviews
            </Link>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <p className="font-medium text-sm">Responds within 1/hr</p>
            <Link
              to="/listing-detail"
              className="flex items-center gap-2 bg-[#1C1C1C] text-white py-2 px-4 rounded-xl"
            >
              Detail
              <img src={icon} className="size-[14px]" alt="Detail Icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

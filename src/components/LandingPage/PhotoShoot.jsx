import React from "react";
import SliderImg from "../../assets/img/slider-img.png";
import SliderImgTwo from "../../assets/img/slider-img2.png";
import SliderImgThree from "../../assets/img/slider-img3.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaShareNodes, FaUsers } from "react-icons/fa6";
import LikeButton from "./LikeButton";
import Slider from "react-slick";
import icon from "../../assets/img/buttonIcon.png";

const PhotoShoot = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const venues = [
    {
      id: 1,
      images: [SliderImg, SliderImg],
      title: "Modern Wedding Hall",
      guests: [45, 60],
      price: ["$200/hr", "$250/hr"],
      location: "100 Smart Street, LA, USA",
      reviews: 3,
    },
    {
      id: 2,
      images: [SliderImgTwo, SliderImgTwo],
      title: "Elegant Event Space",
      guests: [50, 70],
      price: ["$300/hr", "$350/hr"],
      location: "200 Grand Avenue, NY, USA",
      reviews: 4,
    },
    {
      id: 3,
      images: [SliderImgThree, SliderImgThree],
      title: "Classic Banquet Hall",
      guests: [55, 65],
      price: ["$400/hr", "$450/hr"],
      location: "300 Park Avenue, SF, USA",
      reviews: 5,
    },
    {
      id: 3,
      images: [SliderImgThree, SliderImgThree],
      title: "Classic Banquet Hall",
      guests: [55, 65],
      price: ["$400/hr", "$450/hr"],
      location: "300 Park Avenue, SF, USA",
      reviews: 5,
    },
    {
      id: 1,
      images: [SliderImg, SliderImg],
      title: "Modern Wedding Hall",
      guests: [45, 60],
      price: ["$200/hr", "$250/hr"],
      location: "100 Smart Street, LA, USA",
      reviews: 3,
    },
    {
      id: 2,
      images: [SliderImgTwo, SliderImgTwo],
      title: "Elegant Event Space",
      guests: [50, 70],
      price: ["$300/hr", "$350/hr"],
      location: "200 Grand Avenue, NY, USA",
      reviews: 4,
    },
    {
      id: 3,
      images: [SliderImgThree, SliderImgThree],
      title: "Classic Banquet Hall",
      guests: [55, 65],
      price: ["$400/hr", "$450/hr"],
      location: "300 Park Avenue, SF, USA",
      reviews: 5,
    },
    {
      id: 3,
      images: [SliderImgThree, SliderImgThree],
      title: "Classic Banquet Hall",
      guests: [55, 65],
      price: ["$400/hr", "$450/hr"],
      location: "300 Park Avenue, SF, USA",
      reviews: 5,
    },
    {
      id: 1,
      images: [SliderImg, SliderImg],
      title: "Modern Wedding Hall",
      guests: [45, 60],
      price: ["$200/hr", "$250/hr"],
      location: "100 Smart Street, LA, USA",
      reviews: 3,
    },
    {
      id: 2,
      images: [SliderImgTwo, SliderImgTwo],
      title: "Elegant Event Space",
      guests: [50, 70],
      price: ["$300/hr", "$350/hr"],
      location: "200 Grand Avenue, NY, USA",
      reviews: 4,
    },
    {
      id: 3,
      images: [SliderImgThree, SliderImgThree],
      title: "Classic Banquet Hall",
      guests: [55, 65],
      price: ["$400/hr", "$450/hr"],
      location: "300 Park Avenue, SF, USA",
      reviews: 5,
    },
    {
      id: 3,
      images: [SliderImgThree, SliderImgThree],
      title: "Classic Banquet Hall",
      guests: [55, 65],
      price: ["$400/hr", "$450/hr"],
      location: "300 Park Avenue, SF, USA",
      reviews: 5,
    },
  ];

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
      {venues.map((venue, index) => (
        <div
          key={index}
          className="bg-white shadow-sm border p-2 rounded-xl sliders cursor-pointer"
          onClick={() => handleNavigation("/listing-detail")}
        >
          <Slider {...settings}>
            {venue.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={venue.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <p className="p-2 shadow-xl bg-white rounded-xl text-[#1C1C1C] font-medium text-xs">
                    Verified listing
                  </p>
                </div>
                <div className="flex justify-between bg-zinc-200/40 absolute bottom-0 w-full p-2">
                  <div className="flex items-center">
                    <FaUsers className="text-white" />
                    <p className="text-white ps-2">
                      {venue.guests[index]} Guests
                    </p>
                  </div>
                  <div>
                    <p className="text-white ps-2">{venue.price[index]}</p>
                  </div>
                </div>
                <div className="absolute top-[8px] right-[8px]">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex gap-2 items-center"
                  >
                    <Link to="#">
                      <FaShareNodes className="text-white opacity-[0.8] hover:opacity-[1]" />
                    </Link>
                    <LikeButton />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="mt-2">
            <h4 className="font-medium text-lg text-[#1C1C1C]">
              {venue.title}
            </h4>
            <div className="flex items-center mt-3 gap-2">
              <IoLocationOutline />
              <p className="font-medium text-sm">{venue.location}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <FaStar className="text-yellow-600" />
              <p className="font-medium text-sm text-[#484848]">5.0</p>
              <p className="font-medium text-sm text-[#484848]">Reviews</p>
              <Link
                to="#"
                className="font-medium text-sm text-[#484848] underline"
              >
                {venue.reviews} reviews
              </Link>
            </div>
            <div className="flex items-center justify-between gap-2 mt-2">
              <p className="font-medium text-sm">Responds within 1/hr</p>
              <Link
                to="/listing-detail"
                className="flex items-center gap-2 bg-[#1C1C1C] text-white py-3 px-7 rounded-xl"
              >
                Detail <img src={icon} alt="" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoShoot;

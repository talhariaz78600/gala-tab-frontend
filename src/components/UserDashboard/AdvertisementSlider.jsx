import React from "react";
import { Link } from "react-router";
import Slider from "react-slick";

export default function AdvertisementSlider({ advertisements }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    // speed: 1000,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {advertisements?.map((image, index) => (
        <div className="px-3 outline-none" key={index}>
          <a href={image.link || "/"} target="_blank" rel="noopener noreferrer">
            <img
              className="rounded-[9px] object-cover w-full aspect-[2/1] brightness-90"
              src={image.image}
              alt={image.alt || `Slide ${index + 1}`}
            />
          </a>
        </div>
      ))}
    </Slider>
  );
}

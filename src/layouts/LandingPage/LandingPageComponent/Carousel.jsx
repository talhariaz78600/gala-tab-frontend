import React from "react";
import Slider from "react-slick";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

// Import your images
import Image from "../../../assets/image/Image.png";
import Image1 from "../../../assets/image/Image1.png";
import Image2 from "../../../assets/image/Image2.png";
import Image3 from "../../../assets/image/Image3.png";
import MadeOne from "../../../assets/img/made-1.png";
import MadeTwo from "../../../assets/img/made-2.png";

function SampleNextArrow(props) {
  return (
    <div className="absolute top-1/2 hidden md:block left-full z-10 translate-y-[-50%] rounded-full">
      <img
        src={MadeOne}
        alt=""
        onClick={props.onClick}
        className="w-[50px !important] h-[50px] max-w-[50px] me-[14px] ms-[14px] cursor-pointer"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  return (
    <div className="absolute top-1/2 hidden md:block right-full z-10 translate-y-[-50%] rounded-full">
      <img
        src={MadeTwo}
        alt=""
        onClick={props.onClick}
        className="w-[50px] h-[50px] max-w-[50px] me-[14px] cursor-pointer"
      />
    </div>
  );
}

function CarouselSize() {
  // Array of images and corresponding titles/descriptions
  const cardData = [
    {
      img: Image2,
      title: "Decorations",
      description: "Book a unique space for you",
    },
    {
      img: Image3,
      title: "Catering",
      description: "Explore our premium spaces.",
    },
    {
      img: Image,
      title: "Entertainment",
      description: "Perfect venues for all events.",
    },
    {
      img: Image1,
      title: "Photography",
      description: "Discover ideal event spaces.",
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          // arrows:false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider className="md:mx-[64px]" {...settings}>
        {cardData.map((card, index) => (
          <div key={index} className="p-2">
            <div className="overflow-hidden rounded-[14px] relative">
              {/* Background Image */}
              <div
                className="w-full min-h-[360px] aspect-[1/1.2] bg-cover bg-top relative"
                style={{
                  backgroundImage: `url(${card.img})`,
                }}
              >
                {/* Semi-Transparent Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#FFFFFFE5] p-3 m-2 rounded-[14px] ">
                  <h3 className="text-[22px] leading-none font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm mt-2 text-[#171717]">
                    {card.description}
                  </p>
                  <button className="w-full py-2 bg-[#1C1C1C] shadow-[0px_11.72px_17.57px_0px_#00000033] text-white text-sm font-medium rounded-[5px] mt-4">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default CarouselSize;

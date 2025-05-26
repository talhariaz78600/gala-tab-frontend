import React from "react";
import Slider from "react-slick";
import Image from "../../../assets/image/Image 1.png";
import Image2 from "../../../assets/image/Image 2.png";
import Image3 from "../../../assets/image/Image 3.png";
import Image4 from "../../../assets/image/Image 4.png";

function CustomPagingSlider() {
  const tabs = [
    { name: "Birthdays", images: [Image] },
    { name: "Baby shower", images: [Image2] },
    { name: "Gender reveal", images: [Image3] },
    { name: "Sweet 16", images: [Image3] },
    { name: "Anniversary", images: [Image4] },
    { name: "Graduation Party", images: [Image] },
    { name: "Engagement Party", images: [Image2] },
    { name: "Wedding", images: [Image2] },
    { name: "Corporate Event", images: [Image3] },
    { name: "Farewell Party", images: [Image4] },
    { name: "Holiday Party", images: [Image] },
    { name: "Retirement Party", images: [Image2] },
    { name: "Housewarming", images: [Image3] },
    { name: "Baby Naming Ceremony", images: [Image4] },
    { name: "Festival Celebration", images: [Image] },
  ];

  const settings = {
    customPaging: function (i) {
      return <button>{tabs[i].name}</button>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="Events-Slider">
      <Slider {...settings}>
        {tabs.map((tab, index) => (
          <div key={index} className="p-2">
            <img
              src={tab.images[0]}
              alt={tab.name}
              className="w-full aspect-[1/1.75] rounded-[30px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPagingSlider;

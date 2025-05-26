import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({ images = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
  };

  if (images.length === 1) {
    const isVideo = images[0].toLowerCase().includes(".mp4");
    return (
      <div>
        {isVideo ? (
          <video
            className="rounded-[9px] object-cover w-full aspect-[1/.75] brightness-90"
            controls
          >
            <source src={images[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            className="rounded-[9px] object-cover w-full aspect-[1/.75] brightness-90"
            src={images[0]}
            alt="single-slide"
          />
        )}
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {images.map((img, index) => {
        const isVideo = img.toLowerCase().includes(".mp4");
        return (
          <div key={index}>
            {isVideo ? (
              <video
                className="rounded-[9px] object-cover w-full aspect-[1/.75] brightness-90"
                controls
              >
                <source src={img} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                className="rounded-[9px] object-cover w-full aspect-[1/.75] brightness-90"
                src={img}
                alt={`slide-${index}`}
              />
            )}
          </div>
        );
      })}
    </Slider>
  );
}

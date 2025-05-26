import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardImag from "../../../assets/img/Gradient.png";
import Vendor1 from "../../../assets/img/cardImag2.png";
import Vendor2 from "../../../assets/img/vendor2.png";
import Cardicon from "../../../assets/img/Logo Container.png";
import PrevButton from "../../../assets/img/Previous-Button.png"
import NextButton from "../../../assets/img/Next-Button.png"


const TestimonialsCard = () => {
  const testimonialData = [
    {
      id: 1,
      text: "The user interface is intuitive, making transactions a breeze. Whether I'm making purchases or managing my diverse portfolio of digital currencies.",
      vendorName: "Vendor Name Here!",
      image: Vendor2,
      rating: 4,
    },
    {
      id: 2,
      text: "its user-friendly interface makes it accessible for both beginners and experienced traders. I can not think of my trading business without Block.",
      vendorName: "Vendor Name Here!",
      image: Vendor1,
      rating: 5,
    },
    {
      id: 3,
      text: "I'm a freelancer, and managing my earnings across different digital platforms used to be a hassle. That's until I discovered Block.",
      vendorName: "Vendor Name Here!",
      image: Vendor2,
      rating: 4,
    },
    {
      id: 4,
      text: "The user interface is intuitive, making transactions a breeze. Whether I'm making purchases or managing my diverse portfolio of digital currencies.",
      vendorName: "Vendor Name Here!",
      image: Vendor1,
      rating: 5,
    },
    {
      id: 5,
      text: "its user-friendly interface makes it accessible for both beginners and experienced traders. I can not think of my trading business without Block.",
      vendorName: "Vendor Name Here!",
      image: Vendor2,
      rating: 4,
    },
    {
      id: 6,
      text: "I'm a freelancer, and managing my earnings across different digital platforms used to be a hassle. That's until I discovered Block.",
      vendorName: "Vendor Name Here!",
      image: Vendor1,
      rating: 5,
    },
    {
      id: 7,
      text: "The user interface is intuitive, making transactions a breeze. Whether I'm making purchases or managing my diverse portfolio of digital currencies.",
      vendorName: "Vendor Name Here!",
      image: Vendor2,
      rating: 4,
    },
    {
      id: 8,
      text: "its user-friendly interface makes it accessible for both beginners and experienced traders. I can not think of my trading business without Block.",
      vendorName: "Vendor Name Here!",
      image: Vendor1,
      rating: 5,
    },
  ];

  return (
    <div className="relative">
      <div className="absolute top-[-80px] right-[70px] hidden md:block">
        <button className="prev">
          {/* <FaArrowCircleLeft className="text-[40px]"/> */}
          <img className="size-12" src={PrevButton} alt="prev" />
        </button>
      </div>
      <div className="absolute top-[-80px] right-[0px] hidden md:block">
        <button className="next">
          {/* <FaArrowCircleRight className="text-[40px]"/> */}
          <img className="size-12" src={NextButton} alt="next" />
        </button>
      </div>
      <div className="mt-6">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          pagination={false}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}  
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonialData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div
                style={{
                  backgroundImage: `url(${CardImag})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom right",
                }}
                className="ps-6 pe-2 pt-4 bg-white rounded-[12px] flex flex-col items-start text-start border min-h-[400px] h-full"
              >
                <div className="flex gap-1 mb-1">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <span key={index} className="text-[#E76923] text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[#1A2D47] font-medium italic mb-4 max-w-[280px]">
                  "{testimonial.text}"
                </p>
                <div className="flex w-full items-center justify-between gap-4 mt-auto mb-0">
                  <div className="flex flex-col mt-auto mb-8">
                    <p className="font-medium mb-3 text-[#757575]">
                      {testimonial.vendorName}
                    </p>
                    <img
                      src={Cardicon}
                      alt="Vendor"
                      className="object-fit m-2 ms-0"
                    />
                  </div>
                  <div className="ml-auto">
                    <img
                      src={testimonial.image}
                      alt="Vendor"
                      className="w-26 h-26 object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsCard;

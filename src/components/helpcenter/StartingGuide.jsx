import React from "react";
import GuideImg1 from "../../assets/img/guide-img-1.png";
import GuideImg2 from "../../assets/img/guide-img-2.png";
import GuideImg3 from "../../assets/img/guide-img-3.png";
import GuideImg4 from "../../assets/img/guide-img-4.png";

import GuideCard from "./GuideCard";

export default function StartingGuide() {
  const guideCardData = [
    {
      img: GuideImg1,
      text: "Getting started on Gala Tab",
    },
    {
      img: GuideImg2,
      text: "Finding a Vendors that's right for you",
    },
    {
      img: GuideImg3,
      text: "Paying for your Gala Tab as a Vendor",
    },
    {
      img: GuideImg4,
      text: "Air Cover Gala Tab",
    },
  ];
  return (
    <div>
      <h3 className="text-[#1C1C1C] leading-normal font-semibold text-[28px] sm:text-[32px] md:text-[40px]">
        Guides for getting started
      </h3>
      <div className="bg-[#F7F7F7] p-5 rounded-[30px] mt-6">
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {guideCardData.map((card, index) => (
            <GuideCard key={index} img={card.img} text={card.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

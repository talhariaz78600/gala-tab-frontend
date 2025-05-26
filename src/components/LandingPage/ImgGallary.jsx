import React from "react";
import HomGallary1 from "../../assets/img/homgallary1.jpeg";
import HomGallary2 from "../../assets/img/homgallary2.png";
import HomGallary3 from "../../assets/img/homgallary3.jpeg";
import HomGallary4 from "../../assets/img/homgallary4.png";
import HomGallary5 from "../../assets/img/homgallary5.jpeg";
import HomGallary6 from "../../assets/img/homgallary6.jpeg";
import HomGallary7 from "../../assets/img/homgallary7.png";
import HomGallary8 from "../../assets/img/homgallary8.jpeg";

export default function ImgGallary() {

  const itemData = [
    {
      img: HomGallary1,
      title: "img",
    },
    {
      img: HomGallary2,
      title: "img",
    },
    {
      img: HomGallary3,
      title: "img",
    },
    {
      img: HomGallary4,
      title: "img",
    },
    {
      img: HomGallary5,
      title: "img",
    },
    {
      img: HomGallary6,
      title: "img",
    },
    {
      img: HomGallary7,
      title: "img",
    },
    {
      img: HomGallary8,
      title: "img",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-y-0">
      {itemData.map((item,index) => (
        <div key={item.img} className={`${index % 2 !== 0 ? 'md:mt-8' : 'md:-mt-8'}`}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="rounded-[14px] w-full aspect-[1/1.4] object-cover"
          />
        </div>
      ))}
    </div>
  );
}

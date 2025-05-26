import React from 'react';
import Training from "../../../assets/img/training.png";
import { HiLink } from "react-icons/hi";
import { GrDownload } from "react-icons/gr";

const trainingData = [
  {
    id: 1,
    title: "Video Title 1",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to derr",
    link: "www.https/youtubeexample.com",
    documentName: "Document name here",
    imgSrc: Training,
  },
  {
    id: 2,
    title: "Video Title 2",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to derr",
    link: "www.https/youtubeexample.com",
    documentName: "Document name here",
    imgSrc: Training,
  },
  {
    id: 3,
    title: "Video Title 3",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to derr",
    link: "www.https/youtubeexample.com",
    documentName: "Document name here",
    imgSrc: Training,
  },
  {
    id: 4,
    title: "Video Title 4",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to derr",
    link: "www.https/youtubeexample.com",
    documentName: "Document name here",
    imgSrc: Training,
  },
];

const UserTraining = () => {
  return (
    <div className='main-font'>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
        {trainingData.map((training) => (
          <div key={training.id} className="bg-white p-2 border rounded-2xl">
            <div>
              <img src={training.imgSrc} alt={training.title} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="mt-3">
              <h5 className="font-semibold text-base">{training.title}</h5>
              <p className="text-xs">{training.description}</p>
              <div className="bg-black p-2 rounded-lg flex items-center gap-2 mt-4">
                <HiLink className="p-2 bg-[#fff] text-black text-4xl rounded-lg" />
                <p className="text-white text-sm font-medium">{training.link}</p>
              </div>
              <div className="flex items-center justify-between gap-2 mt-4 bg-[#E7E7E7] p-2 rounded-lg">
                <p className="text-xs text-black ps-3">{training.documentName}</p>
                <GrDownload className="p-2 bg-[#000] text-white text-4xl rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTraining;

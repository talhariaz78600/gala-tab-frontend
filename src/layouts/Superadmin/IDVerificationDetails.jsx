import React, { useState } from "react";
import guestImg from "../../assets/img/guest-img.png";
import IDFront from "../../assets/img/ID-front.png";
import IDBack from "../../assets/img/ID-Back.png";
import PersonalInfo from "../../components/adminDashboard/PersonalInfo";
import { useLocation, useNavigate } from "react-router";
import { Skeleton } from "@mui/material";

export default function IDVerificationDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  console.log("data", data);

  const [selfieLoaded, setSelfieLoaded] = useState(false);
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px]">
      <div className="p-5 border-b border-[#D6D6D6] flex justify-between flex-wrap items-center gap-4">
        <p className="text-[24px] leading-normal sm:text-[28px] md:text-[34px] font-semibold">
          Vendor Government ID Verification Details
        </p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-8 items-center mt-16">
          {/* Selfie */}
          <div>
            <div className="relative w-fit">
              {!selfieLoaded && (
                <Skeleton
                  variant="circular"
                  width={250}
                  height={250}
                  className="mx-auto md:mx-0"
                />
              )}
              <img
                className={`max-w-[250px] w-full aspect-square rounded-full mx-auto md:mx-0 ${
                  !selfieLoaded ? "invisible" : "visible"
                }`}
                src={data?.selfieImageUrl || guestImg}
                loading="lazy"
                alt="img"
                onLoad={() => setSelfieLoaded(true)}
                onError={() => setSelfieLoaded(true)}
              />
              <div className="absolute bottom-[30px] w-full flex justify-center">
                <p className="text-lg font-semibold bg-white text-black px-4 py-2 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                  Selfie
                </p>
              </div>
            </div>
          </div>

          {/* ID Images */}
          <div className="grid md:grid-cols-2 gap-4 max-w-[680px]">
            <div className="relative">
              {!frontLoaded && (
                <Skeleton variant="rectangular" width="100%" height={200} />
              )}
              <img
                className={`w-full h-[200px] object-cover rounded-[10px] ${
                  !frontLoaded ? "invisible" : "visible"
                }`}
                loading="lazy"
                src={data?.frontImageUrl || IDFront}
                alt="img"
                onLoad={() => setFrontLoaded(true)}
                onError={() => setFrontLoaded(true)}
              />
              <div className="absolute bottom-[20px] w-full flex justify-center">
                <p className="text-lg font-semibold bg-white text-black px-4 py-3 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                  ID Card Front
                </p>
              </div>
            </div>
            <div className="relative">
              {!backLoaded && (
                <Skeleton variant="rectangular" width="100%" height={200} />
              )}
              <img
                className={`w-full h-[200px] object-cover rounded-[10px] ${
                  !backLoaded ? "invisible" : "visible"
                }`}
                loading="lazy"
                src={data?.backImageUrl || IDBack}
                alt="img"
                onLoad={() => setBackLoaded(true)}
                onError={() => setBackLoaded(true)}
              />
              <div className="absolute bottom-[20px] w-full flex justify-center">
                <p className="text-lg font-semibold bg-white text-black px-4 py-3 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                  ID Card Back
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <PersonalInfo data={data?.user} />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import VendorStepperImg from "../../assets/img/VendorStepperImg.png";

export default function VendorSteps(props) {
  return (
    <div className="flex flex-col items-center">
      <div>
        <img
          className="w-full max-w-[250px]"
          src={VendorStepperImg}
          alt="img"
        />
      </div>
      <div>
        <p className="font-semibold text-[20px] text-center mt-4">{props.title}</p>
        <p className="text-[#171717] text-[18px] text-center mt-4">{props.desc}</p>
      </div>
    </div>
  );
}

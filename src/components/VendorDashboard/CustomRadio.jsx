import React from "react";

export default function CustomRadio(props) {
  return (
    <div className="radio-button-wrapper">
      <input
        type="radio"
        name={props.name}
        id={props.id}
        className="hidden"
        onChange={props.onChange}
        checked={props.selected}
      />
      <label
        htmlFor={props.id}
        className={`block w-full p-5 rounded-[10px] cursor-pointer transition-colors border border-[#D5D5D5] ${
          props.selected ? "bg-[#1C1C1C]" : "bg-[#F7F7F7]"
        }`}
      >
        <div className="flex justify-center items-center">
          <img
            src={props.selected ? props.img2 : props.img1}
            alt={props.label}
            className="size-[25px]"
          />
          <p className={`text-lg ms-3 font-medium ${props.selected ? "text-white" : "text-black"}`}>{props.label}</p>
        </div>
      </label>
    </div>
  );
}

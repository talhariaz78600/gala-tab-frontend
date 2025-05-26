import React from "react";

const TabItem = ({ src0, src1, content, active }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center size-[100px] mb-4 relative rounded-full ${
        active
          ? "bg-black text-white shadow-[0px_0px_15px_0px_rgba(255,255,255,1)inset]"
          : "bg-[#E7E7E7] text-black shadow-none"
      }`}
    >
      {src0 || src1 ? (
        <img
          className="size-6 object-contain"
          src={active ? src1 : src0}
          alt="icon"
        />
      ) : (
        <div className="sm:size-4 size-3 rounded-full bg-gray-400"></div>
      )}
      <p className="text-xs capitalize mt-2 main-font">{content}</p>
      <div
        className={`${
          active ? "block" : "hidden"
        } absolute bottom-[-15px] w-[80%]`}
      >
        <div className="h-[6px] rounded-[100%]">
          <div className="bg-[#D8D8D8] rounded-[100%] blur-[4px] h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TabItem;

import React from "react";

export default function MapsFilters({ content, active, onClick, src0, src1 }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center sm:size-[70px] size-[60px] cursor-pointer sm:min-w-[70px] min-w-[60px] relative rounded-full ${
        active
          ? "bg-black text-white shadow-[0px_0px_15px_0px_rgba(255,255,255,1)_inset]"
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

      <p className="sm:text-[9px] text-[8px] capitalize mt-2 main-font">
        {content}
      </p>
    </button>
  );
}

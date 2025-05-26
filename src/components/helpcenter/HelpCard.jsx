import React from "react";
import { useNavigate } from "react-router";

export default function HelpCard(props) {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-xl h-full shadow-[0px_9px_19px_0px_#0000000D]">
      <div className="flex flex-col border p-4 rounded-xl h-full">
        <p className="font-semibold text-lg text-black">{props.title}</p>
        <div
          className="text-gray-500 text-sm line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: props.Desc,
          }}
        />
        <div className="mt-auto">
          <button
            onClick={() => {
              navigate(`/help-detail/${props.id}`, {
                state: { topic: props.mainTopic, subtopic: props.subtopic },
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-[fit-content] py-3 px-5 mt-10 rounded-lg bg-[#1C1C1C] text-white font-medium shadow-[0px_18px_20px_0px_#0000001A]"
          >
            {props.btnContent}
          </button>
        </div>
      </div>
    </div>
  );
}

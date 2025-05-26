import React from "react";
import { Link, useNavigate } from "react-router";
import { GoDotFill } from "react-icons/go";

export default function SearchtipDesc({ topic, subtopic }) {
  const navigate = useNavigate();

  return (
    <div className="mycontainer">
      <div className="mt-4">
        <h4 className="text-[22px] text-[#1C1C1C] leading-normal font-semibold sm:text-2xl">
          {subtopic?.name || "N/A"}
        </h4>
        <div className="flex flex-wrap mt-7 mx-[-16px]">
          <div className="w-full lg:w-1/4 py-6 px-4">
            <div className="w-full min-[480px]:w-fit border border-[#EBEBEB] px-4 py-8 bg-[#F7F7F7] rounded-[10px] shadow-[0px_19px_30px_0px_#00000012]">
              <h4 className="text-[22px] leading-normal text-[#1C1C1C] font-semibold sm:text-2xl flex items-center gap-3">
                <GoDotFill className="text-xs text-[#1C1C1C]" /> Related topics
              </h4>
              <ul>
                {topic?.subtopics?.map((subtopic, index) => (
                  <li key={index} className="mt-6">
                    <button
                      onClick={() => {
                        navigate(`/help-detail/${subtopic._id}`, {
                          state: { subtopic: subtopic, topic },
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="underline underline-offset-[3px] text-[#1C1C1C] sm:text-[18px] leading-normal"
                    >
                      {subtopic.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-3/4 py-6 px-4">
            <div>
              <h4 className="text-[22px] text-[#1C1C1C] leading-normal font-semibold sm:text-2xl">
                {subtopic?.title || "N/A"}
              </h4>

              <div className="mt-6 text-sm sm:text-[18px] text-[#1C1C1C] leading-normal [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-5 [&_strong]:font-semibold">
                <div
                  dangerouslySetInnerHTML={{
                    __html: subtopic?.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

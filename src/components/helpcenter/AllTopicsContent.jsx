import React from "react";
import { Link, useNavigate } from "react-router";

export default function AllTopicsContent({ data }) {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-14 leading-normal text-2xl font-semibold">
        {data?.map((item, index) => (
          <li key={index} className="mb-6">
            <h6 className="text-2xl font-semibold mb-2 dark:text-white">
              {item.name}
            </h6>
            {item.subtopics && item.subtopics.length > 0 ? (
              <ul className="text-base sm:text-lg font-normal list-disc ml-5">
                {item.subtopics.map((subtopic, subIndex) => (
                  <li className="my-2" key={subIndex}>
                    <button
                      onClick={() => {
                        navigate(`/help-detail/${subtopic._id}`, {
                          state: { subtopic, topic: item },
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="underline dark:text-white underline-offset-4 text-[rgba(18,18,18,1)] decoration-current"
                    >
                      {subtopic.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No subtopics available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

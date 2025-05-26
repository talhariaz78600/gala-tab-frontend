import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ use react-router-dom
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

const HelpSupport = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="sm:px-7">
      <h4 className="font-semibold text-xl mb-4">Help Topics</h4>

      <div className="space-y-8">
        {data.map((topic) => (
          <div key={topic._id}>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              {topic.name}
            </h5>

            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
              {topic.subtopics?.length > 0 ? (
                topic.subtopics.map((sub) => (
                  <div key={sub._id}>
                    <button
                      onClick={() => {
                        navigate(`/help-detail/${sub._id}`, {
                          state: { subtopic: sub, topic },
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full border border-gray-200 dark:border-gray-700 inline-block bg-white dark:bg-gray-800 rounded-xl p-4 h-full transition-colors"
                    >
                      <HiOutlineQuestionMarkCircle className="bg-[#282828] dark:bg-gray-100 p-3 text-7xl text-white dark:text-black rounded-xl m-auto" />
                      <p className="text-center mt-4 lg:text-sm text-xs font-medium text-gray-800 dark:text-gray-100">
                        {sub.title}
                      </p>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm col-span-full text-center py-4">
                  No topics available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSupport;

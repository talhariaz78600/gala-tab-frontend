import React from "react";
import HelpCard from "./HelpCard";

export default function TrendingTab({ data }) {
  const allSubtopics =
    data?.flatMap((topic) =>
      (topic.subtopics || []).map((subtopic) => ({
        ...subtopic,
        mainTopic: topic,
      }))
    ) || [];

  return allSubtopics.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
      {allSubtopics.map((card, index) => (
        <HelpCard
          key={index}
          id={card._id}
          title={card.title}
          Desc={card.description}
          btnContent={"Learn more"}
          subtopic={card}
          mainTopic={card.mainTopic}
        />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-64">
      <p className="text-[#1C1C1C]  text-sm text-center font-medium">
        No data found
      </p>
    </div>
  );
}

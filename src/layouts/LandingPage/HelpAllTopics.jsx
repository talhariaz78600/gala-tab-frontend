import React from "react";
import AllTopicHeader from "../../components/OneHelp/AllTopicHeader";
import AllTopicsTabs from "../../components/helpcenter/AlltopicsTabs";

export default function HelpAllTopics() {
  return (
    <>
      <div className="bg-[#F7F7F7] pt-1 pb-[60px] rounded-b-3xl">
        <div className="mycontainer">
          <AllTopicHeader />
        </div>
      </div>
      <div className="mt-[-60px]">
        <div className="mycontainer">
          <AllTopicsTabs />
        </div>
      </div>
    </>
  );
}

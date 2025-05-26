import React from "react";
import { Link } from "react-router";
import HelpTab from "../../components/helpcenter/HelpTab";
import StartingGuide from "../../components/helpcenter/StartingGuide";
import AllTopics from "../../components/helpcenter/AllTopics";
import ExploreMore from "../../components/helpcenter/ExploreMore";

const HelpCenter = () => {
  return (
    <>
      <div className="bg-[#F7F7F7] h-[600px] rounded-b-3xl pt-12">
        <div className="mycontainer">
          <h2 className="text-center text-[#1C1C1C] my-7 font-bold text-2xl sm:text-3xl lg:text-5xl">
            Hi, Dear Kevin how can we help?
          </h2>
          <div className="flex justify-center">
            <Link
              to="/alltopics"
              className="bg-[#1C1C1C] text-white font-medium py-2 px-5 rounded-lg text-lg sm:text-2xl shadow-xl"
            >
              Browse all topics
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-[-300px] bg-[#F7F7F7]">
        <div className="mycontainer">
          <HelpTab />
        </div>
      </div>

      {/* <div className="mycontainer">
        <div className="mt-[64px]">
          <StartingGuide />
        </div>
      </div> */}
      <ExploreMore />
    </>
  );
};

export default HelpCenter;

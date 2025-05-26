import React from "react";
import SearchTips from "../../components/OneHelp/SearchTips";
import SearchtipDesc from "../../components/OneHelp/SearchtipDesc";
import InThisArticle from "../../components/OneHelp/InThisArticle";
import SearchByVendor from "../../components/OneHelp/SearchByVendor";
import { useLocation } from "react-router";

export default function OneHelp() {
  const location = useLocation();
  const { subtopic } = location.state || {};
  const { topic } = location.state || {};

  return (
    <>
      <div className="bg-[#F7F7F7] pt-1 pb-5 rounded-b-3xl">
        <div className="mycontainer">
          <SearchTips data={subtopic} />
        </div>
        <div>
          <SearchtipDesc topic={topic} subtopic={subtopic} />
        </div>
        {/* <div className="bg-[#1C1C1C] py-16 mt-4">
          <div className="mycontainer">
            <InThisArticle />
          </div>
        </div>
        <div className="mt-16">
          <div className="mycontainer">
            <SearchByVendor />
          </div>
        </div> */}
      </div>
    </>
  );
}

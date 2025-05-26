import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import HelpAccordions from "./HelpCenter/HelpAccordion";
import ContactInbox from "../Superadmin/ContactInbox";
import CustomTabs from "@/components/ui/CustomTabs";

const UserHelpCenter = () => {
  const tabs = ["Contact Support", "Faq and Training"];
  const panels = [<ContactInbox />, <HelpAccordions faqType="customer" />];
  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100vh-130px)] rounded-[20px] p-4 ">
      <div className="">
        <CustomTabs tabs={tabs} panels={panels} />
      </div>
    </div>
  );
};

export default UserHelpCenter;

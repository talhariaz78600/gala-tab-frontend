import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import HelpAccordions from "../UserDashboard/HelpCenter/HelpAccordion";
import ContactInbox from "../Superadmin/ContactInbox";
import CustomTabs from "@/components/ui/CustomTabs";

const VendorHelpCenter = () => {
  const tabs = ["Contact Support", "Faq and Training"];
  const panels = [<ContactInbox />, <HelpAccordions faqType="vendor" />];
  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px] p-4 ">
      <div className="">
        <CustomTabs tabs={tabs} panels={panels} />
      </div>
    </div>
  );
};

export default VendorHelpCenter;

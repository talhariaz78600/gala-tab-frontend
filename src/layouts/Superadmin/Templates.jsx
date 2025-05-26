import React from "react";
import PermissionTemplates from "./Template/PermissionTemplates";
import TaskTemplates from "./Template/TaskTemplates";
import CustomTabs from "@/components/ui/CustomTabs";

const Template = () => {
  const tabs = ["Permission Template", "Task Template"];
  const panels = [<PermissionTemplates />, <TaskTemplates />];
  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px] p-4 ">
      <div className="">
        <CustomTabs tabs={tabs} panels={panels} />
      </div>
    </div>
  );
};

export default Template;

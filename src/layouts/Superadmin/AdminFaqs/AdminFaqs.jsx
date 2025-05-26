import CustomTabs from "@/components/ui/CustomTabs";
import React, { useState } from "react";
import FaqsList from "./FaqsList";
import AddFaqModal from "./AddFaqModal";
import { Button } from "@mui/material";

const AdminFaqs = () => {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = ["Landing Page", "Vendor", "Customer"];
  const panels = [
    <FaqsList activeTab={tabs[0]} />,
    <FaqsList activeTab={tabs[1]} />,
    <FaqsList activeTab={tabs[2]} />,
  ];

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px] p-4 ">
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "10px 24px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Add FAQ
        </Button>
        <AddFaqModal open={open} onClose={() => setOpen(false)} />
      </div>

      <CustomTabs
        tabs={tabs}
        panels={tabs.map((tab, index) => (
          <FaqsList key={index} activeTab={tab} />
        ))}
        setcurrentTab={setCurrentTab}
      />
    </div>
  );
};

export default AdminFaqs;

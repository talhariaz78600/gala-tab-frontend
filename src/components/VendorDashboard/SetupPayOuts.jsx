import React, { useState } from "react";
import { Button, Stepper, Step, StepContent } from "@mui/material";
import CardDetailsModal from "./CardDetailsModal";
import StepOne from "./payoutSteps/StepOne";
import StepTwo from "./payoutSteps/StepTwo";
import StepThree from "./payoutSteps/StepThree";

export default function SetupPayOuts() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < pages.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const pages = [<StepOne onClick={handleNext} />, <StepTwo onBack={handleBack} />, <StepThree onBack={handleBack} />];

  return (
    <div className="p-5 flex flex-col justify-between min-h-[calc(100dvh-320px)]">
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          "& .MuiStepConnector-line": {
            display: "none",
          },
          "& .MuiStepContent-root": {
            padding: 0,
            border: "none",
          },
        }}
      >
        {pages.map((_, index) => (
          <Step key={index}>
            <StepContent>{pages[activeStep]}</StepContent>
          </Step>
        ))}
      </Stepper>

      <div className="flex mt-12 gap-3 justify-between">
        <button
          onClick={handleBack}
          className={`bg-[#E7E7E7] font-medium py-3 sm:min-w-[150px] min-w-[120px] rounded-full border border-[#D5D5D5] ${
            activeStep === 2 ? "block" : "hidden"
          }`}
        >
          Back
        </button>
        <button
          type={activeStep === pages.length - 1 ? "submit" : "button"}
          onClick={handleNext}
          className={`bg-[#000000] text-white font-medium py-3 sm:min-w-[150px] min-w-[120px] rounded-full border border-[#000000] ms-auto ${
            activeStep === 0 ? "hidden" : "block"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

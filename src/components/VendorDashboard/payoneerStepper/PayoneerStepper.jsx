import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { GoDotFill } from "react-icons/go";
import VendorSteps from "../../vendorstepper/VendorSteps";
import { StepLabel } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const stepscontent = [
  {
    component: <StepOne />,
  },
  {
    component: <StepTwo />,
  },
  {
    component: (
      <VendorSteps
        title="Ready to download"
        desc="Once your file is ready, you’ll have 7 days to download it."
      />
    ),
  },
  {
    component: (
      <VendorSteps
        title="You are Done"
        desc="Once your file is ready, you’ll have 7 days to download it."
      />
    ),
  },
];

const steps = [
  "Getting Stared",
  "Contact Details",
  "Security Details",
  "Almost Done",
];

function CustomStepIcon(props) {
  const { active, completed, icon } = props;

  const styles = {
    circle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: completed ? "#000000" : active ? "#000000" : "#BDBDBD",
      color: "white",
      fontWeight: "bold",
      boxShadow: "0px 0px 6px 0px #FFFFFF inset",
    },
  };

  return (
    <div style={styles.circle}>
      <GoDotFill className="text-[24px]" />
    </div>
  );
}

export default function PayoneerStepper() {
  const [activeStep, setActiveStep] = React.useState(1);

  const totalSteps = () => steps.length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, totalSteps() - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  return (
    <div className="grid md:grid-cols-2">
      <div className="bg-">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <p className="text-[#9A9A9A] text-lg mt-5">
            Please fill in the fields in English characters only
          </p>
        </div>
        <div className="bg-[#F7F7F7] mt-8 rounded-[10px] p-5">
          {stepscontent[activeStep].component}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <button onClick={handleBack}>back</button>
        <button
          onClick={handleNext}
          className="border border-black bg-black shadow-[0px_10px_17px_0px_#FD636312] py-3 rounded-full text-[#ffffff] font-medium px-8 min-w-[200px]"
        >
          Done
        </button>
      </div>
    </div>
  );
}

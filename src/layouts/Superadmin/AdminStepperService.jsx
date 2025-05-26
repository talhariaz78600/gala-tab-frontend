import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { GoDotFill } from "react-icons/go";
import GalaLogo from "../../assets/img/gala-logo.png";
import ServiceType from "./StepperService/ServiceType";
import Availibility from "./StepperService/Availibility";
import ServiceDescription from "./StepperService/ServiceDescription";
import Upload from "./StepperService/Upload";
import EditPhoto from "./StepperService/EditPhoto";
import { Link } from "react-router";
import VenueDescription from "./StepperService/VenueDescription";
import Rule from "./StepperService/Rule";
import SetPrice from "./StepperService/SetPrice";
import VenueAddress from "./StepperService/VenueAddress";
import AmenitiesDetail from "./StepperService/AmenitiesDetail";

const stepscontent = [
  { component: <ServiceType /> },
  { component: <Availibility /> },
  { component: <ServiceDescription /> },
  { component: <Upload /> },
  { component: <EditPhoto /> },
  { component: <AmenitiesDetail /> },
  { component: <VenueAddress /> },
  { component: <VenueDescription /> },
  { component: <Rule /> },
  { component: <SetPrice /> },
];

const steps = [
  "Service Type",
  "Title / Availability",
  "Service Description",
  "Upload Photos & Videos",
  "Edit Photos",
  "Amenities Details",
  "Venue Address",
  "Venue Description",
  "Rules and Regulations",
  "Set Price",
];

function CustomStepIcon(props) {
  const { active, completed } = props;
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

export default function AdminStepperService() {
  const [activeStep, setActiveStep] = useState(0);

  const totalSteps = () => steps.length;
  const isLastStep = () => activeStep === totalSteps() - 1;

  const validateCurrentStep = () => {
    // Example validation logic based on the step
    if (activeStep === 0) {
      // Validate ServiceType step (add your logic here)
      return true;
    } else if (activeStep === 1) {
      // Validate Availability step (add your logic here)
      return true;
    } else if (activeStep === 2) {
      // Validate Availability step (add your logic here)
      return true;
    } else if (activeStep === 3) {
      // Validate Availability step (add your logic here)
      return true;
    } else if (activeStep === 4) {
      // Validate Availability step (add your logic here)
      return true;
    } else if (activeStep === 8) {
      // Validate Availability step (add your logic here)
      return true;
    }
    return true; // Default to true for other steps
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (!isLastStep()) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        console.log("Submit form or complete the process.");
      }
    } else {
      console.log("Please complete the required fields.");
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <div>
      <div className="bg-[#F7F7F7] py-4">
        <div className="mycontainer">
          <div className="flex items-center justify-between">
            <div>
              <img
                src={GalaLogo}
                alt="Gala Logo"
                className="w-26 h-full object-contain"
              />
            </div>
            <div>
              <Link
                to="/admin-dashboard/service-management"
                className="text-white bg-black rounded-3xl px-6 py-2 inline-block shadow-md"
              >
                Save & exit
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <form action="/admin-dashboard/service-management">
          <div className="pt-6">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={CustomStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="bg-white mt-8 rounded-[10px] sm:p-5">
              {stepscontent[activeStep]?.component || (
                <div>Invalid Step. Please try again.</div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-end mt-6 pb-4">
            <button
            type="button"
              className="bg-[#E7E7E7] text-[#202529] border px-8 py-3 rounded-full ml-4 sm:min-w-[150px]"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </button>
            <button
              type={isLastStep() ? "submit" : "button"}
              onClick={(e) => {
                if (!isLastStep()) {
                  e.preventDefault();
                  handleNext();
                }
              }}
              className="border border-black bg-black shadow-[0px_10px_17px_0px_#FD636312] py-3 rounded-full text-[#FFFFFF] font-medium px-8 sm:min-w-[150px]"
            >
              {isLastStep() ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

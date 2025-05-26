
import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Avatar, IconButton, StepLabel, StepIcon } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { IoIosSearch } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import Closebtn from "../../assets/img/close-btn-red.png";
import { Link } from "react-router";
import { GoDotFill } from "react-icons/go";
import VendorSteps from "../../components/vendorstepper/VendorSteps";

const stepscontent = [
  {
    component: (
      <VendorSteps
        title="Data request received"
        desc="November 22nd, 2024, at 09:05:31 PM"
      />
    ),
  },
  {
    component: (
      <VendorSteps
        title="Preparing your file"
        desc="This usually takes 7 days, but may take longer depending on your file size."
      />
    ),
  },
  {
    component: (
      <VendorSteps
        title="Ready to download"
        desc="Once your file is ready, you’ll have 7 days to download it."
      />
    ),
  },
];

const steps = [
  "Data request received",
  "Preparing your file",
  "Ready to downloand",
];

function CustomStepIcon(props) {
  const { active, completed, icon } = props;

  const styles = {
    circle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
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

export default function VendorStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const totalSteps = () => steps.length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, totalSteps() - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <div>
      <div className="bg-[#F7F7F7]">
        <div className="mycontainer">
          <div className="flex items-center justify-between py-3">
            <div>
              <Link
                to="#"
                className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
              >
                Gala Tab
              </Link>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div>
                <form action="">
                  <div className="flex w-96 items-center border rounded-3xl p-2 bg-white shadow-[0px_14px_30px_0px_#8383830D]">
                    <label htmlFor="">
                      <IoIosSearch />
                    </label>
                    <input
                      type="search"
                      className="px-3 w-full bg-transparent"
                      placeholder="Start searching here..."
                    />
                  </div>
                </form>
              </div>
              <IconButton>
                <NotificationsNoneIcon />
              </IconButton>
              <Avatar />
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 border-b-2 border-[#CDCDCD] pb-4">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold leading-normal text-[28px]">
                Account
              </p>
              <IoChevronForward className="text-[24px]" />
              <p className="text-[#3551B6] leading-normal font-medium text-[18px]">
                Privacy and sharing
              </p>
            </div>
            <p className="font-semibold text-[28px] mt-4">
              We’ve received your data request
            </p>
            <p className="sm:text-[18px] mt-4 text-[#171717]">
              We’ll create a file with your personal data and email you
              at Kevin@gmail.com when it’s ready.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              className="size-[24px] object-contain ms-auto"
              src={Closebtn}
              alt="img"
            />
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <h4 className="font-semibold text-[28px] text-center mt-6">Summary</h4>
        <div className="mt-6">
          <div className="w-full">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={CustomStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <React.Fragment>
                {stepscontent[activeStep].component}
                <div className="flex flex-wrap justify-center gap-5 mt-10">
                  <button
                    onClick={handleBack}
                    className="border border-black shadow-[0px_10px_20px_0px_#0000001A] py-3 rounded-full text-[#000000] font-medium px-8 min-w-[200px]"
                  >
                    Cancel Request
                  </button>
                  <button
                    onClick={handleNext}
                    className="border border-black bg-black shadow-[0px_10px_17px_0px_#FD636312] py-3 rounded-full text-[#ffffff] font-medium px-8 min-w-[200px]"
                  >
                    Done
                  </button>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import IdType from "./UserStepper/IdType";
import IdentityCard from "./UserStepper/IdentityCard";
import PhotoYourself from "./UserStepper/PhotoYourself";
import CameraAccess from "./UserStepper/CameraAccess";
import ReviewPhoto from "./UserStepper/ReviewPhoto";
import GovernmentId from "./UserStepper/GovernmentId";
import ReviewId from "./UserStepper/ReviewId";

const steps = [
  {
    component: <GovernmentId />,
  },
  {
    component: <IdType />,
  },
  {
    component: <IdentityCard />,
  },
  {
    component: <PhotoYourself />,
  },
  {
    component: <CameraAccess />,
  },
  {
    component: <ReviewPhoto />,
  },
  {
    component: <ReviewId />,
  },
];

export default function UserStepper() {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <div className="border border-b">
        <div className="mycontainer">
          <div className="flex items-center justify-between py-3">
            <div>
              <Link
                to="/user-dashboard/user-profile"
                className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
              >
                Gala Tab
              </Link>
            </div>
            <div>
              <Link
                to="/user-dashboard/user-profile"
                className="bg-white border inline-block py-2 px-4 shadow-xl rounded-3xl"
              >
                Exit Page
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <Box sx={{ flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 2,
              bgcolor: "background.default",
              colo: "#fff",
            }}
          >
            {steps[activeStep].component}
          </Paper>
          <MobileStepper sx={{
            maxWidth: '1000px',
            margin: 'auto',
          }}
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              activeStep === maxSteps - 1 ? (
                <Button
                  sx={{
                    backgroundColor: "#000",
                    borderRadius: "25px",
                    color: "#fff",
                    padding: "8px 38px",
                    textTransform: "Capitalize",
                  }}
                  size="small"
                  onClick={() => {
                    navigate("/user-dashboard/user-profile"); // Navigate to the About screen
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  sx={{
                    backgroundColor: "#000",
                    borderRadius: "25px",
                    color: "#fff",
                    padding: "8px 38px",
                    textTransform: "Capitalize",
                  }}
                  size="small"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )
            }
            backButton={
              <Button
                sx={{
                  backgroundColor: "#E7E7E7",
                  borderRadius: "25px",
                  color: "#202529",
                  padding: "8px 38px",
                  textTransform: "Capitalize",
                }}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
        </Box>
      </div>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import IdType from "./AdminStepper/IdType";
import IdentityCard from "./AdminStepper/IdentityCard";
import PhotoYourself from "./AdminStepper/PhotoYourself";
import CameraAccess from "./AdminStepper/CameraAccess";
import ReviewPhoto from "./AdminStepper/ReviewPhoto";
import GovernmentId from "./AdminStepper/GovernmentId";
import ReviewId from "./AdminStepper/ReviewId";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { handleFileUpload } from "@/lib/handleFileUpload";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import { useKycUploadMutation } from "@/api/apiSlice";
import { useSelector } from "react-redux";
import { currentUser } from "@/store/authSlice";

export default function AdminStepper() {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector(currentUser);

  const url = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session");

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [kycUpload, { isLoading: kycLoading }] = useKycUploadMutation();

  const methods = useForm({});
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = methods;

  const { dirtyFields } = useFormState({ control });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
      component: <ReviewPhoto handleBack={handleBack} />,
    },
    {
      component: <ReviewId />,
    },
  ];

  const maxSteps = steps.length;

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      let updatedData = { ...data };

      setIsLoading(true);

      // Upload frontImage if it exists
      if (data.frontImage) {
        const frontImageUrl = await handleFileUpload(
          data.frontImage,
          setIsLoading,
          setUploadProgress,
          token
        );
        updatedData.frontImage = frontImageUrl;
      }

      // Upload backImage if it exists
      if (data.backImage) {
        const backImageUrl = await handleFileUpload(
          data.backImage,
          setIsLoading,
          setUploadProgress,
          token
        );
        updatedData.backImage = backImageUrl;
      }

      // Upload selfieImage if it exists
      if (data.selfieImage) {
        const selfieImageUrl = await handleFileUpload(
          data.selfieImage,
          setIsLoading,
          setUploadProgress,
          token
        );
        updatedData.selfieImage = selfieImageUrl;
      }

      updatedData.sessionToken = sessionId;

      setIsLoading(false);

      const response = await kycUpload(updatedData).unwrap();

      if (response?.success) {
        toast.success("KYC data uploaded successfully!");
        handleNext();
      } else {
        toast.error("Failed to upload KYC data.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error uploading images or submitting the form");
      console.error("Form submission error:", error);
    }
  };

  const handleExit = () => {
    if (user?.userType === "vendor") {
      navigate("/vendor-dashboard/Vendor-Profile");
    } else if (user?.userType === "customer") {
      navigate("/user-dashboard/user-profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <div>
          <div className="border border-b">
            <div className="mycontainer">
              <div className="flex items-center justify-between py-3">
                <div>
                  <Link
                    to="/admin-dashboard/dashboard"
                    className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
                  >
                    Gala Tab
                  </Link>
                </div>
                <div>
                  <button
                    onClick={handleExit}
                    className="bg-white border inline-block py-2 px-4 shadow-xl rounded-3xl"
                  >
                    Exit Page
                  </button>
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
              <MobileStepper
                sx={{
                  maxWidth: "1000px",
                  margin: "auto",
                }}
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  activeStep === 4 ? (
                    <Button
                      sx={{
                        backgroundColor: "#000",
                        borderRadius: "25px",
                        color: "#fff",
                        padding: "8px 38px",
                        textTransform: "Capitalize",
                      }}
                      size="small"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </Button>
                  ) : activeStep === 5 ? (
                    // Exit on step 5 (ReviewId)
                    <Button
                      sx={{
                        backgroundColor: "#000",
                        borderRadius: "25px",
                        color: "#fff",
                        padding: "8px 38px",
                        textTransform: "Capitalize",
                      }}
                      size="small"
                      onClick={handleExit}
                    >
                      Exit
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
                      onClick={handleSubmit(handleNext)}
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
              <Loader loading={isLoading || kycLoading} />
            </Box>
          </div>
        </div>
      </FormProvider>
    </>
  );
}

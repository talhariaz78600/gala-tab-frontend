import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import VenueDescription from "./StepperService/VenueDescription";
import Rule from "./StepperService/Rule";
import SetPrice from "./StepperService/SetPrice";
import VenueAddress from "./StepperService/VenueAddress";
import AmenitiesDetail from "./StepperService/AmenitiesDetail";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { handleStep4Upload } from "@/lib/handleStep4Upload";
import {
  useDeleteServiceMutation,
  useGetServiceDetailsQuery,
  useServiceCreateMutation,
  useServiceUpdateMutation,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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

export default function VendorStepperService() {
  const [activeStep, setActiveStep] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const [serviceId, setServiceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { data: currentService } = useGetServiceDetailsQuery(serviceId, {
    skip: !serviceId,
  });

  const methods = useForm({ values: currentService?.data });
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = methods;

  const { dirtyFields } = useFormState({ control });
  const [serviceCreate, { isLoading: isServiceCreateLoading }] =
    useServiceCreateMutation();
  const [serviceUpdate, { isLoading: isServiceUpdateLoading }] =
    useServiceUpdateMutation();

  const [deleteService] = useDeleteServiceMutation();

  const totalSteps = () => steps.length;
  const isLastStep = () => activeStep === totalSteps() - 1;

  const validateCurrentStep = () => {
    if (activeStep === 0) {
      return true;
    } else if (activeStep === 1) {
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (!isLastStep()) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        if (user?.role === "vendor") {
          navigate("/vendor-dashboard/service-listing");
        } else {
          navigate("/admin-dashboard/service-management");
        }
      }
    } else {
      toast.error("Please complete the required fields.");
    }
  };

  const handleBack = () => {
    clearErrors();
    reset();
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    if (!serviceId) {
      try {
        const response = await serviceCreate(data).unwrap();
        setServiceId(response.data._id);
        handleNext();
      } catch (error) {
        console.error("Error creating property:", error);
      }
    } else {
      try {
        // Build patchData from dirtyFields
        let patchData = Object.keys(dirtyFields).reduce((acc, field) => {
          const value = data[field];
          const isNotEmpty =
            value !== null &&
            value !== undefined &&
            (typeof value !== "string" || value.trim() !== "") &&
            (!Array.isArray(value) || value.length > 0) &&
            (typeof value !== "object" || Object.keys(value).length > 0);

          if (isNotEmpty) {
            acc[field] = value;
          }

          return acc;
        }, {});

        if (activeStep === 4) {
          setIsLoading(true);
          console.log("data.media", data.media);

          const newMedia = data.media.filter((item) => !item._id);
          console.log("Filtered new media:", newMedia);

          if (newMedia.length > 0) {
            console.log("Uploading new media...");
            const uploadedMediaData = await handleStep4Upload(
              newMedia,
              setIsLoading,
              setUploadProgress,
              token
            );
            console.log("Upload complete.");

            patchData.media = [
              ...data.media.filter((item) => item._id),
              ...uploadedMediaData.media,
            ];
          } else {
            console.log("No new media to upload. Skipping API call.");
            patchData.media = [...data.media];
          }

          setIsLoading(false);
        }

        if (Object.keys(patchData).length > 0) {
          await serviceUpdate({
            id: serviceId,
            data: patchData,
          }).unwrap();

          if (activeStep === 9) toast.success("Service Created Successfully");
        }

        handleNext();
      } catch (error) {
        console.error("Error updating property:", error);
      }
    }

    // Reset dirty fields after submission
    control._updateFormState({
      dirtyFields: {},
    });
  };

  console.log("errors:", errors);

  return (
    <>
      <FormProvider {...methods}>
        <div>
          <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] py-4">
            <div className="mycontainer">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    src={GalaLogo}
                    alt="Gala Logo"
                    className="w-26 h-full object-contain dark:invert"
                  />
                </div>
                <div>
                  <button
                    onClick={handleSubmit(async (data) => {
                      await onSubmit(data);
                      if (user?.role === "vendor") {
                        navigate("/vendor-dashboard/service-listing");
                      } else {
                        navigate("/admin-dashboard/service-management");
                      }
                    })}
                    className="border border-black bg-black shadow-[0px_10px_17px_0px_#FD636312] py-3 rounded-full text-[#FFFFFF] font-medium px-8 min-w-[120px]"
                  >
                    Save & exit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mycontainer">
            <div className="pt-6">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <Stepper
                  sx={{
                    "& .MuiStepLabel-label": { fontFamily: "tt_chocolates" },
                  }}
                  activeStep={activeStep}
                  alternativeLabel
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={CustomStepIcon}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div className="bg-white dark:bg-[#1E1E1E] mt-8 rounded-[10px] sm:p-5">
                {stepscontent[activeStep]?.component || (
                  <div>Invalid Step. Please try again.</div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 pb-4">
              <button
                className="bg-[#E7E7E7] text-[#202529] border px-8 py-3 rounded-full ml-4"
                onClick={() => {
                  if (activeStep === 0 && serviceId) {
                    deleteService(serviceId);
                    navigate(-1);
                  } else if (activeStep === 0) {
                    navigate(-1);
                  } else {
                    handleBack();
                  }
                }}
                disabled={activeStep === 0 && false}
              >
                Back
              </button>

              <button
                onClick={handleSubmit(onSubmit)}
                className="border border-black bg-black shadow-[0px_10px_17px_0px_#FD636312] py-3 rounded-full text-[#FFFFFF] font-medium px-8 min-w-[120px]"
              >
                {isLastStep() ? "Finish" : "Next"}
              </button>
            </div>
            <Loader
              loading={
                isLoading || isServiceCreateLoading || isServiceUpdateLoading
              }
            />
          </div>
        </div>
      </FormProvider>
    </>
  );
}

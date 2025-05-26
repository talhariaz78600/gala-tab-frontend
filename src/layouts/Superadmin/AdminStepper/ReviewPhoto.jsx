import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form"; // Import useFormContext for accessing React Hook Form
import Upload from "../../../assets/img/upload.png";

const ReviewPhoto = ({ handleBack }) => {
  // Access form methods using useFormContext
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  // Watch the value of 'selfieImage' to display the image
  const selfieImage = watch("selfieImage");

  // Handle file input change

  return (
    <div className="py-7 w-full">
      <div>
        <h4 className="md:text-4xl text-3xl font-semibold text-center">
          Review your photo
        </h4>
        <p className="text-center mt-4 max-w-lg mx-auto">
          Make sure it’s well-lit, clear, and matches the person in the ID.
        </p>
        <div className="sm:max-w-lg mx-auto md:mt-12 mt-5">
          <h5 className="text-xl font-semibold">
            Your Photo is Taken, Thanks!
          </h5>
          <form>
            <div className=" border-2 w-full bg-[#F7F7F7] p-3 h-96 flex flex-col items-center justify-center rounded-xl relative overflow-hidden ">
              {selfieImage ? (
                <img
                  src={URL.createObjectURL(selfieImage)}
                  alt="Captured selfie"
                  className=" rounded-xl object-fill w-[80%] h-[80%] mb-2"
                />
              ) : (
                <label htmlFor="upload" className="text-center relative">
                  <img
                    src={Upload}
                    alt="Upload"
                    className=" rounded-lg mx-auto"
                  />
                </label>
              )}

              <div className="absolute bottom-2 right-2 ">
                <button
                  type="button"
                  onClick={handleBack} // Trigger the back functionality on retake
                  className="text-[#3551B6] bg-white shadow-xl text-sm inline-flex rounded-full py-2 px-5"
                >
                  Retake Photo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPhoto;

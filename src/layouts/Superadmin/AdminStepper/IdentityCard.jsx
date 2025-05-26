import React from "react";
import Upload from "../../../assets/img/upload.png";
import { useFormContext } from "react-hook-form";

const IdentityCard = () => {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const frontImage = watch("frontImage");
  const backImage = watch("backImage");

  const handleImageChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setValue(fieldName, file, { shouldDirty: true, shouldValidate: true });
      trigger(fieldName);
    } else {
      alert("Please select a valid JPEG or PNG file.");
    }
  };

  return (
    <div className="py-7 w-full">
      <div>
        <h4 className="md:text-4xl text-3xl font-semibold text-center">
          Upload images of your identity card
        </h4>
        <p className="text-center mt-4 max-w-lg mx-auto">
          Make sure your photos aren’t blurry and the front of your identity
          card clearly shows your face.
        </p>

        <div className="sm:max-w-lg mx-auto md:mt-12 mt-5">
          <form>
            {/* Upload Front */}
            <div
              className={`border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-60 flex items-center justify-center rounded-xl overflow-hidden relative ${
                errors.frontImage ? "border-red-500" : ""
              }`}
            >
              <label
                htmlFor="uploadFront"
                className="cursor-pointer w-full h-full"
              >
                {frontImage ? (
                  <img
                    src={URL.createObjectURL(frontImage)}
                    alt="Uploaded front"
                    className="h-full w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <img
                      src={Upload}
                      alt=""
                      className="bg-[#EDEDED] p-3 rounded-lg mx-auto"
                    />
                    <p className="font-medium text-xl text-[#171717] mt-2">
                      Upload front
                    </p>
                    <p className="text-xs font-medium">JPEG or PNG only</p>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="uploadFront"
                className="hidden"
                accept="image/jpeg, image/png"
                onChange={(e) => handleImageChange(e, "frontImage")}
              />
              <input
                type="hidden"
                {...register("frontImage", {
                  required: "Front image is required",
                })}
              />
            </div>
            {errors.frontImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.frontImage.message}
              </p>
            )}

            {/* Upload Back */}
            <div
              className={`border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-60 flex items-center justify-center mt-5 rounded-xl overflow-hidden relative ${
                errors.backImage ? "border-red-500" : ""
              }`}
            >
              <label
                htmlFor="uploadBack"
                className="cursor-pointer w-full h-full"
              >
                {backImage ? (
                  <img
                    src={URL.createObjectURL(backImage)}
                    alt="Uploaded back"
                    className="h-full w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <img
                      src={Upload}
                      alt=""
                      className="bg-[#EDEDED] p-3 rounded-lg mx-auto"
                    />
                    <p className="font-medium text-xl text-[#171717] mt-2">
                      Upload back
                    </p>
                    <p className="text-xs font-medium">JPEG or PNG only</p>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="uploadBack"
                className="hidden"
                accept="image/jpeg, image/png"
                onChange={(e) => handleImageChange(e, "backImage")}
              />
              <input
                type="hidden"
                {...register("backImage", {
                  required: "Back image is required",
                })}
              />
            </div>
            {errors.backImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.backImage.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;

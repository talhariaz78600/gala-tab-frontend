import React, { useState } from "react";
import Uload from "../../../assets/img/uload.png";
import { useFormContext } from "react-hook-form";

import { FaTimes } from "react-icons/fa";

const Upload = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  register("media", {
    validate: (value) =>
      value && value.length > 0
        ? true
        : "At least one image or video is required.",
  });

  const [files, setFiles] = useState(watch("media") || []);
  console.log("media", watch("media"));

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file, index) => ({
      url: file,
      cover: files.length === 0 && index === 0,
    }));

    const updatedFiles = [...files, ...selectedFiles];

    setFiles(updatedFiles);
    setValue("media", updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    // Ensure at least one file has cover: true
    if (updatedFiles.length > 0 && !updatedFiles.some((f) => f.cover)) {
      updatedFiles[0].cover = true;
    }

    setFiles(updatedFiles);
    setValue("media", updatedFiles);
  };

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left Side Content */}
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
            Step 04
          </p>
          <div>
            <h2 className="text-[#171717] dark:text-white font-bold xl:text-5xl text-3xl mt-5">
              Add Some Photos & Videos of Your Service Portfolio
            </h2>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              You’ll need 5 photos to kick things off, but feel free to add more
              or make changes later!
            </p>
          </div>
        </div>

        {/* Right Side Upload Section */}
        <div className="bg-[#F7F7F7] rounded-2xl p-3 flex items-center justify-center flex-col">
          {/* Default Upload Section */}
          {files.length === 0 ? (
            <div className="flex flex-col items-center">
              <img src={Uload} alt="Upload" />
              <div className="py-3">
                <label
                  htmlFor="uploadInput"
                  className="text-white bg-black rounded-3xl px-4 py-2 shadow-lg cursor-pointer"
                >
                  Upload Photos & Videos
                </label>
                <input
                  type="file"
                  id="uploadInput"
                  multiple
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          ) : (
            <div className="w-full">
              {/* File Grid Display */}
              <div className="grid grid-cols-2 gap-4">
                {files.map((item, index) => {
                  // Determine the correct URL
                  const fileUrl =
                    item.url instanceof File
                      ? URL.createObjectURL(item.url)
                      : item.url;

                  return (
                    <div key={index} className="relative">
                      <div className="rounded-lg shadow-md">
                        {/* Check if it's an image or video */}
                        {item.url instanceof File ? (
                          item.url.type.startsWith("image/") ? (
                            <img
                              src={fileUrl}
                              alt={`Upload ${index}`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          ) : (
                            <video
                              src={fileUrl}
                              controls
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          )
                        ) : item.type === "image" ? (
                          <img
                            src={fileUrl}
                            alt={`Upload ${index}`}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        ) : (
                          <video
                            src={fileUrl}
                            controls
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        )}
                      </div>

                      {/* Cover Badge */}
                      {item.cover && (
                        <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Cover
                        </span>
                      )}

                      {/* Remove Icon */}
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeFile(index)}
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Upload More Button */}
              <div className="py-3 text-center mt-4">
                <label
                  htmlFor="uploadMore"
                  className="text-white bg-black rounded-3xl px-4 py-2 shadow-lg cursor-pointer"
                >
                  Upload More
                </label>
                <input
                  type="file"
                  id="uploadMore"
                  multiple
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}
          {errors.media && (
            <p className="text-red-500 text-sm mt-2">{errors.media.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;

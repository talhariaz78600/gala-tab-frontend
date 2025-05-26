import React, { useState } from "react";
import MorePhoto from "../../../assets/img/more-photo.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import { useFormContext } from "react-hook-form";

const EditPhoto = () => {
  const { watch, setValue } = useFormContext();
  const uploadedFiles = watch("media") || [];
  console.log("media2", watch("media"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);

  // Handle menu open
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedFileIndex(index);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFileIndex(null);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => ({
      url: file,
      cover: uploadedFiles.length === 0 && index === 0,
    }));

    const updatedFiles = [...uploadedFiles, ...newFiles];

    setValue("media", updatedFiles, { shouldDirty: true });
  };

  //  Handle Delete
  const handleDelete = () => {
    if (selectedFileIndex !== null) {
      const updatedFiles = uploadedFiles.filter(
        (_, i) => i !== selectedFileIndex
      );

      // Ensure at least one file has cover: true
      if (updatedFiles.length > 0 && !updatedFiles.some((f) => f.cover)) {
        updatedFiles[0].cover = true;
      }

      setValue("media", updatedFiles, { shouldDirty: true });
    }
    handleClose();
  };

  // Handle Make Cover
  const handleMakeCover = () => {
    if (selectedFileIndex !== null) {
      const updatedFiles = uploadedFiles.map((item, i) => ({
        ...item,
        cover: i === selectedFileIndex,
      }));

      setValue("media", updatedFiles, { shouldDirty: true });
    }
    handleClose();
  };

  const moveFile = (direction) => {
    if (selectedFileIndex === null) return;

    const currentIndex = selectedFileIndex;
    const newIndex = currentIndex + direction;

    if (newIndex < 0 || newIndex >= uploadedFiles.length) return;

    const updatedFiles = [...uploadedFiles];
    const temp = updatedFiles[newIndex];
    updatedFiles[newIndex] = updatedFiles[currentIndex];
    updatedFiles[currentIndex] = temp;

    setValue("media", updatedFiles, { shouldDirty: true });
    setSelectedFileIndex(newIndex);
    handleClose();
  };

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left Side Content */}
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
            Step 05
          </p>
          <div className="mt-9">
            <h2 className="text-[#171717] dark:text-white font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">
              How’s This Looking?
            </h2>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              Drag to reorder and make sure everything’s picture-perfect!
            </p>
          </div>
          <div className="mt-9">
            <label
              htmlFor="uploadMore"
              className="bg-[#32F0CD] shadow rounded-full px-6 py-2 font-semibold cursor-pointer"
            >
              Upload more photos
            </label>
            <input
              type="file"
              id="uploadMore"
              className="hidden"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Right Side - Display Uploaded Files */}
        <div className="bg-[#F7F7F7] rounded-xl p-4">
          <div className="h-[400px] overflow-y-auto pe-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {uploadedFiles.length === 0 ? (
                <p className="text-gray-500 dark:text-white text-center">
                  No photos uploaded yet.
                </p>
              ) : (
                uploadedFiles.map((item, index) => {
                  // Determine the correct URL
                  const fileUrl =
                    item.url instanceof File
                      ? URL.createObjectURL(item.url)
                      : item.url;

                  return (
                    <div key={index} className="relative">
                      <div className="rounded-lg shadow-md">
                        {/* Check file type */}
                        {item.url instanceof File ? (
                          item.url.type.startsWith("image/") ? (
                            <img
                              src={fileUrl}
                              alt={`Uploaded ${index}`}
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
                            alt={`Uploaded ${index}`}
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

                      {/* Menu Button */}
                      <div className="absolute top-0 right-0">
                        <Button
                          id={`menu-button-${index}`}
                          aria-controls={
                            selectedFileIndex === index
                              ? "basic-menu"
                              : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={
                            selectedFileIndex === index ? "true" : undefined
                          }
                          onClick={(e) => handleClick(e, index)}
                        >
                          <BsThreeDots className="bg-white rounded-full p-2 text-4xl text-black shadow-lg" />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={selectedFileIndex === index}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": `menu-button-${index}`,
                          }}
                        >
                          <MenuItem onClick={() => moveFile(1)}>
                            Move forward
                          </MenuItem>
                          <MenuItem onClick={() => moveFile(-1)}>
                            Move backward
                          </MenuItem>
                          <MenuItem onClick={handleMakeCover}>
                            Make cover photo
                          </MenuItem>
                          <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                      </div>

                      {/* Cover Photo Badge */}
                      {item.cover && (
                        <div className="absolute bottom-2 left-2">
                          <button className="bg-white rounded-lg p-2 text-black shadow-lg">
                            Cover Photo
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPhoto;

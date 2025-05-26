import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropImgIcon from "../../assets/img/DropImgIcon.png";

export default function ImgPreviewBox({
  index,
  image,
  isCover,
  onRemove,
  onImageChange,
  type,
  handleMakeCover,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);

  const mediaType =
    type || (image instanceof File ? image.type.split("/")[0] : "image");

  return (
    <div style={{ textAlign: "center" }} className="relative">
      {image ? (
        <div className="relative">
          {mediaType === "image" ? (
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`Preview ${index + 1}`}
              className="w-full h-full aspect-[1/.7] object-cover rounded-[10px]"
            />
          ) : mediaType === "video" ? (
            <video
              controls
              className="w-full h-full aspect-[1/.7] object-cover rounded-[10px]"
            >
              <source
                src={image instanceof File ? URL.createObjectURL(image) : image}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : null}

          {isCover && (
            <span className="absolute top-0 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded-tl-lg">
              Cover
            </span>
          )}

          <div className="absolute top-0 right-0 m-3 flex items-center gap-2">
            <div onClick={onRemove} className="cursor-pointer">
              <RxCrossCircled className="text-[26px] text-black dark:text-white" />
            </div>

            {handleMakeCover && (
              <div className="relative">
                <BsThreeDotsVertical
                  className="bg-black/70 text-white rounded-full text-[22px] cursor-pointer p-1"
                  onClick={toggleMenu}
                />
                {showMenu && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-600 shadow-lg rounded w-32 z-10">
                    <button
                      onClick={() => {
                        handleMakeCover(index);
                        setShowMenu(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
                    >
                      Make Cover
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[1/.7] border border-dashed border-gray-400 dark:border-gray-600 rounded-[10px] flex flex-col items-center justify-center bg-white dark:bg-gray-800 cursor-pointer">
          <label className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer text-black dark:text-white">
            <img src={DropImgIcon} alt="Upload" className="dark:invert" />
            Drag and Drop
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onImageChange}
            />
          </label>
        </div>
      )}
    </div>
  );
}

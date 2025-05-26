import React, { useState } from "react";
import SmallImagePreview from "./SmallImagePreview";

export default function EditProfileKevin() {
  const [images, setImages] = useState([null]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };
  return (
    <form action="/admin-dashboard/admin-profile">
      <div className="bg-[#F7F7F7] min-h-[calc(100vh-130px)] rounded-[20px] p-5 flex flex-col justify-between">
        <div>
          <div>
            <p className="text-[24px] font-semibold">Edit Profile Information</p>
            <div className="flex items-end gap-4 flex-wrap">
              <div className="w-full max-w-[150px] mt-6 mx-auto sm:mx-0 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                {images.map((image, index) => (
                  <SmallImagePreview
                    key={index}
                    index={index}
                    image={image}
                    onImageChange={handleImageChange}
                    onRemove={removeImage}
                    inputId="VendorImage"
                  />
                ))}
              </div>
              <div className="mx-auto sm:ms-0">
                <label
                  className="text-white bg-black py-3 px-6 shadow:[0px_14px_24px_0px_#7C7C7C66] rounded-full text-xs leading-normal"
                  htmlFor="VendorImage"
                >
                  Upload Image
                </label>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Office Number
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Emergency Number
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            
          </div>
          <h4 className="my-5 font-semibold text-xl">Company Address</h4>
          <div className="grid md:grid-cols-2 gap-4">
          <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Company Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Mailing Address
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Mailing City
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Mailing State
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Mailing Zip
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
          <div>
            <button className="bg-[#E7E7E7] py-2 rounded-full px-6 border w-52">
              Cancel
            </button>
          </div>
          <div>
            <button className="text-white bg-black py-2 px-6 border w-52 rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { RiCloseCircleFill } from "react-icons/ri";
import { useLocation } from "react-router";

export default function AddTaxInfoModdal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const location = useLocation();
  const formAction =
  location.pathname === "/tax-forums"
    ? "/tax-requirements"
    : location.pathname === "/user-tax-forums"
    ? "/user-tax-requirements"
    : "/default-action";

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-black text-white py-3 px-5 flex items-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] ms-auto"
      >
        Add Tax Info
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-[20px]">
          <form action={formAction}>
            <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
              <p className="text-[26px] font-semibold">Add tax info</p>
              <button>
                <RiCloseCircleFill
                  className="text-[24px] text-[#979797]"
                  onClick={handleClose}
                />
              </button>
            </div>
            <div className="p-4">
              <p className="text-lg">
                To get started, select a country/region to add your tax info.
              </p>
              <div className="flex flex-col gap-3 mt-4">
                <div>
                  <input
                    className="peer hidden"
                    type="radio"
                    name="Tax-info"
                    id="United-States"
                    onChange={() => handleSelection("United-States")}
                  />
                  <label
                    className="flex items-center p-4 bg-[#F3F3F3] peer-checked:bg-black peer-checked:text-white rounded-[10px]"
                    htmlFor="United-States"
                  >
                    <span className="flex items-center me-2">
                      <div className="w-5 h-5 rounded-full border bg-white border-black flex items-center justify-center">
                        <div
                          className={`size-3 rounded-full bg-black ${
                            selectedOption === "United-States"
                              ? "block"
                              : "hidden"
                          }`}
                        ></div>
                      </div>
                    </span>
                    <span>United States</span>
                  </label>
                </div>
                <div>
                  <input
                    className="peer hidden"
                    type="radio"
                    name="Tax-info"
                    id="Mexico"
                    onChange={() => handleSelection("Mexico")}
                  />
                  <label
                    className="flex items-center p-4 bg-[#F3F3F3] peer-checked:bg-black peer-checked:text-white rounded-[10px]"
                    htmlFor="Mexico"
                  >
                    <span className="flex items-center me-2">
                      <div className="w-5 h-5 rounded-full border bg-white border-black flex items-center justify-center">
                        <div
                          className={`size-3 rounded-full bg-black ${
                            selectedOption === "Mexico" ? "block" : "hidden"
                          }`}
                        ></div>
                      </div>
                    </span>
                    <span>Mexico, Colombia or India</span>
                  </label>
                </div>
                <div>
                  <input
                    className="peer hidden"
                    type="radio"
                    name="Tax-info"
                    id="other"
                    onChange={() => handleSelection("other")}
                  />
                  <label
                    className="flex items-center p-4 bg-[#F3F3F3] peer-checked:bg-black peer-checked:text-white rounded-[10px]"
                    htmlFor="other"
                  >
                    <span className="flex items-center me-2">
                      <div className="w-5 h-5 rounded-full bg-white border border-black flex items-center justify-center">
                        <div
                          className={`size-3 rounded-full bg-black ${
                            selectedOption === "other" ? "block" : "hidden"
                          }`}
                        ></div>
                      </div>
                    </span>
                    <span>Another country/region</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-between mt-8">
                <button
                  onClick={handleClose}
                  className="text-[20px] underline font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1C1C1C] border border-[#1C1C1C] rounded-[10px] py-3 px-6 font-semibold text-white shadow-[0px_11.72px_20px_0px_#00000024]"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

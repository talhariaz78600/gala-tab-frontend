import * as React from "react";
import Modal from "@mui/material/Modal";
import { IoCloseCircle, IoFunnelOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import CustomCheckbox from "../../components/VendorDashboard/CustomCheckbox";
import CustomCheckboxID from "./CustomCheckboxID";
import StarRatingCustomSize from "./StarRatingCustomSize";

export default function Reviewfilters() {
  const vendortypes = ["Venues", "Decorations", "Catering", "Cakes", "DJ’s"];
  const Status = ["Active", "Inactive"];
  const ServiceOwner = [
    "owner name here",
    "owner name here",
    "owner name here",
    "owner name here",
    "owner name here",
  ];
  const Rating = ["5.0", "4.8", "4.5", "4.0", "3.5"];
  const Star = ["5", "4", "3", "2", "1"];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-white text-[#979797] py-3 px-5 min-w-[150px] border border-[#D3D3D3] flex items-center justify-between rounded-[5px] shadow-[0px_10px_20px_0px_#0000001A] ms-auto"
      >
        <IoFunnelOutline />
        <span className="text-[15px]">Filter</span>
        <FaCaretDown />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1300px] bg-white rounded-[20px]">
          <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC]">
            <div className="flex items-center justify-between bg-[#E7E7E9] p-5 border-b border-[#CDCDCD]">
              <p className="text-[#3551B6] text-[20px] font-semibold">
                Quick filters
              </p>
              <button onClick={handleClose}>
                <IoCloseCircle className="text-[#979797] text-[28px]" />
              </button>
            </div>
            <div>
              <form action="">
                <div className="py-1">
                  <div className="p-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-h-[calc(100dvh-220px)] overflow-y-auto scroll-x-hidden">
                    <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                      <p className="text-[#3551B6] text-[18px] font-semibold">
                        Vendor Type
                      </p>
                      <div className="flex flex-col gap-3 mt-4">
                        {vendortypes.map((type, index) => (
                          <CustomCheckbox key={index} name={type} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                      <p className="text-[#3551B6] text-[18px] font-semibold">
                        Service Owner
                      </p>
                      <div className="flex flex-col gap-3 mt-4">
                        {ServiceOwner.map((owner, index) => (
                          <CustomCheckboxID
                            id={`Owner${index}`}
                            key={index}
                            content={owner}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                      <p className="text-[#3551B6] text-[18px] font-semibold">
                        Rating
                      </p>
                      <div className="flex flex-col gap-3 mt-4">
                        {Rating.map((rating, index) => (
                          <CustomCheckbox key={index} name={rating} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                      <p className="text-[#3551B6] text-[18px] font-semibold">
                        Star
                      </p>
                      <div className="flex flex-col gap-3 mt-4">
                        {Star.map((stars, index) => (
                          <CustomCheckboxID
                            key={index}
                            id={`${stars}stars`}
                            content={
                              <StarRatingCustomSize
                                initialstars={stars}
                                isInteractive={false}
                                size={"14px"}
                              />
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#E7E7E9] rounded-[10px] p-3">
                      <p className="text-[#3551B6] text-[18px] font-semibold">
                        Status
                      </p>
                      <div className="flex flex-col gap-3 mt-4">
                        {Status.map((status, index) => (
                          <CustomCheckbox key={index} name={status} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 pb-5">
                  <button type="reset" className="font-medium underline">
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="font-medium text-white bg-black py-3 px-10 rounded-[7px]"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

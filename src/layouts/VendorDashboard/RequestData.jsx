import React from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";
import down from "../../assets/img/down.png";
import { Modal } from "@mui/material";
import ConfirmMethodModal from "../../components/VendorDashboard/ConfirmMethodModal";

export default function RequestData() {
  const [openconfirmmethod, setOpenconfirmmethod] = React.useState(false);
  const handleOpenconfirmmethod = () => setOpenconfirmmethod(true);
  const handleCloseconfirmmethod = () => setOpenconfirmmethod(false);
  return (
    <div>
      <VendorTopBar />
      <div className="mt-16">
        <div className="mycontainer">
          <div className="flex items-center">
            <Link
              to="/vendor-dashboard/vendor-account"
              className="text-[28px] leading-normal font-semibold"
            >
              Account
            </Link>
            <FaChevronRight className="mx-2 leading-normal" />
            <Link className="text-[#3551B6] font-medium text-lg">
              Privacy and sharing
            </Link>
          </div>
          <div className="mt-6 border-b pb-5 border-[#CDCDCD]">
            <div className="flex gap-4 flex-wrap-reverse justify-between items-center">
              <p className="text-[28px] font-semibold">
                Request your personal data
              </p>
              <Link to="/manage-account" className="ms-auto">
                <AiFillCloseCircle className="text-[24px] text-[#C13515]" />
              </Link>
            </div>
            <p className="text-lg mt-3">
              Before we get you a copy of your data, we’ll just need you to
              answer a few questions.
            </p>
          </div>
          <div>
            <form action="">
              <div className="max-w-[650px] mx-auto">
                <div className="mt-10">
                  <label className="text-lg font-medium" htmlFor="reside">
                    Where do you reside?
                  </label>
                  <select
                    style={{
                      backgroundImage: `url(${down})`,
                      backgroundPosition: "right 20px center",
                    }}
                    className="block border w-full p-6 pe-12 border-[#D4D7E3] bg-[#F3F3F3] rounded-[10px] focus:outline-none bg-no-repeat appearance-none"
                    name="reside"
                    id="reside"
                  >
                    <option
                      disabled
                      hidden
                      selected
                      value="Select country/region"
                    >
                      Select country/region
                    </option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="text-lg font-medium" htmlFor="format">
                    In what format do you want your data?
                  </label>
                  <select
                    style={{
                      backgroundImage: `url(${down})`,
                      backgroundPosition: "right 20px center",
                    }}
                    className="block border w-full p-6 pe-12 border-[#D4D7E3] bg-[#F3F3F3] rounded-[10px] focus:outline-none bg-no-repeat appearance-none"
                    name="format"
                    id="format"
                  >
                    <option disabled hidden selected value="Select format">
                      Select format
                    </option>
                    <option value="HTML">
                      Interactive web-context format (HTML)
                    </option>
                    <option value="Machine-readable format (JSON)">
                      Machine-readable format (JSON)
                    </option>
                    <option value="Excel worksheet">Excel worksheet</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label className="text-lg font-medium" htmlFor="format">
                    Why are you requesting a copy of your data?
                  </label>
                  <select
                    style={{
                      backgroundImage: `url(${down})`,
                      backgroundPosition: "right 20px center",
                    }}
                    className="block border w-full p-6 pe-12 border-[#D4D7E3] bg-[#F3F3F3] rounded-[10px] focus:outline-none bg-no-repeat appearance-none"
                    name="format"
                    id="format"
                  >
                    <option
                      disabled
                      hidden
                      selected
                      value="Select reason (optional)"
                    >
                      Select reason (optional)
                    </option>
                    <option value="I want to know Gala Tab Knows about me">
                      I want to know Gala Tab Knows about me
                    </option>
                    <option value="I want to file a support ticket">
                      I want to file a support ticket
                    </option>
                    <option value="I Want to move my data to another service">
                      I Want to move my data to another service
                    </option>
                    <option value="I Plan to delete or deactivate my account soon">
                      I Plan to delete or deactivate my account soon
                    </option>
                    <option value="I Need to access specific data for legal reasons">
                      I Need to access specific data for legal reasons
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mt-16">
                  <button
                    onClick={handleOpenconfirmmethod}
                    type="button"
                    className="font-medium bg-black py-3 px-8 rounded-full text-white"
                  >
                    Request Data
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={openconfirmmethod}
        onClose={handleCloseconfirmmethod}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-white rounded-[20px]">
          <ConfirmMethodModal handleClose={handleCloseconfirmmethod} />
        </div>
      </Modal>
    </div>
  );
}

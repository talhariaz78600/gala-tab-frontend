import * as React from "react";
import Modal from "@mui/material/Modal";
import { MdModeEdit } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link } from "react-router";
import visa from "../../assets/img/visa.png";
import master from "../../assets/img/master.png";
import paypal from "../../assets/img/paypal.png";
import gPay from "../../assets/img/g-pay.png";
import down from "../../assets/img/down.png";

const paymentMethods = [
  { name: "Visa", image: visa },
  { name: "MasterCard", image: master },
  { name: "PayPal", image: paypal },
  { name: "Google Pay", image: gPay },
];

export default function CardDetailsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="inline-block bg-black text-white sm:text-lg text-sm py-3 px-4 rounded-[10px]"
      >
        Add payment method
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white rounded-[20px]">
          <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
            <p className="sm:text-[26px] text-lg font-semibold">Add card details</p>
            <button>
              <RiCloseCircleFill
                className="text-[24px] text-[#979797]"
                onClick={handleClose}
              />
            </button>
          </div>
          <div className="p-4">
            <div className="flex justify-between flex-wrap">
              <p className="sm:text-[24px] text-lg font-semibold">Pay with</p>
              <div className="flex items-center gap-3 ms-auto">
                {paymentMethods.map((method, index) => (
                  <img
                    key={index}
                    src={method.image}
                    alt={method.name}
                    className="sm:max-h-4 max-h-3 object-contain"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <div>
                <select
                  style={{
                    backgroundImage: `url(${down})`,
                    backgroundPosition: "right 20px center",
                  }}
                  className="sm:p-5 p-3 pe-12 block w-full rounded-[10px] bg-[#F3F3F3] border focus:outline-none border-[#D4D7E3] bg-no-repeat appearance-none"
                  name="selectmethod"
                  id="selectmethod"
                >
                  <option value="Credit or debit card">
                    Credit or debit card
                  </option>
                  <option value="PayPal">PayPal</option>
                  <option value="GPay">Google Pay</option>
                </select>
              </div>
              <div>
                <label
                  className="sm:text-lg font-medium text-black"
                  htmlFor="Cardnumber"
                >
                  Card number
                </label>
                <input
                  className="block w-full sm:p-5 p-3 rounded-[10px] bg-[#F3F3F3] border focus:outline-none border-[#D4D7E3]"
                  type="text"
                  name="Cardnumber"
                  id="Cardnumber"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label
                    className="sm:text-lg font-medium text-black"
                    htmlFor="Expiration"
                  >
                    Expiration
                  </label>
                  <input
                    className="block w-full sm:p-5 p-3 rounded-[10px] bg-[#F3F3F3] border focus:outline-none border-[#D4D7E3]"
                    type="text"
                    name="Expiration"
                    id="Expiration"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label
                    className="sm:text-lg font-medium text-black"
                    htmlFor="CVV"
                  >
                    CVV
                  </label>
                  <input
                    className="block w-full sm:p-5 p-3 rounded-[10px] bg-[#F3F3F3] border focus:outline-none border-[#D4D7E3]"
                    type="text"
                    name="CVV"
                    id="CVV"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label
                  className="sm:text-lg font-medium text-black"
                  htmlFor="Country"
                >
                  Country/region
                </label>
                <select
                  style={{
                    backgroundImage: `url(${down})`,
                    backgroundPosition: "right 20px center",
                  }}
                  className="sm:p-5 p-3 pe-12 block w-full rounded-[10px] bg-[#F3F3F3] border focus:outline-none border-[#D4D7E3] bg-no-repeat appearance-none"
                  name="Country"
                  id="Country"
                >
                  <option value="Select county" hidden selected disabled>
                    Select county
                  </option>
                  <option value="USA">USA</option>
                  <option value="USA">Google Pay</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-center sm:justify-between mt-8">
              <button className="text-[20px] underline font-medium">
                Cancel
              </button>
              <button className="bg-[#1C1C1C] border border-[#1C1C1C] rounded-[10px] py-3 px-6 font-semibold text-white shadow-[0px_11.72px_20px_0px_#00000024]">
                Done
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

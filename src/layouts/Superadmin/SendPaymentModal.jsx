import React, { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import decoration from "../../assets/img/decoration.png";
import { Link } from "react-router";
import guestimg from "../../assets/img/guest-img.png";
import { Avatar, Modal } from "@mui/material";
import Profile from "../../assets/img/profile.png";
import { useSelector } from "react-redux";
import { useSendPaymenttoVendorMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import dayjs from "dayjs";

export default function SendPaymentModal({ open, handleClose, data }) {
  const user = useSelector((state) => state.auth.user);
  const [amount, setAmount] = useState(0);

  const [error, setError] = useState(false);

  const [sendPaymenttoVendor, { isLoading }] = useSendPaymenttoVendorMutation();

  const handlePay = async () => {
    const response = await sendPaymenttoVendor({
      data: { paymentId: data?.payment._id, amount },
    }).unwrap();

    if (response.status === "success") {
      toast.success("Payment sent successfully!");
      handleClose();
    }

    console.log("Paying amount:", amount);
  };

  useEffect(() => {
    setAmount(data?.payment?.amount);
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ m: 2 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1100px] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide bg-white dark:bg-[#1e1e1e] rounded-[20px]">
        <div>
          <div>
            <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
              <div className=" w-full sm:w-[calc(100%-52px)]">
                <p className="text-base min-[480px]:text-[20px] sm:text-[24px] text-center font-semibold">
                  Booking Summary
                </p>
              </div>
              <button className="ms-auto mb-1 sm:mb-0">
                <RiCloseCircleFill
                  className="text-[24px] text-[#D92D20]"
                  onClick={handleClose}
                />
              </button>
            </div>
            <div className="p-4  scroll-x-hidden overflow-y-auto">
              <div className="grid gap-4 ">
                <h5 className=" font-semibold px-2">Amount Breakdown</h5>
                <div className="bg-[#F7F7F7] dark:bg-gray-800 border border-[#D5D5D5] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between gap-2">
                    <p className="sm:text-lg font-semibold">
                      {data?.service?.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-8 mt-2 flex-wrap">
                    <div>
                      <p className="text-lg font-semibold">Total Amount</p>
                      <p className="font-medium text-[#34A853]">
                        ${Number(data?.totalPrice || 0).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold">
                        Admin Fee (
                        {data?.totalPrice
                          ? (
                              ((data?.totalPrice -
                                (data?.payment?.amount || 0)) /
                                data?.totalPrice) *
                              100
                            ).toFixed(2)
                          : "0.00"}
                        %)
                      </p>
                      <p className="font-medium text-[#34A853]">
                        $
                        {Number(
                          (data?.totalPrice || 0) - (data?.payment?.amount || 0)
                        ).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold">
                        Vendor Amount (
                        {data?.totalPrice
                          ? (
                              ((data?.payment?.amount || 0) /
                                data?.totalPrice) *
                              100
                            ).toFixed(2)
                          : "0.00"}
                        %)
                      </p>
                      <p className="font-medium text-[#34A853]">
                        ${Number(data?.payment?.amount || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <h5 className=" font-semibold px-2">Booking Details</h5>
                <div className="bg-[#F7F7F7] dark:bg-gray-800 border border-[#D5D5D5] p-3 rounded-[20px]">
                  <div className="flex items-center justify-between gap-2">
                    <p className="sm:text-lg font-semibold">
                      {data?.service?.title}
                    </p>
                  </div>
                  <div className="flex items-center  gap-8 mt-2 flex-wrap">
                    <div>
                      <p className="text-lg font-semibold">Booking Date</p>
                      <p className="font-medium text-[#34A853]">
                        {dayjs(data?.created_at).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Total Guests</p>
                      <p className="font-medium text-[#34A853]">
                        {data?.guests || 0}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold">Location</p>
                      <p className="font-medium text-[#34A853]">
                        {data?.service?.location?.address}
                      </p>
                    </div>
                  </div>
                </div>

                <h5 className=" font-semibold px-2">Vednor Details</h5>
                <div className="bg-[#F7F7F7] dark:bg-gray-800 border border-[#D5D5D5] p-3 rounded-[20px]">
                  <div className="flex items-center  gap-8 mt-2 flex-wrap">
                    <div>
                      <p className="text-lg font-semibold">Vednor Name </p>

                      <div className="flex flex-wrap items-center gap-2 ">
                        <Avatar
                          src={data?.vendor?.profilePicture || Profile}
                          alt=""
                          className="w-20 h-20 object-cover  cursor-pointer"
                        />
                        <div className="max-w-[200px]">
                          <p className="font-medium text-nowrap overflow-hidden text-ellipsis">
                            {data?.vendor?.firstName} {data?.vendor?.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Email</p>
                      <p className="font-medium text-[#34A853]">
                        {data?.vendor?.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-semibold">Phone</p>
                      <p className="font-medium text-[#34A853]">
                        {data?.vendor?.contact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div>
                  <div>
                    <label
                      className="text-[#0C1421] dark:text-white text-lg font-medium ps-1"
                      htmlFor="Add-Amount"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      className="block w-full border text-black border-[#D4D7E3] rounded-[10px] placeholder:text-[#6A798F] focus:outline-none  p-4 bg-[#F3F3F3] "
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />

                    {error && (
                      <p className="text-sm text-red-500 mt-1">
                        Description is required and must be at least 10
                        characters long.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleClose}
                    className="text-medium text-white border border-black p-4 bg-[#D92D20] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                  >
                    cancel
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={handlePay}
                    className="text-medium text-white border bg-[#34A853] border-black rounded-[8px] p-4 shadow-[0px_10px_20px_0px_#0000001A]"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Loader loading={isLoading} />
        </div>
      </div>
    </Modal>
  );
}

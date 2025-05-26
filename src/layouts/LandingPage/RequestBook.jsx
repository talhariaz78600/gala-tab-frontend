import React, { useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { FaCheck, FaChevronLeft, FaStar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Visa from "../../assets/img/visa.png";
import Master from "../../assets/img/master.png";
import Paypal from "../../assets/img/paypal.png";
import Gpay from "../../assets/img/g-pay.png";
import down from "../../assets/img/down.png";
import { IoMdLock } from "react-icons/io";
import listImgTwo from "../../assets/img/list-detail2.png";
import { PiMedalMilitaryFill } from "react-icons/pi";
import listImg from "../../assets/img/default-image.jpg";
import { IoCaretBack } from "react-icons/io5";
import InputNumber from "@/components/VendorDashboard/InputNumber";
import {
  Button,
  Modal,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  useRequestBookingCreateMutation,
  useVerifyDiscountCodeMutation,
} from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import { getServiceBookingPrice } from "@/utils/getServiceBookingPrice";
import DateRangeModal from "@/components/LandingPage/DateRangeModal";
import { MdAccessTime, MdCalendarToday } from "react-icons/md";

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontSize: "16px",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const RequestBook = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data || {};
  const reviews = location?.state?.reviews || [];
  const [loading, setLoading] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [open, setOpen] = useState(false);
  const now = dayjs();
  const [checkIn, setCheckIn] = useState(now);
  const [checkOut, setCheckOut] = useState(now);
  const [accepted, setAccepted] = useState(false);
  const [days, setDays] = useState(1);
  const perDayPrice = data?.totalPrice || 0;
  const [totalPrice, setTotalPrice] = useState(perDayPrice);
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [errors, setErrors] = useState({});

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [requestBookingCreate, { isLoading: isRequestLoading }] =
    useRequestBookingCreateMutation();

  const [verifyDiscountCode, { isLoading: isverifyLoading }] =
    useVerifyDiscountCodeMutation();

  const handleSaveDates = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!accepted) {
      toast.error("You must accept the Vendor rules and disclosures.");
      return;
    }
    if (totalPrice - discountValue <= 0) {
      toast.error("Kindly select Service Days.");
    }
    if (!checkIn || !checkOut || !checkOut.isAfter(checkIn)) {
      newErrors.checkInOut =
        "Check-out must be after check-in (date and time).";
    }

    if (data?.maxGuests < guestCount) {
      newErrors.guests = `You can't book more than ${data?.maxGuests} guests.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    setLoading(true);

    try {
      if (!stripe || !elements) {
        toast.error("Stripe has not loaded properly.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          address: {
            line1: address.street,
            city: address.city,
            state: address.state,
            postal_code: address.zipCode,
          },
        },
      });

      if (error) {
        console.error("[Stripe error]", error);
        toast.error(error.message || "Stripe payment method creation failed.");
        setLoading(false);
        return;
      }

      // Proceed to API call after successful payment method creation
      const response = await requestBookingCreate({
        service: data._id,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guestCount,
        paymentMethodid: paymentMethod.id,
        totalPrice: totalPrice - discountValue,
        couponCode: discountCode,
      });

      if (response?.data?.status === "success") {
        toast.success("Booking Request Sent Successfully");
        navigate(-1);
      } else {
        console.log("response", response);

        toast.error(
          response?.error?.data?.message ||
            "Failed to create booking. Please try again."
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async () => {
    if (!discountCode) {
      toast.error("Please enter discount code.");
      return;
    }

    const newErrors = {};

    if (!checkIn || !checkOut || !checkOut.isAfter(checkIn)) {
      newErrors.checkInOut =
        "Check-out must be after check-in (date and time).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const response = await verifyDiscountCode({
        discountCode,
        bookingTotal: totalPrice,
        vendorId: data.vendorId._id,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message);
        setDiscountValue(response.discountValue);
      } else {
        toast.error(response.message || "Invalid discount code.");
      }
    } catch (error) {
      console.error("Discount verification error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.data?.error?.Error ||
        error?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const price = getServiceBookingPrice(
      data?.pricingModel,
      checkIn,
      checkOut,
      data?.serviceDays,
      data?.servicePrice
    );

    setTotalPrice(price);
  }, [checkIn, checkOut]);

  const sortedServiceDays = [...(data?.serviceDays || [])].sort(
    (a, b) =>
      dayOrder.indexOf(
        a.day.charAt(0).toUpperCase() + a.day.slice(1).toLowerCase()
      ) -
      dayOrder.indexOf(
        b.day.charAt(0).toUpperCase() + b.day.slice(1).toLowerCase()
      )
  );

  return (
    <div>
      <div className="py-14">
        <div className="mycontainer">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <Link to={-1} className=" flex items-center">
                <IoCaretBack />
                <p className="ms-1 font-semibold text-[20px] sm:text-[24px]">
                  Request to book
                </p>
              </Link>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-600" />
                <p className="font-medium text-sm sm:text-base text-[#484848] dark:text-white">
                  {reviews?.averageRating}
                </p>
                <p className="font-medium text-sm sm:text-base text-[#484848]  dark:text-white">
                  Reviews
                </p>
                <p className="font-medium text-sm sm:text-base text-[#484848]  dark:text-white">
                  {reviews?.totalReviews} reviews
                </p>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-12 mt-10">
            <div className="xl:col-start-1 xl:col-end-3">
              <h4 className="font-semibold text-[#484848]  dark:text-white text-lg sm:text-[20px] md:text-[24px]">
                Edit Change Check-In Date and Time, Guests.
              </h4>
              <div className="bg-[#F3F3F3] rounded-[10px] mt-3 p-3">
                <h5 className="font-semibold sm:text-lg text-black ">Date</h5>
                <>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div className="flex flex-col gap-2 text-black">
                      <h6 className="text-sm ">CHECK-IN DATE & TIME</h6>
                      <p className="text-sm">
                        {checkIn.format("MM/DD/YYYY hh:mm A")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 text-black">
                      <h6 className="text-sm">CHECKOUT DATE & TIME</h6>
                      <p className="text-sm">
                        {checkOut.format("MM/DD/YYYY hh:mm A")}
                      </p>
                    </div>
                    <div className="text-end">
                      <button
                        className="border border-black text-black bg-white font-medium shadow-[0px_10px_20px_0px_#0000001A] underline py-2 px-4 rounded-lg inline-block"
                        onClick={handleOpen}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              </div>
              {errors.checkInOut && (
                <div className="text-red-500 font-medium bg-red-100 p-2 rounded">
                  {errors.checkInOut}
                </div>
              )}

              <div className="bg-[#F3F3F3] rounded-lg mt-3 p-3">
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="text-black">
                    <h6 className="font-semibold sm:text-lg">Guests</h6>
                    <p className="text-sm">{guestCount} guests</p>
                  </div>
                  <div className="text-end flex justify-end">
                    <div className="inline-block max-w-[120px]">
                      <InputNumber
                        count={guestCount}
                        setCount={setGuestCount}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {errors.guests && (
                <div className="text-red-500 font-medium bg-red-100 p-2 rounded">
                  {errors.guests}
                </div>
              )}
              <div>
                <div>
                  <div className="flex justify-between gap-2 flex-wrap mt-4">
                    <div>
                      <h5 className="font-semibold dark:text-white text-[#484848] text-lg sm:text-[20px] md:text-[24px]">
                        Pay with
                      </h5>
                    </div>
                    <div className="flex justify-between gap-2">
                      <div>
                        <img
                          src={Visa}
                          alt=""
                          className="w-9 h-5 object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src={Master}
                          alt=""
                          className="w-9 h-5 object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src={Paypal}
                          alt=""
                          className="w-9 h-5 object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src={Gpay}
                          alt=""
                          className="w-9 h-5 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor=""
                      className="flex items-center sm:text-lg gap-2 mb-1 font-medium"
                    >
                      Card number <IoMdLock />
                    </label>
                    <div className="border border-gray-300 w-full py-5 px-3 rounded-xl bg-[#F3F3F3]">
                      <CardElement options={CARD_OPTIONS} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor=""
                      className="flex items-center sm:text-lg gap-2 mb-1 font-medium"
                    >
                      Discount Code
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="border text-black border-gray-300 w-full py-5 px-3 pr-32 rounded-xl bg-[#F3F3F3]"
                        placeholder="123"
                      />
                      <button
                        type="button"
                        onClick={handleCheck}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Get Discount
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h5 className="font-semibold dark:text-white text-xl text-[#484848]">
                      Billing address
                    </h5>

                    <div className="mt-4">
                      <label className="flex items-center sm:text-lg gap-2 mb-1 font-medium">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        className="border text-black border-gray-300 w-full py-5 px-3 rounded-xl bg-[#F3F3F3]"
                        placeholder="  Street address"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="flex items-center sm:text-lg gap-2 mb-1 font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        className="border text-black border-gray-300 w-full py-5 px-3 rounded-xl bg-[#F3F3F3]"
                        placeholder="City"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="flex items-center sm:text-lg gap-2 mb-1 font-medium">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleChange}
                          className="border text-black border-gray-300 w-full py-5 px-3 rounded-xl bg-[#F3F3F3]"
                          placeholder="State"
                        />
                      </div>

                      <div>
                        <label className="flex items-center sm:text-lg gap-2 mb-1 font-medium">
                          Zip Code
                        </label>
                        <input
                          type="number"
                          name="zipCode"
                          value={address.zipCode}
                          onChange={handleChange}
                          className="border text-black border-gray-300 w-full py-5 px-3 rounded-xl bg-[#F3F3F3]"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor=""
                      className="flex items-center sm:text-lg gap-2 mb-1 font-medium"
                    >
                      Apt or suite number
                    </label>
                    <input
                      type="text"
                      className="border text-black border-gray-300 w-full py-5 px-3 rounded-xl bg-[#F3F3F3]"
                      placeholder="add here"
                    />
                  </div>
                  <hr className="my-3"></hr>
                  <div className="flex gap-2 mt-8">
                    <div>
                      <FaCheck className="text-green-900" />
                    </div>
                    <div>
                      <p>
                        By entering your card details, you consent to the Gala
                        Tab and authorize Gala Tab, Inc. to charge to this
                        payment method all applicable fees, including any
                        outstanding additional or incidental charges related to
                        any booking linked to your account.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-8">
                    <div>
                      <FaCheck className="text-green-900" />
                    </div>
                    <div>
                      <p>
                        By entering your card details, you consent to the Gala
                        Tab and authorize Gala Tab, Inc. to charge to this
                        payment method all applicable fees, including any
                        outstanding additional or incidental charges related to
                        any booking linked to your account.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-8">
                    <div>
                      <FaCheck className="text-green-900" />
                    </div>
                    <div>
                      <p>
                        By entering your card details, you consent to the Gala
                        Tab and authorize Gala Tab, Inc. to charge to this
                        payment method all applicable fees, including any
                        outstanding additional or incidental charges related to
                        any booking linked to your account.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 my-8">
                    <input
                      className="size-[20px] accent-[#222222]"
                      type="checkbox"
                      id="vendorRules"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                    />
                    <label htmlFor="">
                      I accept and understand these Vendor rules and
                      disclosures.
                    </label>
                  </div>
                  <hr></hr>
                  <div className="flex justify-between mt-8">
                    <div>
                      <h4 className="font-semibold text-[24px] leading-normal text-[#484848] dark:text-white">
                        Message Your Vendor
                      </h4>
                      <p className="text-[#989898] dark:text-white text-sm font-medium mt-3">
                        Introduce yourself to {data?.vendorId?.fullName} and
                        describe what you’re planning.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-end">
                          <p className="text-sm">Listed By:</p>
                          <h6 className="font-bold text-[#484848] text-lg">
                            {data?.vendorId?.fullName}
                          </h6>
                        </div>
                        <div>
                          <img
                            src={
                              data?.media?.find((item) => item.cover)?.url ||
                              listImg
                            }
                            alt=""
                            className="w-14 h-14 object-cover rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="" className="text-lg font-medium">
                      Write a Message
                    </label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      className="bg-gray-300 text-black w-full rounded-lg "
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="bg-white shadow-lg border rounded-lg p-5 mt-4">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <MdCalendarToday className="text-black" />
                    Service Days
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {sortedServiceDays.map((dayItem) => {
                      const formattedDay =
                        dayItem.day.charAt(0).toUpperCase() +
                        dayItem.day.slice(1).toLowerCase();

                      return (
                        <div
                          key={dayItem.id}
                          className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-black text-lg font-medium capitalize">
                              {formattedDay}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MdAccessTime className="text-black" />
                            {dayItem.startTime} - {dayItem.endTime}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white  shadow-lg border rounded-lg p-3 mt-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        src={
                          data?.media?.find((item) => item.cover)?.url ||
                          listImg
                        }
                        alt=""
                        className="w-24 h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-lg text-black">
                        {data?.title}
                      </h5>
                      <p className="flex items-center gap-1 text-[#5E5E5E] font-medium text-sm">
                        <PiMedalMilitaryFill /> Vendor
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="mt-3 p-3">
                      <div className="grid grid-cols-2 gap-3 text-black">
                        <div>
                          <h6>CHECK-IN DATE & TIME</h6>
                          <p> {checkIn.format("MM/DD/YYYY hh:mm A")}</p>
                        </div>
                        <div>
                          <h6>CHECKOUT DATE & TIME</h6>
                          <p>{checkOut.format("MM/DD/YYYY hh:mm A")}</p>
                        </div>
                      </div>
                      <div className="mt-3 text-black">
                        <h6>GUESTS</h6>
                        <p>{guestCount} </p>
                      </div>
                    </div>
                    <hr className="my-3"></hr>

                    <div className="flex items-center justify-between text-black">
                      <div>
                        <h5 className="font-semibold text-base">Total Price</h5>
                      </div>
                      <div>
                        <p className="font-medium text-base ">
                          $ {totalPrice || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-black">
                      <div>
                        <h5 className="font-semibold text-base">
                          Discount Price
                        </h5>
                      </div>
                      <div>
                        <p className="font-medium text-base ">
                          $ {discountValue || 0}
                        </p>
                      </div>
                    </div>
                    <hr className="my-3"></hr>
                    <div className="flex items-center justify-between text-black">
                      <div>
                        <h5 className="font-semibold text-base">
                          Grand Total Price
                        </h5>
                      </div>
                      <div>
                        <p className="font-medium text-base">
                          $ {totalPrice - discountValue || 0}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={!stripe || !elements || loading}
                        className="py-2 bg-black text-white w-full rounded-lg flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                          "Request to Book"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Checkout Modal */}
      <DateRangeModal
        open={open}
        onClose={() => setOpen(false)}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        onSave={handleSaveDates}
      />
      <Loader loading={isverifyLoading || isRequestLoading} />
    </div>
  );
};

export default RequestBook;

import {
  useSendAccountMessageMutation,
  useSendMessagetoNewsLetterMutation,
} from "@/api/apiSlice";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export default function MessageModal({
  selectedIds,
  handleClose,
  setSelectedIds,
  mode = "account",
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sendAccountMessage, { isLoading }] = useSendAccountMessageMutation();
  const [sendMessagetoNewsLetter, { isLoading: newsLetterLoading }] =
    useSendMessagetoNewsLetterMutation();

  const handleSend = async () => {
    if (!message.trim()) {
      setError("Message is required.");
      return;
    }

    if (selectedIds.length === 0) {
      toast.error("No users selected.");
      return;
    }

    setError("");

    const payload = {
      selectedIds,
      message,
    };

    try {
      console.log("Sending message:", payload);
      const response =
        mode === "account"
          ? await sendAccountMessage(payload).unwrap()
          : await sendMessagetoNewsLetter({
              text: message,
              selectedIds,
            }).unwrap();

      if (response?.status === "fail") {
        console.error("Server responded with failure:", response);
        toast.error(response?.message || "Failed to send message.");
        return;
      }

      // success case
      setMessage("");
      handleClose?.();
      setSelectedIds([]);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC]">
      <div className="flex items-center justify-between bg-[#E7E7E9] p-5 border-b border-[#CDCDCD]">
        <p className="text-[#3551B6] sm:text-[20px] font-semibold">
          Send Message
        </p>
        <button onClick={handleClose}>
          <IoCloseCircle className="text-[#979797] text-[28px]" />
        </button>
      </div>

      <div className="max-h-[calc(100dvh-200px)] overflow-y-auto p-5">
        <label className="text-lg font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-full text-black resize-none border p-3 rounded-[8px] border-[#D5D5D5] shadow-[0px_8px_24px_0px_#00000012]"
        ></textarea>
        {error && (
          <p className="text-red-600 text-sm font-medium mt-1">{error}</p>
        )}
      </div>

      <div className="flex p-5 mt-10">
        <button
          onClick={handleSend}
          className="font-medium text-white bg-black py-3 px-10 rounded-[7px] ms-auto"
          disabled={isLoading || newsLetterLoading}
        >
          Send
        </button>
      </div>

      <Loader loading={isLoading || newsLetterLoading} />
    </div>
  );
}

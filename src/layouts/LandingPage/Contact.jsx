import React from "react";
import ContactImage from "../../assets/img/Contact.png";
import FaqsSection from "../../components/LandingPage/FaqsSection";
import Call from "../../assets/img/call.png";
import Mail from "../../assets/img/mail.png";
import { Link } from "react-router";
import { useGetAllfaqsListQuery } from "@/api/apiSlice";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { useSelector } from "react-redux";
import LoginRequiredModal from "@/components/LandingPage/LoginRequiredModal";
import { useState } from "react";
import RequestCallModal from "./RequestCallModal";
import EmailModal from "./EmailModal";

function Contact(props) {
  const user = useSelector((state) => state.auth.user);
  const [loginModal, setLoginModal] = React.useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const { data, isLoading } = useGetAllfaqsListQuery({
    faqType: "landing",
    search: delayedSearch,
  });

  const handleClick = (type) => {
    if (!user) {
      setLoginModal(true);
    } else {
      type === "call" ? setShowCallModal(true) : setShowEmailModal(true);
    }
  };

  return (
    <div className="">
      {loginModal && (
        <LoginRequiredModal
          open={loginModal}
          handleClose={() => setLoginModal(false)}
        />
      )}

      {showCallModal && (
        <RequestCallModal
          open={showCallModal}
          onClose={() => setShowCallModal(false)}
        />
      )}

      {showEmailModal && (
        <EmailModal
          open={showEmailModal}
          onClose={() => setShowEmailModal(false)}
        />
      )}

      <div className="w-full bg-[#f7f7f7] ">
        <div className="mycontainer grid grid-cols-1 md:grid-cols-2 items-center justify-between">
          <div className=" md:text-left  pt-10">
            <p className="text-3xl sm:text-4xl md:5xl text-black xl:text-6xl font-bold">
              Still Have Questions?
            </p>
            <p className="text-3xl text-black sm:text-4xl md:5xl xl:text-6xl font-bold">
              We got you!
            </p>
            <p className="mt-5 text-black">
              Select one of the text-black options below to get in touch.
            </p>
          </div>
          <div className="justify-center flex md:justify-end  pt-10">
            <img
              className="w-full max-w-md md:max-w-lg mt-[30px] md:mt-0"
              src={ContactImage}
              alt="A helpful illustration"
            />
          </div>
        </div>
      </div>
      <div className="mycontainer bg-white">
        <div className="flex justify-center mt-20 dark:mt-0 items-center w-full p-6 bg-white relative">
          <p className="Contacttext Contecttext mt-4 relative  before:content-[''] before:block before:h-1 before:w-[300px] before:absolute before:-left-80 before:top-1/2 after:content-[''] after:block after:h-1 after:w-[300px] after:absolute after:-right-80 after:top-1/2">
            Contact Us
          </p>
        </div>
        <div className="bg-[#F7F7F7] p-5 md:p-12 rounded-xl mt-5">
          <h4 className="font-semibold text-3xl text-[#1E2327] text-center">
            How can we help you?
          </h4>
          <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 mt-5">
            <div className="xl:col-start-2 xl:col-end-3 border bg-white rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div>
                  <img
                    src={Call}
                    alt=""
                    className="bg-black p-3 w-12 rounded-md mx-auto"
                  />
                </div>
                <h5 className="text-3xl font-semibold mt-5 text-[#1E2327] text-center">
                  Request a call
                </h5>
                <p className="text-center text-[#171717] mt-3">
                  Billing issues only
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="tel:+1234567890"
                  className="text-white bg-black py-2 block w-full rounded-lg text-center px-2"
                >
                  Call Now
                </a>
              </div>
            </div>
            <div className="xl:col-start-3 xl:col-end-4 border bg-white rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div>
                  <img
                    src={Mail}
                    alt=""
                    className="bg-black p-3 w-12 rounded-md mx-auto"
                  />
                </div>
                <h5 className="text-3xl font-semibold mt-5 text-[#1E2327] text-center">
                  Email us
                </h5>
                <p className="text-center text-[#171717] mt-3">
                  Send Email Soon as possible to get in touch
                </p>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => handleClick("email")}
                  className="text-white bg-black py-2 block w-full rounded-lg text-center px-2"
                >
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <div className="rounded-2xl justify-center items-center mx-auto my-20">
          <FaqsSection faqData={data?.data} />
        </div>
      </div>
    </div>
  );
}

export default Contact;

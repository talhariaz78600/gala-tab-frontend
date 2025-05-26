import React from "react";
import privacyPopup from "../../assets/img/privacyPopup.png";

export default function PrivacyPopUp({ handleClose }) {
  const handleAccept = () => {
    // Set cookie to remember acceptance for 1 year
    document.cookie = "cookieConsent=accepted; max-age=31536000; path=/";
    localStorage.setItem('cookieConsent', 'accepted');

    handleClose();
  };

  const handleDecline = () => {
    // Set cookie to remember decline for 1 year
    document.cookie = "cookieConsent=declined; max-age=31536000; path=/";
    handleClose();
  };

  return (
    <div className="bg-white border border-[#DCDCDC] rounded-[30px] overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-5">
          <div className="max-w-[430px] text-center md:text-start mx-auto md:mx-0">
            <p className="text-[24px] sm:text-[30px] text-[#171717] font-semibold">
              We value privacy preferences
            </p>
            <p className="sm:text-lg text-[#171717] mt-4">
              We use cookies to improve your browsing experience and remember
              your preferences. Declining tracking will store one cookie to
              remember your choice. See our Privacy Policy for more details.
            </p>
            <div className="mt-12 grid min-[380px]:grid-cols-2 gap-8">
              <button onClick={handleAccept}
                className="p-3 text-white bg-black rounded-full sm:text-lg font-semibold border border-black">
                Accept
              </button>
              <button onClick={handleDecline}
                className="p-3 text-black bg-hwite rounded-full sm:text-lg font-semibold border border-black">
                Decline
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="privacy-bg flex justify-center items-center h-full">
            <img src={privacyPopup} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

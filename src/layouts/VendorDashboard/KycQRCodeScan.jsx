import React from "react";
import GalaLogo from "../../assets/img/gala-logo.png";
import QrImage from "../../assets/img/qr-code.svg"; // Add a placeholder image of QR code
import { FaGlobe, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetKYCQrCodeQuery, useLazyGetKYCQrCodeQuery } from "@/api/apiSlice";
import { Skeleton } from "@mui/material";

const KycQRCodeScan = () => {
  const [trigger, { data, isLoading }] = useLazyGetKYCQrCodeQuery();

  React.useEffect(() => {
    trigger();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      {/* Header */}
      <div className="py-4 border-b border-gray-200">
        <div className="mycontainer">
          <img src={GalaLogo} alt="Gala Logo" className="w-28 object-contain" />
        </div>
      </div>

      {/* Main Section */}
      <div className="mycontainer flex-1 flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-10 items-center py-8">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Let’s Verify Your <span className="text-[#32F0CD]">Profile</span>
            </h2>
            <p className="text-gray-700 text-sm lg:text-base mt-4">
              We’ve made the process super simple. Just use your mobile camera
              to scan the QR code on the right. Follow the guided steps on your
              phone to complete the verification in minutes.
            </p>
            <ul className="mt-6 space-y-3 text-gray-800 text-sm list-disc list-inside ml-2">
              <li> Open your phone's camera</li>
              <li> Point it to the QR code</li>
              <li> Follow the steps in your mobile browser</li>
            </ul>

            <div className="mt-6">
              <button
                disabled={isLoading}
                onClick={() => window.open(data?.Url, "_blank")}
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition"
              >
                <FaGlobe className="text-lg" />
                Use Web Manually
              </button>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6">
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width={256}
                  height={256}
                  animation="wave"
                  className="rounded-lg"
                />
              ) : (
                <img
                  src={data?.qrCode}
                  alt="Scan QR Code"
                  className="w-64 h-64 object-contain"
                />
              )}
              <p className="text-center text-sm text-gray-600 mt-3">
                Scan this QR Code with your phone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycQRCodeScan;

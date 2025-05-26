import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GalaLogo from "../../assets/img/gala-logo.png";
import {
  FaIdCard,
  FaFileInvoice,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const ProfileVerifyStart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  const handleSelection = (type) => {
    switch (type) {
      case "id":
        navigate("/profile-verify/govt-id");
        break;
      case "tax":
        navigate("/profile-verify/tax");
        break;
      case "emailOrPhone":
        navigate("/auth/welcome/verification", {
          state: {
            email: user?.email,
            contact: user?.contact,
            type: "signup",
            emailVerified: user?.emailVerified,
            contactVerified: user?.contactVerified,
          },
        });
        break;
      default:
        break;
    }
  };

  console.log("user", user);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      {/* Header */}
      <div className="py-4 border-b border-gray-200">
        <div className="mycontainer">
          <img src={GalaLogo} alt="Gala Logo" className="w-28 object-contain" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full grid md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#303C6C] leading-tight">
              Let’s Verify Your <span className="text-[#32F0CD]">Profile</span>
            </h1>
            <p className="text-gray-600 mt-4 text-sm lg:text-base">
              To get started, choose one of the verification options below.
              Follow the prompts on the next screen to complete your
              verification process.
            </p>
          </div>

          {/* Option Cards */}
          <div className="flex flex-col gap-6">
            {/* Govt ID */}
            {(!user?.kyc || user?.kyc?.status === "pending") && (
              <button
                onClick={() => handleSelection("id")}
                className="flex items-center gap-4 p-5 rounded-xl bg-[#F0F4FF] hover:bg-[#E2EBFF] transition border border-[#C8D7FF] shadow-md"
              >
                <FaIdCard className="text-3xl text-[#3551B6]" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#303C6C]">
                    Government ID Verification
                  </h3>
                  <p className="text-sm text-gray-600">
                    Use your official ID to confirm your identity.
                  </p>
                </div>
              </button>
            )}

            {/* Tax Form */}
            {(!user?.taxforums || user?.taxforums?.status === "pending") && (
              <button
                onClick={() => handleSelection("tax")}
                className="flex items-center gap-4 p-5 rounded-xl bg-[#FFF5F0] hover:bg-[#FFE8DD] transition border border-[#FFD6C2] shadow-md"
              >
                <FaFileInvoice className="text-3xl text-[#D97706]" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#C2410C]">
                    Tax Form Verification
                  </h3>
                  <p className="text-sm text-gray-600">
                    Verify using a valid tax-related document.
                  </p>
                </div>
              </button>
            )}

            {/* Combined Email or Phone Verification */}
            {(!user?.emailVerified || !user?.contactVerified) && (
              <button
                onClick={() => handleSelection("emailOrPhone")}
                className="flex items-center gap-4 p-5 rounded-xl bg-[#F0FFF7] hover:bg-[#DFFFEF] transition border border-[#B2F5EA] shadow-md"
              >
                <div className="flex gap-2">
                  <FaEnvelope className="text-3xl text-[#319795]" />
                  <FaPhoneAlt className="text-3xl text-[#319795]" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#22543D]">
                    Email or Phone Verification
                  </h3>
                  <p className="text-sm text-gray-600">
                    Verify using your registered email address or phone number.
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileVerifyStart;

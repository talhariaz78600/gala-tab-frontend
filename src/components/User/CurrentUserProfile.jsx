// components/UserProfile/UserProfile.jsx
import { useNavigate } from "react-router-dom";
// import { useGetMeQuery, useUpdateMeMutation } from "../../features/user/userApiSlice";
import Profile from "../../assets/img/profile.png";
import ProfileName from "../../assets/img/profile-name.png";
import { Link } from "react-router-dom";
import { IoPencil, IoCheckmark, IoClose } from "react-icons/io5";
import MailAddressOne from "../../assets/img/mail-address-1.png";
import MailAddressTwo from "../../assets/img/mail-address-2.png";
import MailAddressThree from "../../assets/img/mail-address-3.png";
import MailAddressFour from "../../assets/img/mail-address-4.png";
import MailAddressFive from "../../assets/img/mail-address-5.png";
import HelpButton from "../VendorDashboard/HelpButton";
import { useGetMeQuery } from "@/api/auth";
import ErrorMessage from "../ErrorMessage";
import { useEffect } from "react";

const CurrentUserProfile = () => {
  const navigate = useNavigate();

  const {
    data: apiResponse,
    isLoading,
    isError,
    error: queryError,
    refetch,
  } = useGetMeQuery();

  const user = apiResponse?.data;

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <ErrorMessage
        message={queryError?.data?.message || "Failed to load profile"}
        onRetry={refetch}
      />
    );
  }
  if (!user) {
    return <ErrorMessage message="User data not found" />;
  }
  const getEditProfilePath = (role) => {
    switch (role) {
      case "vendor":
        return "/vendor-dashboard/edit-profile";
      case "admin":
        return "/admin-dashboard/edit-profile";
      default:
        return "/user-dashboard/edit-profile";
    }
  };

  const userDetails = [
    { label: "First Name", value: user?.firstName, icon: MailAddressOne },
    { label: "Last Name", value: user?.lastName, icon: MailAddressOne },
    {
      label: "Email",
      value: user?.email,
      icon: MailAddressTwo,
      verified: user?.emailVerified,
    },
    {
      label: "Office Number",
      value: user?.officeContact,
      icon: MailAddressThree,
    },
    {
      label: "Mobile Number",
      value: user?.contact,
      icon: MailAddressThree,
      verified: user?.contactVerified,
    },
    {
      label: "Emergency Number",
      value: user?.emergencyContact,
      icon: MailAddressThree,
    },
    { label: "Company Name", value: user?.companyName, icon: MailAddressFour },
    {
      label: "Mailing Address",
      value: user?.address?.mailingAddress || "Not Available",
      icon: MailAddressFive,
    },
    {
      label: "Country",
      value: user?.country?.country || "Not Available",
      icon: MailAddressFive,
    },
    {
      label: "City",
      value: user?.city?.city || "Not Available",
      icon: MailAddressFive,
    },
  ];
  const taxStatus = user?.taxforums?.status ?? "pending";
  const isKycApproved = user?.kyc?.status === "approved";
  const isKycPending = !user?.kyc || user?.kyc?.status == "pending";
  const isTaxPending =
    !user?.taxforums || user?.taxforums?.status === "pending";

  const isNumberVerified = !user?.contactVerified;

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100dvh-130px)] p-5 rounded-[20px] flex flex-col">
      <div>
        <h4 className="font-semibold sm:text-3xl text-lg dark:text-white">
          About Your Profile
        </h4>
        <div className="bg-white dark:bg-gray-600 p-3 border rounded-xl shadow-sm mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={user.profilePicture || Profile}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  {user?.profilePicture && (
                    <div className="absolute bottom-0 right-1 w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
                  )}
                </div>
                <div>
                  <h5 className="font-semibold sm:text-xl text-sm dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </h5>
                  <div className="flex gap-3 items-center ">
                    <p className="text-base font-medium text-[#202224] dark:text-white">
                      {user?.role?.charAt(0)?.toUpperCase() +
                        user?.role?.slice(1)}
                    </p>
                    {user?.role === "vendor" && (
                      <p>
                        Avg response time <strong>30 min</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative">
                {user?.role === "vendor" && (
                  <button className="text-[#34A853] border border-[#3551B6] py-2 rounded-full px-7 text-sm font-medium">
                    {isKycApproved ? "Verified" : "Not Verified"}
                  </button>
                )}
                {isKycApproved && (
                  <div className="absolute -top-3 left-10">
                    <img
                      src={ProfileName}
                      alt="Verified"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Link
                to={getEditProfilePath(user?.role)}
                className="flex items-center gap-2 border border-[#3551B6] text-[#043B6A] px-4 py-2 rounded-lg bg-white shadow-lg"
              >
                <IoPencil className="text-[#000]" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-4 mt-4">
          {user.role === "vendor" && (
            <div>
              <div className="border bg-white  shadow-xl rounded-xl p-3">
                <div className="bg-[#F7F7F7] p-3 rounded-xl flex flex-col gap-2">
                  <h4 className="text-[#303C6C] font-semibold">
                    Confirmed Information
                  </h4>
                  {/* Email */}
                  <div className="flex items-center gap-2 mt-2">
                    {user?.emailVerified ? (
                      <IoCheckmark className="text-[#3551B6]" />
                    ) : (
                      <IoClose className="text-red-500" />
                    )}
                    <p className="text-[#202224] sm:text-base text-sm">
                      Email address{" "}
                      {user?.emailVerified ? "(Verified)" : "(Pending)"}
                    </p>
                  </div>
                  {/* Phone */}
                  <div className="flex items-center gap-2 mt-2">
                    {user?.contactVerified ? (
                      <IoCheckmark className="text-[#3551B6]" />
                    ) : (
                      <IoClose className="text-red-500" />
                    )}
                    <p className="text-[#202224] sm:text-base text-sm">
                      Phone Number{" "}
                      {user?.contactVerified ? "(Verified)" : "(Pending)"}
                    </p>
                  </div>
                  {/* Government ID */}
                  <div className="flex items-center gap-2 mt-2">
                    {isKycApproved ? (
                      <IoCheckmark className="text-[#3551B6]" />
                    ) : (
                      <IoClose className="text-red-500" />
                    )}
                    <p className="text-[#202224] sm:text-base text-sm capitalize">
                      Government ID (
                      {user?.kyc?.status
                        ? user.kyc.status.replace(/-/g, " ")
                        : "pending"}
                      )
                    </p>
                  </div>

                  {/* Tax Forum  */}

                  <div className="flex items-center gap-2 mt-2">
                    {taxStatus === "approved" ? (
                      <IoCheckmark className="text-green-600" />
                    ) : (
                      <IoClose className="text-red-500" />
                    )}
                    <p className="text-[#202224] sm:text-base text-sm">
                      Tax Forum (
                      {taxStatus === "approved"
                        ? "Approved"
                        : taxStatus === "pending"
                        ? "Pending"
                        : taxStatus === "rejected"
                        ? "Rejected"
                        : taxStatus === "inprogress"
                        ? "In Progress"
                        : "Unknown"}
                      )
                    </p>
                  </div>
                </div>

                {(isKycPending || isTaxPending || isNumberVerified) && (
                  <div className="border rounded-xl p-3 mt-3">
                    <h4 className="text-[#303C6C] font-semibold">
                      Verify your identity
                    </h4>
                    <p className="mt-2 text-[#202224]">
                      Before you can operate as a vendor, you'll need to
                      complete all required verifications.
                    </p>

                    <ul className="mt-3 list-disc list-inside text-sm text-gray-700 ml-1">
                      {isKycPending && (
                        <li>Government ID verification is pending</li>
                      )}
                      {isTaxPending && <li>Tax Form submission is pending</li>}
                      {isNumberVerified && (
                        <li>Phone Number submission is pending</li>
                      )}
                    </ul>

                    <div className="mt-4">
                      <button
                        className="flex items-center justify-center w-full bg-white text-black border border-black p-2 rounded-[10px] font-medium shadow-[0px_10px_17px_0px_#FD636312]"
                        onClick={() => {
                          if (
                            (isKycPending && isTaxPending) ||
                            isNumberVerified
                          ) {
                            navigate("/profile-verify-start", { state: user });
                          } else if (isTaxPending) {
                            navigate("/profile-verify/tax");
                          } else if (isKycPending) {
                            navigate("/profile-verify/govt-id");
                          }
                        }}
                      >
                        Get verified
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className={`p-3 ${
              user?.role === "vendor"
                ? "xl:col-start-2 xl:col-end-5"
                : "xl:col-span-4"
            }`}
          >
            <h4 className="text-[#303C6C] dark:text-white font-bold sm:text-xl text-lg">
              Personal Information
            </h4>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-8 sm:gap-3 gap-2 mt-4">
              {userDetails.map((detail, index) => (
                <div key={index}>
                  <h6 className="text-[#303C6C] dark:text-white sm:text-lg text-sm font-medium">
                    {detail.label}
                  </h6>
                  <div className="flex items-center gap-1">
                    <img
                      src={detail.icon}
                      alt=""
                      className="w-4 h-4 object-contain dark:invert"
                    />
                    <p className="text-[#202224] dark:text-white font-medium sm:text-base text-xs">
                      {detail.value || "Not provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {user?.role !== "admin" && (
        <div className="flex justify-end mt-auto">
          <div className="mt-8">
            <HelpButton user={user} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentUserProfile;

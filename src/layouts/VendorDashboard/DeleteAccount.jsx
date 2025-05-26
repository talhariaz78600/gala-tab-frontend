import React from "react";
import { Link, useNavigate } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import VendorTopBar from "../../components/VendorDashboard/VendorTopBar";
import down from "../../assets/img/down.png";
import DeletePopup from "@/components/DeletePopup";
import Loader from "@/components/loader/Loader";
import { useDeleteMeMutation } from "@/api/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { resetChatState } from "@/store/chatSlice";
import { persistor } from "@/store/store";
import { apiSlice } from "@/api/apiSlice";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useDispatch();
  const [deleteMe, { isLoading }] = useDeleteMeMutation();

  const deleteAccount = async () => {
    try {
      await deleteMe();

      toast.success("Deleted successfully!");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("token-removed"));
      dispatch(logout());
      dispatch(resetChatState());
      persistor.purge();
      dispatch(apiSlice.util.resetApiState());
      navigate("/");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

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
              <p className="text-[28px] font-semibold">Delete your account</p>
              <Link to="/manage-account" className="ms-auto">
                <AiFillCloseCircle className="text-[24px] text-[#C13515]" />
              </Link>
            </div>
            <p className="text-lg mt-3 max-w-[1100px]">
              Submit a request to delete your personal data. To confirm you're
              the true owner of this account, we may contact you via mail. We
              will only be able to proceed with your request once you follow the
              steps set out in the email.
            </p>
          </div>
          <div>
            <div className="max-w-[650px] mx-auto">
              <div className="mt-5">
                <label className="text-lg font-medium" htmlFor="Reason">
                  Why are you deleting your account?
                </label>
                <select
                  style={{
                    backgroundImage: `url(${down})`,
                    backgroundPosition: "right 20px center",
                  }}
                  className="block border w-full p-6 pe-12 border-[#D4D7E3] text-black bg-[#F3F3F3] rounded-[10px] focus:outline-none bg-no-repeat appearance-none"
                  name="Reason"
                  id="Reason"
                >
                  <option disabled hidden selected value="Select reason">
                    Select reason
                  </option>
                  <option value="Unsatisfied">
                    I’m not satisfied with my experience on Gala Tab
                  </option>
                  <option value="Unconfident">
                    I’m not confident about how Gala Tab treats my private data
                  </option>
                  <option value="duplicate">
                    I want to delete a duplicate acount
                  </option>
                  <option value="Unused">I don't use Gala Tab enough</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mt-16 flex justify-between items-center flex-wrap gap-4">
              <Link
                to={-1}
                className=" text-black inline-block bg-[#E7E7E7] py-3 px-8 rounded-full font-medium border border-[#D5D5D5]"
              >
                Back
              </Link>
              <button
                onClick={() => setDeleteOpen(true)}
                className="font-medium bg-black py-3 px-8 rounded-full text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={deleteAccount}
      />
      <Loader loading={isLoading} />
    </div>
  );
}

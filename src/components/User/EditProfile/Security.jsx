import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useUpdatePasswordMutation } from '@/store/apiSlice';
import { logout } from "@/store/authSlice";
import { persistor } from "@/store/store";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "@/api/auth";

// Yup validation schema
const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .notOneOf([yup.ref("currentPassword")], "New password must be different"),
  passwordConfirm: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const Security = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const response = await updatePassword({
        oldPassword: data.currentPassword, // Match backend expected field names
        password: data.newPassword,
      }).unwrap();

      console.log("response", response);
      if (response?.data) {
        reset();
        dispatch(logout());
        persistor.purge();
        navigate("/");
      }
      // Optionally show success message
    } catch (error) {
      // Error handling will be done by RTK Query
      console.error("Password update failed:", error);
    }
  };

  const handleForgetPassword = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/auth/forgot-password");
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2">
              <div>
                <Link to="/user-dashboard/user-profile">
                  <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
                </Link>
              </div>
              <h4 className="text-[#000] dark:text-white text-[24px] font-semibold">
                Login and Security Password
              </h4>
            </div>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-5">
              <div>
                <div className="mt-5">
                  <label
                    htmlFor="currentPassword"
                    className="pl-4 w-full text-base font-medium text-[#202529] dark:text-white"
                  >
                    Current password
                  </label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className={`bg-white shadow-lg text-black rounded-lg py-3 px-4 w-full ${
                      errors.currentPassword ? "border border-red-500" : ""
                    }`}
                    {...register("currentPassword")}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1 pl-4">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div className="mt-5">
                  <h5 className="w-full text-lg font-medium text-[#202529] dark:text-white">
                    Forgot your password?
                  </h5>
                  <div
                    onClick={handleForgetPassword}
                    className="text-[#3551B6] text-xs cursor-pointer"
                  >
                    Reset password via email
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="newPassword"
                    className="pl-4 w-full text-base dark:text-white font-medium text-[#202529]"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className={`bg-white text-black shadow-lg rounded-lg py-3 px-4 w-full ${
                      errors.newPassword ? "border border-red-500" : ""
                    }`}
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1 pl-4">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="passwordConfirm"
                    className="pl-4 w-full dark:text-white text-base font-medium text-[#202529]"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className={`bg-white text-black shadow-lg rounded-lg py-3 px-4 w-full ${
                      errors.passwordConfirm ? "border border-red-500" : ""
                    }`}
                    {...register("passwordConfirm")}
                  />
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm mt-1 pl-4">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 max-w-[500px] gap-3 mt-12">
            <button
              type="button"
              onClick={() => reset()}
              className="bg-[#E7E7E7] text-black py-2 rounded-full px-6 border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`text-white py-2 px-6 border rounded-full ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;
// import { logout } from "@/store/authSlice";
// import { persistor } from "@/store/store";
// import React from "react";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router";

// const Security = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
//   const goto = (path) => {
//     navigate(path); // Navigate to the dynamic path
//   };
//   const handleForgetPassword = () => {
//     dispatch(logout());
//     persistor.purge();
//     navigate("/auth/forgot-password")
//   }
//   return (
//     <div className="h-full">
//       <form className="h-full" action="/user-dashboard/user-Profile">
//         <div className="flex flex-col justify-between h-full">
//           <div>
//             <div className="flex items-center gap-2">
//               <div>
//                 <Link to="/user-dashboard/user-profile"><IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" /></Link>
//               </div>
//               <h4 className="text-[#000] text-[24px] font-semibold">
//                 Login and Security Password
//               </h4>
//             </div>
//             <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-5">
//               <div>
//                 <div className="mt-5">
//                   <label
//                     htmlFor=""
//                     className="pl-4 w-full text-base font-medium text-[#202529]"
//                   >
//                     Current password
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Type here"
//                     className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
//                   />
//                 </div>
//                 <div className="mt-5">
//                   <h5 className="w-full text-lg font-medium text-[#202529]">
//                     Forgot your password?
//                   </h5>
//                   <div onClick={handleForgetPassword} className="text-[#3551B6] text-xs">
//                     Reset password via email
//                   </div>
//                 </div>
//                 <div className="mt-5">
//                   <label
//                     htmlFor=""
//                     className="pl-4 w-full text-base font-medium text-[#202529]"
//                   >
//                     New password
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Type here"
//                     className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
//                   />
//                 </div>
//                 <div className="mt-3">
//                   <label
//                     htmlFor=""
//                     className="pl-4 w-full text-base font-medium text-[#202529]"
//                   >
//                     Confirm password
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Type here"
//                     className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="grid lg:grid-cols-2 max-w-[500px] gap-3 mt-12">
//             <button
//               onClick={() => goto("/user-dashboard/user-Profile")}
//               type="button"
//               className="bg-[#E7E7E7] py-2 rounded-full px-6 border"
//             >
//               Cancel
//             </button>
//             <button className="text-white bg-black py-2 px-6 border rounded-full">
//               Save
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Security;

import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import GoogleImg from "../../../assets/img/google.png";
import FacebookImg from "../../../assets/img/facebook.png";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useLoginAdminMutation } from "../../../api/apiSlice";
import Loader from "../../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { setUserLoggedIn } from "../../../store/authSlice";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginData, { isLoading }] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await loginData(data);
      console.log("response", response);

      // localStorage.setItem("token", response?.data.token);
      dispatch(setUserLoggedIn(response?.data));
      toast.success(response?.message || "Login successful!");

      navigate( 
        response?.data?.data?.role === "vendor"
          ? "/vendor-dashboard/dashboard"
          : "/user-dashboard/dashboard",
        { replace: true }
      );
    } catch (error) {
      console.log("error", error);

      if (error.data?.error && typeof error.data.error === "object") {
        const apiErrors = error.data.error;
        Object.keys(apiErrors)
          .filter((key) => key !== "Error")
          .forEach((field) => {
            setError(field, {
              type: "manual",
              message: apiErrors[field],
            });
          });

        const firstError = Object.values(apiErrors).find(
          (msg) => msg !== apiErrors.Error
        );
        if (firstError) {
          toast.error(firstError);
        }
        return;
      }

      const errorMessage = getErrorMessage(error);
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
      toast.error(errorMessage);
    }
  };

  const getErrorMessage = (error) => {
    return (
      error?.data?.message ||
      error?.data?.error?.Error ||
      error?.error ||
      "Something went wrong. Please try again."
    );
  };

  return (
    <div className="h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-lg mx-auto px-5">
        <div className="w-full border rounded-xl shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div></div>
            <div>
              <h2 className="font-semibold sm:text-3xl text-lg">
                Welcome Back!
                Welcome Back!
              </h2>
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <IoCloseCircle className="text-3xl text-slate-500" />
            </div>
          </div>
          <div className="flex items-center justify-center my-5">
            <div className="pl-3">
              <h2 className="text-3xl font-semibold text-gray-900">Gala Tab</h2>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="/"
            className="max-w-screen-md mx-auto my-3 py-6 sm:px-0 px-4"
          >
            <div className="md:flex justify-between w-full md:gap-x-36 gap-x-20 relative pb-20">
              <div className="w-full">
                <h4 className="text-center sm:text-2xl text-xl font-semibold">
                  Login With Accents
                </h4>
                <div className="w-full mt-9">
                  <Link
                    to="#"
                    className="flex items-center w-full justify-center border bg-[#F7FBFF] py-2 rounded-lg"
                  >
                    <img src={GoogleImg} alt="" />
                    <p className="ms-2">Sign in with Google</p>
                  </Link>
                </div>
                <div className="mt-6">
                  <Link
                    to="#"
                    className="flex items-center justify-center border bg-[#F7FBFF] py-2 rounded-lg"
                  >
                    <img src={FacebookImg} alt="" />
                    <p className="ms-2 text-base font-normal">
                      Sign in with Facebook
                    </p>
                  </Link>
                </div>
              </div>

              <div className="absolute bg-gray-300 md:w-px md:h-full h-px w-full md:inset-1/2 md:top-0 md:m-0 my-6"></div>
              <div className="w-full md:mt-0 mt-9">
                <h4 className="sm:text-2xl text-xl font-semibold text-center">
                  Login
                </h4>

                <div className="mt-4">
                  <label className="text-base font-normal" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF]"
                    placeholder="Type here"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.email?.message}
                  </p>
                </div>

                <div className="mt-3">
                  <label className="text-base font-normal" htmlFor="password">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF]"
                      placeholder="Type here"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-gray-900 rounded-lg"
                      // {...register("remember", {
                      //   required: "You must accept the terms",
                      // })}
                    />
                    <label htmlFor="" className="ms-2 text-xs font-medium">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link
                      to="/auth/forgot-password"
                      className="text-xs text-[#3551B6] font-medium"
                    >
                      Forgot Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <p>
                Don't you have an account?{" "}
                <Link to="/auth/welcome" className="text-[#5669FF]">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <div className="md:col-start-2 md:col-end-4 col-start-1 col-end-5">
                <div>
                  <button
                    className="bg-[#1C1C1C] text-white w-full py-2 font-medium text-xl rounded-lg drop-shadow-2xl"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Loader loading={isLoading} />
    </div>
  );
};

export default Login;

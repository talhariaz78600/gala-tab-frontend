import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import GoogleImg from "../../../assets/img/google.png";
import FacebookImg from "../../../assets/img/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginAdminMutation } from "../../../api/apiSlice";
import Loader from "../../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { setUserLoggedIn } from "../../../store/authSlice";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { setCurrentUserId } from "@/store/chatSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const response = await loginAdmin(formData).unwrap();

      localStorage.setItem("token", response?.token);
      window.dispatchEvent(new Event("token-updated"));
      dispatch(setUserLoggedIn(response));
      dispatch(setCurrentUserId(response?.data?._id));
      toast.success(response.message || "Login successful!");
      const role = response?.data?.role;
      navigate(
        role === "admin"
          ? "/admin-dashboard/dashboard"
          : role === "vendor"
          ? "/vendor-dashboard/dashboard"
          : role === "customer"
          ? "/"
          : "/",
        { replace: true }
      );

      if (!rememberMe) {
        reset();
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.data?.error && typeof error.data.error === "object") {
        Object.entries(error.data.error).forEach(([field, message]) => {
          if (field !== "Error" && field !== "redirect") {
            setError(field, { type: "manual", message });
          }
        });
      }

      const errorMessage =
        error.data?.message ||
        error.data?.error?.Error ||
        error.error ||
        "Login failed. Please try again.";
      toast.error(errorMessage);
      setError("root", { type: "manual", message: errorMessage });
    }
  };

  console.log("errors", errors);

  return (
    <div className="h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-lg mx-auto px-5">
        <div className="w-full border rounded-xl shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between border-b p-4">
            <div></div>
            <div>
              <h2 className="font-semibold sm:text-3xl text-lg">
                Welcome Back!
              </h2>
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <IoCloseCircle className="text-3xl text-slate-500" />
            </div>
          </div>

          <div className="flex items-center justify-center my-5">
            <div className="pl-3">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Gala Tab
              </h2>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-screen-md mx-auto my-3 py-6 sm:px-0 px-4"
          >
            <div className="md:flex justify-between w-full md:gap-x-36 gap-x-20 relative pb-20">
              {/* Social Login Section */}
              <div className="w-full">
                <h4 className="text-center sm:text-2xl text-xl font-semibold">
                  Login With Accounts
                </h4>
                <div className="w-full mt-9">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `${
                          import.meta.env.VITE_BACKEND_BASE_URL
                        }/auth/login/withGoogle`,
                        "_blank"
                      )
                    }
                    className="flex items-center w-full justify-center border bg-[#F7FBFF] text-black py-2 rounded-lg"
                  >
                    <img src={GoogleImg} alt="Google" />
                    <p className="ms-2">Sign in with Google</p>
                  </button>
                </div>
                <div className="w-full mt-6">
                  <button
                    onClick={() =>
                      window.open(
                        `${
                          import.meta.env.VITE_BACKEND_BASE_URL
                        }/auth/login/withFacebook`,
                        "_blank"
                      )
                    }
                    type="button"
                    className="flex items-center w-full justify-center border bg-[#F7FBFF] text-black py-2 rounded-lg"
                  >
                    <img src={FacebookImg} alt="Facebook" />
                    <p className="ms-2 text-base font-normal">
                      Sign in with Facebook
                    </p>
                  </button>
                </div>
              </div>

              <div className="absolute bg-gray-300 md:w-px md:h-full h-px w-full md:inset-1/2 md:top-0 md:m-0 my-6"></div>

              {/* Email/Password Login Section */}
              <div className="w-full md:mt-0 mt-9">
                <h4 className="sm:text-2xl text-xl font-semibold text-center">
                  Login
                </h4>

                {/* Email Field */}
                <div className="mt-4">
                  <label className="text-base font-normal" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`border w-full rounded-lg p-2 bg-[#F7FBFF] text-black ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mt-3">
                  <label className="text-base font-normal" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={`border w-full rounded-lg p-2 bg-[#F7FBFF] text-black ${
                        errors.password ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-500" />
                      ) : (
                        <Eye size={18} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 accent-gray-900 rounded-lg"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      htmlFor="remember"
                      className="ms-2 text-xs font-medium"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link
                      to="/auth/forgot-password"
                      className="text-xs text-[#3551B6] font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                {errors.root && (
                  <div className="mt-4 text-center text-red-500">
                    {errors.root.message}
                  </div>
                )}
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-3">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/auth/welcome" className="text-[#5669FF] font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <div className="grid grid-cols-4 gap-4 mt-5">
              <div className="md:col-start-2 md:col-end-4 col-start-1 col-end-5">
                <button
                  className={`bg-[#1C1C1C] text-white w-full py-2 font-medium text-xl rounded-lg drop-shadow-2xl ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
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

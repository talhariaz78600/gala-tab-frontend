import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useLazyGetMeQuery } from "@/api/auth";
import { useDispatch } from "react-redux";
import { setUserLoggedIn } from "@/store/authSlice";
import { setCurrentUserId } from "@/store/chatSlice";

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const dispatch = useDispatch();
  const [getMe] = useLazyGetMeQuery();

  const handleGoHome = async () => {
    try {
      const response = await getMe().unwrap();
      if (response.status === "success") {
        const userData = response.data;
        const token = localStorage.getItem("token");
        window.dispatchEvent(new Event("token-updated"));
        dispatch(
          setUserLoggedIn({
            token,
            data: userData,
          })
        );
        dispatch(setCurrentUserId(userData._id));
        const role = userData.role;
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
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Login Successful!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          You have successfully logged in using your credentials. Welcome back!
        </p>

        <button
          onClick={handleGoHome}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessPage;

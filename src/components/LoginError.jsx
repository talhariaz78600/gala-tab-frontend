import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaArrowRight,
  FaSignInAlt,
  FaLock,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const LoginError = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");

  console.log("Login error:", error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border-l-4 border-red-500">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 dark:bg-red-900/30 p-5 rounded-full animate-pulse">
                <FaExclamationTriangle className="text-5xl text-red-600 dark:text-red-400" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-3">
              Login Failed
            </h2>

            <div className="text-center text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <p>We couldn't sign you in.</p>
              <p className="text-sm">
                Please check your credentials and try again.
              </p>
              <p className="text-sm">{error}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/auth/welcome/login")}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <FaSignInAlt />
                Return to Login
                <FaArrowRight className="text-sm" />
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
                <MdSupportAgent className="text-red-600 dark:text-red-400" />
                <span>
                  Need help?{" "}
                  <button
                    onClick={() => navigate("/help")}
                    className="font-medium text-red-600 dark:text-red-400 hover:underline"
                  >
                    Contact Support
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 px-8 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Ensure your caps lock is off and try again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginError;

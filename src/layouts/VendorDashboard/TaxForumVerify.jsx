import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GalaLogo from "../../assets/img/gala-logo.png";
import Loader from "@/components/loader/Loader";
import { handleFileUpload } from "@/lib/handleFileUpload";
import { useTaxForumCreateMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";

const TaxForumVerify = () => {
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [taxForumCreate] = useTaxForumCreateMutation();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      clearErrors();

      const file = data.taxDocument?.[0];
      let uploadedUrl = "";

      if (file && typeof file !== "string") {
        uploadedUrl = await handleFileUpload(
          file,
          setIsLoading,
          setUploadProgress,
          token
        );
      }

      data.taxDocument = uploadedUrl || data.taxDocument;

      console.log("finalPayload", data);

      const response = await taxForumCreate(data).unwrap();

      if (response.status === "success") {
        toast.success(response.message);
        navigate("/vendor-dashboard/Vendor-Profile");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Submission error:", error);

      if (error.data?.error && typeof error.data.error === "object") {
        Object.entries(error.data.error).forEach(([field, message]) => {
          if (field !== "Error" && field !== "MongoServerError") {
            setError(field, { type: "manual", message });
          }
        });
      }

      const errorMessage =
        error.data?.message ||
        error.data?.error?.Error ||
        error.error ||
        " failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deliveryForm = watch("deliveryForm");

  return (
    <>
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
        {/* Header */}
        <div className="py-4 border-b border-gray-200">
          <div className="mycontainer">
            <img
              src={GalaLogo}
              alt="Gala Logo"
              className="w-28 object-contain"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full space-y-6"
          >
            <h2 className="text-2xl font-bold text-black">
              Tax Form Verification
            </h2>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                {...register("businessName", {
                  required: "Business name is required",
                })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter business name"
              />
              {errors.businessName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.businessName.message}
                </p>
              )}
            </div>

            {/* Tax Classification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Classification
              </label>
              <input
                type="text"
                {...register("taxClassification", {
                  required: "Tax classification is required",
                })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter tax classification"
              />
              {errors.taxClassification && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.taxClassification.message}
                </p>
              )}
            </div>

            {/* Tax ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID
              </label>
              <input
                type="text"
                {...register("taxId", { required: "Tax ID is required" })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter tax ID"
              />
              {errors.taxId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.taxId.message}
                </p>
              )}
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Method
              </label>
              <select
                {...register("deliveryForm", {
                  required: "Delivery method is required",
                })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select delivery method</option>
                <option value="email">Delivered by Email Only</option>
                <option value="electronic">Electronically Only</option>
              </select>
              {errors.deliveryForm && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deliveryForm.message}
                </p>
              )}
            </div>

            {/* Conditional PDF Upload */}
            {deliveryForm === "electronic" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Document (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  {...register("taxDocument", {
                    required:
                      "Tax document is required when using electronic delivery",
                  })}
                  className="w-full border border-gray-300 rounded-lg p-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-black"
                />
                {errors.taxDocument && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.taxDocument.message}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-2 px-4 rounded-lg hover:bg-black transition"
            >
              Submit Verification
            </button>
          </form>
        </div>
      </div>
      <Loader loading={isLoading} />
    </>
  );
};

export default TaxForumVerify;

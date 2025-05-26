// RequestCallModal.jsx
import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";

const RequestCallModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Request Call Submitted:", data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-6 w-[90vw] max-w-xl bg-white rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Request a Call
        </h2>
        <p className="text-sm text-center text-gray-500 mb-5">
          Billing issues only
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <input
              {...register("reason", { required: "Reason is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your reason"
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Provide details"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
          >
            Send Request
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default RequestCallModal;

import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import { RiCloseCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useFaqCreateMutation, useFaqUpdateMutation } from "@/api/apiSlice";
import editIcon from "../../assets/img/edit-icon.png";

export default function AddFaq({ serviceId, mode = "new", faqDetail }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm({ defaultValues: faqDetail });

  const isActiveValue = watch("isActive");
  const [faqCreate] = useFaqCreateMutation();
  const [faqUpdate] = useFaqUpdateMutation();

  const onSubmit = async (data) => {
    const payload = {
      serviceId,
      question: data.question,
      answer: data.answer,
      isActive: data.isActive,
      faqType: "service",
      dataType: "text",
    };

    try {
      mode === "new"
        ? await faqCreate(payload)
        : await faqUpdate({ id: faqDetail._id, data: payload });
      toast.success(
        `${mode === "edit" ? "Updated" : "Added"} FAQ successfully!`
      );
      if (mode === "new") {
        reset();
      }
      handleClose();
    } catch (error) {
      toast.error("Failed to add FAQ!");
      console.error(error);
    }
  };

  return (
    <div>
      {mode === "edit" && (
        <div className=" cursor-pointer" onClick={handleOpen}>
          <img className="size-10 max-w-10" src={editIcon} alt="Edit" />
        </div>
      )}
      {mode === "new" && (
        <div
          className="font-medium border inline-block cursor-pointer border-black bg-white text-black py-3 px-5 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          onClick={handleOpen}
        >
          Add FAQ
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white dark:bg-[#1E1E1E] rounded-[20px] text-black dark:text-white">
          <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD] dark:border-[#444]">
            <p className="text-[26px] font-semibold">
              {mode === "new" ? "Add" : "Edit"} FAQ Details
            </p>
            <button onClick={handleClose}>
              <RiCloseCircleFill className="text-[24px] text-[#979797] dark:text-[#bbb]" />
            </button>
          </div>

          <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-lg font-medium ps-3">Add Question</label>
                <input
                  type="text"
                  placeholder="Type here"
                  {...register("question", {
                    required: "Question is required",
                  })}
                  className="w-full border border-[#D5D5D5] dark:border-[#555] p-4 rounded-[10px] bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder:text-[#9A9A9A] dark:placeholder:text-[#aaa] placeholder:text-[14px] shadow-[0px_8px_24px_0px_#00000012] dark:shadow-none"
                />
              </div>

              <div className="mt-4">
                <label className="text-lg font-medium ps-3">Type Answer</label>
                <input
                  type="text"
                  placeholder="Type here"
                  {...register("answer", { required: "Answer is required" })}
                  className="w-full border border-[#D5D5D5] dark:border-[#555] p-4 rounded-[10px] bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder:text-[#9A9A9A] dark:placeholder:text-[#aaa] placeholder:text-[14px] shadow-[0px_8px_24px_0px_#00000012] dark:shadow-none"
                />
              </div>

              <p className="text-lg font-medium mt-6 ps-2">Active</p>
              <div className="mt-6 flex items-center gap-10 ps-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="true"
                    {...register("isActive")}
                    className="size-6 accent-black dark:accent-blue-500"
                    checked={isActiveValue === true}
                    onChange={() => setValue("isActive", true)}
                  />
                  <span className="font-medium">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="false"
                    {...register("isActive")}
                    className="size-6 accent-black dark:accent-blue-500"
                    checked={isActiveValue === false}
                    onChange={() => setValue("isActive", false)}
                  />
                  <span className="font-medium">No</span>
                </label>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-between mt-8">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-[20px] underline font-medium dark:text-[#ccc]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#1C1C1C] border border-[#1C1C1C] dark:bg-blue-600 dark:border-blue-600 rounded-[10px] py-3 px-6 font-semibold text-white shadow-[0px_11.72px_20px_0px_#00000024] dark:shadow-none disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

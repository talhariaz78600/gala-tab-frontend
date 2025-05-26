import React, { useEffect } from "react";
import { RiCloseCircleFill, RiEdit2Fill } from "react-icons/ri";
import { Modal } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import Loader from "@/components/loader/Loader";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  useTaskTemplatesCreateMutation,
  useTaskTemplatesUpdateMutation,
} from "@/api/apiSlice";

const AddTaskTemplate = ({ mode = "new" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const { id } = param;
  const { data } = location.state || { data: null };
  const [tasks, setTasks] = useState([]);
  const [Editopen, setEditOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [manualTask, setManualTask] = useState({ name: "", description: "" });

  const [templatesCreate, { isLoading: isCreating }] =
    useTaskTemplatesCreateMutation();
  const [templatesUpdate, { isLoading: isUpdating }] =
    useTaskTemplatesUpdateMutation();

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setManualTask({ name: "", description: "" });
    setEditingTaskIndex(null);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].description = value;
    setTasks(updatedTasks);
  };
  const handleManualTaskAdd = (e) => {
    e.preventDefault();
    const taskName = manualTask.name.trim();
    const taskDesc = manualTask.description.trim();

    if (!taskName || !taskDesc) {
      toast.error("Both name and description are required!");
      return;
    }

    const isDuplicate = tasks.some(
      (task, index) => task.taskName === taskName && index !== editingTaskIndex
    );
    if (isDuplicate) {
      toast.error("Task with this name already exists!");
      return;
    }

    if (editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = {
        ...updatedTasks[editingTaskIndex],
        taskName: taskName,
        description: taskDesc,
      };
      setTasks(updatedTasks);
    } else {
      setTasks((prev) => [
        ...prev,
        {
          taskName: taskName,
          description: taskDesc,
        },
      ]);
    }

    handleEditClose();
  };

  const handleTaskEditOpen = (index) => {
    setEditingTaskIndex(index);
    const task = tasks[index];
    setManualTask({ name: task.taskName, description: task.description });
    handleEditOpen();
  };

  const handleTaskDelete = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (tasks.length === 0) {
      toast.error("Please add at least one task before saving.");
      return;
    }
    const hasEmptyDescription = tasks.some((task) => !task.description.trim());

    if (hasEmptyDescription) {
      toast.error("All tasks must have a description before saving.");
      return;
    }

    const payload = {
      templateName,
      tasks,
    };

    try {
      const response =
        mode === "edit"
          ? await templatesUpdate({ id, data: payload }).unwrap()
          : await templatesCreate(payload).unwrap();

      if (response.success) {
        toast.success(
          `Template ${mode === "edit" ? "Updated" : "Created"} successfully!`
        );
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save tasks.");
      }
    } catch (error) {
      toast.error(error?.data?.error.templateName || "Something went wrong.");
      console.error("Save error:", error);
    }
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      setTemplateName(data.templateName || "");
      setTasks(data.tasks || []);
    }
  }, [mode, data]);

  return (
    <>
      <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E]  rounded-[20px] p-5 flex flex-col ">
        <h3 className="text-[28px]  font-semibold">
          {mode === "edit" ? "Update" : "Create"} Task Template
        </h3>
        <div className="grid xl:grid-cols-2 gap-4 mt-9">
          <div>
            <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
              Template Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="bg-white shadow-lg text-black rounded-lg py-3 px-4 w-full"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap justify-between items-center mt-8">
            <h4 className="text-3xl font-semibold">Tasks</h4>
            <div className="ms-auto">
              <button
                type="button"
                onClick={handleEditOpen}
                className="border border-black rounded-[8px] py-3 px-6 bg-white text-black"
              >
                Add Task
              </button>
            </div>
          </div>
          {tasks.length === 0 && (
            <div className="flex justify-center items-center mt-4">
              <p className="text-lg font-medium text-gray-500 ">
                No tasks added yet. Click "Add Task" to create one.
              </p>
            </div>
          )}
          {tasks.map((task, index) => (
            <div key={index} className="mt-10 relative">
              <label
                className=" w-full text-xl font-semibold text-[#202529] dark:text-white"
                htmlFor={`desc-${index}`}
              >
                {task.taskName}
              </label>
              <textarea
                className="bg-white text-black shadow-lg rounded-lg py-3 px-4 w-full resize-none mt-2"
                rows={6}
                id={`desc-${index}`}
                value={task.description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
              ></textarea>
              <button
                onClick={() => handleTaskEditOpen(index)}
                className="absolute top-0 right-8 mt-1 mr-1 text-blue-600"
              >
                <MdModeEdit className="text-2xl" />
              </button>

              <button
                onClick={() => handleTaskDelete(index)}
                className="absolute top-0 right-0 mt-1 mr-1 text-[#C13515]"
              >
                <RiCloseCircleFill className="text-2xl" />
              </button>
            </div>
          ))}

          <Modal
            open={Editopen}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ m: 2 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white dark:bg-[#1E1E1E] rounded-[20px] outline-none">
              <form onSubmit={handleManualTaskAdd}>
                <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
                  <p className="sm:text-[26px] font-semibold">Add Task</p>
                  <button type="button">
                    <RiCloseCircleFill
                      className="text-[24px] text-[#C13515]"
                      onClick={handleEditClose}
                    />
                  </button>
                </div>
                <div className="p-4 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
                  <div>
                    <label className="font-medium ps-2" htmlFor="TaskName">
                      Name
                    </label>
                    <input
                      className="w-full mt-1 p-4 border focus:outline-none text-black border-[#D4D7E3] rounded-[10px]"
                      type="text"
                      id="TaskName"
                      value={manualTask.name}
                      onChange={(e) =>
                        setManualTask({ ...manualTask, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <label className="font-medium ps-2" htmlFor="TaskDesc">
                      Description
                    </label>
                    <textarea
                      className="w-full mt-1 p-4 border focus:outline-none text-black border-[#D4D7E3] rounded-[10px]"
                      rows="4"
                      id="TaskDesc"
                      value={manualTask.description}
                      onChange={(e) =>
                        setManualTask({
                          ...manualTask,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-between mt-16">
                    <button
                      type="button"
                      onClick={handleEditClose}
                      className="min-w-[150px] bg-[#E7E7E7] text-black border border-[#D5D5D5] rounded-full p-3 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="min-w-[150px] bg-[#000000] border border-[#000000] rounded-full p-3 font-semibold text-white shadow-[0px_10px_17px_0px_#FD636312]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
          <div>
            <button className="flex justify-center bg-[#E7E7E7] text-black py-2 rounded-full px-6 border w-52">
              Cancel
            </button>
          </div>
          <div>
            <button
              className="text-white bg-black py-2 px-6 border w-52 rounded-full"
              onClick={handleSave}
            >
              {mode === "edit" ? "Update" : "Create"} Template
            </button>
          </div>
        </div>
      </div>
      <Loader loading={isCreating || isUpdating} />
    </>
  );
};

export default AddTaskTemplate;

import React, { useState } from "react";
import AddTopicModal from "./Topics/AddTopicModal";
import AddSubTopicModal from "./Topics/AddSubTopicModal";
import {
  useGetTopicsListQuery,
  useSubTopicDeleteMutation,
  useTopicDeleteMutation,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import DeletePopup from "@/components/DeletePopup";
import { toast } from "react-toastify";

const Topics = () => {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openSubModal, setOpenSubModal] = useState(false);
  const [deleteTopicsModal, setDeleteTopicsModal] = useState(false);
  const [deleteSubTopicsModal, setDeleteSubTopicsModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);

  const { data, isLoading } = useGetTopicsListQuery({
    topicType: activeFilter,
  });

  const [deleteTopic, { isLoading: deleteTopicLoading }] =
    useTopicDeleteMutation();

  const [deleteSubTopic, { isLoading: deleteSubTopicLoading }] =
    useSubTopicDeleteMutation();

  const handleDeleteTopic = async () => {
    try {
      await deleteTopic(deleteTopicsModal);
      toast.success("Deleted successfully!");
      setDeleteTopicsModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handleDeleteSubTopic = async () => {
    try {
      await deleteSubTopic(deleteSubTopicsModal);
      toast.success("Deleted successfully!");
      setDeleteTopicsModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 h-screen 
    bg-gradient-to-r from-slate-100 to-slate-200 
    dark:from-gray-900 dark:to-gray-800"
    >
      {openModal && (
        <AddTopicModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedTopic(null);
          }}
          data={selectedTopic}
        />
      )}

      {openSubModal && (
        <AddSubTopicModal
          open={openSubModal}
          onClose={() => {
            setOpenSubModal(false);
            setSelectedSubTopic(null);
          }}
          topics={data?.data || []}
          data={selectedSubTopic}
          selectedTopicId={selectedTopicId}
        />
      )}

      {/* Sidebar */}
      <aside
        className="col-span-1 p-6 border-r border-gray-200 bg-white shadow-md flex flex-col h-screen overflow-y-auto 
  dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      >
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {["", "vendor", "customer"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition
  ${
    activeFilter === type
      ? "bg-black text-white dark:bg-white dark:text-black"
      : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
  }`}
            >
              {type === "" ? "All " : `${type} `}
            </button>
          ))}
        </div>

        {/* Topic Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            Topics
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            className="px-3 py-1 rounded-xl bg-black text-white   text-sm"
          >
            + Add
          </button>
        </div>

        {/* Topic List */}
        <div className="space-y-3 flex-1 overflow-y-auto">
          {data?.data?.length ? (
            data?.data?.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopicId(topic._id)}
                className={`group p-4 rounded-2xl shadow hover:shadow-lg cursor-pointer transition flex justify-between items-center
  ${
    selectedTopicId === topic._id
      ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
      : "bg-white dark:bg-gray-800 dark:text-gray-200"
  }`}
              >
                <span>{topic.name}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="text-gray-500 hover:text-blue-600 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTopic(topic);
                      setOpenModal(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTopicsModal(topic._id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm mt-4">No topics found.</p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="col-span-3 p-8 h-screen overflow-y-auto">
        {selectedTopicId ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
                Subtopics
              </h2>
              <button
                onClick={() => setOpenSubModal(true)}
                className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
              >
                + Add Subtopic
              </button>
            </div>

            <div>
              {(
                data?.data?.find((t) => t._id === selectedTopicId)?.subtopics ||
                []
              ).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.data
                    .find((t) => t._id === selectedTopicId)
                    .subtopics.map((sub) => (
                      <div
                        key={sub._id}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-xl transition flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            {sub.title}
                          </h3>
                          <div
                            className="text-gray-500 text-sm line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: sub.description,
                            }}
                          />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedSubTopic(sub);
                              setOpenSubModal(true);
                            }}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteSubTopicsModal(sub._id)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-gray-400 text-sm mt-6">
                  No subtopics found for this topic.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-lg text-center mt-20">
            Please select a topic to view its subtopics.
          </div>
        )}
      </main>

      {deleteTopicsModal && (
        <DeletePopup
          open={deleteTopicsModal}
          onClose={() => setDeleteTopicsModal(false)}
          onConfirm={handleDeleteTopic}
        />
      )}

      {deleteSubTopicsModal && (
        <DeletePopup
          open={deleteSubTopicsModal}
          onClose={() => setDeleteSubTopicsModal(false)}
          onConfirm={handleDeleteSubTopic}
        />
      )}

      <Loader
        loading={isLoading || deleteSubTopicLoading || deleteTopicLoading}
      />
    </div>
  );
};

export default Topics;

import {
  useGetTaskTemplateListQuery,
  useTaskTemplatesDeleteMutation,
} from "@/api/apiSlice";
import DeletePopup from "@/components/DeletePopup";
import PaginationComponent from "@/components/Pagination/TablePagination";
import TableMui from "@/mui/TableMui";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import editIcon from "@/assets/img/edit-icon.png";
import deleteIcon from "@/assets/img/delete-icon.png";
import Loader from "@/components/loader/Loader";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { IoSearch } from "react-icons/io5";

const TaskTemplates = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetTaskTemplateListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });

  const [templatesDelete, { isLoading: isDeleteLoading }] =
    useTaskTemplatesDeleteMutation();

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async () => {
    try {
      await templatesDelete(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };
  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap justify-between p-5 ">
        <p className="text-[28px] leading-normal font-semibold">
          Task Templates List
        </p>
        <div className="flex items-center gap-4">
          <label className="w-full md:min-w-[450px]" htmlFor="search">
            <div className="flex items-center bg-white  dark:bg-gray-700 p-3 border rounded-[10px]">
              <IoSearch />
              <input
                className="w-full px-2 bg-white dark:bg-gray-700"
                type="search"
                name="search"
                id="search"
                placeholder="Search Keyword"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </label>
          <button
            onClick={() => navigate("/admin-dashboard/add-task-templates")}
            className="w-full font-medium border bg-white dark:bg-gray-700 border-black p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          >
            Add New Template
          </button>
        </div>
      </div>
      <div className="p-5">
        <TableMui
          loading={isLoading}
          th={{
            templateName: "Template Name",
            action: "Action",
          }}
          td={data?.templetes || []}
          customFields={[
            {
              name: "action",
              data: (value, task) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin-dashboard/edit-task-templates/${task._id}`,
                        {
                          state: { data: task },
                        }
                      )
                    }
                  >
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={editIcon}
                      alt="Edit"
                    />
                  </button>
                  <button onClick={() => setDeleteOpen(task._id)}>
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={deleteIcon}
                      alt="Delete"
                    />
                  </button>
                </div>
              ),
            },
          ]}
        />

        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalTempletes}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />

        <Loader loading={isDeleteLoading} />

        <DeletePopup
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default TaskTemplates;

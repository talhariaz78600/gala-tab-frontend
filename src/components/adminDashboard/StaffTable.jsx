import * as React from "react";
import guest from "/video-default.png";
import { Link, useNavigate } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { useDeleteStaffMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import DeletePopup from "../DeletePopup";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";

export default function StaffTable({ data }) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const columns = [
    { Header: "Full Name" },
    { Header: " Role" },
    { Header: "Phone Number" },
    { Header: "Email" },

    { Header: "Actions" },
  ];

  const [deleteStaff, { isLoading: isDeleteLoading }] =
    useDeleteStaffMutation();

  const handleDelete = async () => {
    try {
      await deleteStaff(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                  key={col.accessor}
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {data?.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 bg-white  dark:bg-gray-700"
                >
                  <p className="text-center">No data found</p>
                </td>
              </tr>
            )}
            {data.map((row) => (
              <tr key={row.id}>
                <td className="p-4 bg-white dark:bg-gray-700 rounded-s-[10px]">
                  <div className="flex items-center">
                    <img
                      className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                      src={row.profilePicture || guest}
                      alt=""
                    />
                    <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {row.name}
                    </p>
                  </div>
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.staffRole}
                  </p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">{row.contact}</td>
                <td className="p-4 bg-white dark:bg-gray-700">{row.email}</td>

                <td className="p-4 bg-white dark:bg-gray-700 rounded-e-[10px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `${
                            user?.role === "admin"
                              ? "/admin-dashboard"
                              : user?.role === "vendor"
                              ? "/vendor-dashboard"
                              : "/user-dashboard"
                          }/edit-staff/${row._id}`,
                          { state: { data: row } }
                        )
                      }
                    >
                      <img
                        className="w-50px aspect-square max-w-[50px]"
                        src={editIcon}
                        alt=""
                      />
                    </button>
                    <button onClick={() => setDeleteOpen(row._id)}>
                      <img
                        className="w-50px aspect-square max-w-[50px]"
                        src={deleteIcon}
                        alt=""
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      <Loader loading={isDeleteLoading} />
    </>
  );
}

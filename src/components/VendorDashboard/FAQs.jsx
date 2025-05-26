import React from "react";
import { Link, useParams } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import AddFaq from "./AddFaq";
import EditFaq from "./EditFaq";
import deleteIcon from "../../assets/img/delete-icon.png";
import DeletePopup from "../DeletePopup";
import { useFaqDeleteMutation, useGetfaqsListQuery } from "@/api/apiSlice";
import { CircularProgress } from "@mui/material";

export default function FAQs() {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetfaqsListQuery(id);
  const [deletefaq] = useFaqDeleteMutation();

  return (
    <div>
      <div className="flex justify-end mt-4">
        <AddFaq serviceId={id} />
      </div>
      <div className="bg-[#F7F7F7] p-4 mt-6 rounded-[20px]">
        <div className="bg-black shadow-[0px_14px_34px_0px_#00000014] p-4 rounded-[10px]">
          <h3 className="font-semibold text-white text-lg">
            Add a Specific FAQ
          </h3>
        </div>
        <div className="mt-5">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : data?.data?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {data.data.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 text-black rounded-[10px] flex flex-wrap justify-between gap-4 items-center shadow-[0px_8px_24px_0px_#00000014]"
                >
                  <p className="sm:text-lg">{item.question}</p>
                  <div className="flex items-center ms-auto gap-4">
                    <p className="sm:text-lg font-medium">{item.answer}</p>
                    <AddFaq serviceId={id} mode="edit" faqDetail={item} />
                    <DeletePopup
                      onConfirm={() => {
                        deletefaq(item._id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-4">
              No data available
            </p>
          )}
        </div>
        ;
      </div>
    </div>
  );
}

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Box,
  Tooltip,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { HiLink } from "react-icons/hi";
import { useFaqDeleteMutation, useGetAllfaqsListQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { useState } from "react";
import DeletePopup from "@/components/DeletePopup";
import { toast } from "react-toastify";
import AddFaqModal from "./AddFaqModal";
import { extractYouTubeId } from "@/lib/generateThumbnail";
import { ThemeContext } from "@/components/ThemeProvider";
import { useContext } from "react";

const tabKeyMap = {
  "Landing Page": "landing",
  Customer: "customer",
  Vendor: "vendor",
};

const FaqsList = ({ activeTab }) => {
  const faqType = tabKeyMap[activeTab];
  const { data, isLoading } = useGetAllfaqsListQuery({ faqType });
  const [open, setOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletefaq, { isLoading: isDeleting }] = useFaqDeleteMutation();

  const faqs = data?.data || [];
  const textFaqs = faqs.filter((item) => item.dataType === "text");
  const trainingFaqs = faqs.filter((item) => item.dataType === "training");

  const isEmpty = !textFaqs.length && !trainingFaqs.length;

  const handleDelete = async () => {
    try {
      await deletefaq(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {isEmpty && (
        <Box className="p-6 rounded-xl text-center bg-gray-50">
          <Typography variant="h6" fontWeight={600} color="text.secondary">
            No FAQs found
          </Typography>
          <Typography variant="body2" className="text-gray-500 mt-2">
            You haven't added any text or training FAQs yet.
          </Typography>
        </Box>
      )}

      {/* Text FAQs */}
      {textFaqs.length > 0 && (
        <Accordion
          defaultExpanded
          className={`!rounded-xl !shadow-lg border ${
            isDark
              ? "!bg-[#1F2937] border-gray-700"
              : "!bg-white border-gray-200"
          }`}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={isDark ? "text-white" : "text-black"}
              />
            }
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              className={isDark ? "text-white" : "text-black"}
            >
              FAQs
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={isDark ? "bg-[#1F2937]" : "bg-white"}>
            {textFaqs.map((faq) => (
              <Box
                key={faq._id}
                className={`flex justify-between items-start p-4 border-b last:border-0 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    className={isDark ? "text-white" : "text-black"}
                  >
                    {faq.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={`mt-1 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {faq.answer}
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <Tooltip title="Edit">
                    <button
                      onClick={() => {
                        setSelectedFaq(faq);
                        setOpen(true);
                      }}
                      className={`w-[50px] h-[50px] flex items-center justify-center rounded-[8px] text-2xl shadow-sm transition ${
                        isDark
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-[#e5e5e5] text-[#1E1E1E] hover:bg-[#e0e0e0]"
                      }`}
                    >
                      <EditIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <button
                      onClick={() => setDeleteOpen(faq._id)}
                      className={`w-[50px] h-[50px] flex items-center justify-center rounded-[8px] text-2xl shadow-sm transition ${
                        isDark
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-[#e5e5e5] text-[#1E1E1E] hover:bg-[#e0e0e0]"
                      }`}
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                </div>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {/* Training FAQs */}
      {trainingFaqs.length > 0 && (
        <Accordion
          className={`!rounded-xl !shadow-lg border ${
            isDark
              ? "!bg-[#1F2937] border-gray-700"
              : "!bg-white border-gray-200"
          }`}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={isDark ? "text-white" : "text-black"}
              />
            }
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              className={isDark ? "text-white" : "text-black"}
            >
              Training
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingFaqs.map((training) => (
              <Card
                key={training._id}
                className="rounded-2xl shadow-sm border hover:shadow-xl transition-shadow duration-200"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box className="w-full h-[160px] overflow-hidden rounded-t-2xl">
                  {training.videoLink.includes("youtube.com") ||
                  training.videoLink.includes("youtu.be") ? (
                    <iframe
                      width="100%"
                      height="160"
                      className="w-full h-full object-cover"
                      src={`https://www.youtube.com/embed/${extractYouTubeId(
                        training.videoLink
                      )}`}
                      title={training.videoTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      poster="/video-default.png"
                      className="w-full h-full object-cover"
                      preload="none"
                    >
                      <source src={training.videoLink} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Box>

                <CardContent className="flex flex-col justify-between flex-1">
                  <div>
                    <Typography variant="h6" fontWeight={600}>
                      {training.videoTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="mt-1"
                    >
                      {training.videoDescription}
                    </Typography>

                    <Box
                      onClick={() => window.open(training.videoLink, "_blank")}
                      className="flex items-center gap-2 mt-4 bg-[#000] cursor-pointer px-3 py-1.5 rounded-md transition-colors"
                    >
                      <HiLink className="text-white text-lg" />
                      <Typography
                        variant="body2"
                        color="white"
                        className="truncate"
                      >
                        {training.videoLink}
                      </Typography>
                    </Box>
                  </div>

                  <Box className="flex justify-end gap-2 mt-4">
                    <Tooltip title="Edit">
                      <button
                        onClick={() => {
                          setSelectedFaq(training);
                          setOpen(true);
                        }}
                        className="w-[50px] h-[50px] flex items-center justify-center rounded-[8px] bg-[#e5e5e5] text-[#1E1E1E] text-2xl shadow-sm hover:bg-[#e0e0e0] transition"
                      >
                        <EditIcon />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <button
                        onClick={() => setDeleteOpen(training._id)}
                        className="w-[50px] h-[50px] flex items-center justify-center rounded-[8px] bg-[#e5e5e5] text-[#1E1E1E] text-2xl shadow-sm hover:bg-[#e0e0e0] transition"
                      >
                        <DeleteIcon />
                      </button>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {open && (
        <AddFaqModal
          open={open}
          onClose={() => setOpen(false)}
          data={selectedFaq}
        />
      )}

      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      <Loader loading={isLoading || isDeleting} />
    </div>
  );
};

export default FaqsList;

import React from "react";
import Training from "../../../assets/img/training.png";
import { HiLink } from "react-icons/hi";
import { GrDownload } from "react-icons/gr";
import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { extractYouTubeId } from "@/lib/generateThumbnail";



const UserTraining = ({ data }) => {
  return (
    <div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
        {data?.length === 0 && <p className="p-2 px-4">No data found</p>}
        {data?.map((training) => (
          <Card
            key={training._id}
            className="rounded-2xl shadow-sm border hover:shadow-xl transition-shadow duration-200"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box className="w-full h-[160px] overflow-hidden ">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserTraining;

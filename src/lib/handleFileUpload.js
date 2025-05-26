import axios from "axios";
import { toast } from "react-toastify";
const serverUrl = import.meta.env.VITE_BACKEND_BASE_URL;
// const serverUrl = `http://localhost:6004`
// const token = import.meta.env.VITE_TOKEN;

export const handleFileUpload = async (
  file,
  setIsLoading,
  setUploadProgress,
  token
) => {
  if (!file) {
    toast.info("Please select a file");
    setIsLoading(false);
    return;
  }
  try {
    const CHUNK_SIZE = 5 * 1024 * 1024;
    const fileName = `${Date.now().toString()}_${file.name}`;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    const initiateUploadRes = await fetch(
      `${serverUrl}/upload/initiate-upload`,
      {
        method: "POST",
        body: JSON.stringify({ fileName, filetype: file.type }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const {
      response: { uploadId },
    } = await initiateUploadRes.json();
    let start = 0;
    const chunks = [];
    for (let i = 1; i <= totalChunks; i++) {
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      chunks.push({ chunk, partNumber: i });
      start = end;
    }

    const presignedUrlsRes = await fetch(
      `${serverUrl}/upload/generate-presigned-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileName,
          uploadId: uploadId,
          filetype: file.type,
          numChunks: totalChunks,
        }),
      }
    );
    const { urls } = await presignedUrlsRes.json();
    await Promise.all(
      chunks.map(async (chunk, i) => {
        try {
          const uploadchunk = await fetch(urls[i], {
            method: "PUT",
            body: chunk.chunk,
            headers: {
              "Content-Type": file.type,
              "Content-Length": chunk.chunk.size,
            },
          });

          const progress = Math.floor(((i + 1) / totalChunks) * 100);
          setUploadProgress(progress);
        } catch (error) {
          console.log(error);
          toast.info(`Error uploading ${file.name}`);
          console.error(
            `Error uploading chunk ${i} of file ${file.name}`,
            error
          );
        }
      })
    );

    const uploadResponse = await axios.post(
      `${serverUrl}/upload/complete-upload`,
      { fileName, uploadId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!uploadResponse.data.success) {
      throw new Error("Error completing upload 1");
    }

    return uploadResponse?.data?.data?.Location;
  } catch (error) {
    console.log("error", error);
    setIsLoading(false);
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXmPNYZ-XDmbuO5gzHPM-sq33yAn0EFQepA&s";
    // throw new Error(error?.message || "Error completing upload");
  }
};

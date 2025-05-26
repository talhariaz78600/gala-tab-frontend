import { toast } from "react-toastify";
import { handleFileUpload } from "./handleFileUpload";

export const handleStep4Upload = async (
  uploadedFiles,
  setIsLoading,
  setUploadProgress,
  token
) => {
  if (!uploadedFiles || uploadedFiles.length === 0) {
    toast.info("Please upload at least one file");
    return [];
  }
  if (!token) {
    toast.info("Inavlid User");
  }
  setIsLoading(true);
  const uploadedMedia = [];

  for (const fileObj of uploadedFiles) {
    const { url, cover } = fileObj;
    try {
      const fileUrl = await handleFileUpload(
        url,
        setIsLoading,
        setUploadProgress,
        token
      );
      console.log("fileUrl", fileUrl);

      uploadedMedia.push({
        url: fileUrl,
        type: url.type.includes("image") ? "image" : "video",
        key: url.name,
        cover,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  setIsLoading(false);
  return { media: uploadedMedia };
};

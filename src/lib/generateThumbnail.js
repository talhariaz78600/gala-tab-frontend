export const generateThumbnail = (source) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (source instanceof File) {
      video.src = URL.createObjectURL(source);
    } else if (typeof source === "string") {
      video.src = source;
      video.crossOrigin = "anonymous";
    } else {
      reject("Invalid video source");
    }

    video.currentTime = 1;

    video.onloadeddata = () => {
      // Limit thumbnail size (e.g., max 480px width)
      const maxDimension = 480;
      const scale = Math.min(
        maxDimension / video.videoWidth,
        maxDimension / video.videoHeight,
        1
      );

      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;

      context.drawImage(
        video,
        0,
        0,
        video.videoWidth,
        video.videoHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const dataUrl = canvas.toDataURL("image/png");
      resolve(dataUrl);
    };

    video.onerror = (e) => {
      reject("Failed to load video for thumbnail generation.");
    };
  });
};

export const extractYouTubeId = (url) => {
  const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

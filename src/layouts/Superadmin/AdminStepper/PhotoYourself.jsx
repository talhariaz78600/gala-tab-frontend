import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const PhotoYourself = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCaptured, setHasCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  // Function to start the camera feed
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access error:", error);
    }
  };

  useEffect(() => {
    startCamera(); // Start camera when component is mounted

    return () => {
      // Clean up the camera stream when the component is unmounted
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks to release the camera
      }
    };
  }, []);

  const handleTakePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 300); // Draw the video on the canvas
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const photoFile = new File([blob], "selfie.jpg", {
          type: "image/jpeg",
        });

        setValue("selfieImage", photoFile, { shouldValidate: true });
        setCapturedImage(URL.createObjectURL(photoFile)); // Create a URL for the captured image
        setHasCaptured(true);
      }
    }, "image/jpeg");
  };

  const retakePhoto = () => {
    setHasCaptured(false);
    setCapturedImage(null); // Reset the captured image
    setValue("selfieImage", null);
    startCamera(); // Restart the camera after retaking the photo
  };

  return (
    <div className="py-7 w-full">
      <h4 className="md:text-4xl text-3xl font-semibold text-center">
        Take a photo of yourself
      </h4>
      <p className="text-center mt-4 max-w-lg mx-auto">
        We'll compare it with your ID photo. This won’t appear on your profile.
      </p>

      <div className="sm:max-w-lg mx-auto md:mt-12 mt-5">
        <div className="border-dashed border-2 w-full bg-[#F7F7F7] p-3 h-96 flex flex-col items-center justify-center rounded-xl relative overflow-hidden">
          {/* Video feed visible only if no photo is taken */}
          {!hasCaptured && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded-xl object-contain w-[80%] h-[80%]" // Ensures the video fits inside without stretching
            />
          )}

          {/* Display captured image only if photo is taken */}
          {hasCaptured && (
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="rounded-xl object-fill w-[80%] h-[80%]" // Ensures the image fits inside without stretching
            />
          )}

          {/* Hidden canvas for capturing photo */}
          <canvas ref={canvasRef} width={300} height={300} className="hidden" />

          {/* Show Take Photo button if no photo is captured */}
          {!hasCaptured ? (
            <button
              type="button"
              onClick={handleTakePhoto}
              className="mt-4 bg-[#171717] text-white px-6 py-2 rounded-xl"
            >
              Take Photo
            </button>
          ) : (
            <button
              type="button"
              onClick={retakePhoto}
              className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-xl"
            >
              Retake Photo
            </button>
          )}
        </div>

        {errors.selfieImage && (
          <p className="text-red-500 text-sm mt-2">
            {errors.selfieImage.message}
          </p>
        )}

        {/* Hidden input for react-hook-form */}
        <input
          type="hidden"
          {...register("selfieImage", {
            required: "Selfie is required",
          })}
        />
      </div>
    </div>
  );
};

export default PhotoYourself;

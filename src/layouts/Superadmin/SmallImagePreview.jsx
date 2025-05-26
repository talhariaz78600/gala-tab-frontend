import React, { useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
import DropImgIcon from "../../assets/img/DropImgIcon.png";

export default function SmallImagePreview({
  index,
  image,
  inputId,
  onImageChange,
  onRemove,
}) {
  const inputRef = useRef(null);

  // Wrap onImageChange to clear input value after calling parent's handler
  const handleImageChange = (event) => {
    onImageChange(index, event);
    // Reset file input value so same file can be selected again
    event.target.value = "";
  };

  const handleRemove = () => {
    onRemove(index);
    // Also reset input value on remove just to be safe
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      {image ? (
        <div className="relative">
          <img
            src={image}
            alt={`Preview ${index + 1}`}
            className="w-full aspect-[1.17/1] object-cover rounded-[10px]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DropImgIcon;
            }}
          />
          <div className="absolute top-0 end-0 m-3">
            <button onClick={handleRemove}>
              <RxCrossCircled className="text-[26px]" />
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            aspectRatio: "1.17/1",
            border: "1px dashed #D5D5D5",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <label
            htmlFor={inputId}
            style={{
              cursor: "pointer",
              color: "#9A9A9A",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img src={DropImgIcon} alt="" />
            Drag and Drop
          </label>
        </div>
      )}
    </div>
  );
}

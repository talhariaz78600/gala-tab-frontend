import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import clsx from "clsx";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Import a dollar icon

const CustomTextField = React.forwardRef(
  (
    {
      label,
      labelColor = "",
      classInput,
      placeholder,
      handleChange,
      children,
      sx,
      name,
      field,
      className,
      type = "text", // Default type to "text"
      rows = "",
      startAdornment, // Add this prop to pass a start adornment
      endAdornment, // Add this prop to pass an end adornment
      subLabel,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx("flex flex-col gap-y-1 w-full",className)}>
        <p className={`flex ${labelColor} flex-col`}>
          {label}
          <span className="text-sm text-[#130901]/50">{subLabel}</span>
        </p>

        <TextField
          inputRef={ref}
          type={rows === "" ? type : undefined} // Apply type only when not multiline
          variant="outlined"
          multiline={rows !== ""} // Make it multiline if rows are specified
          rows={rows === "" ? undefined : rows}
          size="small"
          name={name}
          className={`${classInput}`}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={placeholder}
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null,
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : null,
          }}
          {...(field || {})}
          onChange={(e) => {
            if (handleChange) {
              handleChange(e);
            }
            if (field?.onChange) {
              field.onChange(e);
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#c1c5cc",
              },
              "&:hover fieldset": {
                borderColor: "#c1c5cc",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#c1c5cc",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f5f5f5", // Change background color when disabled
                color: "#a0a0a0", // Change text color when disabled
                "& fieldset": {
                  borderColor: "#e0e0e0", // Change border color when disabled
                },
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(0, 0, 0, 0.65)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#84919d",
            },
            width: "100%",
            ...sx,
          }}
          {...props}
        >
          {children && children}
        </TextField>
      </div>
    );
  }
);

export default CustomTextField;

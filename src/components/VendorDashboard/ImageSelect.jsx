import React from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

const ImageSelect = ({ label, options, value, onChange, imgClass }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        sx={{
          borderRadius: "10px",
          borderColor: "#D5D5D5",
          backgroundColor: "#ffffff",
          boxShadow: "0px 8px 24px 0px #00000012",
          height: "100%",
          fontFamily: "tt_chocolates",
        }}
        labelId={`${label}-label`}
        value={value}
        onChange={onChange}
        label={label}
        renderValue={(selected) => {
          const selectedOption = options.find(
            (option) => option.value === selected
          );
          return (
            <Box display="flex" alignItems="center">
              <img
                src={selectedOption?.img}
                alt={selectedOption?.label}
                className={imgClass}
              />
              {selectedOption?.label}
            </Box>
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              overflow: "auto",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{ fontFamily: "tt_chocolates" }}
            key={option.value}
            value={option.value}
          >
            <Box
              sx={{ padding: "12px", fontFamily: "tt_chocolates" }}
              display="flex"
              alignItems="center"
            >
              <img src={option.img} className={imgClass} alt={option.label} />
              {option.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ImageSelect;

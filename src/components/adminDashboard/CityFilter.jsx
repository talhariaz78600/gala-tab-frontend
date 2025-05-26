import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";

// Dummy data for cities
const Cities = [
  { label: "Invarine" },
  { label: "Springfield" },
  { label: "Rivertown" },
  { label: "Mountainview" },
  { label: "Lakeside" },
  { label: "Greenwood" },
  { label: "Sunnyvale" },
  { label: "Brookfield" },
  { label: "Mapleton" },
  { label: "Clearwater" },
  { label: "Silverstone" },
];

export default function CityFilter() {
  return (
    <Autocomplete
      id="City-select"
      sx={{
        width: 150,
        "& .MuiOutlinedInput-root": { borderRadius: "9999px" },
      }}
      options={Cities}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a City"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}

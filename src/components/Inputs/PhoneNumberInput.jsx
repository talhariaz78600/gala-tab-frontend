import React from "react";
import { Controller } from "react-hook-form";
import { Typography, Box } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const PhoneNumberInput = ({
  control,
  name,
  label,
  error,
  rules = {},
  defaultCountry = "US",
  labelSx,
  ...props
}) => {
  return (
    <>
      <Box mb={0.5}>
        <Typography
          variant="body2"
          htmlFor={name}
          color={error ? "error" : "text.main"}
          sx={labelSx}
        >
          {label}
        </Typography>
      </Box>
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          validate: (value) => {
            // Skip validation if no value is entered and `required` is not specified
            if (!value && !rules.required) return true;

            // If a value exists, validate it using `matchIsValidTel`
            return (
              matchIsValidTel(value || "", defaultCountry) ||
              "Please enter a valid phone number"
            );
          },
        }}
        render={({ field }) => (
          <MuiTelInput
            {...field}
            id={name}
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "46px",
                ...props.sx,
              },
            }}
            defaultCountry={defaultCountry}
            error={!!error}
            helperText={error?.message || ""}
            {...props}
          />
        )}
      />
    </>
  );
};

export default PhoneNumberInput;
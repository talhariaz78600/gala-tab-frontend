import * as yup from "yup";

export const profileSchema = yup.object().shape({
  // Basic Information
  firstName: yup
    .string()
    .trim()
    .min(2, "Minimum 2 characters")
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .min(2, "Minimum 2 characters")
    .required("Last name is required"),

  // Contact Information
  // contact: yup
  //   .string()
  //   .required("Mobile number is required")
  //   .test("is-valid-phone", "Invalid phone number", (value) => {
  //     if (!value) return false;
  //     return isValidPhoneNumber(value); // Your phone validation function
  //   }),

  // officeContact: yup
  //   .string()
  //   .nullable()
  //   .test("is-valid-phone", "Invalid phone number", (value) => {
  //     if (!value) return true; // Optional field
  //     return isValidPhoneNumber(value);
  //   }),

  // emergencyContact: yup
  //   .string()
  //   .nullable()
  //   .test("is-valid-phone", "Invalid phone number", (value) => {
  //     if (!value) return true; // Optional field
  //     return isValidPhoneNumber(value);
  //   }),

  // Company Information
  companyName: yup.string().trim(), // Optional

  // Address Information (nested object)
  address: yup
    .object()
    .shape({
      mailingAddress: yup
        .string()
        .trim()
        .required("Mailing address is required"),
    })
    .required("Address information is required"),
});

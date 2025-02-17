import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

export const findEmailSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
});

export const ForgetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  conPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const signupSchemaWithoutEmail = Yup.object({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  countryCode: Yup.string().required("Please select a country code."),
  phoneNumber: Yup.string()
    .matches(
      /^[\d\s()-]+$/,
      "Please enter a valid phone number without a '+' sign."
    )
    .min(7, "Phone number must be at least 7 digits.")
    .max(15, "Phone number must not exceed 15 digits.")
    .required("Please enter a phone number."),
});

export const signupSchemaWithEmail = Yup.object({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  countryCode: Yup.string().required("Please select a country code."),
  phoneNumber: Yup.string()
    .matches(
      /^[\d\s()-]+$/,
      "Please enter a valid phone number without a '+' sign."
    )
    .min(7, "Phone number must be at least 7 digits.")
    .max(15, "Phone number must not exceed 15 digits.")
    .required("Please enter a phone number."),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
});

export const profileDetailsSchema = Yup.object({
  country: Yup.string().required("Country is required."),
  company: Yup.string().required("Company is required."),
  industry: Yup.string().required("Industry is required."),
  role: Yup.string().required("Role is required"),
});

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

export const createGroupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Group name must be at least 3 digits.")
    .max(15, "Group name must not exceed 100 digits.")
    .required("Group name is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 digits.")
    .max(2000, "Description must not exceed 2000 digits.")
    .required("Description is required"),
  location: Yup.string().max(100, "Location must not exceed 100 digits."),
  rules: Yup.string().max(4000, "Rules must not exceed 4000 digits."),
  type: Yup.string().required("Please select group type"),
});

export const createPageSchema = Yup.object({
  organizationName: Yup.string()
    .max(100, "Organization name must not exceed 100 digits.")
    .required("Organization name is required"),
  address: Yup.string().required("Address is required"),
  location: Yup.string().required(100, "Location is required."),
  size: Yup.string().required("Please select Organization size"),
  type: Yup.string().required("Please select Organization type"),
  website: Yup.string().required("Website is required"),
  tagline: Yup.string().required("Tagline is required"),
  permissions: Yup.boolean()
    .oneOf([true], "You must accept the permission")
    .required("This field is required"),
});


export const onlineEventSchema = Yup.object({
  format: Yup.string().required("Event format is required"),
  name: Yup.string().required("Event name is required").max(75, "Must be 75 characters or less"),
  timezone: Yup.string().required("Timezone is required"),
  description: Yup.string().max(5000, "Must be 5000 characters or less"),
  // externalLink: Yup.string().max(1024, "Must be 1024 characters or less"),
});

export const inpersonEventSchema = Yup.object({
  name: Yup.string().required("Event name is required").max(75, "Must be 75 characters or less"),
  timezone: Yup.string().required("Timezone is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().max(5000, "Must be 5000 characters or less"),
  externalLink: Yup.string().max(1024, "Must be 1024 characters or less"),
});

export const pollSchema = Yup.object({
  question: Yup.string().required("Question is required").max(100, "Must be 100 characters or less"),
  opt1: Yup.string().required("Option 1 is required").max(100, "Must be 100 characters or less"),
  opt2: Yup.string().required("Option 2 is required").max(100, "Must be 100 characters or less"),
  options: Yup.array()
    .of(
      Yup.string()
        .max(100, "Must be 100 characters or less")
    )
    .optional(),
})
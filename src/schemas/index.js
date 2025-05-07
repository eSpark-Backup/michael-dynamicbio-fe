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
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
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
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
  conPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const signupSchema = Yup.object({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  dob: Yup.date()
    .max(new Date(), "Birthdate cannot be in the future")
    .required("Birthdate is required"),
  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
  conPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const addMobileSchema = Yup.object({
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

export const profileDetailsSchema = Yup.object({
  country: Yup.string().required("Country is required."),
  city: Yup.string().required("City is required."),
  company: Yup.string().required("Company is required."),
  industry: Yup.string().required("Industry is required."),
  designation: Yup.string().required("Role is required."),
  startingDate: Yup.string()
    .required("Starting date is required")
    .max(new Date(), "Start date must be in the past"),
});

export const editProfileDetailsSchema = Yup.object({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  country: Yup.string().required("Country is required."),
  current: Yup.string().required("Current position is required."),
  city: Yup.string().required("City is required."),
  industry: Yup.string().required("Industry is required."),
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
  address: Yup.string().max(200, "Address must not exceed 200 digits.").required("Address is required"),
  location: Yup.string().required("Location is required."),
  size: Yup.string().required("Please select Organization size"),
  type: Yup.string().required("Please select Organization type"),
  website: Yup.string().max(200, "Website must not exceed 200 digits.").required("Website is required"),
  tagline: Yup.string().max(200, "Tagline must not exceed 200 digits.").required("Tagline is required"),
  permissions: Yup.boolean()
    .oneOf([true], "You must accept the permission")
    .required("This field is required"),

  // Conditional fields based on industry
  sellingItem: Yup.string().when("industry", {
    is: "PRODUCTION",
    then: (schema) => schema.required("Selling item is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  megajooules: Yup.string().when("industry", {
    is: "PRODUCTION",
    then: (schema) => schema.required("Megajoules is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  energyDuration: Yup.string().when("industry", {
    is: "PRODUCTION",
    then: (schema) => schema.required("Energy duration is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  cost: Yup.string().when("industry", {
    is: "PRODUCTION",
    then: (schema) => schema.required("Cost is required."),
    otherwise: (schema) => schema.notRequired(),
  }),

  shippingItem: Yup.string().when("industry", {
    is: "TRANSPORTATION",
    then: (schema) => schema.required("Shipping item is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  fuelCells: Yup.string().when("industry", {
    is: "TRANSPORTATION",
    then: (schema) => schema.required("Fuel cells info is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  to: Yup.string().when("industry", {
    is: "TRANSPORTATION",
    then: (schema) => schema.required("Destination (to) is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  from: Yup.string().when("industry", {
    is: "TRANSPORTATION",
    then: (schema) => schema.required("Starting point (from) is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  transportCost: Yup.string().when("industry", {
    is: "TRANSPORTATION",
    then: (schema) => schema.required("Transport cost is required."),
    otherwise: (schema) => schema.notRequired(),
  }),

  storageDuration: Yup.string().when("industry", {
    is: "STORAGE",
    then: (schema) => schema.required("Storage duration is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  storageTemp: Yup.string().when("industry", {
    is: "STORAGE",
    then: (schema) => schema.required("Storage temperature is required."),
    otherwise: (schema) => schema.notRequired(),
  }),

  sellingItemOthers: Yup.string().when("industry", {
    is: "OTHER",
    then: (schema) => schema.required("Selling item is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
  itemCostOthers: Yup.string().when("industry", {
    is: "OTHER",
    then: (schema) => schema.required("Item cost is required."),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const onlineEventSchema = Yup.object({
  format: Yup.string().required("Event format is required"),
  name: Yup.string()
    .required("Event name is required")
    .max(75, "Must be 75 characters or less"),
  timezone: Yup.string().required("Timezone is required"),
  description: Yup.string().max(5000, "Must be 5000 characters or less"),
  externalLink: Yup.string().max(1024, "Must be 1024 characters or less").url("Must be a valid URL"),
});

export const inpersonEventSchema = Yup.object({
  name: Yup.string()
    .required("Event name is required")
    .max(75, "Must be 75 characters or less"),
  timezone: Yup.string().required("Timezone is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().max(5000, "Must be 5000 characters or less"),
  externalLink: Yup.string().max(1024, "Must be 1024 characters or less").url("Must be a valid URL"),
});

export const pollSchema = Yup.object({
  question: Yup.string()
    .required("Question is required")
    .max(100, "Must be 100 characters or less"),
  opt1: Yup.string()
    .required("Option 1 is required")
    .max(100, "Must be 100 characters or less"),
  opt2: Yup.string()
    .required("Option 2 is required")
    .max(100, "Must be 100 characters or less"),
  options: Yup.array()
    .of(
      Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Option cannot be empty")
        .matches(/^.+$/, "Option cannot be empty")
    )
    .optional(),
});

export const experienceSchema = Yup.object({
  title: Yup.string().required("Job title is required"),
  type: Yup.string().required("Job type is required"),
  company: Yup.string().required("Company name is required"),
  location: Yup.string().required("Location is required."),
  currently: Yup.boolean(),
  startingDate: Yup.string().required("Starting date is required"),
  endingDate: Yup.date()
    .nullable()
    .when("currently", {
      is: false,
      then: (schema) => schema.required("Ending date is required"),
    })
    .test(
      "is-after-start",
      "Ending date must be after the starting date",
      function (endingDate) {
        const { startingDate, currently } = this.parent;
        if (!currently && startingDate && endingDate) {
          return new Date(endingDate) >= new Date(startingDate);
        }
        return true;
      }
    ),
});

export const educationSchema = Yup.object({
  school: Yup.string().required("School is required"),
  degree: Yup.string().required("Degree is required"),
  field: Yup.string().required("Field name is required"),
  grade: Yup.string(),
  startingDate: Yup.string().required("Starting date is required"),
  endingDate: Yup.string()
    .required("Ending date is required")
    .test(
      "is-after-start",
      "Ending date must be after the starting date",
      function (endingDate) {
        const { startingDate, currently } = this.parent;
        if (!currently && startingDate && endingDate) {
          return new Date(endingDate) >= new Date(startingDate);
        }
        return true;
      }
    ),
});

export const skillSchema = Yup.object({
  skill: Yup.string().required("Skill is required"),
});

export const phoneNoSchema = Yup.object({
  phone: Yup.string().required("Please enter a phone number."),
});


export const welcomeNoteSchema = Yup.object({
  note: Yup.string().required("Note is required").max(1000, "Characters must be less or equal to 1000.")
})
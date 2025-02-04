import { Box, Typography } from "@mui/material";
import { Button, Dropdown, Input } from "../../../components";
import { useState } from "react";
import { useFormik } from "formik";
import countries from "country-telephone-data";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const Signup = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    phoneNumber: "",
    countryCode: "",
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate: (values) => {
      const newErrors = {};
      let valid = true;

      if (!values.firstName) {
        newErrors.firstName = "First Name is required.";
        valid = false;
      }

      if (!values.lastName) {
        newErrors.lastName = "Last Name is required.";
        valid = false;
      }

      return valid ? {} : newErrors;
    },
    onSubmit: (values) => {
      console.log("Form Submitted", {
        ...values,
        phoneNumber: phoneNumber,
        countryCode: selectedCode,
      });
    },
  });

  const countriesOptions = countries?.allCountries?.map((item) => ({
    name: item?.name,
    dialCode: item?.dialCode,
    iso2: item?.iso2,
  }));

  const handlePhoneCodeChange = (event) => {
    setSelectedCode(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const validatePhoneNumber = () => {
    let valid = true;
    const newErrors = {
      phoneNumber: "",
      countryCode: "",
    };

    if (!selectedCode) {
      newErrors.countryCode = "Please select a country code.";
      valid = false;
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Please enter a phone number.";
      valid = false;
    } else {
      const country = countries?.allCountries?.find((item) => item.dialCode === selectedCode);

      if (!country) {
        newErrors.countryCode = "Invalid country selection.";
        valid = false;
      } else {
        const fullPhoneNumber = `+${selectedCode}${phoneNumber}`;
        const phoneNumberObj = parsePhoneNumberFromString(fullPhoneNumber, country.iso2?.toUpperCase());

        if (!phoneNumberObj || !phoneNumberObj.isValid()) {
          newErrors.phoneNumber = "Invalid phone number format for the selected country.";
          valid = false;
        }
      }
    }

    setErrors(newErrors);

    return valid;
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "20px" }}>
      <Typography sx={{ fontSize: "29px", fontWeight: "400", textAlign: "center" }}>
        Sign Up
      </Typography>
      <Box sx={{ width: "70%", display: "flex", flexDirection: "column", rowGap: "20px" }}>
        <Input
          placeholder="First Name*"
          name="firstName"
          value={formik.values.firstName}
          handleChange={formik.handleChange}
          error={formik.touched.firstName && !!formik.errors.firstName}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <Input
          placeholder="Last Name*"
          name="lastName"
          value={formik.values.lastName}
          handleChange={formik.handleChange}
          error={formik.touched.lastName && !!formik.errors.lastName}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <Dropdown
          options={countriesOptions}
          handleChange={handlePhoneCodeChange}
          placeholder="Country Code*"
          isCountries={true}
          error={!!errors.countryCode}
          helperText={errors.countryCode}
        />
        <Input
          placeholder="Phone Number*"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          disabled={true}
        />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ width: "250px" }}>
            <Button type="submit" onClick={() => {
              if (validatePhoneNumber()) {
                formik.handleSubmit();
              }
            }}>
              Verify Number
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;

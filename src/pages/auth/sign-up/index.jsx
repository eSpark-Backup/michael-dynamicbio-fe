import { Box, Typography, useTheme } from "@mui/material";
import { Button, Dropdown, Input } from "../../../components";
import { useFormik } from "formik";
import countries from "country-telephone-data";
import { signupSchemaWithoutEmail } from "../../../schemas";
import { Link } from "react-router-dom";

const Signup = () => {
  const countriesOptions = countries?.allCountries?.map((item) => ({
    name: item?.name,
    dialCode: item?.dialCode,
    iso2: item?.iso2,
  }));
  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      countryCode: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: signupSchemaWithoutEmail,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "20px" }}>
        <Typography sx={{ fontSize: "29px", fontWeight: "400", textAlign: "center" }}>
          Sign Up
        </Typography>
        <Box sx={{ width: { xs: "90%", sm: "70%" }, display: "flex", flexDirection: "column", rowGap: "20px" }}>
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
            handleChange={(event) => formik.setFieldValue("countryCode", event.target.value)}
            placeholder="Country Code*"
            isCountries={true}
            error={formik.touched.countryCode && !!formik.errors.countryCode}
            helperText={formik.touched.countryCode && formik.errors.countryCode}
          />
          <Input
            placeholder="Phone Number*"
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            handleChange={formik.handleChange}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            disabled={true}
            value={formik.values.email}
          />
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "20px" }}>
            <Box sx={{ width: "250px" }}>
              <Button type="submit" onClick={formik.handleSubmit}>
                Verify Number
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "27px" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "300", textAlign: "center" }}>
                Already have an account?
                <Link
                  style={{
                    textDecoration: "none",
                    width: "100%",
                  }}
                  to="/login"
                >
                  <Typography
                    ml={1}
                    fontSize="18px"
                    fontWeight={400}
                    component="span"
                    color={theme.palette.primary.dark}
                    sx={{ textAlign: "center" }}
                    variant="gradientText"
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;

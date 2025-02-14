import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Stack, Typography } from "@mui/material";
import { Input, Button } from "../../../components";
import { findEmailSchema } from "../../../schemas";

const FindEmail = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: findEmailSchema,
    onSubmit: (values) => {
      //find Email
      console.log(values, "values");
      navigate("/select-email");
    },
  });
  return (
    <Stack
      sx={{ width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" } }}
      direction="column"
      alignItems="center"
      justifyItems="flex-start"
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      <Typography fontSize="40px">Find Your Account</Typography>
      <Typography sx={{ width: "100%", textalign: "left", marginTop: "48px" }}>
        Please enter your email address to search for your account.
      </Typography>
      <Box sx={{ width: "100%", marginTop: "24px" }}>
        <Input
          label={"Email"}
          name={"email"}
          type={"email"}
          value={formik.values.email}
          handleChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Box>
      <Box sx={{ marginTop: "132px", width: "250px" }}>
        <Button type="submit">Search</Button>
      </Box>
      <Typography sx={{ marginTop: "24px" }}>
        Back to
        <Link
          style={{
            textDecoration: "none",
            marginLeft: "8px",
            width: "100%",
          }}
          to="/login"
        >
          <Typography
            variant="gradientText"
            fontSize="18px"
            fontWeight={500}
            component="span"
          >
            Login
          </Typography>
        </Link>
      </Typography>
    </Stack>
  );
};

export default FindEmail;

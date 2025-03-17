import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Box, Stack, Typography } from "@mui/material";
import { Input, Button } from "../../../components";
import { findEmailSchema } from "../../../schemas";
import { useFindEmailMutation } from "../../../services/auth";

const FindEmail = () => {
  const navigate = useNavigate();
  const [findEmail, { isLoading }] = useFindEmailMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: findEmailSchema,
    onSubmit: (values) => {
      findEmail(values).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          navigate(
            `/select-email?email=${res?.data?.data?.email}${
              res?.data?.data?.image ? `&image=${res?.data?.data?.image}` : ""
            }`
          );
        }
      });
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
      <Typography sx={{ fontSize: { xs: "28px", md: "40px" } }}>Find Your Account</Typography>
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
        <Button loading={isLoading} type="submit">
          Search
        </Button>
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

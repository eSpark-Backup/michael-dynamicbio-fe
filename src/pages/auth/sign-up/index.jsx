import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box, Typography, useTheme } from "@mui/material";
import { Button, Input } from "../../../components";
import { signupSchema } from "../../../schemas";
import { useRegisterMutation } from "../../../services/auth";
import { DatePicker } from "@mui/x-date-pickers";

const Signup = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      conPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      const dataToSend = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        password: values?.password,
        loginType: "local",
        role: "user",
      };
      register(dataToSend).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          navigate(`/verify-email?email=${values.email}`);
          localStorage.setItem("temp_user_data", JSON.stringify(dataToSend));
        }
      });
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "28px", md: "40px" },
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          Sign Up
        </Typography>
        <Box
          sx={{
            width: { xs: "90%", sm: "70%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
          }}
        >
          <Input
            label="First Name*"
            name="firstName"
            value={formik.values.firstName}
            handleChange={formik.handleChange}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <Input
            label="Last Name*"
            name="lastName"
            value={formik.values.lastName}
            handleChange={formik.handleChange}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            handleChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Input
            label={"Password"}
            name={"password"}
            type={"password"}
            value={formik.values.password}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Input
            label={"Confirm Password*"}
            name={"conPassword"}
            type={"password"}
            value={formik.values.conPassword}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.conPassword && Boolean(formik.errors.conPassword)
            }
            helperText={formik.touched.conPassword && formik.errors.conPassword}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Box sx={{ width: "250px" }}>
              <Button loading={isLoading} type="submit">
                Confirm Email
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "27px",
                mb: 5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
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

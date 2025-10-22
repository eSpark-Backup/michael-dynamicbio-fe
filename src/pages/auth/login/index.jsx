import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Input, Button } from "../../../components";
import { useLoginMutation } from "../../../services/auth";
import { loginSchema } from "../../../schemas";
import { facebook, google, linkedin } from "../../../assets";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await login(values);

        // --- Handle network or API errors
        if (res?.error) {
          const errorMessage =
            res?.error?.data?.message ||
            "Something went wrong. Please try again.";
          toast.error(errorMessage);
          return;
        }

        // --- If API responded successfully
        const statusCode = res?.data?.statusCode;
        const message = res?.data?.message;
        const response = res?.data?.data;

        if (statusCode !== 200 || !response) {
          toast.error(message || "Unexpected server response.");
          return;
        }

        // --- Extract data
        const token = response?.token;
        const user = response?.user;

        if (!token) {
          toast.error("Token missing from server response.");
          return;
        }

        // --- Save token properly
        if (user?.is2FAEnabled) {
          localStorage.setItem("temp-token", token);
        } else {
          localStorage.setItem("token", token);
        }

        // --- Handle profile statuses and navigation logic
        switch (user?.profileStatus) {
          case "completed":
            if (user?.is2FAEnabled) {
              toast.info("2FA verification required.");
              navigate("/google-auth");
            } else {
              toast.success("Login successful!");
              navigate("/dashboard");
            }
            break;

          case "both_verified":
            toast.info("Please complete your profile setup.");
            localStorage.setItem("temp_user_data", JSON.stringify(user));
            navigate("/complete-profile");
            break;

          case "none":
          default:
            if (user?.isEmailVerified) {
              toast.success("Login successful! Redirecting...");
              navigate("/dashboard");
            } else {
              toast.info("Please verify your email first.");
              navigate(
                `/verify-email?email=${encodeURIComponent(user?.email)}`
              );
            }
            break;
        }
      } catch (err) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Login error:", err);
      }
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
      <Typography sx={{ fontSize: { xs: "28px", md: "40px" } }}>
        Login
      </Typography>
      <Box sx={{ width: "100%", marginTop: "48px" }}>
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
      <Box sx={{ width: "100%", marginTop: "24px" }}>
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
      </Box>
      <Link
        style={{
          color: "#505050",
          textDecoration: "none",
          marginTop: "20px",
          width: "100%",
        }}
        to="/find-email"
      >
        <Typography textAlign="right">Forget Password?</Typography>
      </Link>
      <FormControlLabel
        sx={{ width: "100%" }}
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(_, val) => setRememberMe(val)}
            name="remember-me"
          />
        }
        label="Remember me"
      />
      <Box sx={{ width: "250px" }}>
        <Button loading={isLoading} type="submit">
          login
        </Button>
      </Box>
      <Typography sx={{ marginTop: "24px" }}>
        Don’t have an account?
        <Link
          style={{
            textDecoration: "none",
            marginLeft: "8px",
            width: "100%",
          }}
          to="/signup"
        >
          <Typography
            variant="gradientText"
            fontSize="18px"
            fontWeight={500}
            component="span"
          >
            Sign Up
          </Typography>
        </Link>
      </Typography>
      {/* <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{ marginY: "38px" }}
      >
        <Typography fontWeight={300}>Or Sign up via</Typography>
        <img style={{ cursor: "pointer" }} src={google} alt="google" />
        <img style={{ cursor: "pointer" }} src={facebook} alt="facebook" />
        <img style={{ cursor: "pointer" }} src={linkedin} alt="linkedin" />
      </Stack> */}
    </Stack>
  );
};

export default Login;

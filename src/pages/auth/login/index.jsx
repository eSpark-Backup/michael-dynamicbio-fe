import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Input, Button } from "../../../components";
import { loginSchema } from "../../../schemas";
import { facebook, google, linkedin } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      //login
      console.log(values, "values");
      navigate("/google-auth");
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
      <Typography fontSize="40px">Login</Typography>
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
        to="forget-password"
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
        <Button type="submit">login</Button>
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
            ml={1}
            fontSize="18px"
            fontWeight={500}
            component="span"
          >
            Sign Up
          </Typography>
        </Link>
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{ marginTop: "38px" }}
      >
        <Typography fontWeight={300}>Or Sign up via</Typography>
        <img style={{ cursor: "pointer" }} src={google} alt="google" />
        <img style={{ cursor: "pointer" }} src={facebook} alt="facebook" />
        <img style={{ cursor: "pointer" }} src={linkedin} alt="linkedin" />
      </Stack>
    </Stack>
  );
};

export default Login;

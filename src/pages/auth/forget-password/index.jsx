import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Input } from "../../../components";
import { useQuery } from "../../../utils";
import { ForgetPasswordSchema } from "../../../schemas";

const ForgetPassword = () => {
  const query = useQuery();
  const type = query.get("type");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      conPassword: "",
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      //set password
      console.log(values, "values");
      navigate(type === "reset" ? "/reset-success" : "/complete-profile");
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
      <Typography fontSize="40px">
        {type === "reset" ? "Set New Password" : "Set Password"}
      </Typography>
      <Box sx={{ width: "100%", marginTop: "48px" }}>
        <Input
          label={"Enter Password"}
          name={"password"}
          type={"password"}
          value={formik.values.password}
          handleChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Box>
      <Box sx={{ width: "100%", marginTop: "24px" }}>
        <Input
          label={"Re-enter Password"}
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
      </Box>
      <Typography
        sx={{
          width: "100%",
          marginTop: "24px",
          fontSize: "17px",
          fontWeight: 300,
        }}
        textAlign="left"
      >
        Password must contain:
      </Typography>
      <Box
        sx={{
          width: "100%",
          marginLeft: "60px",
          li: { fontSize: "17px", fontWeight: 300 },
        }}
        component="ul"
      >
        <Typography component="li">At least 12 characters long.</Typography>
        <Typography component="li">
          A combination of uppercase letters, lowercase letters, numbers, and
          symbols.
        </Typography>
        <Typography component="li">
          Should not be a word that can be found in a dictionary.
        </Typography>
        <Typography component="li">
          Should not be the name of a person or a popular entity.
        </Typography>
        <Typography component="li">Must not had been used before.</Typography>
      </Box>

      <Box sx={{ width: "250px", marginTop: "155px" }}>
        <Button type="submit">Done</Button>
      </Box>
    </Stack>
  );
};

export default ForgetPassword;

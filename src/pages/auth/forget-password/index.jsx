import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box, Stack, Typography } from "@mui/material";
import { Input, Button } from "../../../components";
import { useQuery } from "../../../utils";
import { ForgetPasswordSchema } from "../../../schemas";
import { useResetPasswordMutation } from "../../../services/auth";

const ForgetPassword = () => {
  const query = useQuery();
  const token = query.get("token");
  const expiresAt = query.get("expiresAt");
  const navigate = useNavigate();
  const [resetPw, { isLoading }] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      conPassword: "",
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      resetPw({
        credentials: { newPassword: values.password },
        token,
        expiresAt,
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success(res?.data?.message);
          navigate("/reset-success");
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
      <Typography fontSize="40px">Set New Password</Typography>
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
        <Button loading={isLoading} type="submit">
          Done
        </Button>
      </Box>
    </Stack>
  );
};

export default ForgetPassword;

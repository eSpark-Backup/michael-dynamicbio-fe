import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Stack, Typography } from "@mui/material";
import { Button } from "../../../components";
import { useForgotPasswordMutation } from "../../../services/auth";
import { maskEmail, useQuery } from "../../../utils";
import { userAvatar } from "../../../assets";

const SelectEmail = () => {
  const query = useQuery();
  const email = query.get("email");
  const image = query.get("image");
  const navigate = useNavigate();
  const [forgotPw, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = () => {
    forgotPw({ email }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        navigate(`/verify-email?email=${res?.data?.data?.email}&reset=true`);
      }
    });
  };
  return (
    <Stack
      sx={{ width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" } }}
      direction="column"
      alignItems="center"
      justifyItems="flex-start"
    >
      <Typography sx={{ fontSize: { xs: "28px", md: "40px" } }}>
        {"Recognize Your profile"}
      </Typography>
      <Typography sx={{ width: "100%", textalign: "left", marginTop: "48px" }}>
        {
          "By continuing, you'll receive an email containing a link to reset your password."
        }
      </Typography>
      <Stack sx={{ width: "100%", marginTop: "20px" }} gap={2}>
        <Stack
          sx={{ width: "100%", padding: "20px" }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <img
              style={{ width: "73px", height: "73px", borderRadius: "50%" }}
              src={image || userAvatar}
              alt="user"
            />
            <Typography fontSize="24px">{maskEmail(email)}</Typography>
          </Stack>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/find-email"
          >
            <Typography>Not you?</Typography>
          </Link>
        </Stack>
      </Stack>

      <Box sx={{ marginTop: "132px", width: "250px" }}>
        <Button loading={isLoading} onClick={handleSubmit}>
          Continue
        </Button>
      </Box>
      <Typography sx={{ marginTop: "24px", mb: 5 }}>
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

export default SelectEmail;

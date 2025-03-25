import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Button } from "../../../components";
import { useQuery } from "../../../utils";
import { useCompleteProfileMutation } from "../../../services/auth";
import { uploadAvatar, uploadIcon } from "../../../assets";

const UploadImage = () => {
  const query = useQuery();
  const tempData = query.get("data");
  const data = JSON.parse(tempData);
  const tempUser = JSON.parse(localStorage.getItem("temp_user_data"));
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [completeProfile, { isLoading }] = useCompleteProfileMutation();
  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("country", data?.country);
    formdata.append("city", data?.city);
    formdata.append("designation", data?.role);
    formdata.append("industry", data?.industry);
    formdata.append("company", data?.company);
    if (image) {
      formdata.append("image", image);
    }
    completeProfile(formdata).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Your profile completed successfully");
        navigate("/");
        localStorage.removeItem("temp_user_data");
      }
    });
  };

  const fileInputRef = useRef(null);

  const handleImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    <>
      <Typography mt="50px" fontSize={"29px"} textAlign="center">
        Welcome, {tempUser?.firstName}!
      </Typography>
      <Typography fontSize={"17px"} fontWeight={300} textAlign="center">
        Adding your photo helps people recognize you
      </Typography>
      <Stack
        sx={{
          width: { xs: "90%", sm: "70%", md: "60%", lg: "40%" },
          mt: "60px",
        }}
        gap={2}
      >
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
              style={{ borderRadius: "50%" }}
              width={85}
              height={84}
              src={image ? URL.createObjectURL(image) : uploadAvatar}
              alt="user"
            />
            <Box>
              <Typography fontSize="24px">{`${tempUser?.firstName} ${tempUser?.lastName}`}</Typography>
              <Typography fontSize="17px" fontWeight={300}>
                {data?.role} At “{data?.company}”
              </Typography>
              <Typography fontSize="17px" fontWeight={300}>
                {data?.country}
              </Typography>
            </Box>
          </Stack>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <IconButton onClick={handleImage}>
            <img src={uploadIcon} alt="upload" />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ marginTop: "132px", width: "250px", mb: "40px" }}>
        <Button loading={isLoading} onClick={handleSubmit}>
          Continue
        </Button>
      </Box>
    </>
  );
};

export default UploadImage;

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { uploadAvatar, uploadIcon } from "../../../assets";

const UploadImage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const handleSubmit = () => {
    console.log(image, "form submit");
    navigate("/");
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
        Welcome, James!
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
              <Typography fontSize="24px">James Bond</Typography>
              <Typography fontSize="17px" fontWeight={300}>
                Job Title At “Company”
              </Typography>
              <Typography fontSize="17px" fontWeight={300}>
                Area, Country
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
        <Button onClick={handleSubmit}>Continue</Button>
      </Box>
    </>
  );
};

export default UploadImage;

import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { dummyPhoto, emoji, timer } from "../assets";
import Button from "./button";

const ViewArticle = ({
  isLoading,
  onSuccess,
  title,
  setTitle,
  values,
  handleScheduleClick,
}) => {
  const [imgPreview, setImgPreview] = useState(null);

  React.useEffect(() => {
    if (values?.selectedFile) {
      if (typeof values.selectedFile === "string") {
        setImgPreview(values.selectedFile);
      } else {
        const objectUrl = URL.createObjectURL(values.selectedFile);
        setImgPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
  }, [values]);

  return (
    <Box sx={{ mb: "30px" }}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What do you want to talk about?"
        sx={{
          backgroundColor: "transparent",
          border: "1px solid white",
          "& .MuiInputBase-root": {
            padding: 0,
          },
          "& .MuiInputBase-input": {
            color: "black",
            wordBreak: "break-word",
            caretColor: "black",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "black",
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
        multiline
        minRows={3}
        variant="standard"
      />

      <Box
        sx={{
          height: "485px",
          width: "100%",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "0.8rem",
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          marginTop: "15px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            height: "80%",
            backgroundImage: imgPreview
              ? `url(${imgPreview})`
              : `url(${dummyPhoto})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            borderTopRightRadius: "0.8rem",
            borderTopLeftRadius: "0.8rem",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#505050",
              px: "15px",
            }}
          >
            {values?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#505050",
              px: "15px",
              textTransform: "capitalize",
            }}
          >
            {values?.userName}
          </Typography>
        </Box>
      </Box>
      <Stack
        justifyContent={"flex-end"}
        alignItems={"center"}
        px={6}
        direction={"row"}
        gap={3}
        sx={{
          height: "55px",
          borderTop: "1px solid #E4E4E4",
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          bottom: "0px",
          right: "0px",
          zIndex: 999,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
          <img
            src={timer}
            alt="Icon"
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={handleScheduleClick}
          />
          <Button
            loading={isLoading}
            onClick={onSuccess}
            type="submit"
            sx={{ width: "150px", height: "36px", fontSize: "16px" }}
          >
            Post
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ViewArticle;

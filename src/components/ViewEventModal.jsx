import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatEventTime } from "../utils";
import { deleteIcon, dummyPhoto, edit, emoji, timer } from "../assets";
import Button from "./button";

const ViewEventModal = ({
  isLoading,
  onSuccess,
  title,
  setTitle,
  values,
  handleScheduleClick,
  handleEditClick,
  handleDelete
}) => {
  const [imgPreview, setImgPreview] = useState(null);

  React.useEffect(() => {
    if (values?.selectedFile) {
      const objectUrl = URL.createObjectURL(values?.selectedFile);
      setImgPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
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
        sx={{ display: "flex", justifyContent: "flex-end", columnGap: "15px" }}
      >
        <img
          src={edit}
          alt="Icon"
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
          onClick={handleEditClick}
        />
        <img
          src={deleteIcon}
          alt="Icon"
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
          onClick={handleDelete}
        />
      </Box>
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
            backgroundSize: "cover",
            borderTopRightRadius: "0.8rem",
            borderTopLeftRadius: "0.8rem",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgb(0 0 0 / .6)",
              m: "15px 0px 0px 15px",
              borderRadius: "3px",
              p: "10px",
              width: "fit-content",
            }}
          >
            <Typography sx={{ color: "white" }}>
              {formatEventTime(
                values?.startDate,
                values?.startTime,
                values?.showEndTime ? values?.endDate : null,
                values?.showEndTime ? values?.endTime : null
              )}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "500",
              color: "#171717",
              px: "15px",
            }}
          >
            {formatEventTime(
              values?.startDate,
              values?.startTime,
              values?.showEndTime ? values?.endDate : null,
              values?.showEndTime ? values?.endTime : null
            )}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#505050",
              px: "15px",
            }}
          >
            {values?.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#505050",
              px: "15px",
            }}
          >
            {values?.format === "ExternalEventLink"
              ? "Event By Abdul Rehman"
              : "LinkedIn Live"}
          </Typography>
        </Box>
      </Box>
      {/* <img
        src={emoji}
        alt="Icon"
        style={{ width: "24px", height: "24px", marginBottom: "15px" }}
      /> */}
      <Stack
        justifyContent={"space-between"}
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
            disabled={isLoading}
            onClick={onSuccess}
            type="submit"
            sx={{
              maxWidth: "150px",
              height: "36px",
              fontSize: "16px",
              minWidth: { md: "150px" },
            }}
          >
            Next
          </Button>
        </Box>
        <Box
          sx={{
            width: "150px",
            height: "36px",
            borderRadius: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "8px",
              padding: "1px",
              background:
                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
              mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
              WebkitMask:
                "linear-gradient(white, white) content-box, linear-gradient(white, white)",
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
            },
            cursor: "pointer",
          }}
        >
          <Typography variant="gradientText">Use AI</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ViewEventModal;

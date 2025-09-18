import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { comment, commentOff } from "../assets";
import Button from "./button";

const CommentsControlModal = ({ handleClose }) => {
  const [choice, setChoice] = useState("on");
  return (
    <Box sx={{ mt: "30px" }}>
      <RadioGroup
        name="control"
        value={choice}
        sx={{
          width: "100%",
          px: "0px",
          marginRight: "0px !important",
          display: "flex",
          flexDirection: "column",
          rowGap: "25px",
          mb: "30px",
        }}
        onChange={(e) => setChoice(e.target.value)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#ededed",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={comment} alt="Icon" />
            </Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
            >
              On
            </Typography>
          </Stack>
          <FormControlLabel
            value="on"
            control={<Radio sx={{ marginRight: "0px !important" }} />}
            sx={{ marginRight: "0px !important" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#ededed",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={commentOff} alt="Icon" />
            </Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
            >
              Off
            </Typography>
          </Stack>
          <FormControlLabel
            value="off"
            control={<Radio sx={{ marginRight: "0px !important" }} />}
            sx={{ marginRight: "0px !important" }}
          />
        </Box>
      </RadioGroup>
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
          onClick={handleClose}
        >
          <Typography variant="gradientText">Back</Typography>
        </Box>
        <Button
          disabled={choice === "on"}
          type="submit"
          sx={{
            maxWidth: "150px",
            height: "36px",
            fontSize: "16px",
            minWidth: { md: "150px" },
          }}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default CommentsControlModal;

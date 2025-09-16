import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { dummyPhoto, user } from "../assets";

const PostChoiceModal = () => {
  return (
    <Box sx={{ mt: "20px" }}>
      <RadioGroup
        name="choice"
        defaultValue="user"
        sx={{
          width: "100%",
          px: "0px",
          marginRight: "0px !important",
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          mb: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <img src={user} alt="Avatar" />
            <Typography
              sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
            >
              rotten ria
            </Typography>
          </Box>
          <FormControlLabel
            value="user"
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
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <img
              src={dummyPhoto}
              alt="Avatar"
              style={{ width: "75px", height: "70px" }}
            />
            <Typography
              sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
            >
              RottenRia
            </Typography>
          </Box>
          <FormControlLabel
            value="page"
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
        <Button
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

export default PostChoiceModal;

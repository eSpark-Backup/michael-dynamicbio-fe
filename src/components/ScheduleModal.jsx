import { Box, Typography } from "@mui/material";
import React from "react";
import OutlinedInput from "./outline-input";
import { gradientRightArrow } from "../assets";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ScheduleModal = ({
  scheduleDate,
  setScheduleDate,
  scheduleTime,
  setScheduleTime,
}) => {
  return (
    <Box
      sx={{
        p: "40px 10px 0px 10px",
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
      }}
    >
      <Typography
        sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
      >
        {/* Tue, Feb 25, 6:25 PM Pakuistan Standard Time, based on your location */}
        {new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        ,{" "}
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        , {Intl.DateTimeFormat().resolvedOptions().timeZone},{" "}
        {"based on your location"}
      </Typography>
      <Box
        sx={{
          width: { xs: "100%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "3px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              Date
            </Typography>
            <DatePicker
              value={scheduleDate}
              onChange={(date) => setScheduleDate(date)}
              minDate={new Date()}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              Time
            </Typography>
            <TimePicker
              slotProps={{
                desktopPaper: {
                  sx: {
                    p: 0,
                    button: { height: "40px" },
                  },
                },
              }}
              value={scheduleTime}
              onChange={(time) => setScheduleTime(time)}
            />
          </Box>
        </LocalizationProvider>
      </Box>

      <Box
        sx={{
          paddingTop: "20px",
          display: "flex",
          columnGap: "10px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          variant="gradientText"
          sx={{ fontSize: "14px", fontWeight: "400" }}
        >
          View all scheduled post
        </Typography>
        <img
          src={gradientRightArrow}
          alt="Icon"
          style={{ width: "24px", height: "24px" }}
        />
      </Box>
    </Box>
  );
};

export default ScheduleModal;

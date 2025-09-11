import { Box, Typography } from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
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
              value={scheduleTime}
              onChange={(time) => setScheduleTime(time)}
            />
          </Box>
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default ScheduleModal;

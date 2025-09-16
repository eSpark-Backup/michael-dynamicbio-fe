import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import OutlinedInput from "./outline-input";
import { searchIcon } from "../assets";
import { groupAdminsData, groupBlockedData } from "../constant";
import GroupMemberCard from "./GroupMemberCard";

const GroupBlocked = () => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
          >
            Blocked
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
          >
            •
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
          >
            1 person
          </Typography>
        </Stack>
        <Box sx={{ width: "35%" }}>
          <OutlinedInput
            placeholder={"Search blocked"}
            startAdornment={searchIcon}
            sx={{
              height: "42px",
              width: "100%",
              backgroundColor: "#FCFCFC",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                border: "1px solid #E4E4E4",
                height: "100%",
                backgroundColor: "#FCFCFC",
                borderRadius: "4px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #E4E4E4",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {groupBlockedData?.map((item, index) => {
          return (
            <GroupMemberCard
              mainType={"blocked"}
              name={item?.name}
              role={item?.role}
              groupRole={item?.groupRole}
              key={index}
              madeBy={item?.madeBy}
            />
          );
        })}
      </Box>
    </Paper>
  );
};

export default GroupBlocked;

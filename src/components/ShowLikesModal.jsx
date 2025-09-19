import { Avatar, Box, Stack, Typography } from "@mui/material";
import { like, user } from "../assets";
import { toTitleCase } from "../utils";

const ShowLikesModal = ({ allLikes }) => {
  return (
    <Box
      sx={{
        mt: "20px",
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
      }}
    >
      {allLikes?.map((item, index) => {
        return (
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={"8px"}
            key={index}
          >
            <Box sx={{ width: "55px", height: "55px", position: "relative" }}>
              <Avatar
                src={item?.profileImage ? item?.profileImage : user}
                alt="user"
                sx={{ width: "100%", height: "100%" }}
              />
              <img
                src={like}
                alt="Icon"
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  width: "15px",
                  height: "15px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
              >{`${toTitleCase(item?.firstName)} ${toTitleCase(item?.lastName)}`}</Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
              >
                {toTitleCase(item?.designation)}
              </Typography>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
};

export default ShowLikesModal;

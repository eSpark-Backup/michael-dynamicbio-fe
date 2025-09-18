import { Box, Divider, Stack, Typography } from "@mui/material";
import Button from "./button";
import dayjs from "dayjs";
import { toCapitalized } from "../utils";

const AboutGroupModal = ({ data, onSuccess }) => {
  return (
    <Box>
      <Box
        sx={{ mt: "30px", maxHeight: "450px", overflowY: "auto", pb: "30px" }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: "500", color: "#171717" }}
        >
          Description
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#505050",
            mt: "10px",
          }}
        >
          {data?.description}
        </Typography>
        <Divider sx={{ mt: "15px" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "15px",
            mt: "15px",
          }}
        >
          <Typography
            sx={{ fontSize: "22px", fontWeight: "500", color: "#171717" }}
          >
            Details
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
            >
              {toCapitalized(data?.status)}
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              {data?.status === "PUBLIC"
                ? "Anyone on or off Fusion can see posts in the group. Only group members can add comment and create posts."
                : "Only members can see posts."}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
            >
              {data?.requirePostApproval
                ? "Posts require approval"
                : "Posts do not require approval"}
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              {data?.requirePostApproval
                ? "posts require admin approval before they become visible to others."
                : "Member's can directly post to the group"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
            >
              Industry
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              {toCapitalized(data?.industry)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
            >
              Location
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              {data?.address}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
            >
              Created
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              {data?.createdAt && dayjs(data?.createdAt).format("MMM YYYY")}
            </Typography>
          </Box>
          <Divider />
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
        <Button
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
      </Stack>
    </Box>
  );
};

export default AboutGroupModal;

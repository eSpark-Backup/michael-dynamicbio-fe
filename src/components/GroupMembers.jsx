import {
  Avatar,
  Badge,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OutlinedInput from "./outline-input";
import { searchIcon, three_vertical_dots, user } from "../assets";
import GroupMemberCard from "./GroupMemberCard";

const GroupMembers = ({ data, refetch }) => {
  const [members, setMembers] = useState(data?.followers || []);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!data?.followers || !data?.admins) return;

    const adminIds = new Set(data.admins.map(({ admin }) => admin.id));

    const enrichedFollowers = data.followers.map((follower) => ({
      ...follower,
      isAdmin: adminIds.has(follower.id),
    }));

    if (search === "") {
      setMembers(enrichedFollowers);
    } else {
      const query = search.toLowerCase().trim();

      const filtered = enrichedFollowers.filter((item) => {
        const fullName = `${item?.firstName ?? ""} ${item?.lastName ?? ""}`
          .toLowerCase()
          .trim();
        return fullName.includes(query);
      });

      setMembers(filtered);
    }
  }, [search, data?.followers, data?.admins]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
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
              Members
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
            >
              •
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
            >
              {data?.followerCount} people
            </Typography>
          </Stack>
          <Box sx={{ width: "35%" }}>
            <OutlinedInput
              value={search}
              onInputChange={(e) => setSearch(e.target.value)}
              placeholder={"Search group members"}
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
          {members?.length > 0 ? (
            members?.map((item, index) => {
              return (
                <GroupMemberCard
                  refetch={refetch}
                  groupId={data?.id}
                  id={item?.id}
                  profile={item?.profileImage}
                  mainType={"members"}
                  name={`${item?.firstName} ${item?.lastName}`}
                  role={item?.designation}
                  groupRole={item?.isAdmin ? "admin" : "member"}
                  key={index}
                />
              );
            })
          ) : (
            <Typography textAlign="center">No members</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default GroupMembers;

import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OutlinedInput from "./outline-input";
import { searchIcon } from "../assets";
import GroupMemberCard from "./GroupMemberCard";
import { groupAdminsData, groupMembersData } from "../constant";

const GroupAdmins = ({ data, refetch }) => {
  const [admins, setAdmins] = useState(data?.admins || []);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      setAdmins(data?.admins || []);
    } else {
      const query = search.toLowerCase().trim();

      const filtered = data?.admins?.filter((item) => {
        const fullName = `${item?.admin?.firstName ?? ""} ${item?.admin?.lastName ?? ""}`
          .toLowerCase()
          .trim();
        return fullName.includes(query);
      });

      setAdmins(filtered);
    }
  }, [search, data?.admins]);

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
            Admins
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
          >
            •
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
          >
            {data?.admins?.length || 0} people
          </Typography>
        </Stack>
        <Box sx={{ width: "35%" }}>
          <OutlinedInput
            value={search}
            onInputChange={(e) => setSearch(e.target.value)}
            placeholder={"Search group admins"}
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
        {admins?.map(({ admin: item, createdBy }, index) => {
          return (
            <GroupMemberCard
              groupId={data?.id}
              id={item?.id}
              profile={item?.profileImage}
              mainType={"admins"}
              name={`${item?.firstName} ${item?.lastName}`}
              role={item?.designation}
              groupRole={item?.id === data?.creatorId ? "owner" : "admin"}
              key={index}
              refetch={refetch}
              madeBy={`${createdBy?.firstName} ${createdBy?.lastName}`}
            />
          );
        })}
      </Box>
    </Paper>
  );
};

export default GroupAdmins;

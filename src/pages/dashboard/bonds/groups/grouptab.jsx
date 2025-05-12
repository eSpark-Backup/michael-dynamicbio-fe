import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { PageCard } from "../../../../components";
import CreateGroupModal from "./createGroup";
import { plus } from "../../../../assets";

const GroupsTab = ({ accounts, type }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ width: "100%" }}>
      {accounts?.length > 0 ? (
        <Stack
          sx={{ width: "100%", maxHeight: "420px", overflow: "auto" }}
          mt={2}
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
        >
          {accounts.map((group) => (
            <PageCard type={type} key={group.id} {...group} />
          ))}
        </Stack>
      ) : (
        <Typography>
          {type === "my-groups"
            ? "You  don’t have any group "
            : "You  didn't join any group "}
        </Typography>
      )}
      <Stack
        mt={5}
        sx={{ width: "100%" }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          sx={{ cursor: "pointer" }}
          onClick={type === "my-groups" ? () => setOpen(true) : () => {}}
          gap={1}
          alignItems="center"
          justifyContent="center"
        >
          <img width={52} height={52} src={plus} alt="add" />
          <Typography>
            {type === "my-groups" ? "Create Group" : "Discover Groups"}
          </Typography>{" "}
        </Stack>
      </Stack>
      <CreateGroupModal open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default GroupsTab;

import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { PageCard } from "../../../../components";
import CreateGroupModal from "./createGroup";
import { plus } from "../../../../assets";

const GroupsTab = ({
  isDeleteLoading,
  handleDelete,
  isFollowLoading,
  handleFollow,
  allGroups,
  accounts,
  type,
}) => {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [suggestedGroups, setSuggestedGroups] = useState(
    showAll ? allGroups : allGroups?.slice(0, 4)
  );

  useEffect(() => {
    setSuggestedGroups(showAll ? allGroups : allGroups?.slice(0, 4));
  }, [showAll, allGroups]);
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
            <PageCard
              mainType={"group"}
              isFollowLoading={isFollowLoading}
              handleFollow={handleFollow}
              isDeleteLoading={isDeleteLoading}
              handleDelete={handleDelete}
              type={type}
              key={group.id}
              {...group}
            />
          ))}
        </Stack>
      ) : (
        <Typography>
          {type === "my-groups"
            ? "You  don’t have any group "
            : "You  didn't join any group "}
        </Typography>
      )}
      {type === "my-groups" && (
        <Stack
          mt={5}
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            sx={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <img width={52} height={52} src={plus} alt="add" />
            <Typography>Create Group</Typography>{" "}
          </Stack>
        </Stack>
      )}
      {suggestedGroups?.length > 0 && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            mt={2}
          >
            <Typography fontSize="14px">
              Groups you might be interested in
            </Typography>
            {allGroups?.length > 4 && (
              <Typography
                onClick={() => setShowAll(!showAll)}
                fontSize="14px"
                variant="gradientText"
                sx={{
                  cursor: "pointer",
                }}
              >
                {showAll ? "View less" : "View all"}
              </Typography>
            )}
          </Stack>
          <Stack
            sx={{ width: "100%", maxHeight: "420px", overflow: "auto" }}
            mt={2}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            gap={2}
          >
            {suggestedGroups.map((group) => (
              <PageCard
                mainType={"group"}
                isFollowLoading={isFollowLoading}
                handleFollow={handleFollow}
                type={"all-groups"}
                key={group.id}
                {...group}
              />
            ))}
          </Stack>
        </>
      )}
      <CreateGroupModal open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default GroupsTab;

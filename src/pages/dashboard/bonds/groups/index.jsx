import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import GroupsTab from "./grouptab";
import {
  useDeleteGroupMutation,
  useFollowGroupMutation,
  useGetAllGroupsQuery,
  useGetFollowedGroupsQuery,
  useGetMyGroupsQuery,
} from "../../../../services/group";
import { useQuery } from "../../../../utils";

const Groups = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: myGroupsData,
    isLoading: isMyGroupsLoading,
    isError: isMyGroupsError,
    error: myGroupsError,
    refetch: myGroupsRefetch,
    isFetching: isMyGroupsFetcing,
  } = useGetMyGroupsQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: allGroupsData,
    isLoading: isAllGroupsLoading,
    isError: isAllGroupsError,
    error: allGroupsError,
    refetch: allGroupsRefetch,
    isFetching: isAllGroupsFetcing,
  } = useGetAllGroupsQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: followedGroupsData,
    isLoading: isFollowedGroupsLoading,
    isError: isFollowedGroupsError,
    error: followedGroupsError,
    refetch: followedGroupsRefetch,
    isFetching: isFollowedGroupsFetcing,
  } = useGetFollowedGroupsQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const [deleteGroup, { isLoading: isDeleteLoading }] =
    useDeleteGroupMutation();

  const handleDelete = (id) => {
    deleteGroup(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        myGroupsRefetch();
      }
    });
  };

  const [follow, { isLoading: isFollowLoading }] = useFollowGroupMutation();

  const handleFollow = (id) => {
    follow(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        allGroupsRefetch();
        followedGroupsRefetch();
      }
    });
  };

  useEffect(() => {
    if (isMyGroupsError) toast.error(myGroupsError?.data?.message);
    if (isAllGroupsError) toast.error(allGroupsError?.data?.message);
    if (isFollowedGroupsError) toast.error(followedGroupsError?.data?.message);
  }, [isMyGroupsError, isAllGroupsError, isFollowedGroupsError]);

  const tabs = useMemo(() => {
    const myGroups = myGroupsData?.data?.groups || [];
    const allGroups = allGroupsData?.data?.pages || [];
    const filteredGroups = allGroups?.filter(
      (item) => item?.creatorId !== user?.id
    );
    const followedGroups = followedGroupsData?.data?.groups || [];

    return [
      {
        label: "Your Groups",
        component: (
          <GroupsTab
            isFollowLoading={isFollowLoading}
            handleFollow={handleFollow}
            handleDelete={handleDelete}
            isDeleteLoading={isDeleteLoading}
            allGroups={filteredGroups}
            accounts={myGroups}
            type="my-groups"
          />
        ),
      },
      {
        label: "Joined",
        component: (
          <GroupsTab
            isFollowLoading={isFollowLoading}
            handleFollow={handleFollow}
            accounts={followedGroups}
            type="joined-groups"
          />
        ),
      },
    ];
  }, [myGroupsData, allGroupsData, followedGroupsData]);
  const query = useQuery();
  const isJoined = query.get("joined")
  const [activeTabLabel, setActiveTabLabel] = useState(isJoined ? "Joined" : "Your Groups");

  const activeTab = tabs.find((tab) => tab.label === activeTabLabel);

  if (
    isMyGroupsLoading ||
    isMyGroupsFetcing ||
    isAllGroupsLoading ||
    isAllGroupsFetcing ||
    isFollowedGroupsLoading ||
    isFollowedGroupsFetcing
  ) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Box>
    );
  }

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={5}
        sx={{
          background: "#FFF",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
          padding: "18px 30px",
        }}
      >
        {tabs.map((tab) => (
          <Typography
            sx={{
              cursor: "pointer",
              position: "relative",
              background:
                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color":
                tab?.label === activeTab?.label ? "transparent" : "#000",
            }}
            fontSize="14px"
            fontWeight={500}
            onClick={() => setActiveTabLabel(tab?.label)}
            key={tab.label}
          >
            {tab.label}
          </Typography>
        ))}
      </Stack>
      {activeTab?.component}
    </>
  );
};

export default Groups;

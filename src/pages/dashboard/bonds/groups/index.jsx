import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import GroupsTab from "./grouptab";
import { groupsData } from "../../../../constant";
import { useGetMyGroupsQuery } from "../../../../services/group";

const Groups = () => {
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

  useEffect(() => {
    if (isMyGroupsError) toast.error(myGroupsError?.data?.message);
  }, [isMyGroupsError]);

  const tabs = useMemo(() => {
    const myGroups = myGroupsData?.data?.groups || [];
    return [
      {
        label: "Your Groups",
        component: <GroupsTab accounts={myGroups} type="my-groups" />,
      },
      {
        label: "Joined",
        component: <GroupsTab accounts={groupsData} type="joined-groups" />,
      },
    ];
  }, [myGroupsData]);
    const [activeTabLabel, setActiveTabLabel] = useState("Your Groups");

  const activeTab = tabs.find((tab) => tab.label === activeTabLabel);

  if (isMyGroupsLoading || isMyGroupsFetcing) {
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

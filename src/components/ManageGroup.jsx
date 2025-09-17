import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import GroupMembership from "./GroupMembership";
import GroupContentSection from "./GroupContentSection";
import { useGetGroupDetailQuery } from "../services/group";
import { dummyPhoto } from "../assets";

const ManageGroup = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetGroupDetailQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  const { user } = useSelector((state) => state.auth);
  const isMyGroup = data?.data?.creatorId === user?.id;

  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  useEffect(() => {
    if (data?.data?.isAdmin === false && isMyGroup === false) {
      navigate(-1);
    }
  }, [data]);

  const tabs = useMemo(() => {
    return [
      {
        label: "Membership",
        component: <GroupMembership data={data?.data} refetch={refetch} />,
      },
      {
        label: "Content",
        component: <GroupContentSection />,
      },
    ];
  }, [data]);

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTabLabel, setActiveTabLabel] = useState(
    tabParam || "Membership"
  );
  const activeTab = tabs.find((tab) => tab.label === activeTabLabel);

  useEffect(() => {
    if (tabParam && tabParam !== activeTabLabel) {
      setActiveTabLabel(tabParam);
    }
  }, [tabParam]);

  if (isLoading || isFetching) {
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
      <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
        <Box
          sx={{
            borderBottom: "1px solid #E4E4E4",
            borderTop: "1px solid #E4E4E4",
            p: "0px 25px",
            display: "flex",
            alignItems: "center",
            columnGap: "20px",
          }}
        >
          <img
            src={data?.data?.logoUrl || dummyPhoto}
            alt="Image"
            style={{ width: "45px", height: "45px" }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              textWrap: "wrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textTransform: "capitalize",
            }}
            variant="gradientText"
          >
            {data?.data?.name}
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
        >
          Management Group
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={5}
          sx={{
            background: "#FFF",
            borderRadius: "4px",
            padding: "18px 30px 0px 0px",
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
                textAlign: "center",
                "&::after": {
                  content: '""',
                  display: tab?.label === activeTab?.label ? "block" : "none",
                  width: { xs: "45px", md: "90px" },
                  height: "4px",
                  background:
                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                  position: "absolute",
                  bottom: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "2px",
                },
              }}
              fontSize={{ xs: "12px", md: "14px" }}
              fontWeight={500}
              onClick={() => {
                setActiveTabLabel(tab.label);
                setSearchParams({ tab: tab.label });
              }}
              key={tab.label}
            >
              {tab.label}
            </Typography>
          ))}
        </Stack>
      </Paper>
      {activeTab?.component}
    </>
  );
};

export default ManageGroup;

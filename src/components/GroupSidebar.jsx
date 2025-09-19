import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { relatedGroups } from "../constant";
import InviteMembersModal from "./InviteMembersModal";
import DynamicModal from "./dynamic-modal";
import {
  useFollowGroupMutation,
  useGetAllGroupsQuery,
} from "../services/group";
import { dummyPhoto, rightArrow, user } from "../assets";
import { toTitleCase } from "../utils";

const GroupSidebar = ({ data }) => {
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [followId, setFollowId] = useState(null);
  const [groups, setGroups] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const { user: userData } = useSelector((state) => state.auth);
  const {
    data: allGroupsData,
    isLoading: isAllGroupsLoading,
    isError: isAllGroupsError,
    error: allGroupsError,
  } = useGetAllGroupsQuery("", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const allGroups = allGroupsData?.data?.pages || [];
    const filteredGroups = allGroups?.filter(
      (item) =>
        item?.creatorId !== userData?.id &&
        !item?.requestSent &&
        item?.id !== id
    );
    setGroups(filteredGroups || []);
  }, [allGroupsData]);

  useEffect(() => {
    if (isAllGroupsError) toast.error(allGroupsError?.data?.message);
  }, [isAllGroupsError]);

  const [follow, { isLoading: isFollowLoading }] = useFollowGroupMutation();

  const handleFollow = (id) => {
    follow(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        setGroups((prev) => prev.filter((item) => item?.id !== id));
        setFollowId(null);
      }
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <Paper sx={{ p: "0px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#171717",
            p: "25px",
          }}
        >
          {data?.followerCount} member
        </Typography>
        {data?.followers?.length > 0
          ? data?.followers?.slice(0, 4)?.map((item) => (
              <Stack
                key={item?.id}
                mb={2}
                direction="row"
                gap={2}
                alignItems="center"
              >
                <Avatar
                  src={item?.profileImage || user}
                  alt="User"
                  sx={{ width: 40, height: 40, objectFit: "fill", ml: "25px" }}
                />
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}
                >{`${toTitleCase(item?.firstName)} ${toTitleCase(item?.lastName)}`}</Typography>
              </Stack>
            ))
          : null}
        {data?.followers?.length > 0 && data?.isAdmin && (
          <Box
            sx={{
              height: "60px",
              borderTop: "1px solid #E5E5E5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              columnGap: "10px",
            }}
            onClick={() => navigate(`/group/${id}/manage`)}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
            >
              Show All
            </Typography>
            <img src={rightArrow} alt="" />
          </Box>
        )}
      </Paper>
      <Paper>
        <Typography
          sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
        >
          Admins
        </Typography>
        {data?.admins?.length > 0
          ? data?.admins?.map(({ admin: item }) => (
              <Box
                key={toTitleCase(item?.firstName)}
                sx={{ display: "flex", columnGap: "10px", marginY: "10px" }}
              >
                <Avatar alt="Travis Howard" src={item?.profileImage || user} />
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#171717",
                      }}
                    >
                      {`${toTitleCase(item?.firstName)} ${toTitleCase(item?.lastName)}`}
                    </Typography>
                  </Box>
                  {item?.id === userData?.id && (
                    <>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#505050",
                        }}
                      >
                        •
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#505050",
                        }}
                      >
                        You
                      </Typography>
                    </>
                  )}
                  {data?.creatorId === item?.id && (
                    <Box sx={{ p: "5px 15px", backgroundColor: "#d3d3d3" }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#171717",
                        }}
                      >
                        Owner
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            ))
          : null}
      </Paper>
      {isAllGroupsLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#1877F2" }} />
        </Box>
      ) : groups?.length > 0 ? (
        <Paper sx={{ p: "15px 0px 0px 0px" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#171717",
              pl: "15px",
            }}
          >
            Groups you might be interested in
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {groups?.slice(0, 5)?.map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "10px",
                    pb: "15px",
                    borderBottom:
                      index === relatedGroups?.length - 1
                        ? "none"
                        : "1px solid #E4E4E4",
                    mt: "20px",
                    width: "90%",
                  }}
                  key={index + 99}
                >
                  <img
                    src={item?.logoUrl || dummyPhoto}
                    alt="Image"
                    style={{ width: "40px", height: "40px", objectFit: "fill" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "2px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      onClick={() => navigate(`/group/${item?.id}`)}
                      sx={{
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#171717",
                        textWrap: "wrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        width: "calc(100% - 50px)",
                        textTransform: "capitalize",
                      }}
                    >
                      {toTitleCase(item?.name)}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#505050",
                      }}
                    >
                      {item?.followerCount}
                    </Typography>
                    <Box
                      onClick={() => {
                        if (!isFollowLoading) {
                          setFollowId(item?.id);
                          handleFollow(item?.id);
                        }
                      }}
                      sx={{
                        border: "1px solid black",
                        p: "8px 15px",
                        borderRadius: "12px",
                        width: "fit-content",
                        mt: "10px",
                        cursor: "pointer",
                      }}
                    >
                      {followId === item?.id && isFollowLoading
                        ? "loading..."
                        : "Join"}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            onClick={() => navigate("/bonds?sub=group")}
            sx={{
              height: "55px",
              borderTop: "1px solid #E5E5E5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              columnGap: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
            >
              Show All
            </Typography>
            <img src={rightArrow} alt="" />
          </Box>
        </Paper>
      ) : null}

      <DynamicModal
        open={showConnectionsModal}
        handleClose={() => setShowConnectionsModal(false)}
        title={"Invite connections"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <InviteMembersModal
          handleClose={() => setShowConnectionsModal(false)}
        />
      </DynamicModal>
    </Box>
  );
};

export default GroupSidebar;

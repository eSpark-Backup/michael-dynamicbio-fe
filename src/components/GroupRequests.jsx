import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  useGetGroupJoinReqQuery,
  useUpdateGroupJoinReqMutation,
} from "../services/group";
import { noPosts } from "../assets";

const GroupRequests = ({ data, refetch }) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState({
    id: null,
    action: null,
  });
  const navigate = useNavigate();
  const {
    data: reqData,
    isLoading,
    isError,
    error,
    refetch: refetchReq,
    isFetching,
  } = useGetGroupJoinReqQuery(data?.id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  const [update] = useUpdateGroupJoinReqMutation();

  const handleUpdateRequest = (id, action) => {
    setIsUpdateLoading({ id, action });
    const body = {
      id,
      credentials: {
        action,
      },
    };
    update(body).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        setIsUpdateLoading({ id: null, action: null });
        toast.success(res?.data?.message);
        refetch();
        refetchReq();
      }
    });
  };

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
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      {/* <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction={"column"}>
                    <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Automatic member approval</Typography>
                        <Box sx={{ background: "#d3d3d3", p: "5px 10px", borderRadius: "4px" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Off</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Select members who can join this group without admin approval. <span style={{ fontSize: "14px", fontWeight: "600", color: "#505050" }}>Learn more</span></Typography>
                </Stack>
                <Box sx={{ p: "6px 15px", border: "1px solid black", borderRadius: "21px", position: "relative" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Set up</Typography>
                    <Box
                        sx={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "purple",
                            borderRadius: "4px",
                            transform: "rotate(45deg)",
                            position: "absolute",
                            right: "-5px",
                            top: "-3px"
                        }}
                    />


                </Box>
            </Paper> */}

      {reqData?.data?.pendingRequests?.length > 0 ? (
        <Paper>
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
                Requests
              </Typography>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
              >
                •
              </Typography>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
              >
                {reqData?.data?.pendingRequests?.length} people
              </Typography>
            </Stack>
          </Box>
          {reqData?.data?.pendingRequests.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #DDE2E4",
                background: "#F2F8FD",
                borderRadius: "4px",
                padding: "10px 26px 10px 22px",
                mt: 2,
                mb: 1,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1.5}
              >
                <img
                  width={73}
                  height={73}
                  style={{ borderRadius: "50%" }}
                  src={item?.user?.profileImage || userAvatar}
                  alt="profile"
                />
                <Box>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight={300}
                  >
                    {`${item?.user?.firstName} ${item?.user?.lastName}`}
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {`${item?.user?.designation} at “${item?.user?.company}” `}
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {`${item?.user?.city}, ${item?.user?.country}`}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1.5}
              >
                <Button
                  loading={
                    isUpdateLoading?.id === item?.id &&
                    isUpdateLoading?.action === "accept"
                  }
                  disabled={
                    isUpdateLoading?.id === item?.id &&
                    isUpdateLoading?.action === "accept"
                  }
                  onClick={() => handleUpdateRequest(item?.id, "accept")}
                  sx={{ width: "200px", height: "45px" }}
                >
                  Accept
                </Button>
                <Button
                  loading={
                    isUpdateLoading?.id === item?.id &&
                    isUpdateLoading?.action === "reject"
                  }
                  disabled={
                    isUpdateLoading?.id === item?.id &&
                    isUpdateLoading?.action === "reject"
                  }
                  onClick={() => handleUpdateRequest(item?.id, "reject")}
                  sx={{ width: "200px", height: "45px" }}
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          ))}
        </Paper>
      ) : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={noPosts} alt="" />
          <Typography
            sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
          >
            No requests to review
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#505050",
              textAlign: "center",
            }}
          >
            Nice job! Check back later for new requests <br />
            to join your group.
          </Typography>
          <Box
            onClick={() => navigate(`/group/${data?.id}`)}
            sx={{
              width: "150px",
              height: "36px",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                padding: "1px",
                background:
                  "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMask:
                  "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
              },
              cursor: "pointer",
            }}
          >
            <Typography variant="gradientText">View group posts</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default GroupRequests;

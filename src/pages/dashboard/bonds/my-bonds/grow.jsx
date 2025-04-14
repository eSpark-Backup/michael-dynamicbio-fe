import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { BondCard } from "../../../../components";
import {
  useAllBondsQuery,
  useAllBondsReqQuery,
  useSendBondReqMutation,
  useUpdateBondReqMutation,
} from "../../../../services/bonds";
import {
  addBond,
  deleteBond,
  userAvatar,
  verticleDots,
} from "../../../../assets";
import { eventBus } from "../../../../utils";

const Grow = () => {
  const [sent, setSent] = useState(null);
  const [sendReq, { isLoading: isReqLoading }] = useSendBondReqMutation();
  const [updateReq, { isLoading: isUpdateReqLoading }] =
    useUpdateBondReqMutation();
  const { data, isLoading, error, isError } = useAllBondsQuery({
    page: 1,
    pageSize: 100,
  });
  const {
    data: reqData,
    isLoading: reqLoading,
    isFetching,
    error: reqError,
    isError: reqIsError,
    refetch,
  } = useAllBondsReqQuery(sent ? "sent" : "received");
  const requests = reqData?.data?.bonds;

  const [id, setId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [users, setUsers] = useState(data?.data?.users || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [displayedBonds, setDisplayedBonds] = useState(
    showAll ? data?.data?.users : data?.data?.users?.slice(0, 4)
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  useEffect(() => {
    if (users?.length > 0) {
      setDisplayedBonds(showAll ? users : users?.slice(0, 4));
    } else {
      setDisplayedBonds(
        showAll ? data?.data?.users : data?.data?.users?.slice(0, 4)
      );
      setUsers(data?.data?.users);
    }
  }, [showAll, data]);

  useEffect(() => {
    if (error && isError) {
      toast.error("Something went wrong!");
      return;
    }
    if (reqError && reqIsError) {
      toast.error("Something went wrong!");
      return;
    }
  }, [error, isError, reqError, reqIsError]);

  const handleRemoveUser = (id) => {
    const filteredUsers = users?.filter((item) => item.id !== id);
    setUsers(filteredUsers);
    setDisplayedBonds(showAll ? filteredUsers : filteredUsers?.slice(0, 4));
  };

  const handleSendBondReq = (id) => {
    setId(id);
    const bodyToSend = {
      recipientId: id,
    };
    sendReq(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        setId(null);
        return;
      }
      if (res) {
        toast.success("Your Request sent successfully");
        refetch();
        setId(null);
      }
    });
  };

  const handleBond = (id, type) => {
    const bodyToSend = {
      bondId: id,
      action: type,
    };
    updateReq(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        refetch();
      }
    });
  };

  useEffect(() => {
    const handleRefetch = () => {
      refetch();
    };

    eventBus.on("refetchBondData", handleRefetch);

    return () => {
      eventBus.off("refetchBondData", handleRefetch);
    };
  }, []);

  return (
    <Box>
      <Box
        sx={{
          padding: "23px 32px",
          background: "#fff",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {isUpdateReqLoading || reqLoading || isFetching ? (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <CircularProgress sx={{ color: "#1877F2" }} />
          </Stack>
        ) : (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize="14px">
                {sent
                  ? requests?.length > 0
                    ? `Your sent request${requests?.length > 1 ? "s" : ""}`
                    : "You didn't send any request"
                  : requests?.length > 0
                  ? `You have new bonding request${
                      requests?.length > 1 ? "s" : ""
                    }`
                  : "You  don’t have any bonding request"}
              </Typography>
              <img onClick={handleClick} src={verticleDots} alt="dots" />
            </Stack>
            {requests?.length > 0 &&
              requests.map((item) => (
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
                      src={
                        sent
                          ? item?.recipient?.profileImage
                          : item?.requester?.profileImage || userAvatar
                      }
                      alt="profile"
                    />
                    <Box>
                      <Typography
                        sx={{ cursor: "pointer" }}
                        fontSize="17px"
                        fontWeight={300}
                      >
                        {`${
                          sent
                            ? item?.recipient?.firstName
                            : item?.requester?.firstName
                        } ${
                          sent
                            ? item?.recipient?.lastName
                            : item?.requester?.lastName
                        }`}
                      </Typography>
                      <Typography
                        sx={{ color: "#505050" }}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        {`${
                          sent
                            ? item?.recipient?.designation
                            : item?.requester?.designation
                        } at “${
                          sent
                            ? item?.recipient?.company
                            : item?.requester?.company
                        }” `}
                      </Typography>
                      <Typography
                        sx={{ color: "#505050" }}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        {`${
                          sent ? item?.recipient?.city : item?.requester?.city
                        }, ${
                          sent
                            ? item?.recipient?.country
                            : item?.requester?.country
                        }`}
                      </Typography>
                    </Box>
                  </Stack>
                  {sent ? (
                    <Typography
                      onClick={() => handleBond(item?.id, "canceled")}
                      fontSize="14px"
                      sx={{
                        cursor: "pointer",
                        background:
                          "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                        "-webkit-background-clip": "text",
                        "-webkit-text-fill-color": "transparent",
                      }}
                    >
                      Withdraw
                    </Typography>
                  ) : (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      gap={1.5}
                    >
                      <img
                        onClick={() => handleBond(item?.id, "rejected")}
                        style={{ cursor: "pointer" }}
                        src={deleteBond}
                        alt="trash"
                      />
                      <img
                        onClick={() => handleBond(item?.id, "accepted")}
                        style={{ cursor: "pointer" }}
                        src={addBond}
                        alt="bond"
                      />
                    </Stack>
                  )}
                </Stack>
              ))}
          </>
        )}
      </Box>
      <Box
        sx={{
          mt: "40px",
          padding: "20px 32px 25px 32px",
          background: "#FFF",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
          maxHeight: "800px",
          overflowY: "auto",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography fontSize="14px">People you may know</Typography>
          {users?.length > 4 && (
            <Typography
              onClick={() => setShowAll(!showAll)}
              fontSize="14px"
              sx={{
                minWidth: "60px",
                cursor: "pointer",
                background:
                  "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
            >
              View all
            </Typography>
          )}
        </Stack>
        <Stack
          mt={3}
          direction="row"
          alignItems="center"
          justifyContent={
            isLoading || !users?.length > 0 ? "center" : "space-between"
          }
          gap={2}
          flexWrap="wrap"
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "#1877F2" }} />
          ) : users?.length <= 0 ? (
            <Typography textAlign="center">No bonds available</Typography>
          ) : (
            displayedBonds?.map((bond) => (
              <BondCard
                isLoading={isReqLoading && id === bond?.id}
                handleRemoveUser={handleRemoveUser}
                handleSendBondReq={handleSendBondReq}
                key={bond.id}
                {...bond}
              />
            ))
          )}
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          Choose who can connect with you
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Choose what invitations to receive
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSent(!sent);
            handleClose(e);
          }}
        >
          {sent ? "Receive" : "Sent"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Grow;

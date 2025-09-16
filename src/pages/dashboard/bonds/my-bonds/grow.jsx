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
import { SuggestedBonds } from "../../../../components";
import {
  useAllBondsReqQuery,
  useUpdateBondReqMutation,
} from "../../../../services/bonds";
import {
  addBond,
  deleteBond,
  userAvatar,
  verticleDots,
} from "../../../../assets";
import { eventBus } from "../../../../utils";
import { Link } from "react-router-dom";

const Grow = () => {
  const [sent, setSent] = useState(null);
  const [updateReq, { isLoading: isUpdateReqLoading }] =
    useUpdateBondReqMutation();
  const {
    data: reqData,
    isLoading: reqLoading,
    isFetching,
    error: reqError,
    refetch,
  } = useAllBondsReqQuery(
    { type: sent ? "sent" : "received" },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const requests = reqData?.data?.bonds;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  useEffect(() => {
    if (reqError) {
      toast.error(reqError?.data?.message || "Something went wrong");
      return;
    }
  }, [reqError]);

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
              <img
                style={{ cursor: "pointer" }}
                onClick={handleClick}
                src={verticleDots}
                alt="dots"
              />
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
                          ? item?.recipient?.profileImage || userAvatar
                          : item?.requester?.profileImage || userAvatar
                      }
                      alt="profile"
                    />
                    <Box>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/profile/${
                          sent ? item?.recipient?.id : item?.requester?.if
                        }`}
                      >
                        <Typography
                          sx={{
                            cursor: "pointer",
                            textTransform: "capitalize",
                          }}
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
                      </Link>
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
      <SuggestedBonds refetch={refetch} />
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

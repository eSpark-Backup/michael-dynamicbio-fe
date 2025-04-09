import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { BondCard } from "../../../../components";
import {
  useAllBondsQuery,
  useSendBondReqMutation,
} from "../../../../services/bonds";
import {
  addBond,
  deleteBond,
  userAvatar,
  verticleDots,
} from "../../../../assets";

const Grow = ({ requests }) => {
  const [sendReq, { isLoading: isReqLoading }] = useSendBondReqMutation();
  const { data, isLoading, error, isError } = useAllBondsQuery();
  const [id, setId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [users, setUsers] = useState(data?.data?.users || []);
  const [displayedBonds, setDisplayedBonds] = useState(
    showAll ? data?.data?.users : data?.data?.users?.slice(0, 4)
  );

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
      toast.error("Something went wrong!s");
    }
  }, [error, isError]);

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
        setId(null);
      }
    });
  };
  
  return (
    <Box>
      <Box
        sx={{
          padding: "23px 32px",
          background: "#fff",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="14px">
            {requests?.length > 0
              ? "You have new bonding request"
              : "You  don’t have any bonding request "}
          </Typography>
          <img src={verticleDots} alt="dots" />
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
                  style={{ borderRadius: "50%" }}
                  src={item?.profileImage || userAvatar}
                  alt="user-image"
                />
                <Box>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight={300}
                  >
                    {item?.name}
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {`${item?.designation} at “${item?.company}” `}
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {`${item?.city}, ${item?.country}`}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1.5}
              >
                <img
                  style={{ cursor: "pointer" }}
                  src={deleteBond}
                  alt="trash"
                />
                <img style={{ cursor: "pointer" }} src={addBond} alt="bond" />
              </Stack>
            </Stack>
          ))}
      </Box>
      <Box
        sx={{
          mt: "40px",
          padding: "20px 32px 25px 32px",
          background: "#FFF",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
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
    </Box>
  );
};

export default Grow;

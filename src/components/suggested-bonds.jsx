import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import BondCard from "./bond-card";
import { useAllBondsQuery, useSendBondReqMutation } from "../services/bonds";

const SuggestedBonds = ({ refetch }) => {
  const [id, setId] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [users, setUsers] = useState([]);
  const [displayedBonds, setDisplayedBonds] = useState([]);

  const {
    data,
    isLoading,
    error,
    isError,
    refetch: refetchUsers,
  } = useAllBondsQuery(
    {
      page: 1,
      pageSize: 100,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [sendReq, { isLoading: isReqLoading }] = useSendBondReqMutation();

  useEffect(() => {
    const filteredUsers = data?.data?.users?.filter(
      (user) => !user.isFriend && !user?.isPendingFriendRequest
    );
    setDisplayedBonds(showAll ? filteredUsers : filteredUsers?.slice(0, 4));
    setUsers(filteredUsers);
  }, [showAll, data]);

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
      return;
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
        refetchUsers();
        return;
      }
      if (res) {
        toast.success("Your Request sent successfully");
        refetchUsers();
        refetch && refetch();
        setId(null);
      }
    });
  };

  return (
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
            {showAll ? "View less" : "View all"}
          </Typography>
        )}
      </Stack>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={2}
        mt={3}
      >
        {isLoading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress sx={{ color: "#1877F2" }} />
          </Stack>
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
      </Box>
    </Box>
  );
};

export default SuggestedBonds;

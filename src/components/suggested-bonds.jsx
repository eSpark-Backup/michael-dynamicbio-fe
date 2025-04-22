import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import BondCard from "./bond-card";
import { useAllBondsQuery, useSendBondReqMutation } from "../services/bonds";
import BondCard2 from "./BondCard";

const SuggestedBonds = ({ refetch, feedPage, search }) => {
  const [id, setId] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [users, setUsers] = useState([]);
  const [displayedBonds, setDisplayedBonds] = useState([]);
  const [feedBonds, setFeedBonds] = useState([]);
  const navigate = useNavigate();

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
      search,
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
    const feedUsers = filteredUsers?.map((item) => ({
      img: item?.profileImage,
      name: `${item?.firstName} ${item?.lastName}`,
      address: "",
      role: item?.designation,
      id: item?.id,
    }));
    setFeedBonds(feedUsers?.slice(0, 3));
    setDisplayedBonds(
      showAll
        ? search
          ? data?.data?.users
          : filteredUsers
        : search
        ? data?.data?.users?.slice(0, 4)
        : filteredUsers?.slice(0, 4)
    );
    setUsers(search ? data?.data?.users : filteredUsers);
  }, [search, showAll, data]);

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

  if (isLoading && search) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Stack>
    );
  }

  if (displayedBonds?.length <= 0 && search) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: feedPage || search ? "0px" : "40px",
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
        <Typography fontSize="14px">
          {feedPage
            ? "Suggestion for you to create bonds"
            : "People you may know"}
        </Typography>
        {users?.length > 4 && (
          <Typography
            onClick={
              feedPage ? () => navigate("/bonds") : () => setShowAll(!showAll)
            }
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
      {feedPage ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            mt: "30px",
          }}
        >
          {feedBonds?.map((item, index) => {
            return (
              <BondCard2
                key={index}
                userImage={item?.img}
                userName={item?.name}
                userAddress={item?.address}
                userRole={item?.role}
                id={item?.id}
                bondId={item?.bondId}
                showBondIcon={true}
                handleBondClick={handleSendBondReq}
                isLoading={isReqLoading && item?.id === id}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(225px, 1fr))"
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
                isPending={bond?.isPendingFriendRequest}
                isFriend={bond?.isFriend}
                isLoading={isReqLoading && id === bond?.id}
                handleRemoveUser={handleRemoveUser}
                handleSendBondReq={handleSendBondReq}
                refetch={refetch}
                refetchUsers={refetchUsers}
                key={bond.id}
                {...bond}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default SuggestedBonds;

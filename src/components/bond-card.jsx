import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Button from "./button";
import { useUpdateBondReqMutation } from "../services/bonds";
import {
  bondBlack2,
  close,
  bondWhite,
  userAvatar,
  cancelWhite,
  pendingWhite,
  pendingBlack,
  cancelBlack,
} from "../assets";

const BondCard = ({
  handleRemoveUser,
  handleSendBondReq,
  isLoading,
  id,
  profileImage,
  coverImage,
  firstName,
  lastName,
  designation,
  isPage,
  orgination,
  place,
  members,
  isPending,
  isFriend,
  refetch,
  refetchUsers,
  bondId,
  requestSentByMe,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const open = Boolean(anchorEl);

  const [updateReq, { isLoading: isUpdateReqLoading }] =
    useUpdateBondReqMutation();

  const handleBond = (id, e) => {
    if (isPending) {
      setAnchorEl(e.currentTarget);
      setSelected(id);
      setType("pending");
      return;
    } else if (isFriend) {
      setAnchorEl(e.currentTarget);
      setSelected(id);
      setType("cancel");
      return;
    } else {
      handleSendBondReq(id);
      return;
    }
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleBondReq = (e, type) => {
    handleClose(e);
    const bodyToSend = {
      bondId: selected,
      action:
        type === "pending"
          ? requestSentByMe
            ? "canceled"
            : "rejected"
          : "unfriend",
    };
    updateReq(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        refetch();
        refetchUsers();
      }
    });
  };

  return (
    <Box
      onClick={() => navigate(`/profile/${id}`)}
      sx={{
        padding: "10px 20px 20px 20px",
        width: "224px",
        background: "#F2F8FD",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <img
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveUser(id);
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          cursor: "pointer",
        }}
        src={close}
        alt="close"
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:after": {
            content: '""',
            backgroundImage: coverImage
              ? `url(${coverImage})`
              : "linear-gradient(180deg, #948F8F 0%, #2E2C2C 100%)",
            width: "calc(100% - 40px)",
            height: "36px",
            position: "absolute",
            top: 0,
            zIndex: 1,
          },
        }}
      >
        <img
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            zIndex: 2,
          }}
          src={profileImage || userAvatar}
          alt="profile"
        />
      </Box>
      <Typography
        textAlign="center"
        mt={1}
        fontWeight={500}
        textTransform={"capitalize"}
      >
        {`${firstName} ${lastName}`}
      </Typography>
      {designation && (
        <Typography
          sx={{ color: "#505050" }}
          mb={1}
          textAlign="center"
          fontSize="12px"
        >
          {designation}
        </Typography>
      )}
      {isPage && (
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={1}
          mt={1}
        >
          <Box>
            <Typography fontSize="12px" fontWeight={300}>
              {orgination}
            </Typography>
            <Typography fontSize="12px" fontWeight={300}>
              {place}
            </Typography>
          </Box>
          <Typography fontSize="12px" fontWeight={300}>
            {members}
          </Typography>
        </Stack>
      )}
      <Button
        loading={isLoading || (isUpdateReqLoading && bondId === selected)}
        disabled={isLoading || (isUpdateReqLoading && bondId === selected)}
        sx={{ mt: 1, height: "48px", position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          handleBond(!isPending && !isFriend ? id : bondId, e);
        }}
      >
        <img
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.3s ease-in-out",
          }}
          src={isPending ? pendingWhite : isFriend ? cancelWhite : bondWhite}
          alt="add"
        />

        <img
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            opacity: hovered ? 0 : 1,
            transition: "all 0.3s ease-in-out",
          }}
          src={isPending ? pendingBlack : isFriend ? cancelBlack : bondBlack2}
          alt="add"
        />
        {isPending ? "Pending" : isFriend ? "Bonded" : "Bond"}
      </Button>
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
        <MenuItem onClick={(e) => handleBondReq(e, type)}>
          {type === "pending"
            ? requestSentByMe
              ? "Withdraw request"
              : "Reject request"
            : "Remove bond"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default BondCard;

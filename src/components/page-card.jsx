import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { plus, userAvatar, verticleDots } from "../assets";

const PageCard = ({
  rightBar,
  bgNotWhite,
  isFollowLoading,
  handleFollow,
  isDeleteLoading,
  handleDelete,
  followers,
  logoUrl,
  name,
  followerCount,
  type,
  id,
  creatorId,
  requestSent,
  mainType,
}) => {
  const isGroup =
    type === "my-groups" || type === "joined-groups" || type === "all-groups";
  const { user } = useSelector((state) => state.auth);
  const isFollowed = followers?.some((item) => item?.id === user?.id);
  const owner = creatorId === user?.id;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          border: "1px solid #E4E4E4",
          borderRadius: "2px",
          backgroundColor: bgNotWhite ? "#F2F8FD" : "#FFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "5px 20px",
          width: "100%",
        }}
      >
        <Box
          onClick={() => navigate(`/${isGroup ? "group" : "page"}/${id}`)}
          sx={{
            width: "calc(100% - 20px)",
            cursor: "pointer",
            display: "flex",
            columnGap: "20px",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <img
            style={{ width: "73px", height: "73px", borderRadius: "50%" }}
            src={logoUrl || userAvatar}
            alt="User"
          />
          <Stack sx={{ width: "calc(100% - 100px)" }} direction={"column"}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#171717",
                textAlign: { xs: "center", sm: "left" },
                cursor: "pointer",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: "#505050",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {followerCount}{" "}
              {mainType === "group"
                ? `Member${followerCount === 1 ? "" : "s"}`
                : `Follower${followerCount === 1 ? "" : "s"}`}
            </Typography>
          </Stack>
        </Box>
        {type === "joined-groups" ? (
          <Typography
            sx={{ width: "120px", cursor: "pointer" }}
            onClick={() => {
              if (!isFollowLoading) handleFollow(id);
            }}
          >
            {isFollowLoading ? "loading..." : "Leave group"}
          </Typography>
        ) : rightBar ? (
          <img
            onClick={(e) => {
              if (!isFollowLoading) {
                handleFollow(id);
              }
            }}
            style={{ cursor: "pointer" }}
            src={plus}
            alt="add"
          />
        ) : (
          <img
            onClick={handleClick}
            style={{ cursor: "pointer" }}
            src={verticleDots}
            alt="Bond"
          />
        )}
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
        {type === "my-groups" ? (
          <>
            <MenuItem
              onClick={(e) => {
                if (!isDeleteLoading) {
                  handleDelete(id);
                  handleClose(e);
                }
              }}
            >
              {isDeleteLoading ? "loading..." : "Delete group"}
            </MenuItem>
          </>
        ) : type === "all-groups" ? (
          <>
            <MenuItem
              onClick={(e) => {
                if (!isFollowLoading) {
                  handleFollow(id);
                  handleClose(e);
                }
              }}
            >
              {isFollowLoading
                ? "loading..."
                : isFollowed
                  ? "Leave group"
                  : requestSent
                    ? "Withdraw request"
                    : "Join group"}
            </MenuItem>
          </>
        ) : owner ? (
          <>
            <MenuItem
              onClick={(e) => {
                if (!isDeleteLoading) {
                  handleDelete(id);
                  handleClose(e);
                }
              }}
            >
              {isDeleteLoading ? "loading..." : "Delete page"}
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={(e) => {
                if (!isFollowLoading) {
                  handleFollow(id);
                  handleClose(e);
                }
              }}
            >
              {isFollowLoading
                ? "loading..."
                : isFollowed
                  ? "Unfollow"
                  : "Follow"}
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default PageCard;

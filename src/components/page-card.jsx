import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { userAvatar, verticleDots } from "../assets";

const PageCard = ({ logoUrl, name, followerCount, type, id, creatorId }) => {
  const { user } = useSelector((state) => state.auth);
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
          backgroundColor: "#FFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "5px 20px",
          width: "100%",
        }}
      >
        <Box
          onClick={() => navigate(`/page/${id}`)}
          sx={{
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
          <Stack direction={"column"}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#171717",
                textAlign: { xs: "center", sm: "left" },
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(type === "my-groups" ? `/group/${id}` : `/page/${id}`)
              }
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
              {followerCount}
            </Typography>
          </Stack>
        </Box>
        {type === "joined-groups" ? (
          <Typography>Withdraw</Typography>
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
        {owner ? (
          <>
            <MenuItem>Invite members</MenuItem>
            <MenuItem>Delete page</MenuItem>
            <MenuItem>Leave page</MenuItem>
          </>
        ) : (
          <>
            <MenuItem>Follow</MenuItem>
            <MenuItem>Message</MenuItem>
            <MenuItem>Report</MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default PageCard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { verticleDots } from "../assets";

const PageCard = ({ userImage, title, desc, type, id }) => {
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
          sx={{
            display: "flex",
            columnGap: "20px",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <img src={userImage} alt="User" />
          <Stack direction={"column"}>
            {title && (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#171717",
                  textAlign: { xs: "center", sm: "left" },
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    type === "my-groups" ? `/group/${id}` : `/page/${id}`
                  )
                }
              >
                {title}
              </Typography>
            )}
            {desc && (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#505050",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {desc}
              </Typography>
            )}
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
        <MenuItem>Follow</MenuItem>
        <MenuItem>Message</MenuItem>
        <MenuItem>Report</MenuItem>
      </Menu>
    </>
  );
};

export default PageCard;

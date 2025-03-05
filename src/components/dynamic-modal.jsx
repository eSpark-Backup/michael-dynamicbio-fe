import { Stack, Box, Typography, Modal, Menu, MenuItem, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import Button from "./button";
import { close, downArrowFilled, heart, profile2, timer } from "../assets";
import { useState } from "react";

const DynamicModal = ({
  open,
  handleClose,
  title,
  children,
  onSuccess,
  buttonText,
  sx,
  postModal,
  userName
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", md: "70%", lg: "50%" },
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: "2px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&:focus-visible": { border: "none", outline: "none" },
          ...sx,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          {!postModal && <Typography>{title}</Typography>}
          {postModal &&
            <Box sx={{ display: "flex", columnGap: "15px", alignItems: "center" }}>
              <img src={profile2} alt="Avatar" />
              <Stack direction={"column"}>
                <Stack direction={"row"} gap={1}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>{userName}</Typography>
                  <img src={downArrowFilled} alt="Icon" style={{ cursor: "pointer" }} onClick={handleClick} />
                </Stack>
                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Post to anyone</Typography>
              </Stack>
            </Box>
          }
          <img onClick={handleClose} src={close} alt="close" />
        </Stack>
        <Box
          sx={{
            flex: 1,
            margin: "20px 0",
            height: "calc(100% - 130px)",
            overflowY: "auto",
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Box>
        <Stack justifyContent={postModal ? "flex-end" : "center"} alignItems={postModal ? "flex-end" : "center"} pr={postModal ? 6 : 0} direction={"row"} gap={3}
          sx={{
            ...(postModal && {
              height: "55px",
              borderTop: "1px solid #E4E4E4",
              boxShadow: "0px 0px 10px 0px #00000040",
              width: "calc(100% + 40px)",
              display: "flex",
              alignItems: "center",
              margin: "0 -20px -20px -20px"
            })
          }}
        >
          <img src={timer} alt="Icon" style={{ width: "24px", height: "24px" }} />
          <Button type="submit" sx={{ maxWidth: postModal ? "150px" : "250px", height: postModal ? "36px" : "auto", fontSize: postModal ? "16px" : "20px" }} onClick={onSuccess}>
            {buttonText}
          </Button>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <RadioGroup name="share" sx={{ width: "100%", px: "0px" }}>
            <MenuItem  onClick={(e) => e.stopPropagation()} sx={{ width: "245px", backgroundColor: "#F8FCFF !important", marginTop: "10px", display: "flex", borderRadius: "4px", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Everyone</Typography>
              <FormControlLabel value="everyone" control={<Radio sx={{ marginRight: "0px" }} />} />
            </MenuItem>
            <MenuItem  onClick={(e) => e.stopPropagation()} sx={{ width: "245px", backgroundColor: "#F8FCFF !important", marginTop: "10px", display: "flex", borderRadius: "4px", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Only connections</Typography>
              <FormControlLabel value="connections" control={<Radio sx={{ marginRight: "0px" }} />} />
            </MenuItem>
            <MenuItem  onClick={(e) => e.stopPropagation()} sx={{ width: "245px", backgroundColor: "#F8FCFF !important", marginTop: "10px", display: "flex", borderRadius: "4px", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Only me</Typography>
              <FormControlLabel value="me" control={<Radio sx={{ marginRight: "0px" }} />} />
            </MenuItem>
            <MenuItem  onClick={(e) => e.stopPropagation()} sx={{ width: "245px", backgroundColor: "#F8FCFF !important", marginTop: "10px", display: "flex", borderRadius: "4px", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Group</Typography>
              <FormControlLabel value="group" control={<Radio sx={{ marginRight: "0px" }} />} />
            </MenuItem>
          </RadioGroup>
        </Menu>
      </Box>

    </Modal>
  );
};

export default DynamicModal;

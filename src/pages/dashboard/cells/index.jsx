import { Box, Grid2, Menu, MenuItem, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { camera, emoji, filter, friend, link, photo, searchIcon, send, three_vertical_dots } from '../../../assets'
import { ContactBox, MessageList, OutlinedInput, RightSideBar } from '../../../components'
import { chatsContent, messages } from '../../../constant'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const Cells = () => {
  const theme = useTheme()
  const [showChatScreen, setShowChatScreen] = useState(true)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [activeItem, setActiveItem] = useState(1);
  const [showContacts, setShowContacts] = useState(true)
  const HandleActiveClick = (id) => {
    setActiveItem(id)
    setShowChatScreen(true)
    if (isSmallScreen) {
      setShowContacts(false)
    }
  }

  useEffect(() => {
    setActiveItem(isSmallScreen ? 0 : 1);
  }, [isSmallScreen]);

  const HandleNewConversation = () => {
    setShowChatScreen(false)
    setActiveItem(0)
    if (isSmallScreen) {
      setShowContacts(false)
    }
  }

  const HandleBack = () => {
    setShowContacts(true)
    setActiveItem(0)
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ p: "20px", height: "calc(100vh - 130px)" }}>
      <Grid2 container spacing={5} sx={{ height: "100%" }}>
        {(!isSmallScreen || (isSmallScreen && showContacts)) && <Grid2 size={{ xs: 12, lg: 2.5 }} sx={{ height: "100%" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "25px", height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "29px", fontWeight: 400, color: theme.palette.primary.dark }}>
                Chats
              </Typography>
              <img src={filter} alt="Filter" onClick={handleClick} style={{ cursor: "pointer" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px", height: "80%" }}>
              <OutlinedInput
                placeholder="Search"
                startAdornment={searchIcon}
              />
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px", height: "100%", overflowY: "auto", pb: "0px" }}>
                {chatsContent?.map((item, index) => (
                  <ContactBox lastMessage={item?.lastMessage} image={item?.image} time={item?.time} name={item?.name} key={index} id={item?.id} handleClick={HandleActiveClick} activeItem={activeItem} />
                ))}
              </Box>
            </Box>
            <Box sx={{ borderTop: "1px solid #E4E4E4", height: "46px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={HandleNewConversation}>
              <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: 400 }}>
                Start conversation
              </Typography>
            </Box>
          </Paper>
        </Grid2>}

        {(!isSmallScreen || (isSmallScreen && !showContacts)) && <Grid2 size={{ xs: 12, lg: 6.5 }} sx={{ height: "98%", pb: "10px" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            {isSmallScreen && <ArrowBackIosOutlinedIcon
              sx={{
                fontSize: "20px",
                background: `linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              onClick={HandleBack}
            />}
            <Box sx={{ borderBottom: "1px solid #E4E4E4", width: "100%", display: "flex", justifyContent: "space-between", p: "5px 5px 15px 0px", alignItems: "center" }}>
              <Stack gap={2} direction={"row"}>
                {showChatScreen && <Box sx={{ width: "40px", height: "40px", position: "relative" }}>
                  <img src={friend} alt="user" style={{ width: "100%", height: '100%', borderRadius: "50%" }} />
                  <Box sx={{ width: "10px", height: "10px", backgroundColor: "#12B76A", border: "1.5px solid #FFFFFF", borderRadius: "50%", position: "absolute", right: 0, bottom: 0 }}>
                  </Box>
                </Box>}
                <Stack direction={"column"}>
                  <Typography sx={{ fontSize: showChatScreen ? "18px" : "14px", fontWeight: showChatScreen ? 500 : 400, color: "#171717" }}>
                    {showChatScreen ? "Phoenix  Baker" : "New Message"}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050" }}>
                    {showChatScreen ? "Active Now" : "Type a name or multiple names"}
                  </Typography>
                </Stack>
              </Stack>
              <img src={three_vertical_dots} alt="Info" style={{ width: "20px", height: "20px" }} />
            </Box>
            {/* {showChatScreen && <Box sx={{ minHeight: "68%", overflowY: "auto", pt: "10px" }}>
              <MessageList messages={messages} />
            </Box>} */}
            <Box sx={{ minHeight: "68%", overflowY: "auto", pt: "10px" }}>
              {showChatScreen && <MessageList messages={messages} />}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
              <Box sx={{ borderTop: "1px solid #E4E4E4", width: "100%", display: "flex", pr: "10px", height: '60px', backgroundColor: "#F2F8FD" }}>
                <OutlinedInput sx={{
                  height: "100%",
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    border: "none !important",
                    height: "100%",
                    backgroundColor: "#F2F8FD"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                  },

                }} placeholder={"Write a message"} />
                <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                  <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
                  <img src={send} alt="Camera" style={{ width: "24px", height: "24px" }} />
                </Box>
              </Box>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", columnGap: "10px" }}>
                <img src={camera} alt="Camera" />
                <img src={link} alt="Link" />
                <img src={photo} alt="Album" />
              </Box>
            </Box>
          </Paper>
        </Grid2>}
        <Grid2 size={{ xs: 12, lg: 3 }} pb={"10px"}>
          <RightSideBar hideResearch={true} />
        </Grid2>
      </Grid2>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Unread</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Archive</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Draft</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Stared</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Option</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Option</MenuItem>
      </Menu>
    </Box >
  )
}

export default Cells

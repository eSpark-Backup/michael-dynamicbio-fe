import { Box, Grid2, Paper, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { camera, emoji, filter, friend, link, photo, searchIcon, send, three_vertical_dots } from '../../../assets'
import { ContactBox, MessageList, OutlinedInput } from '../../../components'
import { chatsContent, messages } from '../../../constant'

const Cells = () => {
  const theme = useTheme()
  const [activeItem, setActiveItem] = useState(0);

  const HandleActiveClick = (id) => {
    setActiveItem(id)
  }

  return (
    <Box sx={{ p: "20px", height: "calc(100vh - 130px)" }}>
      <Grid2 container spacing={5} sx={{ height: "100%" }}>
        <Grid2 size={{ xs: 12, lg: 2.5 }} sx={{ height: "100%" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "25px", height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "29px", fontWeight: 400, color: theme.palette.primary.dark }}>
                Chats
              </Typography>
              <img src={filter} alt="Filter" />
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
            <Box sx={{ borderTop: "1px solid #E4E4E4", height: "46px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
              <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: 400 }}>
                Start conversation
              </Typography>
            </Box>
          </Paper>
        </Grid2>


        <Grid2 size={{ xs: 12, lg: 6.5 }} sx={{ height: "98%", pb: "10px" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px", height: "100%" }}>
            <Box sx={{ borderBottom: "1px solid #E4E4E4", width: "100%", display: "flex", justifyContent: "space-between", p: "5px 5px 15px 0px", alignItems: "center" }}>
              <Stack gap={2} direction={"row"}>
                <Box sx={{ width: "40px", height: "40px", position: "relative" }}>
                  <img src={friend} alt="user" style={{ width: "100%", height: '100%', borderRadius: "50%" }} />
                  <Box sx={{ width: "10px", height: "10px", backgroundColor: "#12B76A", border: "1.5px solid #FFFFFF", borderRadius: "50%", position: "absolute", right: 0, bottom: 0 }}>
                  </Box>
                </Box>
                <Stack direction={"column"}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 500, color: "#171717" }}>Phoenix  Baker</Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050" }}>Active Now</Typography>
                </Stack>
              </Stack>
              <img src={three_vertical_dots} alt="Info" style={{ width: "20px", height: "20px" }} />
            </Box>
            <Box sx={{ minHeight: "68%", overflowY: "auto" }}>
              <MessageList messages={messages} />
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
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <Paper></Paper>
        </Grid2>
      </Grid2>
    </Box >
  )
}

export default Cells

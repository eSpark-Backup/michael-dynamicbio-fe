import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import Button from './button'
import { group } from '../assets'

const AboutGroupModal = ({ onSuccess }) => {
  return (
    <Box>
      <Box sx={{ mt: "30px", maxHeight: "450px", overflowY: "auto", pb: "30px" }}>
        <Typography sx={{ fontSize: "22px", fontWeight: "500", color: "#171717" }}>Description</Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050", mt: "10px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        <Divider sx={{ mt: '15px' }} />

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px", mt: "15px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: "500", color: "#171717" }}>Details</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Public</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Anyone on or off Fusion can see posts in the group. Only group members can add comment and create posts.</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Posts require approval</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Members' posts require admin approval before they become visible to others.</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>Learn more</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Industry</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>IT Services and IT Consulting</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Location</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Worldwide</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Created</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Mar 2025</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
            <Typography sx={{ fontSize: "22px", fontWeight: "400", color: "#171717" }}>Activity</Typography>
            <Box sx={{ display: 'flex', columnGap: "5px", alignItems: "center" }}>
              <img src={group} alt="Icon" style={{ width: "14px", height: "14px" }} />
              <Typography>+1 member in the last week</Typography>
            </Box>
          </Box>
        </Box>

      </Box>
      <Stack
        justifyContent={"flex-end"}
        alignItems={"center"}
        px={6}
        direction={"row"}
        gap={3}
        sx={{
          height: "55px",
          borderTop: "1px solid #E4E4E4",
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          bottom: "0px",
          right: "0px",
          zIndex: 999,
          backgroundColor: "white",
        }}
      >
        <Button
          // loading={isLoading}
          // disabled={isLoading}
          onClick={onSuccess}
          type="submit"
          sx={{
            maxWidth: "150px",
            height: "36px",
            fontSize: "16px",
            minWidth: { md: "150px" },
          }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  )
}

export default AboutGroupModal

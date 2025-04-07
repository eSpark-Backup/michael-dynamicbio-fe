import { Box, Grid2, Paper, Typography } from '@mui/material'
import React from 'react'
import { dummyPhoto, user } from '../assets'

const EventDetails = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid2 container spacing={3} sx={{ width: { xs: "98%", md: "85%", lg: "80%", xl: "75%" }, py: "25px" }}>
        <Grid2 size={{ xs: 12, lg: 8, xl: 9 }}>
          <Paper sx={{ p: "0px" }}>
            <Box sx={{ paddingTop: "56.25%", backgroundImage: `url("${dummyPhoto}")`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100.1%" }}>
            </Box>
            <Box sx={{ p: "40px 25px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#ad4601" }}>Today, 8:00 PM</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>mocking</Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>mocking</Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>Event by rotten ria</Typography>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>Thu, Apr 3, 2025, 8:00 PM - 9:00 PM (your local time)</Typography>
                </Box>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>Online</Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>Event link • <span style={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>https://www.linkedin.com/feed</span></Typography>
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                  <img src={user} alt="Avatar" style={{ width: "24px", height: "24px" }} />
                  <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>1 attendee</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4, xl: 3 }}>
          <Paper></Paper>
        </Grid2>
      </Grid2>
    </Box >
  )
}

export default EventDetails

import { Box, Grid2, Paper, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { notification, profilePicture } from '../../../assets'
import { CustomizeTabs, PulseProfileCard, RightSideBar } from '../../../components'
import { pulseCardContent } from '../../../constant'

const Pulses = () => {
  const theme = useTheme()
  const tabOptions = ["All", "Mention/Research", "Group", "Company", "Pages"];
  const [activeIndex, setActiveIndex] = useState(1);
  const HandleClick = (id) => {
    setActiveIndex(id)
  }
  return (
    <Box sx={{ p: "20px" }}>
      <Grid2 container spacing={5}>
        <Grid2 size={{ xs: 12, lg: 2.5 }} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
          <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px" }}>
            <Box
              sx={{
                backgroundColor: "#D9D9D9",
                height: "71px",
                position: "relative",
                width: "100%",
              }}
            >
              <img
                src={profilePicture}
                alt="Profile"
                style={{
                  position: "absolute",
                  top: "75%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
            <Box sx={{ pt: "25px" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 500, color: theme.palette.primary.dark, textAlign: "center" }}>
                James Bond
              </Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
                UI/UX at eSpark Consulting Group
              </Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
                Karachi, Sindh, Pakistan
              </Typography>
            </Box>
          </Paper>
          <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 400, color: theme.palette.primary.dark }}>Manage pulses</Typography>
            <img src={notification} alt="Notification" />
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6.5 }} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
          <Paper>
            <CustomizeTabs tabs={tabOptions} />
          </Paper>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>You can change your pulse setting</Typography>
              <img src={notification} alt="notification" />
            </Box>
            {pulseCardContent?.map((item, index) => {
              return (
                <PulseProfileCard key={index} userRole={item?.userRole} userImage={item?.userImage} description={item?.description} time={item?.time} id={item?.id} HandleClick={HandleClick} activeItem={activeIndex} />
              )
            })}
            <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: "400", textAlign: "center", pt: "10px" }}>View all</Typography>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          {/* <Paper> */}
          <RightSideBar hideResearch={true} />
          {/* </Paper> */}
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Pulses

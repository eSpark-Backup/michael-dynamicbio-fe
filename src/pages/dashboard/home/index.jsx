import { Box, Grid, OutlinedInput, Paper, Stack, Typography, useTheme, Button, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { article, bondMain, photo, user, userWithCamera, video } from '../../../assets';
import { bondSuggestions } from '../../../constant';
import { RightSideBar } from '../../../components';

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [showMore, setShowMore] = useState(false);

  return (
    <Box sx={{ p: "20px" }}>
      <Grid container spacing={5}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={2.5} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
          {/* Profile Card */}
          <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px", p: 2 }}>
            <img src={userWithCamera} alt="User" />
            <Typography sx={{ fontSize: "24px", fontWeight: 700, color: theme.palette.primary.dark }}>
              James Bond
            </Typography>
            <Typography sx={{ fontSize: "17px", fontWeight: "300", color: theme.palette.primary.dark, textAlign: "center" }}>
              UI/UX at eSpark Consulting Group
            </Typography>
            <Typography sx={{ fontSize: "17px", fontWeight: "300", color: theme.palette.primary.dark, textAlign: "center" }}>
              Karachi, Sindh, Pakistan
            </Typography>
          </Paper>

          {/* Hidden Sections on Small Screens */}
          {(showMore || !isSmallScreen) && (
            <>
              <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                <Typography sx={{ fontSize: "21px", fontWeight: 300, color: theme.palette.primary.dark }}>
                  Make more bonds
                </Typography>
                <img src={bondMain} alt="Bond" />
              </Paper>

              <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px", p: 2 }}>
                <Typography sx={{ fontSize: "21px", fontWeight: 300, color: theme.palette.primary.dark }}>
                  Groups
                </Typography>
                <Typography sx={{ fontSize: "21px", fontWeight: 300, color: theme.palette.primary.dark }}>
                  Events
                </Typography>
                <Box sx={{ borderTop: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "21px", fontWeight: "300", height: "50px", cursor: "pointer" }}>
                  Discover More
                </Box>
              </Paper>
            </>
          )}

          {/* Show More / Show Less Button (Only for Small Screens) */}
          {isSmallScreen && (
            <Button variant="outlined" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          )}
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={6.5} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "30px" }}>
              <img src={user} alt="User" />
              <OutlinedInput placeholder='Start a post' sx={{ height: "73px" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", rowGap: "10px" }}>
              {[{ img: photo, label: "Photo" }, { img: video, label: "Video" }, { img: article, label: "Article" }, { img: article, label: "Event" }, { img: article, label: "Research" }]
                .map((item, index) => (
                  <Box key={index} sx={{ width: "180px", height: "50px", padding: "20px", backgroundColor: "#FCFCFC", borderRadius: "2px", display: "flex", columnGap: "15px", alignItems: "center" }}>
                    <img style={{ width: "24px", height: "24px" }} src={item.img} alt={item.label} />
                    <Typography sx={{ fontSize: "17px", fontWeight: 300 }}>{item.label}</Typography>
                  </Box>
                ))}
            </Box>
          </Paper>

          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>
                Suggestion for you to create bonds
              </Typography>
              <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>
                View all
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
              {bondSuggestions?.map((item, index) => (
                <Box key={index} sx={{ border: "1px solid #DDE2E4", borderRadius: "2px", backgroundColor: "#FCFCFC", display: "flex", justifyContent: "space-between", alignItems: "center", p: "10px" }}>
                  <Box sx={{ display: "flex", columnGap: "40px", alignItems: "center" }}>
                    <img src={item?.img} alt="User" />
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>{item?.name}</Typography>
                      <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>{item?.address}</Typography>
                    </Stack>
                  </Box>
                  <img src={bondMain} alt="Bond" />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={3}>
          <RightSideBar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

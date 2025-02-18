import { Box, OutlinedInput, Paper, Typography, useTheme, Button, useMediaQuery, Grid2 } from '@mui/material';
import React, { useState } from 'react';
import { article, bondMain, event, photo, research, user, userWithCamera, video } from '../../../assets';
import { bondSuggestions, suggestionPostContent } from '../../../constant';
import { BondCard, RightSideBar, SuggestionPost } from '../../../components';

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [showMore, setShowMore] = useState(false);

  return (
    <Box sx={{ p: "20px" }}>
      <Grid2 container spacing={5}>
        <Grid2 size={{ xs: 12, lg: 2.5 }} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
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
                <Box sx={{ borderTop: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "21px", fontWeight: "300", height: "50px", cursor: "pointer", color: theme.palette.primary.dark }}>
                  Discover More
                </Box>
              </Paper>
            </>
          )}


          {isSmallScreen && (
            <Button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6.5 }} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "30px", flexDirection: { xs: "column", md: "row" }, rowGap: "5px" }}>
              <img src={user} alt="User" />
              <OutlinedInput placeholder='Start a post' sx={{ height: "73px" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", rowGap: "10px" }}>
              {[{ img: photo, label: "Photo" }, { img: video, label: "Video" }, { img: article, label: "Article" }, { img: event, label: "Event" }, { img: research, label: "Research" }]
                .map((item, index) => (
                  <Box key={index} sx={{ width: { xs: "100%", md: "180px" }, height: "50px", padding: "20px", backgroundColor: "#FCFCFC", borderRadius: "2px", display: "flex", columnGap: "15px", alignItems: "center", cursor: "pointer" }}>
                    <img style={{ width: "24px", height: "24px" }} src={item.img} alt={item.label} />
                    <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>{item.label}</Typography>
                  </Box>
                ))}
            </Box>
          </Paper>

          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: { xs: "14px", md: "17px" }, fontWeight: 300, color: theme.palette.primary.dark }}>
                Suggestion for you to create bonds
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", md: "17px" }, fontWeight: 300, color: theme.palette.primary.dark, cursor: "pointer" }}>
                View all
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
              {bondSuggestions?.map((item, index) => (
                <BondCard key={index} userImage={item?.img} userName={item?.name} userAddress={item?.address} />
              ))}
            </Box>
          </Paper>
          {suggestionPostContent?.map((item, index) => (
            <SuggestionPost
              userName={item?.userName}
              userImage={item?.userImage}
              userRole={item?.userRole}
              postTime={item?.postTime}
              numberofLikes={item?.numberofLikes}
              isLiked={item?.isLiked}
              comments={item?.comments}
              activity={item?.activity}
              postPic={item?.postPic}
              postContent={item?.postContent}
              commentsContent={item?.commentsContent}
              key={index}
              index={index}
              length={suggestionPostContent?.length}
            />
          ))}
        </Grid2>


        <Grid2 size={{ xs: 12, lg: 3 }}>
          <RightSideBar />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;

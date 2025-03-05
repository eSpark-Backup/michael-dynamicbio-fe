import { Box, OutlinedInput, Paper, Typography, useTheme, Button, useMediaQuery, Grid2 } from '@mui/material';
import React, { useState } from 'react';
import { article, bondMain, event, photo, profilePicture, research, user, userWithCamera, video } from '../../../assets';
import { bondSuggestions, suggestionPostContent } from '../../../constant';
import { BondCard2, DynamicModal, PostModal, RightSideBar, SuggestionPost } from '../../../components';

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const HandlePostTypeClick = (item) => {
    console.log(item)
    setShowModal(true)
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


          {(showMore || !isSmallScreen) && (
            <>
              <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: theme.palette.primary.dark }}>
                  Make more bonds
                </Typography>
                <img src={bondMain} alt="Bond" />
              </Paper>

              <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}>
                  Groups
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}>
                  Events
                </Typography>
                <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "center", alignItems: "center", height: "50px", cursor: "pointer", color: theme.palette.primary.dark }}>
                  <Typography variant="gradientText" sx={{ fontSize: "14px", fontWeight: 400 }}>
                    Discover more
                  </Typography>
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
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "30px", flexDirection: { xs: "column", md: "row" }, rowGap: "5px" }}>
              <img src={user} alt="User" />
              <OutlinedInput placeholder='Start a post' sx={{ height: "73px", width: "100%" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", rowGap: "10px" }}>
              {[{ img: photo, label: "Photo" }, { img: video, label: "Video" }, { img: article, label: "Article" }, { img: event, label: "Event" }, { img: research, label: "Research" }]
                .map((item, index) => (
                  <Box key={index} sx={{ width: { xs: "100%", md: "180px" }, height: "50px", padding: "20px", backgroundColor: "#F8FCFF", borderRadius: "2px", display: "flex", columnGap: "15px", alignItems: "center", cursor: "pointer" }} onClick={() => HandlePostTypeClick(item.label)}>
                    <img style={{ width: "24px", height: "24px" }} src={item.img} alt={item.label} />
                    <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#505050" }}>{item.label}</Typography>
                  </Box>
                ))}
            </Box>
          </Paper>

          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}>
                Suggestion for you to create bonds
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 400, cursor: "pointer" }} variant="gradientText">
                View all
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
              {bondSuggestions?.map((item, index) => (
                <BondCard2 key={index} userImage={item?.img} userName={item?.name} userAddress={item?.address} userRole={item?.role} />
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
      <DynamicModal open={showModal} handleClose={() => setShowModal(false)} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"}>
        <PostModal />
      </DynamicModal>
    </Box>
  );
};

export default Home;

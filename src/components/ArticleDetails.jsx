import { Box, CircularProgress, Grid2, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { camera, comment, downArrowFilled, dummyPhoto, editBlue, emoji, like, noComments, primaryEye, reading, repost, save, send, user } from '../assets'
import { articleDummyContent } from '../constant'
import OutlinedInput from './outline-input'
import DynamicModal from './dynamic-modal'
import ShareModal from './ShareModal'
import PostChoiceModal from './PostChoiceModal'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../services/post'
import dayjs from 'dayjs'

const ArticleDetails = () => {
    const [showComments, setShowComments] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [showShareModal, setShowShareModal] = useState(false)
    const [postChoiceModal, setPostChoiceModal] = useState(false)
    const { id } = useParams();
    const { data, isSuccess, isLoading, isError, error } = useGetPostByIdQuery(id)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [articleContent, setArticleContent] = useState({
        articleImage: null,
        articleTitle: "",
        articleMaker: "",
        articleMakerRole: "",
        time: "",
        content: "",
        articleMakerImage: ""
    })

    const CommentHandler = () => {
        setShowComments(!showComments)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (isSuccess && data?.data) {
            setArticleContent((prev) => ({
                ...prev,
                articleImage: data?.data?.media["ARTICLES"][0]?.url,
                articleTitle: data?.data?.content?.articleTitle,
                articleMaker: data?.data?.author?.firstName + " " + data?.data?.author?.lastName,
                articleMakerRole: data?.data?.author?.company,
                time: dayjs(data?.data?.createdAt).format("LL"),
                content: data?.data?.content?.content,
                articleMakerImage: data?.data?.author?.profileImage
            }))
        }
    }, [data, isSuccess])


    if (isLoading) {
        return (
            <Box sx={{ width: "100%", height: "calc(100vh - 150px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress sx={{ color: "#1877F2" }} />
            </Box>
        )
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px", mt: '20px' }}>

            <Box sx={{ width: { xs: "98%", md: "85%", lg: "80%" }, backgroundColor: "#F2F8FD", border: '1px solid #E4E4E4', borderRadius: "8px", p: "25px", display: "flex", columnGap: "20px" }}>
                <Box sx={{ display: "flex", columnGap: "3px" }}>
                    <img src={editBlue} alt="Icon" style={{ width: "16px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "400" }} variant='gradientText'>Edit article</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "3px" }}>
                    <img src={primaryEye} alt="Icon" style={{ width: "16px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "400" }} variant='gradientText'>View post</Typography>
                </Box>
            </Box>

            <Grid2 container spacing={3} sx={{ width: { xs: "98%", md: "85%", lg: "80%" }, py: "25px" }}>
                <Grid2 size={{ xs: 12, lg: 8, xl: 9 }}>
                    <Paper sx={{ p: "0px" }}>
                        <Box sx={{ paddingTop: "46.25%", backgroundImage: `url("${articleContent?.articleImage ? articleContent?.articleImage : dummyPhoto}")`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100.1%" }}>
                        </Box>
                        <Box sx={{ p: "30px 20px" }}>
                            <Typography sx={{ fontSize: "24px", fontWeight: "600", color: "#171717" }}>{articleContent?.articleTitle}</Typography>
                            <Box sx={{ p: "20px 0px 20px 40px   ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", rowGap: '3px', width: "100%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>{articleContent?.articleMaker}</Typography>
                                        <Box sx={{ display: "flex", columnGap: "15px" }}>
                                            <Box sx={{ width: "40px", height: "40px", border: "1px solid #E4E4E4", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img src={reading} alt="Icon" style={{ width: "20px", height: "20px" }} />
                                            </Box>
                                            <Box sx={{ width: "40px", height: "40px", border: "1px solid #E4E4E4", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img src={save} alt="Icon" style={{ width: "20px", height: "20px" }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>{articleContent?.articleMakerRole}</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>April 3, 2025</Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717", pt: "15px" }} dangerouslySetInnerHTML={{ __html: articleContent?.content }}></Typography>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px" }}>
                                    <img src={articleContent?.articleMakerImage ? articleContent?.articleMakerImage : user} alt="Avatar" style={{ width: "42px", height: '42px', borderRadius: "50%" }} />
                                    <Typography sx={{ textAlign: "center" }}>{articleContent?.articleMaker}</Typography>
                                    <Typography sx={{ textAlign: "center" }}>{articleContent?.articleMakerRole}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ pt: "35px", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                                <Typography sx={{ fontSize: "24px", fontWeight: "600", color: "#171717" }}>More articles for you</Typography>
                                <Box sx={{ width: "400px", height: "350px", border: "1px solid #E4E4E4", borderRadius: "8px", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                                    <Box sx={{ backgroundImage: `url(${dummyPhoto})`, height: "70%", borderTopRightRadius: "8px", borderTopLeftRadius: "8px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100.1%" }}>
                                    </Box>
                                    <Box sx={{ p: "10px" }}>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Basic</Typography>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>rotten ria</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 4, xl: 3 }}>
                    <Paper>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Comments</Typography>
                        <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" }, mt: "25px" }}>
                            <Box sx={{ display: "flex", columnGap: "5px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setPostChoiceModal(true)}>
                                <img src={user} alt="Image" style={{ width: "27px", height: "24px" }} />
                                <img src={downArrowFilled} alt="Image" style={{ width: "27px", height: "24px" }} />
                            </Box>
                            <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "25%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <img src={like} alt="Like" />
                                <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none" }, color: "#505050", "@media (min-width:1750px)": { display: "block" } }}>Like</Typography>
                            </Box>
                            <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "25%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={CommentHandler}>
                                <img src={comment} alt="Like" />
                                <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none" }, color: "#505050", "@media (min-width:1750px)": { display: "block" } }}>Comment</Typography>
                            </Box>
                            {/* <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={handleClick}>
                                <img src={repost} alt="Repost" />
                                <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
                            </Box> */}
                            <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "25%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setShowShareModal(true)}>
                                <img src={send} alt="Repost" />
                                <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none" }, color: "#505050", "@media (min-width:1750px)": { display: "block" } }}>Send</Typography>
                            </Box>
                        </Box>
                        {
                            showComments && <Box sx={{ px: { xs: "0px", md: '10px' }, display: "flex", flexDirection: "column", rowGap: "10px", mt: "25px" }}>
                                <Box sx={{ display: "flex", columnGap: "5px", flexDirection: { xs: "column", md: "row" } }}>
                                    <Box sx={{ width: { xs: "35px", md: "70px" } }}>
                                        <img src={user} alt="User" style={{ width: "100%" }} />
                                    </Box>

                                    <Box sx={{ border: "1px solid #DDE2E4", width: "100%", display: "flex", pr: "10px", height: '73px' }}>
                                        <OutlinedInput sx={{
                                            height: "100%",
                                            width: "100%",
                                            "& .MuiOutlinedInput-root": {
                                                border: "none !important",
                                                height: "100%",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none !important",
                                            },

                                        }} placeholder={"Add a comment"} />
                                        <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                                            <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
                                            <img src={camera} alt="Camera" style={{ width: "24px", height: "24px" }} />
                                        </Box>
                                    </Box>
                                </Box>
                                {/* {Array.isArray(commentsContent) && commentsContent?.length > 0 &&
                                        commentsContent?.map((item, index) => (
                                          <Comment key={index} userImage={item?.userImage} userName={item?.userName} comment={item?.comment} time={item?.time} />
                                        ))
                                      } */}
                            </Box>
                        }
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "25px", flexDirection: "column", rowGap: "15px" }}>
                            <img src={noComments} alt="Image" />
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>No comments, yet.</Typography>
                            <Typography sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}>Be the first to comment.</Typography>
                            <Box
                                sx={{
                                    width: "70%",
                                    height: "36px",
                                    borderRadius: "2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "white",
                                    position: "relative",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: "8px",
                                        padding: "1px",
                                        background:
                                            "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                        mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                        WebkitMask:
                                            "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                        WebkitMaskComposite: "destination-out",
                                        maskComposite: "exclude",
                                    },
                                    cursor: "pointer",
                                }}
                            >
                                <Typography variant="gradientText">Start the conversation</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>

            <DynamicModal open={showShareModal} handleClose={() => setShowShareModal(false)} title={"Share Areeba Shakeel’s Post"} postModal={true} dropdownHeader={false} hideFooter={true}>
                <ShareModal />
            </DynamicModal>

            <DynamicModal open={postChoiceModal} handleClose={() => setPostChoiceModal(false)} title={"Comment, react, and repost as"} buttonText={"Save"} postModal={true} userName={"Areeba Shakeel"} hideFooter={true} smallModal={true} styledHeader={true} >
                <PostChoiceModal />
            </DynamicModal>
        </Box>
    )
}

export default ArticleDetails

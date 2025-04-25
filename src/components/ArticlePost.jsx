import { Avatar, Box, CircularProgress, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BondCard2 from './BondCard'
import { camera, comment, downArrowFilled, dummyPhoto, emoji, like, pin, repost, send, unlike, user } from '../assets'
import OutlinedInput from './outline-input'
import DynamicModal from './dynamic-modal'
import ScheduleModal from './ScheduleModal'
import ShareModal from './ShareModal'
import ConfirmationModal from './ConfirmationModal'
import GroupShareModal from './GroupShareModal'
import RepostWithThoughts from './RepostWithThoughts'
import PostChoiceModal from './PostChoiceModal'
import { useSelector } from 'react-redux'
import { useCommentMutation, useGetPostCommentsQuery } from '../services/interaction'
import { toast } from 'react-toastify'
import Comment from './Comment'
import Button from './button'
import { Link, useNavigate } from 'react-router-dom'
import ShowLikesModal from './ShowLikesModal'

const ArticlePost = ({ userName, userRole, postTime, userImage, numberofLikes, isLiked, comments, commentsContent, friend, friendLiked, postContent, id, articleImage, articleTitle, articleDescription, isFriendPost, ownPost, lastUserLiked, handleLike, isLoading, isGroupPost, pinned, isAdminPost, groupPost, likesData }) => {

    const [showComments, setShowComments] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [thoughts, setThoughts] = useState("")
    const [showThoughtsModal, setShowThoughtsModal] = useState(false)
    const [groupShareModal, setGroupShareModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [postChoiceModal, setPostChoiceModal] = useState(false)
    const { user: userData } = useSelector((state) => state.auth);
    const [postId, setPostId] = useState("")
    const [commentContent, setCommentContent] = useState("")
    const [postComments, setPostComments] = useState([])
    const [totalComments, setTotalComments] = useState(comments)
    const [showLikesModal, setShowLikesModal] = useState(false)

    const [commentData, { data: postCommentData, isSuccess: postCommentSucces, isError: isPostCommentError, error: postCommentError, isLoading: postCommentLoading }] = useCommentMutation()

    const { data: getCommentsData, isSuccess: getCommentsSuccess, isError: isGetCommentsError, error: getCommentsError, isLoading: isGetCommentsLoading, refetch } = useGetPostCommentsQuery(postId, {
        skip: !postId,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })

    useEffect(() => setTotalComments(comments), [comments])

    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const HandleRepost = (event) => {
        if (event === "thoughts") {
            setShowThoughtsModal(true)
            handleCloseMenu()
        }
    }

    const HandleSuccess = () => {
        if (thoughts === "") {
            setShowConfirmModal(true)
        }
        else {
            setShowThoughtsModal(false)
        }
    }

    const HandleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            HandleComment(id);
        }
    }

    const CommentHandler = (id) => {
        setPostId(id)
        setShowComments(true)
    }

    const HandleComment = (id) => {
        const data = {
            content: commentContent,
            postId: id
        }
        commentData(data).then((res) => {
            if (res?.error) {
                toast.error(res?.error?.data?.message)
                return;
            }
            if (res?.data) {
                toast.success("Comment added successfully");
                setCommentContent("")
                refetch()
                setTotalComments(prev => prev + 1);
            }
        })
    }


    useEffect(() => {
        if (getCommentsSuccess && getCommentsData?.data) {
            const comments = getCommentsData.data.map((item) => {
                const hasLiked = item?.likes?.some((like) => like?.user?.id === userData?.id);

                return {
                    userImage: item?.user?.profileImage,
                    userName: `${item?.user?.firstName} ${item?.user?.lastName}`,
                    comment: item?.content,
                    time: item?.createdAt,
                    commentId: item?.id,
                    allLikes: item?.likes?.map((like) => ({
                        ...like.user,
                        isBond: like.isBond,
                    })) || [],
                    likesCount: item?.likesCount,
                    hasLiked: hasLiked,
                };
            });

            setPostComments(comments);

        }
    }, [getCommentsSuccess, getCommentsData])

    return (
        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            {
                isGroupPost &&
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", pb: "8px", borderBottom: "1px solid #E4E4E4" }}>
                        <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                            {pinned && <img src={pin} alt="" />}
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{pinned ? "Pinned by admin" : "Highlight this post by pinning it at the top."}</Typography>
                        </Box>
                        <Box
                            sx={{
                                width: "150px",
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
                            <Typography variant="gradientText">{pinned ? "Unpin" : "Pin this post"}</Typography>
                        </Box>
                    </Box>
                    {pinned && <Box sx={{ display: "flex", justifyContent: "space-between", py: "8px", borderBottom: "1px solid #E4E4E4" }}>
                        <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#505050" }}>
                                <Box component="span" sx={{ fontWeight: 500, color: "#171717" }}>
                                    rotten ria
                                </Box>{" "}
                                posted in free
                            </Typography>

                        </Box>
                        <img src={three_vertical_dots} alt="" />
                    </Box>}
                </Box>
            }
            <BondCard2 userImage={userImage} userName={userName} userRole={userRole} time={postTime} showWorldIcon showActionIcon isFriendPost={isFriendPost} ownPost={ownPost} isAdminPost={isAdminPost} groupPost={isGroupPost} />
            {postContent &&
                <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                </Typography>
            }
            <Link to={`/article/${id}`} style={{ textDecoration: 'none' }}>
                <Box sx={{
                    border: "1px solid #E4E4E4",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: 'column',
                    rowGap: "15px",
                    height: "375px",
                    backgroundColor: "#F2F8FD",
                    cursor: "pointer"
                }}>
                    <Box sx={{
                        height: "65%",
                        backgroundImage: `url("${articleImage ? articleImage : dummyPhoto}")`,
                        borderTopRightRadius: "8px",
                        borderTopLeftRadius: "8px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100.1%"
                    }} />
                    <Box sx={{ p: "0px 20px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>{articleTitle}</Typography>
                        <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#505050" }}>{userName}</Typography>
                        <Typography
                            sx={{ fontSize: "15px", fontWeight: "500", color: "#505050" }}
                            dangerouslySetInnerHTML={{
                                __html:
                                    articleDescription?.length > 94
                                        ? articleDescription?.slice(0, 93) + "..."
                                        : articleDescription,
                            }}
                        />
                    </Box>
                </Box>
            </Link>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px" }}>
                    {numberofLikes >= 1 && <img src={like} alt="Like" style={{ width: "13.43px", height: "12px" }} />}
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050", cursor: numberofLikes > 0 ? "pointer" : "text" }}
                        onClick={(numberofLikes > 0 && !isLoading) ? () => setShowLikesModal(true) : () => { }}
                    >
                        {numberofLikes === 0 ? (
                            "Be first to like this"
                        ) : isLiked && numberofLikes === 1 ? (
                            "You liked this post"
                        ) : isLiked && numberofLikes > 1 ? (
                            `You and ${numberofLikes - 1} more like this`
                        ) : numberofLikes === 1 ? (
                            `${lastUserLiked} likes this`
                        ) : (
                            `${lastUserLiked} and ${numberofLikes - 1} like this`
                        )}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>{totalComments} comments</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>•</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>0 reposts</Typography>
                </Box>
            </Box>
            <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
                {ownPost && <Box sx={{ display: "flex", columnGap: "5px", cursor: "pointer", width: { md: "15%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setPostChoiceModal(true)}>
                    <img src={user} alt="Image" style={{ width: "27px", height: "24px" }} />
                    <img src={downArrowFilled} alt="Image" style={{ width: "27px", height: "24px" }} />
                </Box>}
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={isLoading ? () => { } : () => handleLike(id)}>
                    <img src={isLiked ? like : unlike} alt="Like" style={{ width: "24px", height: '24px' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>{isLiked ? "Liked" : "Like"}</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => CommentHandler(id)}>
                    <img src={comment} alt="Like" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Comment</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={handleClick}>
                    <img src={repost} alt="Repost" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setShowShareModal(true)}>
                    <img src={send} alt="Repost" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Send</Typography>
                </Box>
            </Box>
            {
                showComments && <Box sx={{ px: { xs: "0px", md: '10px' }, display: "flex", flexDirection: "column", rowGap: "10px" }}>
                    <Box sx={{ display: "flex", columnGap: "5px", flexDirection: { xs: "column", md: "row" }, rowGap: "5px" }}>
                        {isGetCommentsLoading ?
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <LinearProgress
                                    sx={{ width: "100%", height: 6, bgcolor: "#F2F8FD", "& .MuiLinearProgress-bar": { backgroundColor: "white" } }}
                                />
                            </Box>
                            :
                            <>

                                <Avatar
                                    src={userData?.profileImage ? userData.profileImage : user}
                                    alt="User"
                                    sx={{ width: 60, height: 60, objectFit: "fill" }}
                                />

                                <Box sx={{ border: "1px solid #DDE2E4", width: "100%", display: "flex", pr: "10px", minHeight: '60px', flexDirection: commentContent ? "column" : "row", pb: commentContent ? '10px' : "0px", rowGap: "13px" }}>
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
                                        p: "10px"

                                    }} placeholder={"Add a comment"} onInputChange={(e) => setCommentContent(e.target.value)} value={commentContent} multiline={true} onKeyDown={HandleKeyDown} />
                                    <Box sx={{ display: "flex", alignItems: "center", pl: "10px", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", columnGap: "10px" }}>
                                            <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
                                            <img src={camera} alt="Camera" style={{ width: "24px", height: "24px" }} />
                                        </Box>
                                        {commentContent && <Button loading={postCommentLoading} onClick={() => HandleComment(id)} sx={{ width: "150px", height: "36px", color: "white" }}>Comment</Button>}
                                    </Box>
                                </Box>
                            </>
                        }
                    </Box>
                    {Array.isArray(postComments) && postComments?.length > 0 &&
                        postComments?.map((item, index) => (
                            <Comment
                                key={item?.commentId}
                                userImage={item?.userImage}
                                userName={item?.userName}
                                comment={item?.comment}
                                time={item?.time}
                                hasLiked={item?.hasLiked}
                                likesCount={item?.likesCount}
                                allLikes={item?.allLikes}
                                commentId={item?.commentId}
                            />
                        ))
                    }
                </Box>
            }
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={() => HandleRepost("thoughts")} sx={{ width: "245px" }}>Repost with your thoughts</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "245px" }}>Repost</MenuItem>
            </Menu>
            <DynamicModal open={postChoiceModal} handleClose={() => setPostChoiceModal(false)} title={"Comment, react, and repost as"} buttonText={"Save"} postModal={true} userName={"Areeba Shakeel"} hideFooter={true} smallModal={true} styledHeader={true} >
                <PostChoiceModal />
            </DynamicModal>

            <DynamicModal open={showThoughtsModal} handleClose={() => setShowThoughtsModal(false)} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} footerDirection={"flex-end"} onSuccess={HandleSuccess} handleGroupClick={() => setGroupShareModal(true)}>
                <RepostWithThoughts onChange={(e) => setThoughts(e.target.value)} />
            </DynamicModal>


            <DynamicModal open={groupShareModal} handleClose={() => setGroupShareModal(false)} title={"Repost to group"} buttonText={"Save"} postModal={true} userName={"Areeba Shakeel"} footerDirection={"space-between"} hideFooter={true}>
                <GroupShareModal />
            </DynamicModal>

            <ConfirmationModal open={showConfirmModal} handleClose={() => setShowConfirmModal(false)} title={"Repost without adding your thoughts?"}
                cancelButtonText={"Back"} acceptButtonText={"Yes, repost"}
                handleAccept={() => setShowConfirmModal(false)}
                handleCancel={() => setShowConfirmModal(false)}
            >
                <Typography sx={{ fontSize: "17px", fontWeight: "300", color: "#595959" }}>If you repost without adding your thoughts, all new comments & reactions will be added to XYZ’s post.</Typography>
            </ConfirmationModal>


            <DynamicModal open={showShareModal} handleClose={() => setShowShareModal(false)} title={"Share Areeba Shakeel’s Post"} postModal={true} dropdownHeader={false} hideFooter={true}>
                <ShareModal />
            </DynamicModal>

            <DynamicModal open={showScheduleModal} handleClose={() => setShowScheduleModal(false)} title={"Schedule post"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} smallModal={true} styledHeader={true} footerDirection={"space-between"}>
                <ScheduleModal />
            </DynamicModal>


            <DynamicModal open={showLikesModal} handleClose={() => setShowLikesModal(false)} title={"Likes"} hideFooter={true} smallModal={true} styledHeader={true}>
                <ShowLikesModal allLikes={likesData} />
            </DynamicModal>
        </Paper >
    )
}

export default ArticlePost

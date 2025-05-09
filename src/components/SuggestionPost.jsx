import { Avatar, Box, CircularProgress, colors, LinearProgress, Menu, MenuItem, Paper, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { camera, comment, commentOff, emoji, like, pin, plus, postPicture, refresh, repost, send, three_vertical_dots, unlike, user } from "../assets/index.js"
import OutlinedInput from './outline-input.jsx';
import Comment from './Comment.jsx';
import BondCard2 from './BondCard.jsx';
import DynamicModal from './dynamic-modal.jsx';
import ShareModal from './ShareModal.jsx';
import ScheduleModal from './ScheduleModal.jsx';
import RepostWithThoughts from './RepostWithThoughts.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import GroupShareModal from './GroupShareModal.jsx';
import PhotoDetailsModal from './PhotoDetailsModal.jsx';
import PostDetails from './PostDetails.jsx';
import VideoPost from './VideoPost.jsx';
import PollPost from './PollPost.jsx';
import EventPost from './EventPost.jsx';
import ArticlePost from './ArticlePost.jsx';
import { useCommentMutation, useGetPostCommentsQuery, useLikeMutation } from '../services/interaction.js';
import { useSelector } from 'react-redux';
import Button from './button.jsx';
import { toast } from 'react-toastify';
import ShowLikesModal from './ShowLikesModal.jsx';
import EditModal from './EditModal.jsx';

const SuggestionPost = ({ userId, userName, userRole, postTime, userImage, numberofLikes, isLiked, comments, activity, postPic, postContent, commentsContent, length, index, type, videoUrl, thumbnail, question, options, isVoted, eventName, eventImage, startTime, endTime, eventType, eventLink, attendees, eventPosts, id, articleImage, articleTitle, articleDescription, ownPost, isFriendPost, lastUserLiked, voteCount, endDate, pollId, isGroupPost, pinned, isAdminPost, groupPost, allLikesData, isSaved, postVisibility, commentVisibility, handlePostDelete, canComment, isPagePost, isUserPost, isPageFollowing, pageId, isGeneralPost, shareableLink }) => {
    const [likeData, { data, isSuccess, isError, error, isLoading }] = useLikeMutation()
    const theme = useTheme();
    const [showComments, setShowComments] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [showThoughtsModal, setShowThoughtsModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [thoughts, setThoughts] = useState("")
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [groupShareModal, setGroupShareModal] = useState(false)
    const [showPostDetails, setShowPostDetails] = useState(false)
    const [totalLikes, setTotalLikes] = useState(numberofLikes)
    const [isPostLiked, setIsPostLiked] = useState(isLiked)
    const { user: userData } = useSelector((state) => state.auth);
    const [postId, setPostId] = useState("")
    const [commentContent, setCommentContent] = useState("")
    const [postComments, setPostComments] = useState([])
    const [likesUserData, setLikesUserData] = useState(allLikesData)
    const [showLikesModal, setShowLikesModal] = useState(false)
    const [totalComments, setTotalComments] = useState(comments)
    const [showEditModal, setEditModal] = useState(false)
    const [visibility, setVisibility] = useState(postVisibility);
    const [commentSettings, setCommentSettings] = useState(commentVisibility)
    const [editTitle, setEditTitle] = useState(postContent)

    useEffect(() => setEditTitle(postContent), [postContent])

    const { data: getCommentsData, isSuccess: getCommentsSuccess, isError: isGetCommentsError, error: getCommentsError, isLoading: isGetCommentsLoading, refetch } = useGetPostCommentsQuery(postId, {
        skip: !postId,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })

    const [commentData, { data: postCommentData, isSuccess: postCommentSucces, isError: isPostCommentError, error: postCommentError, isLoading: postCommentLoading }] = useCommentMutation()

    useEffect(() => {
        setTotalLikes(numberofLikes)
        setIsPostLiked(isLiked)
        setLikesUserData(allLikesData)
        setTotalComments(comments)
    }, [numberofLikes, isLiked, allLikesData, comments])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            HandleComment(id);
        }
    };




    const LikeHandler = (id) => {
        const newLike = !isPostLiked
        setIsPostLiked(newLike)
        setTotalLikes(prevLikes => newLike ? prevLikes + 1 : prevLikes - 1);
        const newUser = {
            id: userData?.id,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            profileImage: userData?.profileImage,
            designation: userData?.designation,
            isBound: false
        };
        if (newLike) {
            setLikesUserData([...likesUserData, newUser])
        }
        else {
            const users = likesUserData?.filter((item) => item?.id !== userData?.id)
            setLikesUserData(users)
        }

        likeData({ entityId: id, type: "POST" });
    };

    useEffect(() => {
        if (isError && error?.data?.status === false) {
            const newLike = !isPostLiked
            setIsPostLiked(newLike)
            setTotalLikes(prevLikes => newLike ? prevLikes + 1 : prevLikes - 1);
            const newUser = {
                id: userData?.id,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                profileImage: userData?.profileImage,
                designation: userData?.designation,
                isBound: false
            };
            if (newLike) {
                setLikesUserData([...likesUserData, newUser])
            }
            else {
                const users = likesUserData?.filter((item) => item?.id !== userData?.id)
                setLikesUserData(users)
            }
        }
    }, [error, isError])

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

    useEffect(() => {
        if (isError && !error?.data?.status) {
            setIsPostLiked((prevLiked) => {
                const newLiked = !prevLiked;
                setTotalLikes((prevLikes) => newLiked ? prevLikes + 1 : prevLikes - 1);
                return newLiked;
            });
        }
    }, [isError, error]);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const CommentHandler = (id) => {
        setPostId(id)
        setShowComments(true)
    }


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

    const handleLastImageClick = () => {
        setShowPostDetails(true)
    }

    const AlertHandler = () => {
        toast.warning("Please login for actions")
    }

    return (
        <>
            {
                type === "video"
                    ?
                    <VideoPost userId={userId} userImage={userImage} userName={userName} userRole={userRole} postTime={postTime} postContent={postContent} numberofLikes={totalLikes} isLiked={isPostLiked} comments={comments} friendLiked={true} friend={"Albert"} videoUrl={videoUrl} thumbnail={thumbnail} isFriendPost={isFriendPost} ownPost={ownPost} id={id} handleLike={LikeHandler} lastUserLiked={lastUserLiked} isLoading={isLoading} isGroupPost={isGroupPost} pinned={pinned} isAdminPost={isAdminPost} likesData={likesUserData} isSaved={isSaved} postVisibility={postVisibility} commentSetting={commentSettings} handleDelete={handlePostDelete} canComment={canComment} isUserPost={isUserPost} isPageFollowing={isPageFollowing} isPagePost={isPagePost} isGeneralPost={isGeneralPost} shareableLink={shareableLink} />
                    :
                    type === "poll"
                        ?
                        <PollPost userId={userId} pollId={pollId} voteCount={voteCount} endDate={endDate} userImage={userImage} userName={userName} userRole={userRole} time={postTime} postContent={postContent} question={question} options={options} isVoted={isVoted} numberofLikes={totalLikes} isLiked={isPostLiked} comments={comments} friendLiked={true} friend={"Albert"} isFriendPost={isFriendPost} ownPost={ownPost} id={id} handleLike={LikeHandler} lastUserLiked={lastUserLiked} isLoading={isLoading} isGroupPost={isGroupPost} pinned={pinned} isAdminPost={isAdminPost} likesData={likesUserData} isSaved={isSaved} postVisibility={postVisibility} commentSetting={commentSettings} handleDelete={handlePostDelete} canComment={canComment} isUserPost={isUserPost} isPageFollowing={isPageFollowing} isPagePost={isPagePost} isGeneralPost={isGeneralPost} shareableLink={shareableLink} />
                        :
                        type === "event"
                            ?
                            <EventPost userId={userId} userName={userName} userRole={userRole} postTime={postTime} userImage={userImage} numberofLikes={totalLikes} isLiked={isPostLiked} comments={comments} friendLiked={true} friend={"Albert"} eventName={eventName} eventImage={eventImage} startTime={startTime} endTime={endTime} eventType={eventType} eventLink={eventLink} attendees={attendees} eventPosts={eventPosts} postContent={postContent} id={id} isFriendPost={isFriendPost} ownPost={ownPost} handleLike={LikeHandler} lastUserLiked={lastUserLiked} isLoading={isLoading} isGroupPost={isGroupPost} pinned={pinned} isAdminPost={isAdminPost} likesData={likesUserData} isSaved={isSaved} postVisibility={postVisibility} commentSetting={commentSettings} handleDelete={handlePostDelete} canComment={canComment} isUserPost={isUserPost} isPageFollowing={isPageFollowing} isPagePost={isPagePost} shareableLink={shareableLink} />
                            :
                            type === "article"
                                ?
                                <ArticlePost userId={userId} userName={userName} userRole={userRole} postTime={postTime} userImage={userImage} numberofLikes={totalLikes} isLiked={isPostLiked} comments={comments} friendLiked={true} friend={"Albert"} id={id} postContent={postContent} articleImage={articleImage} articleTitle={articleTitle} articleDescription={articleDescription} isFriendPost={isFriendPost} ownPost={ownPost} handleLike={LikeHandler} lastUserLiked={lastUserLiked} isLoading={isLoading} isGroupPost={isGroupPost} pinned={pinned} isAdminPost={isAdminPost} likesData={likesUserData} isSaved={isSaved} handleDelete={handlePostDelete} postVisibility={postVisibility} commentSetting={commentSettings} canComment={canComment} isUserPost={isUserPost} isPageFollowing={isPageFollowing} isPagePost={isPagePost} shareableLink={shareableLink} />
                                :
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
                                    {/* {
                                        (!isFriendPost && !ownPost) && <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <Typography sx={{ color: "#171717", fontSize: "14px", fontWeight: "400" }}>
                                                {activity}
                                            </Typography>
                                            <img src={three_vertical_dots} alt="Info" style={{ cursor: "pointer" }} />
                                        </Box>
                                    } */}
                                    <BondCard2 id={userId} userImage={userImage} userName={userName} userRole={userRole} time={postTime} isFriendPost={isFriendPost} ownPost={ownPost} isAdminPost={isAdminPost} groupPost={groupPost} postId={id} isSaved={isSaved} handleEdit={() => setEditModal(true)} handleDelete={handlePostDelete} visibility={visibility} commentSetting={commentSettings} type={postPic?.length > 0 ? "IMAGE" : "TEXT"} isPagePost={isPagePost} isUserPost={isUserPost} isPageFollowing={isPageFollowing} pageId={pageId} isGeneralPost={isGeneralPost} shareableLink={shareableLink} />
                                    {postContent &&
                                        <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                                        </Typography>
                                    }
                                    {(postPic && Array.isArray(postPic) && postPic?.length === 1) && <img src={postPic[0]} alt="Post" style={{ height: "375px", cursor: "pointer" }} onClick={handleLastImageClick} />}
                                    {
                                        (postPic && Array.isArray(postPic) && postPic?.length > 1) &&
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <img src={postPic[0]} alt="Post" style={{ width: "77%", objectFit: "cover", minHeight: "375px", maxHeight: "375px", cursor: "pointer" }} onClick={handleLastImageClick} />
                                            <Box sx={{ width: "20%", display: "flex", flexDirection: "column", height: "375px", justifyContent: "space-between" }}>
                                                {postPic?.slice(1, 4)?.map((item, index) => {
                                                    return (
                                                        <Box sx={{ width: "100%", height: postPic.length === 2 ? "100%" : postPic.length === 3 ? "48%" : "30%", objectFit: "cover", backgroundImage: `url("${item}")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "relative", cursor: "pointer" }} key={index} onClick={handleLastImageClick}
                                                        >
                                                            {
                                                                (postPic?.length > 4 && index === 2) &&
                                                                <Box
                                                                    sx={{
                                                                        position: "absolute",
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        backgroundColor: "#00000033",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        color: "#fff",
                                                                        fontSize: "20px",
                                                                        fontWeight: "bold",
                                                                        columnGap: "5px"
                                                                    }}
                                                                >
                                                                    <img src={plus} alt="Icon" style={{ width: "16px", height: "16px" }} />
                                                                    <Typography variant='gradientText' sx={{ fontSize: "24px", fontWeight: 600 }}>{postPic?.length - 4}</Typography>
                                                                </Box>
                                                            }
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                    }
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px" }}>
                                            {totalLikes >= 1 && <img src={like} alt="Like" style={{ width: "13.43px", height: "12px" }} />}
                                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050", cursor: totalLikes > 0 ? "pointer" : "text" }}
                                                onClick={isGeneralPost ? AlertHandler : (totalLikes > 0 && !isLoading) ? () => setShowLikesModal(true) : () => { }}
                                            >
                                                {totalLikes === 0 ? (
                                                    "Be first to like this"
                                                ) : isPostLiked && totalLikes === 1 ? (
                                                    "You liked this post"
                                                ) : isPostLiked && totalLikes > 1 ? (
                                                    `You and ${totalLikes - 1} more like this`
                                                ) : totalLikes === 1 ? (
                                                    `${lastUserLiked} likes this`
                                                ) : (
                                                    `${lastUserLiked} and ${totalLikes - 1} like this`
                                                )}
                                            </Typography>

                                        </Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>{totalComments} comments</Typography>
                                    </Box>
                                    <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
                                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={isGeneralPost ? AlertHandler : isLoading ? () => { } : () => LikeHandler(id)}>
                                            <img src={isPostLiked ? like : unlike} alt="Like" style={{ width: "24px", height: "24px" }} />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>{isPostLiked ? "Liked" : "Like"}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={isGeneralPost ? AlertHandler : () => CommentHandler(id)}>
                                            <img src={comment} alt="Like" />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Comment</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={isGeneralPost ? AlertHandler : handleClick}>
                                            <img src={repost} alt="Like" />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
                                        </Box>
                                        {visibility === "PUBLIC" && <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={isGeneralPost ? AlertHandler : () => setShowShareModal(true)}>
                                            <img src={send} alt="Like" />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Share</Typography>
                                        </Box>}
                                    </Box>
                                    {
                                        showComments && <Box sx={{ px: { xs: "0px", md: '10px' }, display: "flex", flexDirection: "column", rowGap: "10px" }}>
                                            <Box sx={{ display: "flex", columnGap: "5px", flexDirection: { xs: "column", md: "row" } }}>
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
                                                        {canComment ?
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

                                                                    }} placeholder={"Add a comment"} onInputChange={(e) => setCommentContent(e.target.value)} value={commentContent} multiline={true} onKeyDown={handleKeyDown} />
                                                                    <Box sx={{ display: "flex", alignItems: "center", pl: "10px", justifyContent: "space-between" }}>
                                                                        <Box sx={{ display: "flex", columnGap: "10px" }}>
                                                                            <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
                                                                            <img src={camera} alt="Camera" style={{ width: "24px", height: "24px" }} />
                                                                        </Box>
                                                                        {commentContent && <Button loading={postCommentLoading} onClick={() => HandleComment(id)} sx={{ width: "150px", height: "36px", color: "white" }}>Comment</Button>}
                                                                    </Box>
                                                                </Box>
                                                            </>
                                                            :
                                                            <Box sx={{ backgroundColor: "#F2F8FD", p: "10px", display: "flex", columnGap: "5px", width: "100%" }}>
                                                                <img src={commentOff} alt="Icon" />
                                                                <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Comments are restricted on this post.</Typography>
                                                            </Box>
                                                        }
                                                    </>
                                                }
                                            </Box>
                                            {Array.isArray(postComments) && postComments?.length > 0 &&
                                                postComments?.map((item, index) => (
                                                    <Comment key={item?.commentId} userImage={item?.userImage} userName={item?.userName} comment={item?.comment} time={item?.time} hasLiked={item?.hasLiked} likesCount={item?.likesCount} allLikes={item?.allLikes} commentId={item?.commentId} />
                                                ))
                                            }
                                        </Box>
                                    }
                                    {
                                        index === length - 1 && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "4px", cursor: "pointer" }}>
                                            <img src={refresh} alt="Refresh" />
                                            <Typography sx={{ fontSize: "10px", fontWeight: 300, color: "#505050" }}>Load more</Typography>
                                        </Box>
                                    }
                                </Paper>
            }


            <DynamicModal open={showShareModal} handleClose={() => setShowShareModal(false)} title={`Share ${userName} Post`} postModal={true} dropdownHeader={false} hideFooter={true}>
                <ShareModal shareableLink={shareableLink} handleClose={() => setShowShareModal(false)} />
            </DynamicModal>

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

            <DynamicModal open={showThoughtsModal} handleClose={() => setShowThoughtsModal(false)} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} footerDirection={"flex-end"} onSuccess={HandleSuccess} handleGroupClick={() => setGroupShareModal(true)}>
                <RepostWithThoughts onChange={(e) => setThoughts(e.target.value)} />
            </DynamicModal>

            <DynamicModal open={showScheduleModal} handleClose={() => setShowScheduleModal(false)} title={"Schedule post"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} smallModal={true} styledHeader={true} footerDirection={"space-between"}>
                <ScheduleModal />
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

            <PhotoDetailsModal open={showPostDetails} handleClose={() => setShowPostDetails(false)}>
                <PostDetails images={postPic} userImage={userImage} userName={userName} userRole={userRole} postTime={postTime} postContent={postContent} numberofLikes={totalLikes} isLiked={isPostLiked} comments={totalComments} friendLiked={true} friend={"Albert"} handleModalClose={() => setShowPostDetails(false)} lastUserLiked={lastUserLiked} id={id} isLoading={isLoading} handleLike={LikeHandler} handleCommentCounter={() => setTotalComments(prev => prev + 1)} likesData={likesUserData} ownPost={ownPost} friendPost={isFriendPost} isSaved={isSaved} isUserPost={isUserPost} isPageFollowing={isPageFollowing} isPagePost={isPagePost} visibility={visibility} commentSetting={commentSettings} pageId={pageId} userId={userId} isGeneralPost={isGeneralPost} shareableLink={shareableLink} />
            </PhotoDetailsModal>

            <DynamicModal open={showLikesModal} handleClose={() => setShowLikesModal(false)} title={"Likes"} hideFooter={true} smallModal={true} styledHeader={true}>
                <ShowLikesModal allLikes={likesUserData} />
            </DynamicModal>

            <DynamicModal open={showEditModal} handleClose={() => setEditModal(false)} dropdownHeader={true} userData={userData}
                userName={`${userData?.firstName} ${userData?.lastName}`} hideFooter={true} visibility={visibility}
                setVisibility={setVisibility} isEditModal={true}>
                <EditModal type={"normal"} title={editTitle} id={id} normalPostData={{ images: postPic }} handleClose={() => setEditModal(false)} visibility={visibility} commentSetting={commentSettings} />
            </DynamicModal>
        </>
    )
}

export default SuggestionPost

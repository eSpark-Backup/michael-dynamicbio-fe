import { Avatar, Box, CircularProgress, FormControlLabel, LinearProgress, Menu, MenuItem, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BondCard2 from './BondCard';
import { camera, comment, emoji, like, repost, send, unlike, user } from '../assets';
import DynamicModal from './dynamic-modal';
import RepostWithThoughts from './RepostWithThoughts';
import GroupShareModal from './GroupShareModal';
import ConfirmationModal from './ConfirmationModal';
import ShareModal from './ShareModal';
import ScheduleModal from './ScheduleModal';
import OutlinedInput from './outline-input';
import RemovePostModal from './RemovePostModal';
import ViewPolls from './ViewPolls';
import { useSelector } from 'react-redux';
import { useCommentMutation, useGetPostCommentsQuery } from '../services/interaction';
import Button from './button';
import Comment from './Comment';
import { toast } from 'react-toastify';

const PollPost = ({ userImage, userName, userRole, time, postContent, question, options, isVoted, numberofLikes, friendLiked, friend, isLiked, comments, commentsContent, isFriendPost, ownPost, id, handleLike, lastUserLiked, isLoading }) => {

  const initialSelectedValue = options?.find(option => option.isChecked)?.value || "";


  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);
  const [showComments, setShowComments] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [thoughts, setThoughts] = useState("")
  const [showThoughtsModal, setShowThoughtsModal] = useState(false)
  const [groupShareModal, setGroupShareModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [postRemoveModal, setPostRemoveModal] = useState(false)
  const [viewVotes, setViewVotes] = useState(false)
  const { user: userData } = useSelector((state) => state.auth);
  const [postId, setPostId] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [postComments, setPostComments] = useState([])

  const [commentData, { data: postCommentData, isSuccess: postCommentSucces, isError: isPostCommentError, error: postCommentError, isLoading: postCommentLoading }] = useCommentMutation()

  const { data: getCommentsData, isSuccess: getCommentsSuccess, isError: isGetCommentsError, error: getCommentsError, isLoading: isGetCommentsLoading, refetch } = useGetPostCommentsQuery(postId, { skip: !postId })


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

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
      }
    })
  }


  useEffect(() => {
    if (getCommentsSuccess && getCommentsData?.data) {
      const comments = getCommentsData?.data?.map((item) => ({
        userImage: item?.user?.profileImage,
        userName: `${item?.user?.firstName} ${item?.user?.lastName}`,
        comment: item?.content,
        time: "14m ago"
      }))
      setPostComments(comments)

    }
  }, [getCommentsSuccess, getCommentsData])

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
      <BondCard2 userName={userName} userImage={userImage} userRole={userRole} time={time} showActionIcon={true} showWorldIcon={true} handleClose={() => setPostRemoveModal(true)} isFriendPost={isFriendPost} ownPost={ownPost} />
      {postContent &&
        <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}></Typography>
      }
      <Box sx={{ backgroundColor: "#FCFCFC", borderRadius: "4px", p: { xs: "5px", md: "24px 32px" } }}>
        <Box sx={{ minHeight: "250px", width: "100%", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E4", maxHeight: "350px", overflowY: "auto", p: "25px 0px 5px 0px", display: "flex", flexDirection: "column", rowGap: "20px" }}>
          <Box sx={{ backgroundColor: "#F2F8FD", borderRadius: "2px", border: "1px solid #E4E4E4", p: "15px 25px", fontSize: "18px", fontWeight: "500", color: "#171717" }}>
            {question}
          </Box>

          <RadioGroup name='groups' value={selectedValue} onChange={handleChange} sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            {options?.map((item, index) => (
              <Box sx={{ display: "flex", p: "10px 35px", alignItems: "center", backgroundColor: "#FCFCFC", justifyContent: "space-between" }} key={index}>
                <Box sx={{
                  display: "flex", width: "95%", alignItems: "center", minHeight: "20px", py: "0px", maxHeight: "45px",
                  background: selectedValue === item.value ? `linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)` : "#FCFCFC", cursor: "pointer", p: "4px"
                }} onClick={() => handleChange({ target: { value: item.value } })}>
                  <FormControlLabel
                    value={item.value}
                    control={
                      <Radio
                        sx={{
                          marginRight: "0px !important",
                          p: "0px 9px 0px 5px",
                          color: selectedValue === item.value ? "#171717" : "default",
                          '&.Mui-checked': {
                            color: "#fff",
                          }
                        }}
                      />
                    }
                    sx={{ marginRight: "0px !important", p: "0px 9px 0px 4px" }}
                  />
                  <Typography sx={{ fontSize: "16px", fontWeight: "500", color: selectedValue === item?.value ? "#FFFFFF" : "#171717" }}>{item.value}</Typography>

                </Box>
                <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>{item.numbersVoted}</Typography>
              </Box>
            ))}
          </RadioGroup>

          <Box sx={{ display: "flex", columnGap: "4px", alignItems: "center", pl: "5px" }}>
            {ownPost && <>
              <Typography sx={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }} variant='gradientText' onClick={() => setViewVotes(true)}>0 votes</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>•</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>2d left</Typography>
            </>}
            {/* {
              selectedValue !== "" &&
              <>
                <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>•</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "500" }} variant='gradientText'>Undo</Typography>
              </>
            } */}
            {
              selectedValue !== "" && ownPost &&
              <>
                <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>•</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "500", cursor: "pointer" }} variant='gradientText' onClick={() => setSelectedValue("")}>Undo</Typography>
              </>
            }
            {
              selectedValue !== "" && !ownPost &&
              <>
                <Typography sx={{ fontSize: "14px", fontWeight: "500", cursor: "pointer" }} variant='gradientText' onClick={() => setSelectedValue("")}>Undo</Typography>
              </>
            }
          </Box>

        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px", cursor: "pointer" }}>
          {numberofLikes >= 1 && <img src={like} alt="Like" style={{ width: "13.43px", height: "12px" }} />}
          <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
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
          <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>{comments} comments</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>•</Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>0 reposts</Typography>
        </Box>
      </Box>
      <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={isLoading ? () => { } : () => handleLike(id)}>
          <img src={isLiked ? like : unlike} alt="Like" style={{ width: "24px", height: '24px' }} />
          <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>{isLiked ? "Liked" : "Like"}</Typography>
        </Box>
        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => CommentHandler(id)}>
          <img src={comment} alt="Like" />
          <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Comment</Typography>
        </Box>
        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={handleClick}>
          <img src={repost} alt="Like" />
          <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
        </Box>
        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setShowShareModal(true)}>
          <img src={send} alt="Like" />
          <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Share</Typography>
        </Box>
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
              <Comment key={index} userImage={item?.userImage} userName={item?.userName} comment={item?.comment} time={item?.time} />
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

      <DynamicModal open={postRemoveModal} handleClose={() => setPostRemoveModal(false)} title={"Post removed from your feed"} postModal={true} styledHeader={true} hideFooter={true} smallModal={true} showUndoText={true}>
        <RemovePostModal />
      </DynamicModal>

      <DynamicModal open={viewVotes} handleClose={() => setViewVotes(false)} title={"Votes"} postModal={true} styledHeader={true} hideFooter={true} smallModal={true}>
        <ViewPolls />
      </DynamicModal>
    </Paper>
  );
}

export default PollPost;

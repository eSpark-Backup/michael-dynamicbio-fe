import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  comment,
  copyLink,
  deleteIcon,
  earth,
  editBlue,
  like,
  user,
  verticleDots,
} from "../assets";
import { toast } from "react-toastify";
import { useDeletePostByIdMutation } from "../services/post";
import { copyToClipboard } from "../utils";
import EditModal from "./EditModal";
import DynamicModal from "./dynamic-modal";
import {
  ControlBar,
  CurrentTimeDisplay,
  FullscreenToggle,
  PlaybackRateMenuButton,
  Player,
  PlayToggle,
  ProgressControl,
  VolumeMenuButton,
} from "video-react";

const PostSlider = ({ page, posts, refetch }) => {
  const { user: userData } = useSelector((state) => state.auth);
  const [showEditModal, setEditModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPostId(id);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const [start, setStart] = useState(0);
  const visibleCards = 2;

  const handlePrev = () => {
    if (start > 0) setStart(start - 1);
  };

  const handleNext = () => {
    if (start + visibleCards < posts.length) setStart(start + 1);
  };

  const [deletePost, { isLoading: deletePostLoading }] =
    useDeletePostByIdMutation();

  const HandleMenuItemClicked = async (e, event) => {
    if (event === "delete") {
      const res = await deletePost(postId);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong");
        return;
      } else if (res?.data) {
        refetch();
        toast.success(res?.data?.message);
      }
    } else if (event === "edit") {
      const currentPost = posts?.find((item) => item?.id === postId);
      
      if (currentPost?.type === "article") {
        navigate(`/article/edit/${postId}`);
      } else {
        setEditModal(currentPost);
      }
    } else if (event === "copy") {
      copyToClipboard(`${import.meta.env.VITE_BASE_URL_FE}/post/${postId}`);
    }
    handleClose(e);
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", padding: 2 }}>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Box>
          <IconButton onClick={handlePrev} disabled={start === 0}>
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={start + visibleCards >= posts.length}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transform: `translateX(-${start * 320}px)`,
            transition: "transform 0.3s ease",
            gap: 2,
          }}
        >
          {posts.map((post) => {
            return (
              <Card
                key={post.id}
                sx={{ width: 300, height: 400, flexShrink: 0 }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "0 !important",
                  }}
                >
                  {/* Top Section */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ p: 1 }}
                  >
                    <Stack
                      direction="row"
                      gap={1}
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <img
                        style={{ borderRadius: "5px" }}
                        width={60}
                        height={60}
                        src={page?.logoUrl ? page?.logoUrl : user}
                        alt="profile"
                      />
                      <Box>
                        <Typography
                          sx={{ color: "#171717", lineHeight: "20px" }}
                        >
                          {page?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#505050", lineHeight: "20px" }}
                        >
                          {page?.followerCount} followers
                        </Typography>
                        <Stack direction="row" gap={1} alignItems="center">
                          <Typography
                            sx={{ color: "#505050", lineHeight: "15px" }}
                            variant="body2"
                          >
                            {post?.postTime}
                          </Typography>
                          <img
                            src={earth}
                            alt="Icon"
                            style={{ width: "14px", height: "14px" }}
                          />
                        </Stack>
                      </Box>
                    </Stack>
                    <img
                      onClick={(e) => handleClick(e, post?.id)}
                      style={{ cursor: "pointer" }}
                      src={verticleDots}
                      alt="menu"
                    />
                  </Stack>

                  {/* Middle flexible content */}
                  <Box
                    sx={{
                      flex: 1, // makes this area expand/shrink
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      p: 1,
                    }}
                  >
                    <Typography fontSize="20px" fontWeight="bold">
                      {post?.postContent}
                    </Typography>

                    {post?.type === "normal" && post?.postPic?.length > 0 && (
                      <img
                        style={{
                          width: "100%",
                          height: "auto", // auto for responsiveness
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        src={post?.postPic[0]}
                      />
                    )}

                    {post?.type === "article" && post?.articleImage && (
                      <img
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        src={post?.articleImage}
                      />
                    )}

                    {post?.type === "event" && post?.eventImage && (
                      <img
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        src={post?.eventImage}
                      />
                    )}

                    {post?.type === "video" && post?.videoUrl && (
                      <Player
                        playsInline
                        poster={post?.thumbnail}
                        src={post?.videoUrl}
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      >
                        <ControlBar autoHide={false}>
                          <PlayToggle order={1} />
                          <ProgressControl order={2} />
                          <CurrentTimeDisplay order={3} />
                          <PlaybackRateMenuButton
                            rates={[0.5, 1, 1.5, 2]}
                            order={4}
                          />
                          <VolumeMenuButton order={5} />
                          <FullscreenToggle order={6} />
                        </ControlBar>
                      </Player>
                    )}
                    {post?.type === "poll" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        {/* Poll Question */}
                        <Typography
                          fontSize="16px"
                          fontWeight="600"
                          color="text.primary"
                        >
                          {post?.question}
                        </Typography>

                        {/* Poll Options (Radio Group) */}
                        <RadioGroup
                          name={`poll-${post?.id}`} // unique name per poll
                          onChange={(e) =>
                            console.log("Selected option:", e.target.value)
                          }
                        >
                          {post?.options?.map((option, index) => (
                            <FormControlLabel
                              key={index}
                              value={option}
                              control={<Radio />}
                              label={option}
                              sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: "8px",
                                px: 1,
                                py: 0.5,
                                "&:hover": { backgroundColor: "#f9f9f9" },
                              }}
                            />
                          ))}
                        </RadioGroup>
                      </Box>
                    )}
                  </Box>

                  {/* Bottom Section */}
                  <Box sx={{ p: 1 }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      {post?.numberofLikes > 0 && (
                        <>
                          <Typography>{post?.numberofLikes}</Typography>
                          <img width={20} src={like} alt="like" />
                        </>
                      )}
                    </Stack>

                    <Divider sx={{ my: 1 }} />

                    <Stack direction="row" justifyContent="center">
                      <img
                        onClick={() => navigate(`/post/${post?.id}`)}
                        style={{ cursor: "pointer" }}
                        src={comment}
                        alt="comment"
                      />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={(e) => HandleMenuItemClicked(e, "edit")}
          sx={{ width: "245px", display: "flex", columnGap: "10px" }}
        >
          <img
            src={editBlue}
            alt="Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Edit post
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={(e) => HandleMenuItemClicked(e, "copy")}
          sx={{ width: "245px", display: "flex", columnGap: "10px" }}
        >
          <img
            src={copyLink}
            alt="Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Copy link to post
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={
            deletePostLoading
              ? () => {}
              : (e) => HandleMenuItemClicked(e, "delete")
          }
          sx={{ width: "245px", display: "flex", columnGap: "10px" }}
        >
          {!deletePostLoading && (
            <img
              src={deleteIcon}
              alt="Icon"
              style={{ width: "24px", height: "24px" }}
            />
          )}
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            {deletePostLoading ? "loading" : "Delete post"}
          </Typography>
        </MenuItem>
      </Menu>
      <DynamicModal
        open={showEditModal?.id}
        handleClose={() => setEditModal(false)}
        dropdownHeader={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        hideFooter={true}
        visibility={showEditModal?.postVisibility}
        isEditModal={true}
      >
        <EditModal
          type={"normal"}
          title={showEditModal?.postContent}
          id={showEditModal?.id}
          normalPostData={{ images: showEditModal?.postPic }}
          handleClose={() => setEditModal(false)}
          visibility={showEditModal?.postVisibility}
          commentSetting={showEditModal?.commentVisibility}
          refetch={refetch}
        />
      </DynamicModal>
    </Box>
  );
};

export default PostSlider;

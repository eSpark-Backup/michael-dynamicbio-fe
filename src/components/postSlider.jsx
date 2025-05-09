import React, { useState } from "react";
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
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  comment,
  copyLink,
  deleteIcon,
  earth,
  editBlue,
  like,
  verticleDots,
} from "../assets";
import { toast } from "react-toastify";
import { useDeletePostByIdMutation } from "../services/post";
import { copyToClipboard } from "../utils";
import EditModal from "./EditModal";
import DynamicModal from "./dynamic-modal";

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
      console.log(currentPost, "currentPost");
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
              <Card key={post.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                <CardContent sx={{ padding: "0 !important" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="center"
                      gap={1}
                    >
                      <img
                        style={{ borderRadius: "5px" }}
                        width={60}
                        height={60}
                        src={page?.logoUrl}
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

                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap={1}
                    sx={{ width: "100%", height: "200px" }}
                  >
                    <Typography mt={2} fontSize="20px" fontWeight="bold">
                      {post?.postContent}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap={1}
                    >
                      {post?.numberofLikes > 0 && (
                        <>
                          <Typography>{post?.numberofLikes}</Typography>
                          <img width={20} src={like} alt="like" />
                        </>
                      )}
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 2 }} />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      onClick={() => navigate(`/post/${post?.id}`)}
                      style={{ cursor: "pointer" }}
                      src={comment}
                      alt="comment"
                    />
                  </Stack>
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

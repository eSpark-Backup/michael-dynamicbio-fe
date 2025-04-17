import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  deleteIcon,
  downArrowFilled,
  edit,
  photo,
  profile2,
  profilePicture,
  uploadIcon,
} from "../../../assets/index.js";
import BoxWithTextIcon from "../../../components/BoxWithTextIcon.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import DynamicModal from "../../../components/dynamic-modal.jsx";
import ViewArticle from "../../../components/ViewArticle.jsx";
import ScheduleModal from "../../../components/ScheduleModal.jsx";
import { useSelector } from "react-redux";
import { useEditPostMutation, useGetPostByIdQuery, useNewPostMutation } from "../../../services/post.js";
import { useNavigate, useParams } from "react-router-dom";

const modules = {
  toolbar: "#toolbar-container",
};

const Article = ({ userName = "Abdul Rehman" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const openMenu = Boolean(anchorEl);
  const openMenu2 = Boolean(anchorEl2);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreveiwImage] = useState(null);
  const [viewArticleModal, setViewArticleModal] = useState(false);
  const [toSendValues, setToSendValues] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuClose2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreveiwImage(URL.createObjectURL(file));
  };

  const [content, setContent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [schedule, setSchedule] = useState({
    date: null,
    time: null,
  });
  const { id } = useParams();
  const { data, isSuccess, isLoading: articleDetailsLoading, isError, error } = useGetPostByIdQuery(id, { skip: !id })

  useEffect(() => {
    if (isSuccess && data?.data) {
      setContent(data?.data?.content?.content)
      setArticleTitle(data?.data?.content?.articleTitle)
      setTitle(data?.data?.content?.title)
      setSelectedFile(data?.data?.media["ARTICLES"][0]?.url)
      setPreveiwImage(data?.data?.media["ARTICLES"][0]?.url)
    }
  }, [data, isSuccess])

  const HandleImageDelete = () => {
    setSelectedFile(null);
    setPreveiwImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  };

  const HandleNext = () => {
    const strippedContent = content?.replace(/<[^>]*>/g, "").trim();

    if (
      (articleTitle === "" || articleTitle.trim() === "") &&
      (!strippedContent || strippedContent === "")
    ) {
      toast.error(
        "A title and body text are required to publish your article."
      );
      return;
    }

    if (articleTitle === "" || articleTitle.trim() === "") {
      toast.error("A title is required to publish your article.");
      return;
    }

    if (!strippedContent || strippedContent === "") {
      toast.error("Body text is required to publish your article.");
      return;
    }
    setViewArticleModal(true);
    setToSendValues({
      userName: `${userData?.firstName} ${userData?.lastName}`,
      title: articleTitle,
      selectedFile,
    });
  };

  const { user: userData } = useSelector((state) => state.auth);
  const [newPost, { isLoading }] = useNewPostMutation();
  const [editPost, { isLoading: editPostLoading }] = useEditPostMutation();
  const navigate = useNavigate();

  const handleArticlePost = () => {
    const obj = {
      content: {
        title,
        content,
        articleTitle,
        ...(schedule.date && schedule.time ? { schedule } : {}),
      },
      status: "PUBLISH",
      visibility,
      type: "ARTICLE",
      cover: selectedFile,
      id: id
    };
    if (id) {
      editPost(obj).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success("Your post is updated successfully");
          setTitle("");
          setArticleTitle("");
          setContent("");
          setViewArticleModal(false);
          navigate(-1);
        }
      });
    }
    else {
      newPost(obj).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success("Your post is uploaded successfully");
          setTitle("");
          setArticleTitle("");
          setContent("");
          setViewArticleModal(false);
          navigate(-1);
        }
      });
    }
    console.log(obj)
  };

  if (articleDetailsLoading) {
    return (
      <Box sx={{ width: "100%", height: "calc(100vh - 150px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
      <Box
        sx={{
          borderBottom: "1px solid rgb(140 140 140/.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: "15px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "80%", lg: "70%" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: "10px",
            px: { xs: "20px", md: "0px" },
          }}
        >
          <Box
            sx={{ display: "flex", columnGap: "15px", alignItems: "center" }}
          >
            <img
              style={{ width: "44px", height: "44px", borderRadius: "50%" }}
              src={userData?.profileImage}
              alt="Avatar"
            />
            <Stack direction={"column"}>
              <Stack direction={"row"} gap={1}>
                <Typography
                  sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}
                >{`${userData?.firstName} ${userData?.lastName}`}</Typography>
                <img
                  src={downArrowFilled}
                  alt="Icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                />
              </Stack>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
              >
                Individual Article
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              backgroundColor: "#f4f2ee",
              padding: { xs: "0.4rem 0.4rem", md: "0.4rem 2.4rem" },
              borderRadius: "2.4rem",
              width: { xs: "100%", md: "auto" },
            }}
          >
            <div id="toolbar-container">
              <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-list" value="ordered"></button>
                <button className="ql-blockquote"></button>
                <button className="ql-code-block"></button>
                <button className="ql-divider"></button>
                <button className="ql-link"></button>
                <button className="ql-image"></button>
              </span>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "10px",
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Box
              onClick={handleClick2}
              sx={{
                width: { xs: "100%", sm: "150px" },
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
              <Typography
                variant="gradientText"
                sx={{ fontSize: "16px", fontWeight: "400" }}
              >
                Manage
              </Typography>
            </Box>
            <Button
              sx={{ width: { xs: "100%", sm: "150px" }, height: "36px" }}
              onClick={HandleNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: previewImage ? "transparent" : "#f4f2ee",
          maxWidth: { xs: "90%", md: "720px" },
          height: "305px",
          margin: "0 auto 3.2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "inset 0 0 0 1px rgb(140 140 140 / .2)",
          flexDirection: "column",
          rowGap: "15px",
          minWidth: { md: "720px" },
          backgroundImage: previewImage ? `url(${previewImage})` : "none",
          backgroundSize: "contain",
          backgroundPosition: "center",
          position: "relative",
          cursor: previewImage ? "pointer" : "default",
          overflow: "hidden",
          backgroundRepeat:"no-repeat",

          "&:hover::after": previewImage
            ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(0 0 0 / 0.6)",
            }
            : {},

          "&:hover .cover-text": {
            opacity: 1,
          },
        }}
      >
        {previewImage && (
          <Box
            className="cover-text"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px 10px",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "4px",
              opacity: 0,
              transition: "opacity 0.3s ease",
              zIndex: 1,
              display: "flex",
              columnGap: "10px",
            }}
          >
            <Box
              sx={{
                height: "30px",
                width: "30px",
                backgroundColor: "white",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={edit}
                alt="Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </Box>
            <Box
              sx={{
                height: "30px",
                width: "30px",
                backgroundColor: "white",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={HandleImageDelete}
            >
              <img
                src={deleteIcon}
                alt="Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </Box>
          </Box>
        )}

        {!previewImage && (
          <>
            <img
              src={photo}
              alt="Icon"
              style={{ width: "64px", height: "64px" }}
            />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#505050",
                textAlign: "center",
              }}
            >
              We recommend uploading or dragging in an image that is{" "}
              <span style={{ color: "#171717", fontWeight: "500" }}>
                1920x1080 pixels
              </span>
            </Typography>
            <Box
              sx={{ width: { xs: "95%", md: "310px" }, cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              <BoxWithTextIcon
                text={"Upload from Computer"}
                icon={uploadIcon}
              />
            </Box>
          </>
        )}
      </Box>

      <Box
        sx={{
          maxWidth: "720px",
          minWidth: { md: "720px" },
          margin: "0 auto 3.2rem",
        }}
      >
        <TextField
          placeholder="Title"
          sx={{
            backgroundColor: "transparent",
            border: "none",
            margin: { xs: "0px", md: "0 2.4rem" },
            "& .MuiInputBase-root": {
              padding: "8px 0",
              alignItems: "center",
            },
            "& .MuiInputBase-input": {
              color: "black",
              wordBreak: "break-word",
              caretColor: "black",
              fontSize: "2.2rem !important",
              lineHeight: "2.6rem",
              padding: { xs: "4px 10px", md: "4px 0" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "black",
            },
          }}
          slotProps={{ htmlInput: { maxLength: 150 } }}
          InputProps={{ disableUnderline: true }}
          multiline
          minRows={1}
          variant="standard"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Write here. You can also include @mentions."
          style={{ border: "none", fontSize: "16px" }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ p: "0px !important" }}
      >
        <RadioGroup name="share">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              width: { xs: "270px", sm: "320px" },
            }}
          >
            <Typography>Publish as</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: "10px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <Stack alignItems={"center"} direction={"row"} gap={1}>
                <img
                  src={userData?.profileImage}
                  alt="Avatar"
                  style={{ width: "40px", height: "40px" }}
                />
                <Typography>{`${userData?.firstName} ${userData?.lastName}`}</Typography>
              </Stack>
              <FormControlLabel
                value="yourself"
                control={<Radio sx={{ marginRight: "0px !important" }} />}
              />
            </Box>
          </Box>
          {/* <Divider sx={{ my: "25px" }} />
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px", width: { xs: "270px", sm: "320px" } }}>
                        <Typography>Publish to</Typography>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignItems: "center", py: "10px", cursor: "pointer", "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                            },
                        }}>
                            <Stack alignItems={"center"} direction={"row"} gap={1}>
                                <img src={profilePicture} alt="Avatar" style={{ width: "40px", height: "40px" }} />
                                <Typography>Indiviual Article</Typography>
                            </Stack>
                            <FormControlLabel value="individual" control={<Radio sx={{ marginRight: "0px !important" }} />} />
                        </Box>
                    </Box> */}
        </RadioGroup>
      </Menu>

      <DynamicModal
        open={viewArticleModal}
        handleClose={() => setViewArticleModal(false)}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        dropdownHeader={true}
        footerDirection={"flex-end"}
        hideFooter={true}
        handleGroupClick={() => setGroupShareModal(true)}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <ViewArticle
          isLoading={isLoading || editPostLoading}
          onSuccess={handleArticlePost}
          title={title}
          setTitle={setTitle}
          values={toSendValues}
          handleScheduleClick={() => setShowScheduleModal(true)}
        />
      </DynamicModal>

      <DynamicModal
        open={showScheduleModal}
        onSuccess={() => {
          setSchedule({
            date: scheduleDate,
            time: scheduleTime,
          });
          setShowScheduleModal(false);
        }}
        handleClose={() => setShowScheduleModal(false)}
        title={"Schedule post"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        handleScheduleClick={() => { }}
        smallModal={true}
        styledHeader={true}
        footerDirection={"space-between"}
      >
        <ScheduleModal
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
          scheduleTime={scheduleTime}
          setScheduleTime={setScheduleTime}
        />
      </DynamicModal>
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpeg, .jpg, .tiff, .png, .webp"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Menu
        anchorEl={anchorEl2}
        open={openMenu2}
        onClose={handleMenuClose2}
        anchorOrigin={{
          vertical: "left",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Preview
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Duplicate as Draft
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Drafts
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Scheduled
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Published
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          New draft
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Create newsletter
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Help
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose2}
          sx={{
            width: "245px",
            backgroundColor: "#F8FCFF !important",
            marginTop: "10px",
            display: "flex",
            borderRadius: "4px",
            justifyContent: "space-between",
            pr: "0px",
          }}
        >
          Give feedback
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Article;

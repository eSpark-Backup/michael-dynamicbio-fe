import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupSlider from "./GroupSlider";
import PostCard from "./post-card";
import GroupSidebar from "./GroupSidebar";
import DynamicModal from "./dynamic-modal";
import AboutGroupModal from "./AboutGroupModal";
import NotificationSettingsModal from "./NotificationSettingsModal";
import GroupPostSettingModal from "./GroupPostSettingModal";
import { suggestionPostContent } from "../constant";
import SuggestionPost from "./SuggestionPost";
import EditGroupModal from "./EditGroupModal";
import {
  useDeleteGroupMutation,
  useFollowGroupMutation,
  useGetGroupDetailQuery,
} from "../services/group";
import { copyToClipboard } from "../utils";
import {
  arrowUpRight,
  bell,
  bulb,
  calendarEvent,
  cancelIcon,
  close,
  conversation,
  deleteIcon,
  dummyPhoto,
  editBlue,
  group,
  info,
  leave,
  link2,
  plus,
  send2,
  settings,
  three_vertical_dots,
} from "../assets";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const bellRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open3 = Boolean(anchorEl3);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4);

  const [editModal, setEditModal] = useState(null);
  const [showSlider, setShowSlider] = useState(true);
  const [showTip, setShowTip] = useState(true);
  const [choice, setChoice] = useState("All");
  const [aboutModal, setAboutModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [postSettingsModal, setPostSettingsModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("relevant");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (bellRef.current) {
      setAnchorEl3(bellRef.current);
    }
  }, []);

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setAnchorEl4(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleNotiSetting = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetGroupDetailQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  const { user } = useSelector((state) => state.auth);
  const isMyGroup = data?.data?.creatorId === user?.id;

  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  const [follow, { isLoading: isFollowLoading }] = useFollowGroupMutation();
  const [deleteGroup, { isLoading: isDeleteLoading }] =
    useDeleteGroupMutation();

  const handleFollow = (id) => {
    follow(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    deleteGroup(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        navigate("/bonds?sub=group");
      }
    });
  };

  const handleAction = (id, type) => {
    type === "delete" ? handleDelete(id) : handleFollow(id);
  };

  if (isLoading || isFetching) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Grid2
        container
        spacing={3}
        sx={{
          width: { xs: "98%", md: "85%", lg: "95%" },
          py: "25px",
          "@media(min-width:1900px)": {
            width: "75%",
          },
        }}
      >
        <Grid2
          size={{ xs: 12, lg: 3 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        >
          <Paper sx={{ p: "0px" }}>
            <Box
              sx={{
                height: "90px",
                borderTopRightRadius: "4px",
                borderTopLeftRadius: "4px",
                position: "relative",
                backgroundImage: `url(${user?.coverImage || dummyPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100.1%",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid #fff",
                  position: "absolute",
                  top: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundImage: `url(${user?.profileImage || dummyPhoto})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "4px",
                mb: 1,
              }}
            >
              <Box
                sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
              >
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                {isMyGroup && (
                  <Box sx={{ p: "5px 15px", backgroundColor: "#d3d3d3" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#171717",
                      }}
                    >
                      Owner
                    </Typography>
                  </Box>
                )}
              </Box>
              <Typography
                sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}
              >
                Group created:{" "}
                {data?.data?.createdAt &&
                  dayjs(data?.data?.createdAt).format("MMM YYYY")}
              </Typography>
            </Box>
            {data?.data?.isAdmin && (
              <>
                <Box
                  sx={{
                    mt: "40px",
                    px: "20px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                    pb: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#505050",
                      }}
                    >
                      Pending posts
                    </Typography>
                    <Typography
                      sx={{ fontSize: "13px", fontWeight: "400" }}
                      variant="gradientText"
                    >
                      {data?.data?.pendingPostRequest}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#505050",
                      }}
                    >
                      Requests to join
                    </Typography>
                    <Typography
                      sx={{ fontSize: "13px", fontWeight: "400" }}
                      variant="gradientText"
                    >
                      {data?.data?.pendingJoinRequest}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: "60px",
                    borderTop: "1px solid #E5E5E5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/group/${id}/manage`)}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#171717",
                    }}
                  >
                    Manage group
                  </Typography>
                </Box>
                <Box
                  onClick={() => setEditModal(data?.data)}
                  sx={{
                    height: "60px",
                    borderTop: "1px solid #E5E5E5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#171717",
                    }}
                  >
                    Edit group
                  </Typography>
                </Box>{" "}
              </>
            )}
          </Paper>
          {/* <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0px",
              p: "0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                p: "20px",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
              >
                Recent
              </Typography>
              <Box
                sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
              >
                <img src={calendarEvent} alt="" />
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
                >
                  mocking
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
                p: "20px",
              }}
            >
              <Typography
                sx={{ fontSize: "17px", fontWeight: "500" }}
                variant="gradientText"
              >
                Groups
              </Typography>
              <Box
                sx={{
                  width: { xs: "100%", sm: "85%" },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500" }}
                  variant="gradientText"
                >
                  Events
                </Typography>
                <img src={plus} alt="Icon" />
              </Box>
              <Box
                sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <img src={calendarEvent} alt="" />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#505050",
                      }}
                    >
                      mocking
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    See all
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                height: "60px",
                borderTop: "1px solid #E5E5E5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}
              >
                Discover more
              </Typography>
            </Box>
          </Paper> */}
        </Grid2>
        <Grid2
          size={{ xs: 12, lg: 6 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        >
          <Paper sx={{ p: "0px" }}>
            <Box
              sx={{
                height: "200px",
                borderTopRightRadius: "4px",
                borderTopLeftRadius: "4px",
                position: "relative",
                backgroundImage: `url(${
                  data?.data?.coverImageUrl || dummyPhoto
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100.1%",
              }}
            >
              <Box
                sx={{
                  width: "128px",
                  height: "128px",
                  border: "2px solid #fff",
                  position: "absolute",
                  top: "128px",
                  left: "15px",
                  backgroundImage: `url(${data?.data?.logoUrl || dummyPhoto})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
            </Box>
            <Box sx={{ p: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  columnGap: "15px",
                }}
              >
                {(data?.data?.isAdmin || data?.data?.isFollowing) && (
                  <img
                    src={info}
                    alt="Icon"
                    onClick={() => setAboutModal(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <img
                  src={arrowUpRight}
                  alt="Icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                />
                {/* {(data?.data?.isAdmin || data?.data?.isFollowing) && (
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "flex-end",
                      columnGap: "15px",
                    }}
                  >
                    <img
                      src={bell}
                      alt="Bell Icon"
                      style={{ cursor: "pointer" }}
                      ref={bellRef}
                      onClick={
                        data?.data?.isAdmin
                          ? handleNotiSetting
                          : () => setNotificationModal(true)
                      }
                    />

                    <Popper
                      open={open3}
                      anchorEl={anchorEl3}
                      placement="bottom-end"
                      sx={{
                        zIndex: 1300,
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      <Paper
                        sx={{
                          backgroundColor: "#2f2f2f",
                          color: "#fff",
                          padding: "8px 16px",
                          borderRadius: 1,
                          position: "relative",
                          maxWidth: 400,
                          marginTop: "15px",
                          left: "10px",
                          width: "100%",
                          boxSizing: "border-box",
                          "@media (max-width:600px)": {
                            maxWidth: "calc(100vw - 32px)",
                            left: "0px",
                            marginLeft: "16px",
                            marginRight: "16px",
                          },
                        }}
                        elevation={3}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "-8px",
                            right: "12px",
                            width: 0,
                            height: 0,
                            borderLeft: "8px solid transparent",
                            borderRight: "8px solid transparent",
                            borderBottom: "8px solid #2f2f2f",
                            "@media (max-width:600px)": {
                              right: "24px", // adjust for center or edge alignment on mobile
                            },
                          }}
                        />

                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "400", color: "white" }}
                        >
                          Never miss a post. Turn on notifications for all posts
                          from this group.
                        </Typography>

                        <IconButton
                          onClick={handleClose3}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            color: "#fff",
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Popper>
                  </Box>
                )} */}
                {data?.data?.isAdmin && (
                  <img
                    onClick={() => setEditModal(data?.data)}
                    style={{ cursor: "pointer" }}
                    src={editBlue}
                    alt="Icon"
                  />
                )}
                <img
                  src={three_vertical_dots}
                  alt="Icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick2}
                />
              </Box>
              <Box
                sx={{
                  mt: "70px",
                  p: "0px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "5px",
                }}
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
                >
                  {data?.data?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "5px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={group}
                    alt="Icon"
                    style={{ width: "14px", height: "14px" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    {data?.data?.status === "PUBLIC"
                      ? "Public group"
                      : "Private group"}
                  </Typography>
                </Box>
                {/* <Typography
                  sx={{ fontSize: "17px", fontWeight: "400" }}
                  variant="gradientText"
                >
                  Earn an Active Group badge
                </Typography> */}
              </Box>
            </Box>
          </Paper>
          {/* {showSlider && (
            <Paper>
              <GroupSlider handleClose={() => setShowSlider(false)} />
            </Paper>
          )} */}
          {data?.data?.isFollowing && (
            <Paper>
              <PostCard
                group={data?.data}
                groupAdmin={true}
                adminPage={true}
                handleDropDown={() => setPostSettingsModal(true)}
              />
            </Paper>
          )}
          {showTip &&
            (isMyGroup ||
              data?.data?.status === "PUBLIC" ||
              data?.data?.isFollowing) && (
              <Paper sx={{ display: "flex", columnGap: "10px" }}>
                <img
                  src={bulb}
                  alt="Icon"
                  style={{ width: "64px", height: "64px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "2px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#171717",
                      }}
                    >
                      Your comments matter to group members
                    </Typography>
                    <img
                      src={close}
                      alt="Icon"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowTip(false)}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#505050",
                    }}
                  >
                    Group members are likely to create more posts when they get
                    comments on their posts.
                  </Typography>
                </Box>
              </Paper>
            )}
          {/* <Box sx={{ display: "flex", columnGap: "15px" }}>
            <Box
              sx={{
                background:
                  choice === "All"
                    ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)"
                    : "transparent",
                p: "10px 15px",
                borderRadius: "12px",
                border: choice === "All" ? "none" : "1px solid #E4E4E4",
                cursor: "pointer",
                color: choice === "All" ? "white" : "#505050",
              }}
              onClick={() => setChoice("All")}
            >
              All
            </Box>
            <Box
              sx={{
                background:
                  choice !== "All"
                    ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)"
                    : "transparent",
                p: "10px 15px",
                borderRadius: "12px",
                border: choice !== "All" ? "none" : "1px solid #E4E4E4",
                cursor: "pointer",
                color: choice !== "All" ? "white" : "#505050",
              }}
              onClick={() => setChoice("Recommended")}
            >
              Recommended
            </Box>
          </Box> */}
          {(isMyGroup ||
            data?.data?.status === "PUBLIC" ||
            data?.data?.isFollowing) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                rowGap: "15px",
                alignItems: "center",
              }}
            >
              {/* <img src={conversation} alt="Image" />
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>No posts to show</Typography>
                        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
                            Join group to receive updates, add <br /> comments and create posts.
                        </Typography> */}
              {suggestionPostContent.map((item) => (
                <SuggestionPost key={item.id} {...item} isGroupPost={true} />
              ))}
            </Box>
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <GroupSidebar data={data?.data} />
        </Grid2>
      </Grid2>

      <EditGroupModal
        data={editModal}
        refetch={refetch}
        open={editModal?.id}
        handleClose={() => setEditModal(null)}
      />

      <DynamicModal
        open={aboutModal}
        handleClose={() => setAboutModal(false)}
        title={"About this group"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <AboutGroupModal
          data={data?.data}
          onSuccess={() => setAboutModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={notificationModal}
        handleClose={() => setNotificationModal(false)}
        title={"Notification settings disabled"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <NotificationSettingsModal
          onSuccess={() => setNotificationModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={postSettingsModal}
        handleClose={() => setPostSettingsModal(false)}
        title={"Post settings"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <GroupPostSettingModal
          handleClose={() => setPostSettingsModal(false)}
        />
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
          horizontal: "bottom",
        }}
      >
        {/* <MenuItem
          onClick={handleClose}
          sx={{
            width: "195px",
            fontSize: "16px",
            fontWeight: "500",
            color: "#171717",
          }}
        >
          Share on Fusion
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img src={editBlue} alt="" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            Repost to Feed
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img src={send2} alt="" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            Send in a message
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            width: "195px",
            fontSize: "16px",
            fontWeight: "500",
            color: "#171717",
          }}
        >
          Other options
        </MenuItem> */}
        <MenuItem
          onClick={(e) => {
            copyToClipboard(data?.data?.shareableLink);
            handleClose(e);
          }}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img src={link2} alt="" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            Copy link
          </Typography>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "bottom",
        }}
      >
        {/* <MenuItem
          onClick={handleClose2}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img src={bell} alt="" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            Manage notifications
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleClose2}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img src={settings} alt="" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            Update your settings
          </Typography>
        </MenuItem> */}
        <MenuItem
          onClick={(e) => {
            if (!isFollowLoading || !isDeleteLoading) {
              handleAction(data?.data?.id, isMyGroup ? "delete" : "follow");
              handleClose2(e);
            }
          }}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img
            src={
              isMyGroup
                ? deleteIcon
                : data?.data?.isFollowing
                ? leave
                : data?.data?.requestSent
                ? cancelIcon
                : plus
            }
            alt=""
          />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            {isMyGroup
              ? "Delete this group"
              : data?.data?.isFollowing
              ? "Leave this group"
              : data?.data?.requestSent
              ? "Withdraw join request"
              : "Join this group"}
          </Typography>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl4}
        open={open4}
        onClose={handleClose}
        sx={{ maxWidth: { xs: "300px", md: "420px" } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem disabled>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {`Manage notifications about ${data?.data?.name}`}
          </Typography>
        </MenuItem>
        <Divider />
        <RadioGroup
          value={selectedOption}
          onChange={handleRadioChange}
          sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel
            value="relevant"
            control={<Radio />}
            label="Most relevant"
          />
          <FormControlLabel value="off" control={<Radio />} label="Off" />
        </RadioGroup>
      </Menu>
    </Box>
  );
};

export default GroupDetails;

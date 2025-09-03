import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid2,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  camera,
  chipClose,
  emoji,
  filter,
  friend,
  link,
  photo,
  plus,
  profilePicture,
  searchIcon,
  send,
  three_vertical_dots,
  user,
  userAvatar,
} from "../../../assets";
import {
  ContactBox,
  DynamicModal,
  GroupChatModal,
  MessageList,
  OutlinedInput,
  RightSideBar,
} from "../../../components";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import {
  useCreateGroupChatMutation,
  useGetAllChatQuery,
  useGetMyChatQuery,
} from "../../../services/chat";
import { eventBus, useQuery } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import {
  GET_NEW_MESSAGE,
  REFETCH_CHATS,
  SEND_NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../../../socket/events";
import { useGetMyBondsQuery } from "../../../services/bonds";
import AvatarGroupPreview from "../../../components/Avatar";

const Cells = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [chatList, setChatList] = useState([]);
  const [mainChat, setMainChat] = useState([]);
  const [showChatScreen, setShowChatScreen] = useState(
    chatList?.length > 0 ? true : false
  );
  const [showContacts, setShowContacts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [options, setOptions] = useState([]);

  const {
    data: bondData,
    isError: isBondsError,
    error: bondsError,
    isSuccess: isBondsSuccess,
  } = useGetMyBondsQuery(
    {
      page: 1,
      pageSize: 100,
      search: "",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [bondsData, setBondsData] = useState([]);

  useEffect(() => {
    if (isBondsSuccess) {
      setBondsData(bondData?.data);
      const mainOptions = bondData?.data?.map((bond) => {
        return {
          label: `${bond?.friend?.firstName} ${bond?.friend?.lastName}`,
          id: bond.bondId,
          chatId: bond?.friend?.userChatId,
        };
      });
      setOptions(mainOptions);
    }
  }, [isBondsSuccess]);

  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    setSelectedUser(
      bondsData?.find((item) => item?.bondId === selectedNames[0]?.id)
    );
  }, [selectedNames]);

  const HandleActiveClick = (id, type) => {
    navigate(`/cells?id=${id}`);
    setShowChatScreen(true);
    setSelectedNames([]);
    if (isSmallScreen) {
      setShowContacts(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const memberId = chatList?.find(
      (item) =>
        !item?.groupChat &&
        item?.members?.some((memberId) => memberId === member)
    )?._id;
    const firstId =
      chatList?.length > 0 ? (member ? memberId : chatList[0]?._id) : null;
    id && chatList?.some((item) => item?._id === id)
      ? navigate(`/cells?id=${id}`)
      : firstId
      ? navigate(`/cells?id=${firstId}`)
      : navigate(`/cells`);
    !id &&
      !chatList?.some((item) => item?._id === id) &&
      !firstId &&
      setShowChatScreen(false);
  }, [isSmallScreen]);

  const HandleNewConversation = () => {
    setShowChatScreen(false);
    navigate(`/cells`);
    if (isSmallScreen) {
      setShowContacts(false);
    }
  };

  const HandleBack = () => {
    setShowContacts(true);
    navigate(`/cells`);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(null);
  };

  const handleClick2 = (event) => {
    if (mainChat?.find((item) => item?._id === id)?.groupChat) {
      setAnchorEl2(event.currentTarget);
    }
  };

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetMyChatQuery("", {
      refetchOnMountOrArgChange: true,
    });
  const navigate = useNavigate();
  const query = useQuery();
  const id = query.get("id");
  const member = query.get("member");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (isSuccess) {
      const chatListArr = data?.chats?.length > 0 ? data?.chats : [];
      setChatList(chatListArr);
      setMainChat(chatListArr);
      setShowChatScreen(true);
      const memberId = chatListArr?.find(
        (item) =>
          !item?.groupChat &&
          item?.members?.some((memberId) => memberId === member)
      )?._id;
      const firstId =
        chatListArr?.length > 0
          ? member
            ? memberId
            : chatListArr[0]?._id
          : null;
      id && chatListArr?.some((item) => item?._id === id)
        ? navigate(`/cells?id=${id}`)
        : firstId
        ? navigate(`/cells?id=${firstId}`)
        : navigate(`/cells`);
      !id &&
        !chatListArr?.some((item) => item?._id === id) &&
        !firstId &&
        setShowChatScreen(false);
      setLoading(false);
    }
  }, [data, isSuccess, member]);

  const [activeUsers, setActiveUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [messageData, setMessageData] = useState([]);
  const [msg, setMsg] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setMsg("");
  }, [id]);

  useEffect(() => {
    const chatListArr =
      data?.chats?.map((chat) => ({
        ...chat,
        isOnline: chat?.groupChat
          ? chat.members?.filter((memberId) => activeUsers.includes(memberId))
          : chat.members?.some((memberId) => activeUsers.includes(memberId)),
      })) || [];

    if (search === "") {
      setChatList(chatListArr);
      setMainChat(chatListArr);
    } else {
      const query = search.toLowerCase().trim();
      const filtered = chatListArr.filter((item) => {
        const fullName = `${item?.name ?? ""}`.toLowerCase().trim();
        return fullName.includes(query);
      });

      setChatList(filtered);
    }
  }, [search, activeUsers, data]);

  const {
    data: data2,
    isLoading: isMsgLoading,
    isError: isMsgError,
    error: msgError,
    refetch: refetchChat,
    isFetching,
  } = useGetAllChatQuery(
    { id, page, pageSize: PAGE_SIZE },
    { skip: !id && member, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (!data2) return;

    const newMessages = filterMessage(data2.messages);

    if (page === 1) {
      setMessageData([]);
      setMessageData(newMessages);
    } else {
      setMessageData((prev) => {
        const combined = [...newMessages, ...prev];
        const unique = Array.from(
          new Map(combined.map((m) => [m.id, m])).values()
        );
        return unique;
      });
      setHasMore(newMessages.length === PAGE_SIZE);
    }
  }, [data2]);

  const fetchMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  const filterMessage = (messages) => {
    if (!messages || messages?.length === 0) {
      return [];
    } else {
      const filteredArr = messages?.map((msg) => {
        return {
          id: msg?._id,
          sender: msg?.sender,
          text: msg?.content,
          timestamp: msg?.createdAt,
          isUser: msg?.isUser,
          avatar: msg?.avatar,
        };
      });
      return filteredArr;
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [id]);

  useEffect(() => {
    if (isError) toast.error(error?.data?.response?.message);
    if (isMsgError) toast.error(msgError?.data?.response?.message);
    if (isBondsError) toast.error(bondsError?.data?.response?.message);
  }, [isError, isMsgError, isBondsError]);

  const handleChat = () => {
    const chat = chatList?.find((item) => item?._id === id);
    if (!chat || msg.trim() === "") return;

    const message = {
      id: Math.random().toString(36).substring(2, 10),
      sender: "You",
      text: msg,
      timestamp: new Date().toISOString(),
      isUser: true,
    };

    const messageBody = {
      message: msg,
      chatId: chat?._id,
      members: chat?.members,
    };
    eventBus.emit(SEND_NEW_MESSAGE, messageBody);

    setMessageData((prev) => [...prev, message]);
    setChatList((prevList) => {
      const index = prevList.findIndex((item) => item._id === chat._id);
      if (index === -1) return prevList;

      const updatedChat = {
        ...prevList[index],
        lastMessage: {
          content: msg,
          sender: "You",
          createdAt: message.timestamp,
        },
      };

      const newList = [updatedChat, ...prevList.filter((_, i) => i !== index)];

      return newList;
    });
    setMsg("");
    handleStopTyping();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  useEffect(() => {
    eventBus.on(GET_NEW_MESSAGE, (data) => {
      const chatId = data?.chatId;

      setMessageData((prev) => {
        return chatList?.find((item) => item?._id === chatId)?._id === id
          ? [
              ...prev,
              {
                id: data?.message?._id,
                sender: data?.message?.sender?.name,
                text: data?.message?.content,
                timestamp: data?.message?.createdAt,
                isUser: data?.message?.isUser,
                avatar: data?.message?.sender?.avatar,
              },
            ]
          : [...prev];
      });
      setChatList((prevList) => {
        const index = prevList.findIndex((chat) => chat._id === chatId);
        if (index === -1) return prevList;

        const updatedChat = {
          ...prevList[index],
          isTyping: false,
          lastMessage: {
            content: data?.message?.content,
            sender: data?.message?.isUser ? "You" : data?.message?.sender?.name,
            createdAt: data?.message?.createdAt,
          },
        };

        const newList = [
          updatedChat,
          ...prevList.filter((_, i) => i !== index),
        ];

        return newList;
      });
    });
    return () => {
      eventBus.off(GET_NEW_MESSAGE);
    };
  }, [id]);

  const { user: userData } = useSelector((state) => state.auth);
  const { onlineUsers } = useSelector((state) => state.chat);
  useEffect(() => {
    setActiveUsers(onlineUsers || []);
  }, [onlineUsers]);

  const handleStartTyping = () => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      const chat = chatList?.find((item) => item?._id === id);
      if (!chat) return;

      const body = {
        members: chat?.members,
        chatId: chat?._id,
      };
      eventBus.emit(START_TYPING, body);
    }
  };

  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const handleStopTyping = () => {
    isTypingRef.current = false;
    const chat = chatList?.find((item) => item?._id === id);
    if (!chat) return;

    const body = {
      members: chat?.members,
      chatId: chat?._id,
    };
    eventBus.emit(STOP_TYPING, body);
  };

  useEffect(() => {
    const handleGetStartTyping = (data) => {
      if (!data?.userId || !data.chatId) return;

      setChatList((prevList) =>
        prevList.map((chat) =>
          chat._id === data.chatId
            ? {
                ...chat,
                typingUsers: Array.from(
                  new Set([...(chat.typingUsers || []), data.userId])
                ),
              }
            : chat
        )
      );
    };

    const handleGetStopTyping = (data) => {
      if (!data?.userId || !data.chatId) return;

      setChatList((prevList) =>
        prevList.map((chat) =>
          chat._id === data.chatId
            ? {
                ...chat,
                typingUsers: (chat.typingUsers || []).filter(
                  (id) => id !== data.userId
                ),
              }
            : chat
        )
      );
    };

    eventBus.on(START_TYPING, handleGetStartTyping);
    eventBus.on(STOP_TYPING, handleGetStopTyping);

    return () => {
      eventBus.off(START_TYPING, handleGetStartTyping);
      eventBus.off(STOP_TYPING, handleGetStopTyping);
    };
  }, []);

  useEffect(() => {
    const handleRefetch = () => {
      refetch();
      refetchChat();
    };

    eventBus.on(REFETCH_CHATS, handleRefetch);
    return () => {
      eventBus.off(REFETCH_CHATS, handleRefetch);
    };
  }, []);

  const [groupName, setGroupName] = useState("");
  const [createGroup, { isLoading: isCreateGroupLoading }] =
    useCreateGroupChatMutation();

  const handleCreateGroup = () => {
    const selectedIds = selectedNames?.map((item) => item?.id);
    const filteredBonds = bondsData?.filter((item2) =>
      selectedIds?.includes(item2?.bondId)
    );
    const filteredBondIds = filteredBonds?.map(
      (item) => item?.friend?.userChatId
    );
    const finalGroupName =
      groupName ||
      `${selectedNames?.map((member) => member?.label).join(", ")}, and You`;
    const body = {
      name: finalGroupName,
      members: filteredBondIds,
    };

    createGroup(body).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        setSelectedNames([]);
        setGroupName("");
        refetch();
      }
    });
  };

  if (isLoading || loading) {
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
    <Box sx={{ p: "20px", height: "calc(100vh - 130px)" }}>
      <Grid2 container spacing={5} sx={{ height: "100%" }}>
        {(!isSmallScreen || (isSmallScreen && showContacts)) && (
          <Grid2 size={{ xs: 12, lg: 2.5 }} sx={{ height: "100%" }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "25px",
                height: "100%",
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
                    fontSize: "29px",
                    fontWeight: 400,
                    color: theme.palette.primary.dark,
                  }}
                >
                  Chats
                </Typography>
                {/* <img
                  src={filter}
                  alt="Filter"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                /> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                  height: "80%",
                }}
              >
                <OutlinedInput
                  value={search}
                  onInputChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  startAdornment={searchIcon}
                />
                {chatList?.length > 0 ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                        height: "100%",
                        overflowY: "auto",
                        pb: "0px",
                      }}
                    >
                      {chatList?.map((item, index) => (
                        <ContactBox
                          isTyping={item?.typingUsers}
                          isOnline={item?.isOnline}
                          lastMessage={item?.lastMessage?.content}
                          image={item?.avatar || userAvatar}
                          time={
                            item?.lastMessage?.createdAt
                              ? dayjs(item?.lastMessage?.createdAt).format(
                                  "MMM D"
                                )
                              : ""
                          }
                          name={item?.name}
                          key={index}
                          id={item?._id}
                          handleClick={HandleActiveClick}
                          activeItem={id}
                          type={item?.groupChat ? "group" : "personal"}
                        />
                      ))}
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      border: "1px solid #E4E4E4",
                      borderRadius: "4px",
                      backgroundColor: "#FCFCFC",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "5px",
                        padding: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#171717",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {search === ""
                          ? "No message yet"
                          : "No bonds or groups found with this name"}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#505050",
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                      >
                        Reach out & start a conversation to advance your career
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        border: "1px solid #E4E4E4",
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "10px 0",
                      }}
                    >
                      <Typography
                        variant="gradientText"
                        sx={{ fontSize: "14px", fontWeight: "400" }}
                        onClick={HandleNewConversation}
                      >
                        Start conversation
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
              {chatList?.length > 0 && (
                <Box
                  sx={{
                    borderTop: "1px solid #E4E4E4",
                    height: "46px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={HandleNewConversation}
                >
                  <Typography
                    variant="gradientText"
                    sx={{ fontSize: "14px", fontWeight: 400, pt: "10px" }}
                  >
                    Start conversation
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid2>
        )}

        {(!isSmallScreen || (isSmallScreen && !showContacts)) && (
          <Grid2 size={{ xs: 12, lg: 6.5 }} sx={{ height: "98%", pb: "10px" }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              {isSmallScreen && (
                <ArrowBackIosOutlinedIcon
                  sx={{
                    fontSize: "20px",
                    background: `linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={HandleBack}
                />
              )}
              <Box
                sx={{
                  borderBottom: "1px solid #E4E4E4",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  p: "5px 5px 15px 0px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Stack
                  gap={2}
                  direction={"row"}
                  alignItems="center"
                  width={"80%"}
                >
                  {showChatScreen && (
                    <Box
                      sx={{
                        position: "relative",
                      }}
                    >
                      <AvatarGroupPreview
                        members={
                          mainChat?.find((item) => item?._id === id)?.avatar
                        }
                        memberName={
                          mainChat?.find((item) => item?._id === id)?.memberName
                        }
                      />
                      {!mainChat?.find((item) => item?._id === id)
                        ?.groupChat && (
                        <Box
                          sx={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: mainChat?.find(
                              (item) => item?._id === id
                            )?.isOnline
                              ? "#12B76A"
                              : "#7a7676",
                            border: "1.5px solid #FFFFFF",
                            borderRadius: "50%",
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            zIndex: 1,
                          }}
                        ></Box>
                      )}
                    </Box>
                  )}
                  <Stack direction={"column"} width={"80%"}>
                    <Typography
                      onClick={
                        mainChat?.find((item) => item?._id === id)?._id &&
                        !mainChat?.find((item) => item?._id === id)?.groupChat
                          ? () =>
                              navigate(
                                `/profile/${
                                  mainChat?.find((item) => item?._id === id)
                                    ?.accountId
                                }`
                              )
                          : () => {}
                      }
                      sx={{
                        cursor: "pointer",
                        fontSize: showChatScreen ? "18px" : "14px",
                        fontWeight: showChatScreen ? 500 : 400,
                        color: "#171717",
                      }}
                    >
                      {showChatScreen &&
                      !mainChat?.find((item) => item?._id === id)?.groupChat
                        ? mainChat?.find((item) => item?._id === id)?.name
                        : showChatScreen &&
                          mainChat?.find((item) => item?._id === id)?.groupChat
                        ? mainChat?.find((item) => item?._id === id)?.name
                        : "New Message"}
                    </Typography>
                    {showChatScreen ? (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "#505050",
                        }}
                      >
                        {!mainChat?.find((item) => item?._id === id)?.groupChat
                          ? mainChat?.find((item) => item?._id === id)?.isOnline
                            ? "Active Now"
                            : ""
                          : `${
                              mainChat?.find((item) => item?._id === id)?.avatar
                                ?.length
                            } people in this conversation`}
                      </Typography>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            width: "100%",
                          }}
                        >
                          {selectedNames?.map((person) => {
                            return (
                              <Chip
                                key={person.id}
                                label={person.label}
                                onDelete={() =>
                                  setSelectedNames(
                                    selectedNames.filter(
                                      (p) => p.id !== person.id
                                    )
                                  )
                                }
                                sx={{
                                  backgroundColor: "#e0e0e0",
                                  fontWeight: "bold",
                                }}
                                deleteIcon={
                                  <img
                                    src={chipClose}
                                    style={{ width: "6px", height: "6px" }}
                                  />
                                }
                              />
                            );
                          })}
                          {(selectedNames?.length === 0 ||
                            (selectedNames?.length > 0 && showInput)) && (
                            <Autocomplete
                              multiple
                              options={options}
                              getOptionLabel={(option) => option.label}
                              value={selectedNames}
                              onChange={(event, newValue) => {
                                const uniqueValues = newValue.filter(
                                  (v, index, self) =>
                                    index ===
                                    self.findIndex((t) => t.id === v.id)
                                );

                                setSelectedNames(uniqueValues);
                                setShowInput(false);
                              }}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              filterSelectedOptions
                              renderTags={() => null}
                              open={searchTerm.length > 0}
                              onInputChange={(event, newInputValue) =>
                                setSearchTerm(newInputValue)
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder={
                                    selectedNames?.length === 0
                                      ? "Type a name or multiple names"
                                      : ""
                                  }
                                  variant="standard"
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: null,
                                  }}
                                  sx={{
                                    minWidth: 200,
                                    "& .MuiInputBase-root": {
                                      borderBottom: "none",
                                    },
                                  }}
                                  autoFocus
                                />
                              )}
                              renderOption={(props, option) => (
                                <Box component="li" {...props} key={option.id}>
                                  {option.label}
                                </Box>
                              )}
                              className={
                                selectedNames?.length > 0
                                  ? "custom-autocomplete2"
                                  : "custom-autocomplete"
                              }
                            />
                          )}

                          {selectedNames?.length > 0 && (
                            <img
                              src={plus}
                              alt="Icon"
                              style={{
                                width: "24px",
                                height: "24px",
                                cursor: "pointer",
                              }}
                              onClick={() => setShowInput(true)}
                            />
                          )}
                        </Box>
                      </>
                    )}
                  </Stack>
                </Stack>
                {/* <img
                  src={three_vertical_dots}
                  alt="Info"
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  onClick={handleClick2}
                /> */}
              </Box>
              {(console.log(selectedUser), "selectedNames")}
              {!showChatScreen && selectedNames?.length >= 1 && (
                <Box
                  sx={{
                    py: "10px",
                    borderBottom: "1px solid #E4E4E4",
                    display: "flex",
                    columnGap: "10px",
                  }}
                >
                  {selectedNames?.length === 1 && (
                    <Stack
                      onClick={() => {
                        navigate(
                          `/cells?member=${selectedUser?.friend?.userChatId}`
                        );
                        setSelectedNames([]);
                      }}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      gap={1}
                      sx={{ cursor: "pointer" }}
                    >
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          position: "relative",
                        }}
                      >
                        <img
                          src={selectedUser?.friend?.profileImage || userAvatar}
                          alt="user"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                        />
                        {/* <Box
                          sx={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "#12B76A",
                            border: "1.5px solid #FFFFFF",
                            borderRadius: "50%",
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                          }}
                        ></Box> */}
                      </Box>
                      <Stack direction={"column"}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            color: "#171717",
                          }}
                        >
                          {`${selectedUser?.friend?.firstName} ${selectedUser?.friend?.lastName}`}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#505050",
                          }}
                        >
                          {selectedUser?.friend?.designation} @{" "}
                          {selectedUser?.friend?.company}
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                  {selectedNames?.length > 1 && (
                    <Stack
                      direction="row"
                      alignItems="flex-end"
                      justifyContent="center"
                      gap={1}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "3px",
                        }}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Typography
                            sx={{
                              fontSize: "18px",
                              fontWeight: "500",
                              color: "#171717",
                            }}
                          >
                            Group Name
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#505050",
                            }}
                          >
                            {" "}
                            (optional)
                          </Typography>
                        </Box>
                        <OutlinedInput
                          value={groupName}
                          onInputChange={(e) => setGroupName(e?.target?.value)}
                          sx={{
                            height: "40px",
                            width: "100%",
                            backgroundColor: "#FCFCFC",
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-root": {
                              border: "1px solid #E4E4E4",
                              height: "100%",
                              backgroundColor: "#FCFCFC",
                              borderRadius: "4px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid #E4E4E4",
                            },
                          }}
                        />
                      </Box>
                      <Button
                        loading={isCreateGroupLoading}
                        disabled={isCreateGroupLoading}
                        onClick={handleCreateGroup}
                        sx={{ width: "max-content", height: "40px" }}
                      >
                        Create group
                      </Button>
                    </Stack>
                  )}
                </Box>
              )}

              {showChatScreen &&
                mainChat?.find((item) => item?._id === id)?.groupChat && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "5px",
                        py: "10px",
                      }}
                    >
                      <Stack gap={1} direction={"row"}>
                        {(() => {
                          const chat = mainChat.find(
                            (item) => item?._id === id
                          );
                          const fullMembers = chat?.members
                            ? [...chat?.members]
                            : [];
                          const fullAvatars = chat?.members
                            ? [...chat?.avatar]
                            : [];
                          const memberIds = chat?.members
                            ? [...chat?.accountId]
                            : [];
                          const ind = memberIds.findIndex(
                            (id) => id === userData?.id
                          );
                          if (ind !== -1) {
                            fullMembers.splice(ind, 0, userData?.userChatId);
                          }
                          return fullMembers.map((memberId, index) => {
                            const isOnline = activeUsers.includes(memberId);
                            const avatarUrl = fullAvatars[index];

                            return (
                              <Box
                                sx={{
                                  width: "48px",
                                  height: "48px",
                                  position: "relative",
                                  cursor: "pointer",
                                }}
                                key={index}
                                onClick={() => setGroupModal(true)}
                              >
                                <Avatar
                                  src={avatarUrl}
                                  alt="user"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                  }}
                                />
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: isOnline
                                      ? "#12B76A"
                                      : "#7a7676",
                                    border: "1.5px solid #FFFFFF",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    right: 0,
                                    bottom: 0,
                                  }}
                                />
                              </Box>
                            );
                          });
                        })()}
                      </Stack>

                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#171717",
                        }}
                      >
                        {mainChat
                          ?.find((item) => item?._id === id)
                          ?.memberName?.join(", ") || ""}
                      </Typography>
                    </Box>
                    <Divider />
                  </>
                )}

              <Box
                sx={{
                  minHeight: "calc(68% - 100px)",
                  overflowY: "auto",
                  pt: "10px",
                }}
              >
                {showChatScreen && (
                  <MessageList
                    loading={isMsgLoading || isFetching}
                    messages={messageData}
                    fetchMore={fetchMore}
                    hasMore={hasMore}
                    chatId={id}
                    isTyping={
                      chatList?.find((item) => item?._id === id)?.typingUsers ||
                      []
                    }
                    sender={mainChat?.find((item) => item?._id === id)}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <Box
                  sx={{
                    borderTop: "1px solid #E4E4E4",
                    width: "100%",
                    display: "flex",
                    pr: "10px",
                    minHeight: "60px",
                    backgroundColor: "#F2F8FD",
                  }}
                >
                  <OutlinedInput
                    multiline
                    minRows={1}
                    maxRows={5}
                    value={msg}
                    onInputChange={(e) => {
                      const value = e.target.value;
                      handleStartTyping();

                      if (typingTimeoutRef.current)
                        clearTimeout(typingTimeoutRef.current);

                      typingTimeoutRef.current = setTimeout(() => {
                        handleStopTyping();
                      }, 5000);
                      setMsg(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleChat();
                      }
                    }}
                    sx={{
                      height: "100%",
                      width: "100%",
                      padding: "10px",
                      "& .MuiOutlinedInput-root": {
                        border: "none !important",
                        height: "100%",
                        backgroundColor: "#F2F8FD",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none !important",
                      },
                    }}
                    placeholder={"Write a message"}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "10px",
                    }}
                  >
                    {/* <img
                      src={emoji}
                      alt="Emoji"
                      style={{ width: "24px", height: "24px" }}
                    /> */}
                    <img
                      onClick={handleChat}
                      src={send}
                      alt="Camera"
                      style={{
                        cursor: "pointer",
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </Box>
                </Box>
                {/* <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    columnGap: "10px",
                  }}
                >
                  <img src={camera} alt="Camera" />
                  <img src={link} alt="Link" />
                  <img src={photo} alt="Album" />
                </Box> */}
              </Box>
            </Paper>
          </Grid2>
        )}
        <Grid2
          sx={{ display: { xs: "none", lg: "block" } }}
          size={{ xs: 12, lg: 3 }}
          pb={"10px"}
        >
          <RightSideBar hideResearch={true} />
        </Grid2>
      </Grid2>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>
          Unread
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>
          Draft
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>
          Stared
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>
          Option
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>
          Option
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Move to other
        </MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Mark as unread
        </MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Star
        </MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Mute
        </MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Report / Block
        </MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Delete conversation
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Add / Remove people
        </MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Leave Conversation
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>
          Manage settings
        </MenuItem>
      </Menu>
      <DynamicModal
        open={groupModal}
        handleClose={() => setGroupModal(false)}
        title={"Conversation Details"}
        buttonText={"Post"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
      >
        <GroupChatModal
          chatId={id}
          options={options}
          groupMembers={chatList?.find((item) => item?._id === id)}
          activeUsers={activeUsers}
          refetch={refetch}
          messageData={messageData}
          handleCloseModal={() => setGroupModal(false)}
        />
      </DynamicModal>
    </Box>
  );
};

export default Cells;

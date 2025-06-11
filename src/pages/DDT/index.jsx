import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Drawer,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  copyResponse,
  hamburger,
  happy,
  history,
  horizontalDots,
  hydrogen,
  icon,
  logout,
  negative,
  newChat,
  notTyping,
  positive,
  sad,
} from "../../assets";
import Input from "../../components/Input";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { copyToClipboard, useQuery } from "../../utils";
import { TypingDots } from "../../components";
import {
  useChatBotHistoryQuery,
  useChatBotMessageByIdQuery,
} from "../../services/chat-bot";

const DDT = () => {
  const query = useQuery();
  const id = query.get("id");
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ddtContent, setDdtContent] = useState([]);
  const [message, setMessage] = useState("");
  const [hasHydrogen, setHasHydrogen] = useState(
    message
      .toLowerCase()
      .split(/\s+/)
      .some((item) => item.startsWith("hyd"))
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state.auth);

  useEffect(() => {
    setHasHydrogen(
      message
        .toLowerCase()
        .split(/\s+/)
        .some((item) => item.startsWith("hyd"))
    );
  }, [message]);

  const { data, refetch } = useChatBotHistoryQuery(
    {
      page: 1,
      pageSize: 100,
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: data2,
    isLoading,
    isFetching,
  } = useChatBotMessageByIdQuery(
    {
      page,
      pageSize: 5,
      chatId: id,
    },
    { skip: !id, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (data2?.data?.items?.length < 5) {
      setHasMore(false);
    }

    if (data2 && data2?.data?.items?.length > 0) {
      const separated = data2.data.items.flatMap((item) => [
        { content: item.question, response: false },
        { content: item.answer, response: true },
      ]);
      setDdtContent((prev) => [...separated, ...prev]);
    }
  }, [data2]);

  useEffect(() => {
    if (!id) {
      setDdtContent([]);
    }
  }, [id]);

  const askQuestion = async () => {
    if (loading) {
      return;
    }
    setMessage("");
    setDdtContent((prev) => [...prev, { content: message, response: false }]);
    setLoading(true);
    const response = await fetch(
      "https://chatbot-dynamicbio.juniordev.net/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          id ? { question: message, chatId: id } : { question: message }
        ),
      }
    );

    const data = await response.json();
    setDdtContent((prev) => [
      ...prev,
      { content: data?.answer, response: true },
    ]);
    setLoading(false);
    !id && refetch();
    !id && navigate(`/ddt?id=${data?.chatId}`);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!fetchingMore) {
      scrollToBottom();
      setFetchingMore(false);
    }
  }, [ddtContent, loading]);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (container && container.scrollTop === 0 && !isLoading && hasMore) {
        setPage((prev) => prev + 1);
        setFetchingMore(true);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "radial-gradient(109.07% 109.03% at 50% 2.5%, #37A1F7 2.4%, #37A1F7 14.4%, #288DF5 48.45%, #519EEF 55.82%, #1358A5 68.4%, #002A60 100%)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FDF8F2",
          display: "flex",
          justifyContent: "space-between",
          py: "5px",
          pr: "30px",
          pl: { xs: "30px", md: "0px" },
        }}
      >
        <Box
          sx={{ width: { xs: "0%", md: "50%" }, visibility: "hidden" }}
        ></Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={icon} alt="Icon" />
          <img
            src={logout}
            alt="Icon"
            onClick={() => setShowConfirmModal(true)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "30px",
          py: "15px",
        }}
      >
        <img src={hydrogen} alt="Icon" />
        <img
          src={history}
          alt="Icon"
          style={{ cursor: "pointer" }}
          onClick={() => setDrawerOpen(true)}
        />
      </Box>
      <Box
        ref={scrollContainerRef}
        sx={{
          mx: { xs: "10px", md: "35px", lg: "150px" },
          // border: "1px solid red",
          height: { xs: "72vh", md: "65vh" },
          overflowY: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
          pb: "15px",
        }}
      >
        {(isLoading || isFetching) && <LinearProgress sx={{ mb: 2 }} />}
        {ddtContent?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: item?.response ? "flex-start" : "flex-end",
              // rowGap: '100px',
              flexDirection: "column",
              alignItems: item?.response ? "flex-start" : "flex-end",
            }}
          >
            <Box
              sx={{
                background: item?.response
                  ? "linear-gradient(0deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.64))"
                  : "#FCFCFC",
                boxShadow: item?.response
                  ? "0px 1px 10px 12px #1018280F"
                  : "0px 1px 2px 0px #1018280F",
                p: "10px 14px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                borderTopLeftRadius: item?.response ? "0px" : "8px",
                borderTopRightRadius: item?.response ? "8px" : "0px",
                width: "fit-content",
                mt: index == 0 ? "0px" : "25px",
              }}
            >
              {/* <Typography
                sx={{ fontSize: "16px", fontWeight: "400", color: "#000000" }}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              /> */}
              {item?.content?.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Box>
            {item?.response && (
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                  pl: "10px",
                  mt: "10px",
                  alignItems: "center",
                }}
              >
                <img
                  onClick={() => copyToClipboard(item?.content)}
                  src={copyResponse}
                  alt="Icon"
                  style={{ cursor: "pointer" }}
                />
                <img src={positive} alt="Icon" style={{ cursor: "pointer" }} />
                <img src={negative} alt="Icon" style={{ cursor: "pointer" }} />
              </Box>
            )}
          </Box>
        ))}
        {loading ? <TypingDots className="chat-bot" /> : null}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          display: "flex",
          columnGap: "15px",
          mx: { xs: "10px", md: "35px", lg: "150px" },
          mt: { xs: "15px", md: "10px" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/*  */}
        {/* <Box
          sx={{
            width: { md: "10%", lg: "5%" },
            display: { xs: "none", md: "block" },
            height: "137px",
          }}
        >
          {message?.length === 0 ? (
            <Box sx={{ width: "100%" }}></Box>
          ) : (
            <img
              src={hasHydrogen ? happy : sad}
              alt="Icon"
              style={{ width: "100%" }}
            />
          )}
        </Box> */}
        <Box
          sx={{
            // height: "100%",
            width: { xs: "100%", md: "90%", lg: "95%" },
            backgroundColor: "#25252580",
            backdropFilter: "blur(80px)",
            borderRadius: "24px",
            display: "flex",
          }}
        >
          <Input
            multiline
            minRows={1}
            maxRows={5}
            variant="outlined"
            sx={{
              textarea: { padding: "16.5px 14px" },
              "& .MuiOutlinedInput-root": {
                border: "none",
                color: "#fff",
                backgroundColor: "transparent",
                minHeight: "65px",
                height: "100%",
                // width: "95%"
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiInputBase-input": {
                color: "#fff",
                "&::placeholder": {
                  color: "#fff",
                  opacity: 1,
                },
              },
            }}
            placeholder="Write here..."
            value={message}
            handleChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (message?.length > 0 && e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                askQuestion();
              }
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pr: { xs: "5px", md: "10px" },
            }}
          >
            <img
              onClick={message?.length > 0 ? askQuestion : () => {}}
              src={notTyping}
              alt="Icon"
              style={{
                cursor: "pointer",
                transform: `rotate(${message?.length > 0 ? "-90deg" : "0deg"})`,
                transition: "all 0.3s ease-in-out",
              }}
            />
          </Box>
        </Box>
      </Box>
      <ConfirmationModal
        open={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        title={"Leave H+"}
        acceptButtonText={"Leave"}
        handleAccept={() => navigate(`/profile/${userData?.id}`)}
      >
        <Typography
          sx={{ fontSize: "17px", fontWeight: "300", color: "#595959" }}
        >
          Are you sure you want to end this chat and go back to your account?
        </Typography>
      </ConfirmationModal>

      <Box
        sx={{
          position: "absolute",
          right: "0px",
          height: "100%",
          top: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Drawer
          anchor={"right"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              height: "90%",
              top: "5vh",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              background: "linear-gradient(180deg, #18375B 0%, #19395D 100%)",
              border: "none",
              boxShadow: "none",
              width: "242px",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: "16px",
            },
          }}
        >
          <Box sx={{ display: "flex", columnGap: "10px", mt: "20px" }}>
            <img
              src={hamburger}
              alt="Icon"
              style={{ cursor: "pointer" }}
              onClick={() => setDrawerOpen(false)}
            />
            <Typography
              sx={{ fontSize: "29px", fontWeight: "400", color: "#FFFFFF" }}
            >
              History
            </Typography>
          </Box>
          <Box
            onClick={() => {
              navigate("/ddt");
              setDrawerOpen(false);
            }}
            sx={{
              borderBottom: "1px solid #FFFFFF",
              height: "65px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "10px",
              mt: "20px",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{ fontSize: "21px", fontWeight: "300", color: "#FFFFFF" }}
            >
              New Chat
            </Typography>
            <img src={newChat} alt="Icon" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              mt: "10px",
            }}
          >
            {data?.data?.items?.map((item, index) => (
              <Box
                onClick={() => {
                  navigate(`/ddt?id=${item?.chatId}`);
                  setDrawerOpen(false);
                }}
                sx={{
                  height: "65px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: "0px",
                  cursor: "pointer",
                }}
                key={index + 1}
              >
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "300", color: "#FFFFFF" }}
                >
                  {item?.heading?.length > 17
                    ? item?.heading?.slice(0, 18) + "..."
                    : item?.heading}
                </Typography>
                <img src={horizontalDots} alt="Icon" />
              </Box>
            ))}
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default DDT;

// backdrop-filter: blur(80px)

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useCallback, useLayoutEffect } from "react";
import MessageBubble from "./MessageBubble";
import dayjs from "dayjs";
import { formatChatTimestamp } from "../utils";
import TypingDots from "./TypingDots";

const SCROLL_THRESHOLD = 100;

const MessageList = ({
  sender,
  isTyping,
  loading,
  messages,
  fetchMore,
  hasMore,
  chatId,
}) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const prevMessagesRef = useRef([]);
  const prevScrollHeightRef = useRef(0);
  const isInitialMount = useRef(true);

  // Handle scroll to bottom on chat change (initial mount or new chat)
  useLayoutEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
    isInitialMount.current = true;
  }, [chatId]);

  // Handle scroll logic when messages change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prevMessages = prevMessagesRef.current;
    const newMessages = messages;

    const isPaginating =
      newMessages.length > prevMessages.length &&
      container.scrollTop < SCROLL_THRESHOLD;

    const isAtBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < SCROLL_THRESHOLD;

    if (isPaginating) {
      const prevScrollHeight = prevScrollHeightRef.current;
      requestAnimationFrame(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      });
    } else if (isInitialMount.current || isAtBottom) {
      // Scroll to bottom for first load or if already at bottom
      bottomRef.current?.scrollIntoView({ behavior: isInitialMount.current ? "auto" : "smooth" });
    }

    prevMessagesRef.current = newMessages;
    prevScrollHeightRef.current = container.scrollHeight;
    isInitialMount.current = false;
  }, [messages]);

  // Handle scroll-to-top pagination
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.scrollTop < SCROLL_THRESHOLD && hasMore) {
      prevScrollHeightRef.current = container.scrollHeight;
      fetchMore();
    }
  }, [fetchMore, hasMore]);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        px: 2,
      }}
    >
      {loading && (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress sx={{ color: "#1877F2" }} />
        </Box>
      )}

      {messages.map((msg, index) => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const showTimestamp =
          index === 0 ||
          !dayjs(msg.timestamp)
            .tz(userTimeZone)
            .isSame(
              dayjs(messages[index - 1]?.timestamp).tz(userTimeZone),
              "day"
            );

        return (
          <React.Fragment key={msg.id}>
            {showTimestamp && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <Typography sx={{ color: "#505050", fontSize: "12px", fontWeight: "400" }}>
                  {formatChatTimestamp(msg.timestamp)}
                </Typography>
              </Box>
            )}
            <MessageBubble message={msg} />
          </React.Fragment>
        );
      })}

      {isTyping && (
        <Box sx={{ display: "flex", maxWidth: { xs: "90%", lg: "50%" }, columnGap: "10px" }}>
          <img
            src={sender?.avatar}
            alt=""
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <Stack direction={"column"}>
            <Typography>{sender?.name}</Typography>
            <Box
              sx={{
                background: "#F2F8FD",
                p: "10px 14px",
                borderRadius: "0px 8px 8px 8px",
                fontSize: "14px",
                fontWeight: 400,
                color: "#171717",
              }}
            >
              <TypingDots />
            </Box>
          </Stack>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  );
};

export default MessageList;

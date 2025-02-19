import { Box } from "@mui/material";
import React from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                rowGap: "20px"
            }}
        >
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
        </Box>
    );
};

export default MessageList;

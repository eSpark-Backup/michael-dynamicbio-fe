import { Box, Typography } from "@mui/material";
import React from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                position: 'relative',
            }}
        >
            {messages.map((msg, index) => {
                // Check if this is the first message or if the timestamp has changed from previous message
                const showTimestamp = index === 0 ||
                    (messages[index - 1].timestamp !== msg.timestamp && msg.timestamp);

                return (
                    <React.Fragment key={msg.id}>
                        {showTimestamp && msg.timestamp && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                my: 2,
                            }}>
                                <Typography
                                    sx={{
                                        color: '#505050',
                                        fontSize: '12px',
                                        fontWeight: "400"
                                    }}
                                >
                                    {msg.timestamp}
                                </Typography>
                            </Box>
                        )}
                        <MessageBubble message={msg} />
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default MessageList;
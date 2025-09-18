import {
  Box,
  Typography,
  Stack,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { userAvatar } from '../assets';
import TypingDots from './TypingDots';

const MessageBubble = ({ message }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mb: 2, display: 'flex' }}>
      <Box
        sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: message?.isUser ? 'flex-end' : 'flex-start',
            columnGap: '10px',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {message?.isUser && (
            <Box sx={{ maxWidth: { xs: '90%', lg: '50%' } }}>
              <Stack direction={'column'}>
                <Box
                  sx={{
                    width: '100%',
                    background: message?.isUser
                      ? 'linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)'
                      : '#F2F8FD',
                    p: '10px 14px 10px 14px',
                    borderTopLeftRadius: message?.isUser ? '8px' : '0px',
                    borderTopRightRadius: message?.isUser ? '0px' : '8px',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: theme.palette.primary.light,
                  }}
                >
                  {message?.isTyping ? (
                    <TypingDots />
                  ) : (
                    message?.text?.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  )}
                </Box>
                <Box sx={{ display: 'flex', mt: '5px', columnGap: '10px' }}>
                  {message?.reactions?.map((data, index) => {
                    return (
                      <Box
                        sx={{
                          backgroundColor: '#F9FAFB',
                          p: '2px 8px 2px 8px',
                          borderRadius: '16px',
                          display: 'flex',
                          columnGap: '4px',
                        }}
                        key={index}
                      >
                        <img
                          src={data?.item}
                          alt="Emoji"
                          style={{ width: '16px' }}
                        />
                        {data?.count > 1 && (
                          <Typography
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: '#344054',
                            }}
                          >
                            {data?.count}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Stack>
            </Box>
          )}
          {!message?.isUser && (
            <Box
              sx={{
                display: 'flex',
                maxWidth: { xs: '90%', lg: '50%' },
                columnGap: '10px',
              }}
            >
              <img
                src={message?.avatar || userAvatar}
                alt=""
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <Stack direction={'column'}>
                <Typography>{message?.sender}</Typography>
                <Box
                  sx={{
                    width: message?.isTyping ? '60%' : '100%',
                    background: message?.isUser
                      ? 'linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)'
                      : '#F2F8FD',
                    p: '10px 14px 10px 14px',
                    borderTopLeftRadius: message?.isUser ? '8px' : '0px',
                    borderTopRightRadius: message?.isUser ? '0px' : '8px',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#171717',
                  }}
                >
                  {message?.isTyping ? (
                    <TypingDots />
                  ) : (
                    message?.text?.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  )}
                </Box>
                {!message?.isTyping && (
                  <Box
                    sx={{
                      display: 'flex',
                      mt: '5px',
                      columnGap: '10px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {message?.reactions?.map((data, index) => {
                      return (
                        <Box
                          sx={{
                            backgroundColor: '#F9FAFB',
                            p: '2px 8px 2px 8px',
                            borderRadius: '16px',
                            display: 'flex',
                          }}
                          key={index}
                        >
                          <img
                            src={data?.item}
                            alt="Emoji"
                            style={{ width: '16px' }}
                          />
                          {data?.count > 1 && (
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#344054',
                              }}
                            >
                              data?.count
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose} sx={{ width: '150px' }}>
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: '150px' }}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: '150px' }}>
          Copy
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: '150px' }}>
          Paste
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: '150px' }}>
          Forward
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: '150px' }}>
          Select
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: '150px' }}>
          Star
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MessageBubble;

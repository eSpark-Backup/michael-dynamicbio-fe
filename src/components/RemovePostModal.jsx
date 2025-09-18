import { Box, Typography } from '@mui/material';

const RemovePostModal = () => {
  return (
    <Box
      sx={{
        mt: '20px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '15px',
      }}
    >
      <Typography
        sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
      >
        Tell us more to help improve your feed.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          rowGap: '15px',
          columnGap: '20px',
        }}
      >
        <Box
          sx={{ border: '1px solid #E4E4E4', borderRadius: '20px', p: '10px' }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: '600', color: '#505050' }}
          >
            Not interested in this topic
          </Typography>
        </Box>
        <Box
          sx={{ border: '1px solid #E4E4E4', borderRadius: '20px', p: '10px' }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: '600', color: '#505050' }}
          >
            {"Not interested in Default User's posts"}
          </Typography>
        </Box>
        <Box
          sx={{ border: '1px solid #E4E4E4', borderRadius: '20px', p: '10px' }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: '600', color: '#505050' }}
          >
            Not appropirate for LinkedIn
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RemovePostModal;

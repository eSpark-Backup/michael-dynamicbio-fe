import { Box, Typography } from '@mui/material';
import { article, bulb, editBlue, event } from '../assets';

const CreateAdminPost = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: '15px 10px 5px 25px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '3px',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
          <img
            src={editBlue}
            alt="Icon"
            style={{ width: '24px', height: '24px' }}
          />
          <Typography
            sx={{ fontSize: '20px', fontWeight: '500', color: '#171717' }}
          >
            Start a post
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '500', color: '#505050' }}
        >
          Share content to connect with your followers
        </Typography>
      </Box>
      <Box
        sx={{
          p: '15px 10px 5px 25px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '3px',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
          <img
            src={event}
            alt="Icon"
            style={{ width: '24px', height: '24px' }}
          />
          <Typography
            sx={{ fontSize: '20px', fontWeight: '500', color: '#171717' }}
          >
            Create an event
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '500', color: '#505050' }}
        >
          {"Host an event to grow your Page's community"}
        </Typography>
      </Box>
      <Box
        sx={{
          p: '15px 10px 5px 25px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '3px',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
          <img
            src={article}
            alt="Icon"
            style={{ width: '24px', height: '24px' }}
          />
          <Typography
            sx={{ fontSize: '20px', fontWeight: '500', color: '#171717' }}
          >
            Publish an article
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '500', color: '#505050' }}
        >
          Connect with followers through long-form content
        </Typography>
      </Box>
      <Box
        sx={{
          p: '15px 10px 5px 25px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '3px',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: '5px', alignItems: 'center' }}>
          <img
            src={bulb}
            alt="Icon"
            style={{ width: '24px', height: '24px' }}
          />
          <Typography
            sx={{ fontSize: '20px', fontWeight: '500', color: '#171717' }}
          >
            Create an Ad
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '500', color: '#505050' }}
        >
          Generate leads, drive website traffic, and build brand awareness
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateAdminPost;

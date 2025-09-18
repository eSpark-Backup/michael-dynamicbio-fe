import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import OutlinedInput from './outline-input';
import { earth, searchIcon } from '../assets';
import { groupsCOntent } from '../constant';

const GroupShareModal = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      <OutlinedInput
        placeholder={'Type a group name'}
        startAdornment={searchIcon}
        sx={{
          height: '42px',
          width: '100%',
          backgroundColor: '#FCFCFC',
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            border: '1px solid #E4E4E4',
            height: '100%',
            backgroundColor: '#FCFCFC',
            borderRadius: '4px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #E4E4E4',
          },
        }}
      />
      <RadioGroup name="groups" sx={{ paddingBottom: '25px' }}>
        <Box
          sx={{
            maxHeight: '630px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '15px',
          }}
        >
          {groupsCOntent?.map((item, index) => {
            return (
              <Box
                sx={{
                  backgroundColor: '#FCFCFC',
                  borderRadius: '2px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '15px',
                }}
                key={index}
              >
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                  <img
                    src={item?.picture}
                    alt="Avatar"
                    style={{ width: '60px', height: '60px' }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#171717',
                      }}
                    >
                      {item?.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '5px',
                      }}
                    >
                      <img
                        src={earth}
                        alt="Icon"
                        style={{ width: '14px', height: '14px' }}
                      />
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                          color: '#505050',
                        }}
                      >
                        {item?.status}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                <FormControlLabel
                  value={item?.id}
                  control={<Radio sx={{ marginRight: '0px !important' }} />}
                />
              </Box>
            );
          })}
        </Box>
      </RadioGroup>
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        px={6}
        direction={'row'}
        gap={3}
        sx={{
          height: '55px',
          borderTop: '1px solid #E4E4E4',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          bottom: '0px',
          right: '0px',
          zIndex: 999,
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            width: '150px',
            height: '36px',
            borderRadius: '2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '8px',
              padding: '1px',
              background:
                'linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)',
              mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
              WebkitMask:
                'linear-gradient(white, white) content-box, linear-gradient(white, white)',
              WebkitMaskComposite: 'destination-out',
              maskComposite: 'exclude',
            },
            cursor: 'pointer',
          }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: '400', color: '#000000' }}
          >
            Back
          </Typography>
        </Box>
        <Button
          type="submit"
          sx={{ width: '150px', height: '36px', fontSize: '16px' }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default GroupShareModal;

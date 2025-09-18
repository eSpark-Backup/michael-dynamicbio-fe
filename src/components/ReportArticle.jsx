import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { reportArticleChoices } from '../constant';

const ReportArticle = ({ handleSubmit }) => {
  const [selectedChoice, setSelectedChoice] = useState({
    title: '',
    description: '',
  });
  const [step, setStep] = useState(1);
  const [permissions, setPermissions] = useState(true);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        mt: '20px',
      }}
    >
      <Typography
        sx={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}
      >
        {step === 1
          ? 'Select our policy that applies'
          : "You've selected the following reason"}
      </Typography>
      {step === 1 ? (
        <Box
          sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap', mb: '30px' }}
        >
          {reportArticleChoices?.map((item, index) => (
            <Box
              sx={{
                p: '10px',
                borderRadius: '12px',
                border:
                  selectedChoice?.title === item?.value
                    ? 'none'
                    : '1px solid #E4E4E4',
                background:
                  selectedChoice?.title === item?.value
                    ? 'linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)'
                    : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() =>
                setSelectedChoice({
                  title: item?.value,
                  description: item?.description,
                })
              }
              key={index}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color:
                    selectedChoice?.title === item?.value ? 'white' : '#505050',
                }}
              >
                {item?.value}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
            pb: '100px',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#F2F8FD',
              p: '15px',
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
            }}
          >
            <Typography
              sx={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}
            >
              {selectedChoice?.title}
            </Typography>
            <Typography
              sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
            >
              {selectedChoice?.description}
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}
          >
            Want to follow status of your report?
          </Typography>
          <FormControlLabel
            sx={{
              width: '100%',
              alignItems: 'flex-start',
              padding: 0,
              margin: 0,
              gap: '10px',
              span: { padding: 0 },
            }}
            control={
              <Checkbox
                checked={permissions}
                onChange={(e) => setPermissions(e.target.checked)}
                name="permissions"
              />
            }
            label="Received updates on this report"
          />
        </Box>
      )}
      <Stack
        justifyContent={'flex-end'}
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
        {step === 1 ? (
          <Button
            onClick={() => setStep(2)}
            disabled={selectedChoice?.title === ''}
            type="submit"
            sx={{
              maxWidth: '150px',
              height: '36px',
              fontSize: '16px',
              minWidth: { md: '150px' },
            }}
          >
            Next
          </Button>
        ) : (
          <Box sx={{ display: 'flex', columnGap: '10px' }}>
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
              onClick={() => setStep(1)}
            >
              <Typography variant="gradientText">Back</Typography>
            </Box>
            <Button
              onClick={handleSubmit}
              sx={{
                maxWidth: '200px',
                height: '36px',
                fontSize: '16px',
                minWidth: { md: '150px' },
              }}
            >
              Submit report
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ReportArticle;

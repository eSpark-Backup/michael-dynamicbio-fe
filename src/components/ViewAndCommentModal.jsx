import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { commentOff, earth, eyeOff, group } from '../assets';
import Button from './button';
import { useEditPostMutation } from '../services/post';
import { toast } from 'react-toastify';

const ViewAndCommentModal = ({
  permission,
  visibility,
  commentSettings,
  onChange,
  handleClose,
  id,
  type,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    permission === 'view' ? visibility : commentSettings
  );
  const [editPost, { isLoading: editPostLoading }] = useEditPostMutation();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value, permission);
    }
  };

  const HandleSubmit = () => {
    const obj = {
      visibility: permission === 'view' ? selectedValue : visibility,
      id: id,
      edit: true,
      commentVisibility:
        permission === 'comment' ? selectedValue : commentSettings,
      status: 'PUBLISH',
      type,
    };
    if (id) {
      editPost(obj).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success('Your post setting is updated successfully');
          handleClose();
        }
      });
    }
  };

  return (
    <RadioGroup value={selectedValue} onChange={handleChange}>
      <Box
        sx={{ mt: '5px', display: 'flex', flexDirection: 'column', mb: '10px' }}
      >
        <Box
          sx={{
            borderTop: '1px solid #E4E4E4',
            py: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
          >
            <img
              src={earth}
              alt="Icon"
              style={{ width: '20px', height: '20px' }}
            />
            <Box>
              <Typography
                sx={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}
              >
                Anyone
              </Typography>
              {permission !== 'view' && (
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
                >
                  Anyone who can view can also comment
                </Typography>
              )}
            </Box>
          </Box>
          <FormControlLabel
            value="PUBLIC"
            control={<Radio sx={{ marginRight: '0px !important' }} />}
          />
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #E4E4E4',
            py: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
          >
            <img
              src={group}
              alt="Icon"
              style={{ width: '20px', height: '20px' }}
            />
            <Box>
              <Typography
                sx={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}
              >
                Connections only
              </Typography>
              {permission !== 'view' && (
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
                >
                  Only connections can comment
                </Typography>
              )}
            </Box>
          </Box>
          <FormControlLabel
            value="CONNECTIONS"
            control={<Radio sx={{ marginRight: '0px !important' }} />}
          />
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #E4E4E4',
            py: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #E4E4E4',
          }}
        >
          <Box
            sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
          >
            <img
              src={permission === 'view' ? eyeOff : commentOff}
              alt="Icon"
              style={{ width: '20px', height: '20px' }}
            />
            <Box>
              <Typography
                sx={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}
              >
                No one
              </Typography>
              {permission !== 'view' && (
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
                >
                  No one can comment
                </Typography>
              )}
            </Box>
          </Box>
          <FormControlLabel
            value="ONLY_ME"
            control={<Radio sx={{ marginRight: '0px !important' }} />}
          />
        </Box>
      </Box>
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
          onClick={handleClose}
        >
          <Typography variant="gradientText">Cancel</Typography>
        </Box>
        <Button
          loading={editPostLoading}
          disabled={editPostLoading}
          onClick={HandleSubmit}
          type="submit"
          sx={{
            maxWidth: '150px',
            height: '36px',
            fontSize: '16px',
            minWidth: { md: '150px' },
          }}
        >
          Save
        </Button>
      </Stack>
    </RadioGroup>
  );
};

export default ViewAndCommentModal;

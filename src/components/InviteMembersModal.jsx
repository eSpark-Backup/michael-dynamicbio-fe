import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import OutlinedInput from './outline-input';
import { close, searchIcon, user } from '../assets';
import { inviteMembers } from '../constant';
import Button from './button';

const InviteMembersModal = ({ handleClose }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [allUsers, setAllUsers] = useState(inviteMembers);

  const handleCheckboxChange = (member) => {
    setSelectedMembers((prev) => {
      // Check if member already exists in selectedMembers
      const isAlreadySelected = prev.some(
        (selected) => selected.id === member.id
      );

      if (isAlreadySelected) {
        return prev.filter((selected) => selected.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const handleUnselectAll = () => {
    setSelectedMembers([]);
  };

  useEffect(() => {
    if (search !== '') {
      const filteredItems = inviteMembers?.filter((item) =>
        item?.name?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setAllUsers(filteredItems);
    } else {
      setAllUsers(inviteMembers);
    }
  }, [search, inviteMembers]);

  return (
    <Box sx={{ display: 'flex', mt: '20px', flexDirection: 'column' }}>
      <OutlinedInput
        placeholder={'Search by name'}
        startAdornment={searchIcon}
        sx={{
          height: '42px',
          width: '100%',
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            height: '100%',
            borderRadius: '4px',
          },
        }}
        value={search}
        onInputChange={(e) => setSearch(e.target.value)}
      />

      <Box
        sx={{
          border: '1px solid #E4E4E4',
          height: '400px',
          display: 'flex',
          mb: '16px',
        }}
      >
        <Box
          sx={{
            width: '65%',
            maxHeight: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '0px',
            pb: '10px',
          }}
        >
          {allUsers?.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: '15px 15px 0px 15px',
                display: 'flex',
                columnGap: '0px',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                sx={{
                  mr: '0px',
                }}
                control={
                  <Checkbox
                    checked={selectedMembers.some(
                      (selected) => selected.id === item.id
                    )}
                    onChange={() => handleCheckboxChange(item)}
                    name={item.id.toString()}
                  />
                }
                label=""
              />
              <Avatar
                src={user}
                alt="User"
                sx={{ width: 60, height: 60, objectFit: 'fill' }}
              />
              <Stack direction={'column'} sx={{ ml: '10px' }}>
                <Typography
                  sx={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
                >
                  {item.role}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: '35%',
            maxHeight: '100%',
            overflowY: 'auto',
            borderLeft: '1px solid #E4E4E4',
          }}
        >
          <Box
            sx={{
              borderBottom: '1px solid #E4E4E4',
              p: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
            >
              {selectedMembers.length} selected
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#171717',
                cursor: 'pointer',
              }}
              onClick={handleUnselectAll}
            >
              Unselect all
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
              p: '10px',
            }}
          >
            {selectedMembers?.map((item, index) => (
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                key={index}
              >
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <Avatar
                    src={user}
                    alt="User"
                    sx={{ width: 30, height: 30, objectFit: 'fill' }}
                  />
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#171717',
                    }}
                  >
                    {item?.name}
                  </Typography>
                </Stack>
                <img
                  src={close}
                  alt=""
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCheckboxChange(item)}
                />
              </Box>
            ))}
          </Box>
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
        <Button
          disabled={selectedMembers?.length === 0}
          sx={{
            maxWidth: '150px',
            height: '36px',
            fontSize: '16px',
            minWidth: { md: '150px' },
          }}
          onClick={handleClose}
        >
          Invite {selectedMembers?.length > 0 && selectedMembers?.length}
        </Button>
      </Stack>
    </Box>
  );
};

export default InviteMembersModal;

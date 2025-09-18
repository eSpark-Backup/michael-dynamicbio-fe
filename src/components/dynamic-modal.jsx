import {
  Stack,
  Box,
  Typography,
  Modal,
  Menu,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import Button from './button';
import { close, downArrowFilled, dummyPhoto, timer, user } from '../assets';
import { useState } from 'react';

const DynamicModal = ({
  disabled,
  isLoading,
  open,
  handleClose,
  title,
  children,
  onSuccess,
  buttonText,
  sx,
  postModal,
  handleScheduleClick,
  smallModal,
  dropdownHeader,
  styledHeader,
  footerDirection,
  hideFooter,
  userData,
  visibility,
  setVisibility,
  adminPage,
  handleDropdown,
  showUndoText,
  noBtn,
  groupAdmin,
  isEditModal,
  description,
  page,
  group,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: !smallModal ? '95%' : '90%',
            md: !smallModal ? '70%' : '65%',
            lg: !smallModal ? '50%' : '40%',
          },
          maxHeight: '90vh',
          background: '#FFF',
          borderRadius: '2px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '&:focus-visible': { border: 'none', outline: 'none' },
          ...sx,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{
            ...(styledHeader && {
              height: description ? '65px' : '55px',
              borderTop: '1px solid #E4E4E4',
              boxShadow: '0px 0px 10px 0px #00000040',
              width: 'calc(100% + 40px)',
              display: 'flex',
              margin: '-20px -20px -20px -20px',
              padding: '0px 20px',
            }),
          }}
        >
          {!dropdownHeader && (
            <Box>
              <Typography>{title}</Typography>
              {description && (
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
                >
                  {description}
                </Typography>
              )}
            </Box>
          )}
          {dropdownHeader && (
            <Box
              sx={{
                display: 'flex',
                columnGap: '15px',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <img
                style={{ borderRadius: '50%' }}
                width={44}
                height={44}
                src={
                  page
                    ? page.logoUrl
                      ? page.logoUrl
                      : user
                    : userData?.profileImage
                      ? userData.profileImage
                      : user
                }
                alt="Avatar"
              />
              <Stack direction={'column'}>
                <Stack direction={'row'} gap={1}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#171717',
                      textTransform: 'capitalize',
                    }}
                  >
                    {page ? page?.name : 'Default User'}
                  </Typography>
                  {!adminPage && !isEditModal && (
                    <img
                      src={downArrowFilled}
                      alt="Icon"
                      style={{ cursor: 'pointer' }}
                      onClick={
                        adminPage
                          ? handleDropdown
                          : isEditModal
                            ? () => {}
                            : handleClick
                      }
                    />
                  )}
                </Stack>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#505050',
                    textTransform: 'capitalize',
                  }}
                >
                  {groupAdmin
                    ? `Post to ${group?.name}`
                    : visibility === 'PUBLIC'
                      ? 'Post to anyone'
                      : visibility === 'CONNECTIONS'
                        ? 'Post to my connections'
                        : visibility === 'ONLY_ME'
                          ? 'Post only for me'
                          : 'Post for group'}
                </Typography>
              </Stack>
              {groupAdmin && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    left: '25px',
                    bottom: '-13px',
                    backgroundImage: `url("${group?.logoUrl || dummyPhoto}")`,
                    backgroundPosition: 'center',
                    backgroundSize: '100%',
                  }}
                ></Box>
              )}
            </Box>
          )}
          {showUndoText ? (
            <Typography
              variant="gradientText"
              onClick={handleClose}
              sx={{ cursor: 'pointer' }}
            >
              Undo
            </Typography>
          ) : (
            <img
              onClick={handleClose}
              src={close}
              alt="close"
              style={{ cursor: 'pointer' }}
            />
          )}
        </Stack>
        <Box
          sx={{
            flex: 1,
            margin: '20px 0',
            height: 'calc(100% - 130px)',
            overflowY: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {children}
        </Box>
        {!hideFooter && (
          <Stack
            justifyContent={footerDirection ? footerDirection : 'center'}
            alignItems={postModal ? 'flex-end' : 'center'}
            px={postModal ? 6 : 0}
            direction={'row'}
            gap={3}
            sx={{
              ...(postModal && {
                height: '55px',
                borderTop: '1px solid #E4E4E4',
                boxShadow: '0px 0px 10px 0px #00000040',
                width: 'calc(100% + 40px)',
                display: 'flex',
                alignItems: 'center',
                margin: '0 -20px -20px -20px',
              }),
            }}
          >
            {postModal && !smallModal && (
              <img
                src={timer}
                alt="Icon"
                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                onClick={handleScheduleClick}
              />
            )}
            {postModal && smallModal && (
              <Box
                onClick={handleClose}
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
                  variant="gradientText"
                  sx={{ fontSize: '16px', fontWeight: '400' }}
                >
                  Back
                </Typography>
              </Box>
            )}
            {!noBtn && (
              <Button
                disabled={isLoading || disabled}
                loading={isLoading}
                type="submit"
                sx={{
                  maxWidth: postModal ? '150px' : '250px',
                  height: postModal ? '36px' : '65px',
                  fontSize: postModal ? '16px' : '20px',
                }}
                onClick={onSuccess}
              >
                {buttonText}
              </Button>
            )}
          </Stack>
        )}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <RadioGroup
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            name="share"
            sx={{ width: '100%', px: '0px', marginRight: '0px !important' }}
          >
            {[
              { label: 'Everyone', value: 'PUBLIC' },
              { label: 'Only connections', value: 'CONNECTIONS' },
              { label: 'Only me', value: 'ONLY_ME' },
            ].map((item) => (
              <MenuItem
                key={item.value}
                sx={{
                  width: '245px',
                  backgroundColor: '#F8FCFF !important',
                  marginTop: '10px',
                  display: 'flex',
                  borderRadius: '4px',
                  justifyContent: 'space-between',
                  pr: '0px',
                }}
              >
                <FormControlLabel
                  value={item.value}
                  control={<Radio sx={{ marginLeft: 'auto !important' }} />}
                  label={
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#171717',
                      }}
                    >
                      {item.label}
                    </Typography>
                  }
                  labelPlacement="start"
                  sx={{
                    width: '100%',
                    margin: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                />
              </MenuItem>
            ))}
          </RadioGroup>
        </Menu>
      </Box>
    </Modal>
  );
};

export default DynamicModal;

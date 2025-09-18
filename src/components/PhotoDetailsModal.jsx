import { Box, Modal } from '@mui/material';

const PhotoDetailsModal = ({ open, handleClose, sx, children }) => {
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
            xs: '99%',
            md: '95%',
            lg: '80%',
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
      </Box>
    </Modal>
  );
};

export default PhotoDetailsModal;

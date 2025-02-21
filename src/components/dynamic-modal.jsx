import { Stack, Box, Typography, Modal } from "@mui/material";
import Button from "./button";
import { close } from "../assets";

const DynamicModal = ({
  open,
  handleClose,
  title,
  children,
  onSuccess,
  buttonText,
  sx,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", md: "70%", lg: "50%" },
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: "2px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&:focus-visible": { border: "none", outline: "none" },
          ...sx,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography>{title}</Typography>
          <img onClick={handleClose} src={close} alt="close" />
        </Stack>
        <Box
          sx={{
            flex: 1,
            margin: "20px 0",
            height: "calc(100% - 130px)",
            overflowY: "auto",
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Box>
        <Stack justifyContent="center" alignItems="center">
          <Button type="submit" sx={{ maxWidth: "250px" }} onClick={onSuccess}>
            {buttonText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DynamicModal;

import { Stack, Box, Typography, Modal } from "@mui/material";
import Button from "./button";
import { close, heart, timer } from "../assets";

const DynamicModal = ({
  open,
  handleClose,
  title,
  children,
  onSuccess,
  buttonText,
  sx,
  postModal
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
        <Stack justifyContent={postModal ? "flex-end" : "center"} alignItems={postModal ? "flex-end" : "center"} pr={postModal ? 6 : 0} direction={"row"} gap={3}
          sx={{
            ...(postModal && {
              height: "55px",
              borderTop: "1px solid #E4E4E4",
              boxShadow: "0px 0px 10px 0px #00000040",
              width: "calc(100% + 40px)",
              display: "flex",
              alignItems: "center",
              margin: "0 -20px -20px -20px"
            })
          }}
        >
          <img src={timer} alt="Icon" style={{ width: "24px", height: "24px" }} />
          <Button type="submit" sx={{ maxWidth: postModal ? "150px" : "250px", height: postModal ? "36px" : "auto" }} onClick={onSuccess}>
            {buttonText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DynamicModal;

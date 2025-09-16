import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { close2 } from "../assets/index.js";

const ConfirmationModal = ({
  open,
  handleClose,
  title,
  children,
  acceptButtonText,
  cancelButtonText,
  handleCancel,
  handleAccept,
  sx,
  isLoading,
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
          width: { xs: "90%", sm: "450px" },
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: "2px",
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
          sx={{
            borderTop: "1px solid #E4E4E4",
            boxShadow: "0px 0px 10px 0px #00000040",
            p: "15px",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "400", color: "#171717" }}
          >
            {title}
          </Typography>
          <img
            onClick={handleClose}
            src={close2}
            alt="close"
            style={{ cursor: "pointer" }}
          />
        </Stack>
        <Box
          sx={{
            flex: 1,
            margin: "20px 0",
            height: "calc(100% - 130px)",
            overflowY: "auto",
            padding: "20px",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Box>
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={cancelButtonText ? "space-between" : "center"}
          alignItems={"center"}
          sx={{
            borderTop: "1px solid #E4E4E4",
            boxShadow: "0px 0px 10px 0px #00000040",
            height: "55px",
            px: "15px",
          }}
        >
          {cancelButtonText && (
            <Box
              sx={{
                width: "150px",
                height: "36px",
                borderRadius: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "8px",
                  padding: "1px",
                  background:
                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                  mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                  WebkitMask:
                    "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                },
                cursor: "pointer",
              }}
              onClick={handleCancel}
            >
              <Typography variant="gradientText">{cancelButtonText}</Typography>
            </Box>
          )}
          <Button
            type="submit"
            sx={{ width: "150px", height: "36px", fontSize: "16px" }}
            loading={isLoading}
            disabled={isLoading}
            onClick={handleAccept}
          >
            {acceptButtonText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;

import { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { aboutEvent } from "../assets";
import WelcomePostModal from "./WelcomePostModal";
import DynamicModal from "./dynamic-modal";

const slides = [
  {
    title: "Save time with automatic member approval",
    description: "Eligible members can join this group without admin approval.",
    buttonText: "Set up automatic approval",
  },
  {
    title: "Welcome New Members",
    description: "Send new members an automated welcome note when they join.",
    buttonText: "Add welcome note",
  },
  {
    title: "Create a welcome post",
    description:
      "Introduce yourself and group's purpose to get the conversation started",
    buttonText: "Create post",
  },
  {
    title: "Add a cover image to make ypur group standout",
    description:
      "Use this as an opportunity to brand your group and make it unique",
    buttonText: "Add cover image",
  },
];

const GroupSlider = ({ handleClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWelcomePostModal, setWelcomePostModal] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "flex-start", lg: "center", rowGap: "10px" },
        }}
      >
        <Typography variant="h6">Set your group up for success</Typography>
        <Box sx={{ display: "flex", columnGap: "20px" }}>
          <IconButton
            onClick={handlePrev}
            sx={{ p: "0px", ":hover": { backgroundColor: "transparent" } }}
            disabled={currentIndex === 0}
          >
            <Box
              sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
            >
              <NavigateBeforeIcon fontSize="small" />
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                Previous
              </Typography>
            </Box>
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{ p: "0px", ":hover": { backgroundColor: "transparent" } }}
            disabled={currentIndex === slides?.length - 1}
          >
            <Box
              sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                Next
              </Typography>
              <NavigateNextIcon fontSize="small" />
            </Box>
          </IconButton>
        </Box>
      </Box>
      <Card sx={{ mx: "auto", mt: "10px", position: "relative", p: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <img
              src={aboutEvent}
              alt="Image"
              style={{ width: "48px", height: "48px" }}
            />
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box flex={1}>
            <Typography fontWeight="bold" gutterBottom>
              {slides[currentIndex].title}
            </Typography>
            <Typography variant="body2" mb={1}>
              {slides[currentIndex].description}
            </Typography>

            <Box
              sx={{
                width: { xs: "100%", sm: "fit-content" },
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
                p: "10px",
              }}
              onClick={
                slides[currentIndex].buttonText === "Add welcome note"
                  ? () => setWelcomePostModal(true)
                  : () => {}
              }
            >
              <Typography variant="gradientText">
                {slides[currentIndex].buttonText}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <CloseIcon />
          </IconButton>
        </CardContent>
      </Card>
      <DynamicModal
        open={showWelcomePostModal}
        handleClose={() => setWelcomePostModal(false)}
        title={"Welcome note to new members"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <WelcomePostModal handleClose={() => setWelcomePostModal(false)} />
      </DynamicModal>
    </>
  );
};

export default GroupSlider;

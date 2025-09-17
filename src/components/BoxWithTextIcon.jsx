import { Box, CircularProgress, Typography } from "@mui/material";

const BoxWithTextIcon = ({ text, icon, onClick, isLoading }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        borderRadius: "4px",
        background: "white",
        width: "100%",
        padding: "12px 34px",
        columnGap: "15px",
        cursor: "pointer",
        justifyContent: icon ? "flex-start" : "center",
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
      }}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="Icon" />}
      <Typography
        variant="gradientText"
        sx={{ fontSize: "18px", fontWeight: 400 }}
      >
        {isLoading ? <CircularProgress size={20} color="black" /> : text}
      </Typography>
    </Box>
  );
};

export default BoxWithTextIcon;

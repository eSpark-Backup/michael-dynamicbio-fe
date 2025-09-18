import { Box, Typography, useTheme } from "@mui/material";
import TypingDots from "./TypingDots";
import { useQuery } from "../utils";
import AvatarGroupPreview from "./Avatar";

const ContactBox = ({
  isTyping,
  isOnline,
  image,
  lastMessage,
  time,
  name,
  handleClick,
  activeItem,
  id,
  type,
}) => {
  const query = useQuery();
  const pathId = query.get("id");
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: "15px",
        background:
          activeItem === id
            ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)"
            : "transparent",
        display: "flex",
        justifyContent: "flex-start",
        columnGap: "5px",
        alignItems: "center",
        cursor: "pointer",
        border: "1px solid #E4E4E4",
        borderRadius: "2px",
        px: "4px",
      }}
      onClick={() => handleClick(id, type)}
    >
      <Box sx={{ position: "relative" }}>
        <AvatarGroupPreview members={image} />
        {type === "personal" && (
          <Box
            sx={{
              zIndex: 2,
              width: "10px",
              height: "10px",
              backgroundColor: isOnline ? "#12B76A" : "#7a7676",
              border: "1.5px solid #FFFFFF",
              borderRadius: "50%",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          ></Box>
        )}
      </Box>
      <Box pr="3px" flex={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color:
                activeItem === id ? theme.palette.primary.light : "#171717",
              fontSize: "14px",
              fontWeight: 500,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: { xs: "max-content", lg: "80px", xl1: "max-content" },
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 400,
              color:
                activeItem === id ? theme.palette.primary.light : "#505050",
            }}
          >
            {time}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            color: activeItem === id ? theme.palette.primary.light : "#505050",
          }}
        >
          {isTyping?.length > 0 && id !== pathId ? (
            <TypingDots />
          ) : (
            lastMessage?.split("\n")[0]
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactBox;

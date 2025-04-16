import { Box, Stack, Typography } from "@mui/material";
import Button from "./button";
import { bondBlack2, close, bondWhite, userAvatar } from "../assets";
import { useState } from "react";

const BondCard = ({
  handleRemoveUser,
  handleSendBondReq,
  isLoading,
  id,
  profileImage,
  coverImage,
  firstName,
  lastName,
  designation,
  isPage,
  orgination,
  place,
  members,
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      sx={{
        padding: "10px 20px 20px 20px",
        width: "224px",
        background: "#F2F8FD",
        position: "relative",
      }}
    >
      <img
        onClick={() => handleRemoveUser(id)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          cursor: "pointer",
        }}
        src={close}
        alt="close"
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:after": {
            content: '""',
            backgroundImage: coverImage
              ? `url(${coverImage})`
              : "linear-gradient(180deg, #948F8F 0%, #2E2C2C 100%)",
            width: "calc(100% - 40px)",
            height: "36px",
            position: "absolute",
            top: 0,
            zIndex: 1,
          },
        }}
      >
        <img
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            zIndex: 2,
          }}
          src={profileImage || userAvatar}
          alt="profile"
        />
      </Box>
      <Typography textAlign="center" mt={1} fontWeight={500}>
        {`${firstName} ${lastName}`}
      </Typography>
      {designation && (
        <Typography
          sx={{ color: "#505050" }}
          mb={1}
          textAlign="center"
          fontSize="12px"
        >
          {designation}
        </Typography>
      )}
      {isPage && (
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={1}
          mt={1}
        >
          <Box>
            <Typography fontSize="12px" fontWeight={300}>
              {orgination}
            </Typography>
            <Typography fontSize="12px" fontWeight={300}>
              {place}
            </Typography>
          </Box>
          <Typography fontSize="12px" fontWeight={300}>
            {members}
          </Typography>
        </Stack>
      )}
      <Button
        loading={isLoading}
        disabled={isLoading}
        sx={{ mt: 1, height: "48px", position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => handleSendBondReq(id)}
      >
        <img
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.3s ease-in-out",
          }}
          src={bondWhite}
          alt="add"
        />
        <img
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            opacity: hovered ? 0 : 1,
            transition: "all 0.3s ease-in-out",
          }}
          src={bondBlack2}
          alt="add"
        />
        Bond
      </Button>
    </Box>
  );
};

export default BondCard;

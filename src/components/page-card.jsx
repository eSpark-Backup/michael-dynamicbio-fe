import { Box, Stack, Typography } from "@mui/material";
import { verticleDots } from "../assets";

const PageCard = ({ userImage, title, desc, type }) => {
  return (
    <Box
      sx={{
        border: "1px solid #E4E4E4",
        borderRadius: "2px",
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "5px 20px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          columnGap: "20px",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <img src={userImage} alt="User" />
        <Stack direction={"column"}>
          {title && (
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#171717",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {title}
            </Typography>
          )}
          {desc && (
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: "#505050",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {desc}
            </Typography>
          )}
        </Stack>
      </Box>
      {type === "joined-groups" ? (
        <Typography>Withdraw</Typography>
      ) : (
        <img src={verticleDots} alt="Bond" />
      )}
    </Box>
  );
};

export default PageCard;

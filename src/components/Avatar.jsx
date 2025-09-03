import { Avatar, Box } from "@mui/material";

const AvatarGroupPreview = ({ members = [], memberName }) => {
  const maxVisible = 3;
  const visibleMembers = members.slice(0, maxVisible);
  const extraCount = members.length - maxVisible;

  return (
    <Box sx={{ display: "flex", alignItems: "center", pl: "4px" }}>
      {visibleMembers.map((member, index) => (
        <Box
          key={index}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            zIndex: visibleMembers.length - index,
            marginLeft: index === 0 ? 0 : "-20px",
          }}
        >
          <Avatar
            src={member}
            alt={memberName || "profile"}
            sx={{ width: "100%", height: "100%" }}
          />
        </Box>
      ))}

      {extraCount > 0 && (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "rgba(153, 102, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 500,
            fontSize: "14px",
            marginLeft: "-20px",
            zIndex: 0,
            color: "white",
          }}
        >
          +{extraCount}
        </Box>
      )}
    </Box>
  );
};

export default AvatarGroupPreview;

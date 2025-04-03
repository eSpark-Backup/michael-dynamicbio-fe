import { Paper, Stack, Typography, Box } from "@mui/material";
import { CustomizeTabs, OutlinedInput } from "../../../components";
import { article, event, photo, research, settings, user, video } from "../../../assets";

const Feed = ({ userData, isPublicView }) => {
  const tabOptions = ["Posts", "Collaborations", "Events"];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
        {[
          { title: "Bonds", count: 0 },
          { title: "Your Groups", count: 0 },
          { title: "Joined Groups", count: 0 },
        ].map((item) => {
          return (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              key={item.title}
              sx={{
                width: "315px",
                height: "61px",
                borderRadius: "4px",
                background: "#FFF",
              }}
            >
              <Typography
                sx={{ color: "#171717" }}
                fontSize="14px"
                fontWeight={500}
              >
                {item.count}
              </Typography>
              <Typography
                sx={{ color: "#505050" }}
                fontSize="14px"
                fontWeight={400}
              >
                {item.title}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography fontSize="14px" fontWeight={400}>
            Activity
          </Typography>
          {!isPublicView && (
            <img
              style={{ cursor: "pointer", width: "24px", height: "24px" }}
              src={settings}
              alt={"settings"}
            />
          )}
        </Stack>
        <CustomizeTabs tabs={tabOptions} />
        {!isPublicView && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: "30px",
                flexDirection: { xs: "column", md: "row" },
                rowGap: "5px",
              }}
            >
              <img
                style={{
                  width: "73px",
                  height: "73px",
                  borderRadius: "50%",
                }}
                src={userData?.profileImage || user}
                alt="User"
              />
              <OutlinedInput
                placeholder="Start a post"
                sx={{ height: "73px", width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                rowGap: "10px",
              }}
            >
              {[
                { img: photo, label: "Photo" },
                { img: video, label: "Video" },
                { img: article, label: "Article" },
                { img: event, label: "Event" },
                { img: research, label: "Research" },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: "100%", md: "180px" },
                    height: "50px",
                    padding: "20px",
                    backgroundColor: "#F8FCFF",
                    borderRadius: "2px",
                    display: "flex",
                    columnGap: "15px",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={item.img}
                    alt={item.label}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#505050",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};
export default Feed;

import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { dummyPhoto, friend, noPosts } from "../../../assets";

const ActivitySection = () => {
  const items = [
    "All",
    "Comments",
    "Mentions",
    "Reactions",
    "Reposts",
    "Analytics",
  ];
  const [activeItem, setActiveItem] = useState("All");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Paper>
        <Typography
          sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
        >
          Activity
        </Typography>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}
        >
          Keep track of the activity around your page
        </Typography>
        <Box
          sx={{
            mt: "30px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
            gap: { xs: 2, sm: 0 }, // Add gap between items when stacked
          }}
        >
          {items?.map((item, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: "500",
                color: "#171717",
                cursor: "pointer",
                lineHeight: "normal",
                flexGrow: 1,
                textAlign: { xs: "center", sm: "left" },
                py: { xs: 1, sm: 0 },
                borderBottom: {
                  xs: activeItem === item ? "2px solid primary.main" : "none",
                  sm: "none",
                },
              }}
              variant={activeItem === item ? "gradientText" : "body1"}
              onClick={() => setActiveItem(item)}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Paper>
      <Paper sx={{ padding: "0px 0px" }}>
        <Box
          sx={{
            p: "1.6rem .8rem 1.6rem 0.8rem",
            backgroundColor: "rgb(55 143 233/.2)",
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
          }}
        >
          <Box sx={{ display: "flex", columnGap: "15px" }}>
            <Box
              sx={{
                display: "flex",
                columnGap: "10px",
                height: "fit-content",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))",
                }}
              ></Box>
              <Box sx={{ width: "40px", height: "40px", position: "relative" }}>
                <img
                  src={friend}
                  alt="user"
                  style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                />
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#12B76A",
                    border: "1.5px solid #FFFFFF",
                    borderRadius: "50%",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                  }}
                ></Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                rowGap: "5px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#505050" }}
                >
                  John Doe{" "}
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: "500",
                      color: "#171717",
                    }}
                  >
                    {"reacted to your company's update"}
                  </span>
                </Typography>
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#505050" }}
                >
                  4m
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #E4E4E4",
                  borderBottomLeftRadius: "4px",
                  borderBottomRightRadius: "4px",
                }}
              >
                <Box
                  sx={{
                    borderTopRightRadius: "4px",
                    borderTopLeftRadius: "4px",
                    borderBottom: "1px solid #E4E4E4",
                    p: "8px",
                    backgroundColor: "#edeeef",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    See full video
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "10px",
                    pl: "10px",
                    backgroundColor: "#edeeef",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={noPosts}
                    alt="Image"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    13 views
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            p: "1.6rem .8rem 1.6rem 0.8rem",
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
          }}
        >
          <Box sx={{ display: "flex", columnGap: "15px" }}>
            <Box
              sx={{
                display: "flex",
                columnGap: "10px",
                height: "fit-content",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))",
                  visibility: "hidden",
                }}
              ></Box>
              <img
                src={dummyPhoto}
                alt="Image"
                style={{ width: "60px", height: "60px" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                rowGap: "5px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#505050" }}
                >
                  RottenRia has{" "}
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: "500",
                      color: "#171717",
                    }}
                  >
                    1 new visitor
                  </span>
                </Typography>
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#505050" }}
                >
                  6d
                </Typography>
              </Box>

              <Box
                sx={{
                  minWidth: "150px",
                  height: "36px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "white",
                  position: "relative",
                  px: "10px",
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
                  maxWidth: "fit-content",
                }}
              >
                <Typography variant="gradientText">
                  See visitor analytics
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ActivitySection;

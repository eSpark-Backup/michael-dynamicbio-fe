import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { profile2 } from "../assets";

const ViewPolls = ({ options }) => {
    console.log(options, "options")
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <Box sx={{ mt: "10px", height: "450px", overflowY: "auto" }}>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        centered
        TabIndicatorProps={{
          style: {
            background:
              "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
            height: "3px",
            borderRadius: "5px",
          },
        }}
        sx={{ borderBottom: "1px solid #E4E4E4" }}
      >
        {options.map((option) => (
          <Tab
            key={option.id}
            label={
              <Box
                textAlign="center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <Typography variant="gradientText">
                  {option.numbersVoted}
                </Typography>
                <Typography sx={{ color: "#505050" }}>
                  {option.value}
                </Typography>
              </Box>
            }
            sx={{ minWidth: "150px" }}
          />
        ))}
      </Tabs>
      <Box
        sx={{
          m: "20px 10px",
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
        }}
      >
        {options[selectedTab].voteBy?.length > 0 &&
          options[selectedTab]?.voteBy?.map((item) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <img
                  src={profile2}
                  alt="Icon"
                  style={{ width: "64px", height: "64px" }}
                />
                <Box
                  sx={{
                    borderBottom: "1px solid #E4E4E4",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "3px",
                    pb: "15px",
                  }}
                >
                  <Stack direction={"row"} gap={"4px"}>
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: "500",
                        fontSize: "16px",
                      }}
                    >
                      Ammar Hassan
                    </Typography>
                    <Typography
                      sx={{
                        color: "#505050",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    >
                      •
                    </Typography>
                    <Typography
                      sx={{
                        color: "#505050",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    >
                      2nd
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "#505050", fontSize: "14px" }}>
                    --
                  </Typography>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default ViewPolls;

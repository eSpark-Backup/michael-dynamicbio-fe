import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { close, downArrow, eventSpeakers, question } from "../assets";
import GroupAnalyticsChart from "./GroupAnalyticsChart";
import Dropdown from "./Dropdown";

const GroupAnalytics = () => {
  const tabs = [
    {
      label: "Growth",
      component: <></>,
    },
    {
      label: "Engagement",
      component: <></>,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showAnalyticsBox, setShowAnalyticsBox] = useState(true);
  const [selectedValue, setSelectedValue] = useState("title");
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <Box
      sx={{
        margin: "20px 25px",
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
      }}
    >
      {showAnalyticsBox && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}
          >
            <img src={eventSpeakers} alt="Image" />
            <Stack direction={"column"}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}
              >
                Welcome to group analytics!
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
              >
                Data from October 25th, 2021 and onwards is now available.
              </Typography>
            </Stack>
          </Box>
          <img
            src={close}
            alt="Icon"
            onClick={() => setShowAnalyticsBox(false)}
            style={{ cursor: "pointer" }}
          />
        </Paper>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          rowGap: "20px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "30%", lg: "20%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
          }}
        >
          <Paper sx={{ p: "0px" }}>
            {tabs?.map((item) => {
              const isActive = item.label === activeTab.label;
              return (
                <Box
                  onClick={() => setActiveTab(item)}
                  sx={{
                    p: "15px 30px",
                    cursor: "pointer",
                    position: "relative",
                    background:
                      "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": isActive
                      ? "transparent"
                      : "#000",
                    "&::after": {
                      content: '""',
                      display: isActive ? "block" : "none",
                      width: "6px",
                      height: "100%",
                      background:
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                      position: "absolute",
                      bottom: "0px",
                      left: "0px",
                      borderRadius: "2px",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#171717",
                      lineHeight: "normal",
                    }}
                    variant={isActive ? "gradientText" : "subtitle2"}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Paper>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "400", color: "#171717" }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "400" }}
              variant="gradientText"
            >
              Learn more{" "}
            </Typography>
            on how to use Group analytics.
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "65%", lg: "78%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
          }}
        >
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#505050",
                width: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              Mar 5, 2025 - Mar 19, 2025
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "flex-start",
                columnGap: "0px",
              }}
            >
              <img
                src={downArrow}
                alt=""
                style={{ width: "12px", height: "12px" }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#e1e1e1",
                }}
              />
            </Box>
          </Box>
          <Paper
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <Box
              sx={{ display: "flex", columnGap: "4px", alignItems: "center" }}
            >
              <Typography
                sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
              >
                Growth highlights
              </Typography>
              <img src={question} alt="Icon" />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", sm: "90%", md: "75%", lg: "70%" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
                >
                  2
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
                >
                  Total members
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
                >
                  13
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
                >
                  Active members
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
            >
              <Box
                sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
                >
                  Growth details
                </Typography>
                <img src={question} alt="" />
              </Box>
              <GroupAnalyticsChart />
            </Box>
          </Paper>
          <Paper
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <Box
              sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
            >
              <Typography
                sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
              >
                Member demographics
              </Typography>
              <img src={question} alt="" />
            </Box>
            <Box sx={{ width: "150px" }}>
              <Dropdown
                variant="outlined"
                options={[
                  { label: "Job title", value: "title" },
                  { label: "Location", value: "location" },
                ]}
                noLabel
                placeholder="Select format"
                value={selectedValue}
                handleChange={handleChange}
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}
            >
              <Box sx={{ display: "flex", columnGap: "3px" }}>
                <Typography
                  sx={{ color: "#171717", fontSize: "16px", fontWeight: "500" }}
                >
                  Others
                </Typography>
                <Typography
                  sx={{ color: "#505050", fontSize: "16px", fontWeight: "400" }}
                >
                  {" "}
                  •{" "}
                </Typography>
                <Typography
                  sx={{ color: "#505050", fontSize: "16px", fontWeight: "400" }}
                >
                  {" "}
                  100%{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  borderRadius: "3px",
                  height: "5px",
                  backgroundColor: "#252424",
                }}
              ></Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupAnalytics;

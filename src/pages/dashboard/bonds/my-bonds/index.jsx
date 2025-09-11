import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import Grow from "./grow";
import CatchUp from "./catch-up";

const MyBond = () => {
  const tabs = [
    {
      label: "Grow",
      component: <Grow />,
    },
    {
      label: "Catch up",
      component: (
        <CatchUp
          onGrow={() =>
            setActiveTab({
              label: "Grow",
              component: <Grow />,
            })
          }
        />
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={5}
        sx={{
          background: "#FFF",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
          padding: "18px 30px",
        }}
      >
        {tabs.map((tab) => (
          <Typography
            sx={{
              cursor: "pointer",
              position: "relative",
              background:
                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:
                tab?.label === activeTab?.label ? "transparent" : "#000",
            }}
            fontSize="14px"
            fontWeight={500}
            onClick={() => setActiveTab(tab)}
            key={tab.label}
          >
            {tab.label}
          </Typography>
        ))}
      </Stack>
      {activeTab?.component}
    </>
  );
};

export default MyBond;

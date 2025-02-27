import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import PagesTab from "./pagestab";
import CreatePage from "./createPage";
import { groupsData } from "../../../../constant";
import { useQuery } from "../../../../utils";

const Pages = () => {
  const query = useQuery();
  const edit = query.get("edit");
  const idEdit = edit === "true";
  const tabs = [
    {
      label: "Your",
      component: (
        <PagesTab suggestedPages={groupsData} accounts={[]} type="my-pages" />
      ),
    },
    {
      label: "Followed",
      component: <PagesTab accounts={groupsData} />,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return idEdit ? (
    <CreatePage />
  ) : (
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
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color":
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

export default Pages;

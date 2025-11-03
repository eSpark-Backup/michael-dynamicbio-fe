import { Stack, Tab, Tabs, Typography } from "@mui/material";

const SideNav = ({
  tabValue,
  onChange,
  innerTabValue,
  onInnerChange,
  data,
}) => {
  const { navItems } = data || {};

  const currentTab = navItems.tabs[tabValue];

  const renderTabs = () => {
    if (currentTab?.innerTabs) {
      return (
        <Tabs
          orientation="vertical"
          value={innerTabValue}
          onChange={onInnerChange}
          aria-label="inner navigation tabs"
          sx={{
            alignItems: "flex-start",
            "& .MuiTab-root": { mb: 1 },
            ".MuiTabs-indicator": { display: "none" },
          }}
        >
          {currentTab.innerTabs.map((item, index) => (
            <Tab
              key={index}
              label={item.tab}
              value={index}
              sx={{
                height: 52,
                color: "#000000",
                fontSize: 14,
                fontWeight: "400",
                fontFamily: "Nunito",
                alignItems: "flex-start",
                pl: 2.5,
                textTransform: "none",
                "&.Mui-selected": {
                  background:
                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                  color: "#FFF",
                },
                "&:hover": {
                  background:
                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                  color: "#FFF",
                },
              }}
            />
          ))}
        </Tabs>
      );
    }

    // 🔹 Otherwise show main (outer) tabs
    return (
      <Tabs
        orientation="vertical"
        value={tabValue}
        onChange={onChange}
        aria-label="marketplace navigation tabs"
        sx={{
          alignItems: "flex-start",
          "& .MuiTab-root": { mb: 1 },
          ".MuiTabs-indicator": { display: "none" },
        }}
      >
        {navItems.tabs.map((item, index) => (
          <Tab
            key={index}
            label={item.tab}
            value={index}
            sx={{
              height: 52,
              color: "#000000",
              fontSize: 14,
              fontWeight: "400",
              fontFamily: "Nunito",
              alignItems: "flex-start",
              pl: 2.5,
              textTransform: "none",
              "&.Mui-selected": {
                background:
                  "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                color: "#FFF",
              },
              "&:hover": {
                background:
                  "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                color: "#FFF",
              },
            }}
          />
        ))}
      </Tabs>
    );
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: 315,
        height: "100%",
        minHeight: 400,
        maxHeight: "100%",
        display: "none",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E4E4E4",
        py: 2.5,
        px: 2.5,
        pr: 0,
        "@media(min-width:1024px)": {
          display: "flex",
        },
      }}
    >
      <Stack p={2}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="#171717"
          fontFamily={"Nunito"}
        >
          {navItems?.text?.[tabValue]}
        </Typography>
      </Stack>

      <Stack>{renderTabs()}</Stack>
    </Stack>
  );
};

export default SideNav;

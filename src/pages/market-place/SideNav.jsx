import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { SIDENAV_STYLES } from "./Styles";

const SideNav = ({
  tabValue,
  onChange,
  innerTabValue,
  onInnerChange,
  data,
}) => {
  const { navItems } = data || {};
  const currentTab = navItems.tabs[tabValue];

  const { mainWrapper, titleBox, tabsContainer, tabItem } = SIDENAV_STYLES;

  const renderTabs = () => {
    if (currentTab?.innerTabs) {
      return (
        <Tabs
          orientation="vertical"
          value={innerTabValue}
          onChange={onInnerChange}
          aria-label="inner navigation tabs"
          sx={tabsContainer}
        >
          {currentTab.innerTabs.map((item, index) => (
            <Tab key={index} label={item.tab} value={index} sx={tabItem} />
          ))}
        </Tabs>
      );
    }

    return (
      <Tabs
        orientation="vertical"
        value={tabValue}
        onChange={onChange}
        aria-label="marketplace navigation tabs"
        sx={tabsContainer}
      >
        {navItems.tabs.map((item, index) => (
          <Tab key={index} label={item.tab} value={index} sx={tabItem} />
        ))}
      </Tabs>
    );
  };

  return (
    <Stack spacing={2} sx={mainWrapper}>
      <Stack sx={titleBox}>
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

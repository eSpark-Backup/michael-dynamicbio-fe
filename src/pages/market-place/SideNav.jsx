import { Stack, Typography } from "@mui/material";
import { SIDENAV_STYLES } from "./Styles";
import { Link, useLocation } from "react-router-dom";

const SideNav = ({ data }) => {
  const { navItems } = data || {};
  const { pathname } = useLocation();
  const { mainWrapper, titleBox, tabItem } = SIDENAV_STYLES;

  const activeTab = navItems?.tabs?.find((t) => pathname?.includes(t.path));
  const hasInnerTabs = activeTab && activeTab?.innerTabs;

  const renderTabs = () => {
    const tabsToRender = hasInnerTabs ? activeTab?.innerTabs : navItems?.tabs;

    return (
      <Stack spacing={0.5}>
        {tabsToRender?.map((item, index) => (
          <Link
            key={index}
            to={item?.path || "#"}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <Typography sx={tabItem(pathname, item.path)}>
              {item?.tab}
            </Typography>
          </Link>
        ))}
      </Stack>
    );
  };

  return (
    <Stack spacing={2} sx={mainWrapper}>
      <Stack sx={titleBox}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="#171717"
          fontFamily="Nunito"
        >
          {hasInnerTabs ? navItems?.text?.[1] : navItems?.text?.[0] ?? ""}
        </Typography>
      </Stack>
      <Stack>{renderTabs()}</Stack>
    </Stack>
  );
};

export default SideNav;

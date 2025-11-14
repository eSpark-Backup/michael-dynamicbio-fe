import { useMediaQuery, Drawer, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { SIDENAV_STYLES } from "./Styles";

const SideNav = ({ isMobileSidebarOpen, onSidebarClose, data }) => {
  const { navItems } = data || {};
  const { pathname } = useLocation();
  const { mainWrapper, titleBox, tabItem } = SIDENAV_STYLES;

  const activeTab = navItems?.tabs?.find((t) => {
    // Exact match for parent tabs
    if (t.path === pathname) return true;

    // If innerTabs exist → match child routes
    if (t.innerTabs) {
      return t.innerTabs.some((inner) => pathname.startsWith(inner.path));
    }

    return false;
  });

  const hasInnerTabs = activeTab && activeTab?.innerTabs;
  const lgUp = useMediaQuery("(min-width:1024px)");

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

  if (lgUp) {
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
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          p: 0,
          border: 0,
          boxShadow: "none",
        },
      }}
    >
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
    </Drawer>
  );
};

export default SideNav;

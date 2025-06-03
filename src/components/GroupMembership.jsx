import { Box, Grid2, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GroupMembers from './GroupMembers';
import GroupAdmins from './GroupAdmins';
import GroupRequests from './GroupRequests';
import GroupInvited from './GroupInvited';
import GroupBlocked from './GroupBlocked';
import { useSearchParams } from 'react-router-dom';

const GroupMembership = ({ data, refetch }) => {
    const tabs = [
        {
            label: "Members",
            component: (
                <GroupMembers data={data} refetch={refetch} />
            ),
        },
        {
            label: "Admins",
            component: <GroupAdmins data={data} refetch={refetch} />
        },
        {
            label: "Requests",
            component: <GroupRequests data={data} refetch={refetch} />
        },
        // {
        //     label: "Invited",
        //     component: <GroupInvited />
        // },
        // {
        //     label: "Blocked",
        //     component: <GroupBlocked />
        // },
    ];
    
      const [searchParams, setSearchParams] = useSearchParams();
      const tabParam = searchParams.get("sub-tab");
      const [activeTabLabel, setActiveTabLabel] = useState(
        tabParam || "Members"
      );
      const activeTab = tabs.find((tab) => tab.label === activeTabLabel);
    
      useEffect(() => {
        if (tabParam && tabParam !== activeTabLabel) {
          setActiveTabLabel(tabParam);
        }
      }, [tabParam]);
    return (
        <Box sx={{ margin: "20px 25px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, rowGap: "20px" }}>
                <Box sx={{ width: { xs: "100%", md: "30%", lg: "20%" } }}>
                    <Paper sx={{ p: "0px" }}>
                        {tabs?.map((item) => {
                            const isActive = item.label === activeTab.label;
                            return (
                                <Box
                                    onClick={() => {
                                        setActiveTabLabel(item.label);
                                        setSearchParams({ tab: "Membership", "sub-tab": item.label });
                                    }}
                                    sx={{
                                        p: "15px 30px",
                                        cursor: "pointer",
                                        position: "relative",
                                        background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                        "-webkit-background-clip": "text",
                                        "-webkit-text-fill-color": isActive ? "transparent" : "#000",
                                        "&::after": {
                                            content: '""',
                                            display: isActive ? "block" : "none",
                                            width: "6px",
                                            height: "100%",
                                            background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                            position: "absolute",
                                            bottom: "0px",
                                            left: "0px",
                                            borderRadius: "2px",
                                        },
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717", lineHeight: "normal" }} variant={isActive ? "gradientText" : "subtitle2"}>
                                        {item.label}
                                    </Typography>
                                </Box>
                            );
                        })}

                    </Paper>
                </Box>
                <Box sx={{ width: { xs: "100%", md: "65%", lg: "78%" } }}>
                    {activeTab?.component}
                </Box>
            </Box >
        </Box >
    )
}

export default GroupMembership

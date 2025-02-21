import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

const CustomizeTabs = ({ tabs, onChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
                display: "flex",
            }}
        >
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    label={tab}
                    sx={{
                        backgroundColor: "#F8FCFF",
                        textTransform: "none",
                        color: "#333",
                        fontWeight: 400,
                        fontSize: "14px",
                        borderRadius: "2px",
                        width: "170px",
                        mr: index !== tabs.length - 1 ? "20px" : 0,
                        "&.Mui-selected": {
                            background:
                                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))",
                            color: "#fff !important",
                        },
                    }}
                />
            ))}
        </Tabs>
    );
};

export default CustomizeTabs;

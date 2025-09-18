import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Checkbox, FormControlLabel, Box, Typography } from "@mui/material";

const data = [
  { date: "Mar 5", newMembers: 0, activeMembers: 0 },
  { date: "Mar 8", newMembers: 0, activeMembers: 0 },
  { date: "Mar 11", newMembers: 0, activeMembers: 0 },
  { date: "Mar 14", newMembers: 0, activeMembers: 0 },
  { date: "Mar 17", newMembers: 2, activeMembers: 1 },
  { date: "Mar 18", newMembers: 0, activeMembers: 5 },
  { date: "Mar 19", newMembers: 2, activeMembers: 13 },
];

export default function GroupAnalyticsChart() {
  const [showNew, setShowNew] = useState(true);
  const [showActive, setShowActive] = useState(true);

  return (
    <Box sx={{ width: "100%", height: 500 }}>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" dy={5} />
          <YAxis />
          <Tooltip />
          {showNew && (
            <Line
              type="monotone"
              dataKey="newMembers"
              stroke="#007bff"
              strokeWidth={2}
              dot={false}
              name="New members"
            />
          )}
          {showActive && (
            <Line
              type="monotone"
              dataKey="activeMembers"
              stroke="#a3a300"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
              name="Active members"
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showNew}
                onChange={() => setShowNew(!showNew)}
                name="newMembers"
              />
            }
            label=""
            sx={{ mr: "0px" }}
          />
          <Box
            sx={{ width: "21px", height: "2px", backgroundColor: "#007bff" }}
          />
          <Typography sx={{ ml: "10px" }}>New members</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showActive}
                onChange={() => setShowActive(!showActive)}
                name="activeMembers"
              />
            }
            label=""
            sx={{ mr: "0px" }}
          />
          <Box sx={{ display: "flex", columnGap: "3px" }}>
            <Box
              sx={{ width: "5px", height: "2px", backgroundColor: "#a3a300" }}
            />
            <Box
              sx={{ width: "5px", height: "2px", backgroundColor: "#a3a300" }}
            />
            <Box
              sx={{ width: "5px", height: "2px", backgroundColor: "#a3a300" }}
            />
          </Box>
          <Typography sx={{ ml: "10px" }}>Active members</Typography>
        </Box>
      </Box>
    </Box>
  );
}

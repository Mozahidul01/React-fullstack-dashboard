import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useState } from "react";
import OverviewChart from "../../components/OverviewChart";

export default function Overview() {
  const [view, setView] = useState("units");

  return (
    <Box m="0.5em 1em">
      <PageHeader
        title="Overview"
        subtitle="Overview of general revenue & profit"
      />
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem
              default
              value="units"
            >
              Units
            </MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

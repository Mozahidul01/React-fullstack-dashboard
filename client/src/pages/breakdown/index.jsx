import { Box } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import BreakdownChart from "../../components/BreakdownChart";

export default function Breakdown() {
  return (
    <Box m="0.5rem 1rem">
      <PageHeader
        title="Breakdown"
        subtitle="Breakdown of Sales By Category"
      />
      <Box
        mt="2rem"
        height="70dvh"
      >
        <BreakdownChart />
      </Box>
    </Box>
  );
}

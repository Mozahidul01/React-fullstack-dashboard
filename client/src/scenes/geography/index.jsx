import { Box, CircularProgress, useTheme } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useGetGeographyQuery } from "../../features/geography/geographyApi";
import Error from "../../components/utils/Error";
import GeographyMap from "../../components/GeographyMap";

export default function Geography() {
  const theme = useTheme();
  const { data: geography, isLoading, isError } = useGetGeographyQuery();

  // Decide what to render
  let content = null;

  if (isLoading && !isError && !geography) {
    content = (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress size={80} />
      </Box>
    );
  } else if (isError && !geography) {
    content = <Error message="An error occurred" />;
  } else {
    content = (
      <Box
        mt="2.5rem"
        height="75vh"
        border={`1px solid ${theme.palette.grey.bg}`}
        borderRadius="4px"
      >
        <GeographyMap geography={geography} />
      </Box>
    );
  }

  return (
    <Box m="0.5em 1em">
      <PageHeader
        title="Geography"
        subtitle="Geographics location of users"
      />
      {content}
    </Box>
  );
}

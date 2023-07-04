import { Box, Typography, useTheme } from "@mui/material";

export default function PageHeader({ title, subtitle }) {
  const theme = useTheme();
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h2"
        color={theme.palette.grey.dark}
        fontWeight="bold"
        sx={{ mb: "0.215rem", textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color={theme.palette.grey.light}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

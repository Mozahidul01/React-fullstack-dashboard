/* eslint-disable react/prop-types */
import { ResponsivePie } from "@nivo/pie";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useGetSalesOverviewQuery } from "../features/salesOverview/salesOverviewApi";
import Error from "./utils/Error";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading, isError } = useGetSalesOverviewQuery();
  const theme = useTheme();

  if (!data || isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress size={80} />
      </Box>
    );

  const colors = [
    theme.palette.primary[500],
    theme.palette.secondary[500],
    theme.palette.secondary.dark,
    theme.palette.primary.dark,
  ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <>
      {isError ? (
        <Error message="An Error Occured" />
      ) : (
        <Box
          height={isDashboard ? "25rem" : "100%"}
          width={undefined}
          minHeight={isDashboard ? "20rem" : undefined}
          minWidth={isDashboard ? "20rem" : undefined}
          position="relative"
        >
          <ResponsivePie
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.grey.light,
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.grey.text,
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary.light,
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.grey.light,
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.grey.text,
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.secondary.main,
                },
              },
            }}
            colors={{ datum: "data.color" }}
            margin={
              isDashboard
                ? { top: 40, right: 80, bottom: 100, left: 50 }
                : { top: 40, right: 80, bottom: 80, left: 80 }
            }
            sortByValue={true}
            innerRadius={0.45}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={!isDashboard}
            arcLinkLabelsTextColor={theme.palette.secondary.light}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={theme.palette.grey.text}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: isDashboard ? 20 : 0,
                translateY: isDashboard ? 50 : 56,
                itemsSpacing: 10,
                itemWidth: 85,
                itemHeight: 18,
                itemTextColor: theme.palette.grey.text,
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.secondary.light,
                    },
                  },
                ],
              },
            ]}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            color={theme.palette.secondary.light}
            textAlign="center"
            pointerEvents="none"
            sx={{
              transform: isDashboard
                ? "translate(-75%, -170%)"
                : "translate(-50%, -100%)",
            }}
          >
            <Typography variant="h6">
              {!isDashboard && "Total:"} ${data.yearlySalesTotal}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
export default BreakdownChart;

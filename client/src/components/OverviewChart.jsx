import { Box, CircularProgress, useTheme } from "@mui/material";
import { useGetSalesOverviewQuery } from "../features/salesOverview/salesOverviewApi";
import { useMemo } from "react";
import Error from "./utils/Error";
import { ResponsiveLine } from "@nivo/line";

export default function OverviewChart({ isDashboard = false, view }) {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetSalesOverviewQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [[], []];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.primary.main,
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const currentSales = acc.sales + totalSales;
        const currentUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: currentSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: currentUnits },
        ];

        return { sales: currentSales, units: currentUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data, theme]);

  // Decide what to render
  let content = null;

  if (isLoading && !isError && !data) {
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
  } else if (isError && !data) {
    content = <Error message="An error occurred" />;
  } else {
    content = (
      <ResponsiveLine
        data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
                fill: theme.palette.grey.text,
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
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="natural"
        enableArea={isDashboard}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => {
            if (isDashboard) return v.slice(0, 3);
            return v;
          },
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legend: isDashboard ? "" : "Month",
          legendOffset: 42,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard
            ? ""
            : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
          legendOffset: -60,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={
          !isDashboard
            ? [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 30,
                  translateY: -40,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : undefined
        }
      />
    );
  }

  return (
    <Box
      m="0.5rem 1rem"
      height="70dvh"
      sx={{ maxHeight: "100%" }}
    >
      {content}
    </Box>
  );
}

import { useMemo, useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from "@nivo/line";
import PageHeader from "../../components/PageHeader";
import { useGetSalesOverviewQuery } from "../../features/salesOverview/salesOverviewApi";
import Error from "../../components/utils/Error";

export default function Daily() {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetSalesOverviewQuery();
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));

  const [formattedData] = useMemo(() => {
    if (!data) return [[], []];

    const { dailyData } = data;
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

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);

      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data, endDate, startDate, theme]);

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
      <Box height="75dvh">
        <Box
          display="flex"
          justifyContent="flex-end"
          gap="1em"
        >
          <Box
            sx={{
              "& input": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.grey.text,
                border: `1px solid ${theme.palette.grey.bg}`,
                borderRadius: "4px",
                padding: "0.5rem 1rem",
              },
            }}
          >
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box
            sx={{
              "& input": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.grey.text,
                border: `1px solid ${theme.palette.grey.bg}`,
                borderRadius: "4px",
                padding: "0.5rem 1rem",
              },
            }}
          >
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        <ResponsiveLine
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
          colors={{ datum: "color" }}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          enableArea={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 30,
            legend: "Month",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
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
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
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
          ]}
        />
      </Box>
    );
  }

  return (
    <Box m="0.5em 1em">
      <PageHeader
        title="Daily Sales"
        subtitle="Daily sales overview"
      />
      {content}
    </Box>
  );
}

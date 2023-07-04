import { ResponsiveChoropleth } from "@nivo/geo";
import { useTheme } from "@mui/material";
import { geoData } from "../utils/geoData";

export default function GeographyMap({ geography }) {
  const theme = useTheme();

  return (
    <ResponsiveChoropleth
      data={geography}
      colors="YlGn"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tricks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.secondary.main,
          },
        },
      }}
      features={geoData.features}
      margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
      domain={[0, 60]}
      unknownColor="#818181"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={150}
      projectionTranslation={[0.45, 0.6]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1}
      borderColor={theme.palette.grey.dark}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
        {
          id: "gradient",
          type: "linearGradient",
          colors: [
            {
              offset: 0,
              color: "#000",
            },
            {
              offset: 100,
              color: "inherit",
            },
          ],
        },
      ]}
      fill={[
        {
          match: {
            id: "CAN",
          },
          id: "dots",
        },
        {
          match: {
            id: "CHN",
          },
          id: "lines",
        },
        {
          match: {
            id: "ATA",
          },
          id: "gradient",
        },
      ]}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: true,
          translateX: 0,
          translateY: -125,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: theme.palette.secondary[200],
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: theme.palette.grey.light,
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

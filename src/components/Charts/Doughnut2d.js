// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import Theme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, Theme);

const ChartComponent = ({ data }) => {

  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "",
        subcaption: "",
        theme: "fusion",
        doughnutRadius: '60%',
        showPercentValues: 1,
        showPercentInTooltip: 1,
        showLabels: 1,
        showLegend: 1,
        legendPosition: "bottom",
        legendItemFontSize: "12",
        legendItemFontColor: "#E5E7EB",
        centerLabel: "Stars",
        centerLabelFontSize: "14",
        centerLabelFontColor: "#E5E7EB",
        centerLabelBold: 0,
        showBorder: 0,
        showShadow: 0,
        enableSmartLabels: 1,
        startingAngle: 0,
        useEllipsesWhenOverflow: 1,
        showPlotBorder: 0,
        plotBorderColor: "#374151",
        plotBorderThickness: 0,
        showHoverEffect: 1,
        hoverSensitivity: 0.1,
        hoverAlpha: 0.8,
        showToolTip: 1,
        toolTipBgColor: "#1F2937",
        toolTipColor: "#F9FAFB",
        toolTipBorderColor: "#4B5563",
        toolTipBorderThickness: 1,
        toolTipSepChar: " | ",
        useDataPlotColorForLabels: 1,
        animation: 1,
        animationDuration: 1.5,
        animationEasing: "easeout",
        bgColor: "#111827",
        canvasBgColor: "#111827",
        paletteColors: "#8B5CF6,#10B981,#F59E0B,#EF4444,#3B82F6,#06B6D4,#84CC16,#F97316,#EC4899,#6366F1"
      },
      // Chart Data
      data: data,
    }
  };

  return (<ReactFC {...chartConfigs} />);
}

export default ChartComponent;
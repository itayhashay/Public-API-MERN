import React from "react";
import { Chart } from "react-google-charts";
import { Container } from "./styles";

const RadialChart = () => {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    legend: "right",
    title: "My Big Pie Chart",
    is3D: false,
    chartArea: { width: 600, height: 500 },
  };

  return (
    <Container>
      <Chart chartType="PieChart" options={options} data={data} />
    </Container>
  );
};

export default RadialChart;

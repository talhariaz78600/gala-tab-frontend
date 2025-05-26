import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ReportChart({ chartData }) {
  // Helper for background gradient
  const gradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(253, 99, 99, 0.2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.18)");
    return gradient;
  };

  // Safeguard if chartData is missing
  const labels = chartData?.map((item) => item.yearsOfMonth) || [];
  const values = chartData?.map((item) => item.revenue) || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: values,
        fill: true,
        backgroundColor: (context) => gradient(context.chart.ctx),
        borderColor: "rgba(253, 109, 109, 1)",
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: true } },
      y: { grid: { display: true } },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

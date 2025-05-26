import React, { useRef, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { ThemeContext } from "../ThemeProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({
  data: chartData = [],
  label = "Bookings",
}) {
  const chartRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const gradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    if (isDark) {
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
    } else {
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.2)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
    }
    return gradient;
  };

  const labels = chartData.map((item) => dayjs(item._id).format("MMM D"));
  const counts = chartData.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label,
        data: counts,
        fill: true,
        backgroundColor: (context) => gradient(context.chart.ctx),
        borderColor: isDark ? "#ffffff" : "#000000",
        pointBackgroundColor: isDark ? "#ffffff" : "#000000",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        titleColor: isDark ? "#ffffff" : "#000000",
        bodyColor: isDark ? "#d1d5db" : "#374151",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: isDark ? "#d1d5db" : "#374151",
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          display: true,
        },
        ticks: {
          color: isDark ? "#d1d5db" : "#374151",
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <Line ref={chartRef} data={data} options={options} />;
}

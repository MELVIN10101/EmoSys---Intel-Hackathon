import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [cpuData, setCpuData] = useState([]);
  const [gpuData, setGpuData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [viewMode, setViewMode] = useState(1);

  // Function to fetch live metrics from the server
  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:5000/metrics");
      const data = await response.json();

      console.log("Fetched from server:", data); // Log data from server

      // Get current time as a label
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Update data states
      setCpuData((prevData) => {
        const newData = [...prevData, data.cpuUsage];
        // Limit to the last 10 data points
        return newData.length > 10
          ? newData.slice(newData.length - 10)
          : newData;
      });

      setGpuData((prevData) => {
        const newData = [...prevData, data.gpuUsage];
        // Limit to the last 10 data points
        return newData.length > 10
          ? newData.slice(newData.length - 10)
          : newData;
      });

      setTimeLabels((prevLabels) => {
        const newLabels = [...prevLabels, currentTime];
        // Limit to the last 10 labels
        return newLabels.length > 10
          ? newLabels.slice(newLabels.length - 10)
          : newLabels;
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  // Fetch metrics every three seconds
  useEffect(() => {
    const interval = setInterval(fetchMetrics, 3000); // Update data every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const cpuChartData = {
    labels: timeLabels, // Use timeLabels for x-axis
    datasets: [
      {
        label: "CPU Usage (%)",
        data: cpuData,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const gpuChartData = {
    labels: timeLabels, // Use timeLabels for x-axis
    datasets: [
      {
        label: "GPU Usage (%)",
        data: gpuData,
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "System Usage Over Time",
        color: "#111111",
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="home-section">
      {/* Toggle buttons for graphs */}
      <div className="toggle-buttons" style={{ marginBottom: "20px" }}>
        <button onClick={() => setViewMode(1)}>Show CPU Graph</button>
        <button onClick={() => setViewMode(2)}>Show GPU Graph</button>
        <button onClick={() => setViewMode(3)}>Show Both Graphs</button>
      </div>

      {/* Conditional Rendering of Graphs based on viewMode */}
      <div
        className="charts-container"
        style={{ display: "flex", gap: "20px" }}
      >
        {viewMode === 1 && (
          <div className="chart cpu-chart">
            <Line data={cpuChartData} options={options} />
          </div>
        )}
        {viewMode === 2 && (
          <div className="chart gpu-chart">
            <Line data={gpuChartData} options={options} />
          </div>
        )}
        {viewMode === 3 && (
          <>
            <div className="chart cpu-chart" style={{ flex: 1 }}>
              <Line data={cpuChartData} options={options} />
            </div>
            <div className="chart gpu-chart" style={{ flex: 1 }}>
              <Line data={gpuChartData} options={options} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

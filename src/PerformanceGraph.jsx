import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PerformanceGraph = () => {
  const [data, setData] = useState([]);

  // Function to generate random performance data for demonstration purposes
  const fetchData = () => {
    const cpuUsage = Math.floor(Math.random() * 100); // Simulated CPU usage
    const memoryUsage = Math.floor(Math.random() * 100); // Simulated memory usage
    const timestamp = new Date().toLocaleTimeString();

    return {
      time: timestamp,
      cpu: cpuUsage,
      memory: memoryUsage,
    };
  };

  // Update the graph data every second (or any interval)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => [...prevData.slice(-9), fetchData()]);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="cpu"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="memory" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceGraph;

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import analyticsService from "../services/analyticsService";
import "./Dashboard.css";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [domainData, setDomainData] = useState([]);

  useEffect(() => {
    // Fetch dummy data from analyticsService
    setSummaryData(analyticsService.getSummaryData());
    setDomainData(analyticsService.getDomainData());
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA64FA"];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Stellar Financial Group Analytics</h1>
      <div className="chart-row">
        <div className="chart-card">
          <h3>Total Applications Overview</h3>
          <BarChart width={500} height={300} data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
            <Bar dataKey="incomplete" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className="chart-card">
          <h3>Domain Performance</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={domainData}
              dataKey="value"
              nameKey="domain"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {domainData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-card full-width">
          <h3>Weekly Applications Trend</h3>
          <BarChart width={800} height={300} data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="weekly" fill="#FF8042" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

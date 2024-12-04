import React from "react";
import "./dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Sample data
  const timelineData = [
    { month: "Jan", students: 120 },
    { month: "Feb", students: 150 },
    { month: "Mar", students: 180 },
    { month: "Apr", students: 200 },
    { month: "May", students: 240 },
  ];

  const barData = [
    { category: "Math", students: 120 },
    { category: "Science", students: 80 },
    { category: "Arts", students: 50 },
    { category: "Commerce", students: 100 },
    { category: "Sports", students: 60 },
  ];

  const stats = [
    { label: "Total Earnings", value: "₹50,000", target: "₹100,000" },
    { label: "Total Students", value: "5,000", target: "10,000" },
    { label: "Total Courses", value: "35", target: "50" },
    { label: "Total Scheduled Classes", value: "220", target: "500" },
  ];

  const colors = ["#fdecc6", "#f9c365", "#ff9b6b", "#ff6f61"];

  return (
    <div className="dashboard-container">
      <div className="bento-grid">
        {/* Timeline Chart */}
        <div className="chart-box animated-pop">
          <h4>Timeline Chart: Student Count</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#f9c365" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-box animated-pop">
          <h4>Bar Chart: Course Categories</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#fdecc6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Doughnut Charts */}
        {stats.map((stat, index) => {
          const currentValue = parseInt(stat.value.replace(/\D/g, "")) || 0;
          const targetValue = parseInt(stat.target.replace(/\D/g, "")) || 0;
          const percentage = (currentValue / targetValue) * 100;

          return (
            <div key={index} className="doughnut-chart-box animated-pop">
              <h4>{stat.label}</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Achieved", value: currentValue },
                      { name: "Remaining", value: targetValue - currentValue },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill={colors[index % colors.length]}
                    dataKey="value"
                  >
                    <Cell fill={colors[index % colors.length]} />
                    <Cell fill="#e0e0e0" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="doughnut-value">
                {stat.value} / {stat.target} ({percentage.toFixed(1)}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

// import React from "react";
// import "./dashboard.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";

// const Dashboard = () => {
//   // Sample data for charts
//   const timelineData = [
//     { month: "Jan", students: 120 },
//     { month: "Feb", students: 150 },
//     { month: "Mar", students: 180 },
//     { month: "Apr", students: 200 },
//     { month: "May", students: 240 },
//   ];

//   const barData = [
//     { category: "Math", students: 120 },
//     { category: "Science", students: 80 },
//     { category: "Arts", students: 50 },
//     { category: "Commerce", students: 100 },
//     { category: "Sports", students: 60 },
//   ];

//   // Summary data
//   const stats = [
//     { label: "Total Earnings", value: "$50,000" },
//     { label: "Total Students", value: "1,200" },
//     { label: "Total Courses", value: "35" },
//     { label: "Total Scheduled Classes", value: "220" },
//   ];

//   return (
//     <div className="dashboard-container">
//       {/* Stats Boxes */}
//       <div className="stats-grid">
//         {stats.map((stat, index) => (
//           <div key={index} className="stat-box">
//             <h3>{stat.label}</h3>
//             <p>{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Graphs Section */}
//       <div className="graphs-grid">
//         <div className="graph-box">
//           <h4>Timeline Chart: Student Count</h4>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={timelineData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="students" stroke="#f9c365" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="graph-box">
//           <h4>Bar Chart: Course Categories</h4>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={barData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="students" fill="#fdecc6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from 'react';
// import './dashboard.css';

// function Dashboard() {
//   return (
//     <div className="container">
//       <div className="left-panel">

//         <div className="box-group">
//           <div className="box box-small"></div>
//           <div className="box box-small"></div>
//         </div>

//         <div className="box-group">
//           <div className="box box-small"></div>
//           <div className="box box-small"></div>
//         </div>

//         <div className="box box-large"></div>
//       </div>
//       <div className="right-panel">
//         <div className="box box-half"></div>
//         <div className="box box-half"></div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

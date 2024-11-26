import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dash_student.css";

function Dash_students() {
  const [students, setStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  // Fetch student data from the API
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/mystudents?auth=${localStorage.getItem("id")}`);
      console.log(response);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Sorting functionality
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setStudents((prevStudents) => {
      const sortedStudents = [...prevStudents].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
      return sortedStudents;
    });
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "Student_Data.xlsx");
  };

  return (
    <div>
      <h1>Student Information Table</h1>
      <button onClick={exportToExcel} className="export-button">
        Download Excel
      </button>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Student Name</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th onClick={() => handleSort("course")}>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.username}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dash_students;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash_schedule.css';

function DashSchedule() {
  const [courses, setCourses] = useState([]); // To store the courses fetched from the backend
  const [formData, setFormData] = useState({
    course: '',
    date: '',
    time_start: '',
    time_to: '',
  });
  const [message, setMessage] = useState('');

  // Fetch courses from the backend when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem('id')}`)
      .then((response) => {
        setCourses(response.data); // Set the fetched courses to state
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomCode=Date.now().toString();
    console.log(roomCode);

    const { course, date, time_start, time_to } = formData;

    if (!course) {
      setMessage('Please select a course.');
      return;
    }

    axios
      .post(
        `http://localhost:3000/api/scheduleClass?course=${course}&teacher=${localStorage.getItem('id')}`,
        {
          date,
          time_start,
          time_to,
          roomCode
        }
      )
      .then((response) => {
        setMessage('Class scheduled successfully!');
        setFormData({
          course: '',
          date: '',
          time_start: '',
          time_to: '',
        });
      })
      .catch((error) => {
        console.error('Error scheduling class:', error);
        setMessage('Failed to schedule class. Please try again.');
      });
  };

  return (
    <div className="schedule-class-container">
      <h1>Schedule a Class</h1>
      <form className="schedule-form" onSubmit={handleSubmit}>
        {/* Course Dropdown */}
        <div className="form-group">
          <label htmlFor="course">Select Course</label>
          <select
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Start Time Input */}
        <div className="form-group">
          <label htmlFor="time_start">Start Time</label>
          <input
            type="time"
            id="time_start"
            name="time_start"
            value={formData.time_start}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Time Input */}
        <div className="form-group">
          <label htmlFor="time_to">End Time</label>
          <input
            type="time"
            id="time_to"
            name="time_to"
            value={formData.time_to}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Schedule Class
        </button>
      </form>

      {/* Message Display */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DashSchedule;

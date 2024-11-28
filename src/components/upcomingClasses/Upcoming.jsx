import React from 'react';
import './UpcomingClasses.css';

const UpcomingClasses = ({ classes }) => {

    const classes = [
        {
          courseName: 'Mathematics 101',
          date: '2024-12-01',
          time: '10:00 AM',
        },
        {
          courseName: 'Physics for Engineers',
          date: '2024-12-02',
          time: '2:00 PM',
        },
        {
          courseName: 'Introduction to React',
          date: '2024-12-03',
          time: '4:00 PM',
        },
        {
          courseName: 'Data Structures and Algorithms',
          date: '2024-12-04',
          time: '11:00 AM',
        },
      ];
      
  return (
    <div className="upcoming-classes-container">
      <h1 className="heading">Your Upcoming Classes</h1>
      <div className="classes-list">
        {classes.length > 0 ? (
          classes.map((classItem, index) => (
            <div key={index} className="class-container">
              <div className="class-info">
                <h2 className="course-name">{classItem.courseName}</h2>
                <p className="class-details">
                  <span><strong>Date:</strong> {classItem.date}</span>
                  <br />
                  <span><strong>Time:</strong> {classItem.time}</span>
                </p>
              </div>
              <button className="join-button">Join Class</button>
            </div>
          ))
        ) : (
          <p>No upcoming classes.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingClasses;

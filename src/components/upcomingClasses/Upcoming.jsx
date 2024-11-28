import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Upcoming.css';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Upcoming = () => {
  const { id } = useParams(); // Extract course ID from the URL
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const joinMeeting = (roomCode) => {
    const appID = 1731996383;
    const serverSecret = "07bf73fbdd4291dc94114777d2d2d975";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomCode,
      Date.now().toString(),
      `${localStorage.getItem("username")}`
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.getElementById("zego-cloud-container"),
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
    });
  };

  useEffect(() => {
    const fetchUpcomingClasses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/Upcomingclasses?course=${id}`);
        setClasses(response.data); // Update state with fetched data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching classes:', err);
        setError('Failed to fetch upcoming classes. Please try again.');
        setLoading(false);
      }
    };

    if (id) {
      fetchUpcomingClasses();
    }
  }, [id]);

  return (
    <div className="upcoming-classes-container">
      <h1 className="heading">Your Upcoming Classes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="classes-list">
          {classes.length > 0 ? (
            classes.map((classItem, index) => (
              <div key={index} className="class-container">
                <div className="class-info">
                  <h2 className="course-name">{classItem.course.title}</h2>
                  <p className="class-details">
                    <span>
                      <strong>Date:</strong> {classItem.date}
                    </span>
                    <br />
                    <span>
                      <strong>Time:</strong> {classItem.time_start}
                    </span>
                  </p>
                </div>
                <button className="join-button" onClick={joinMeeting(classItem.roomCode)}>Join Class</button>
              </div>
            ))
          ) : (
            <p>No upcoming classes.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Upcoming;

import React, { useState, useEffect } from 'react';
import './Dash_live.css';
import axios from 'axios';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Dash_live() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [error, setError] = useState('');

  // Fetch live classes
  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/liveClasses?auth=${localStorage.getItem("id")}`
        );
        setLiveClasses(response.data); // Update state with fetched data
      } catch (err) {
        console.error('Error fetching live classes:', err);
        setError('Failed to fetch live classes. Please try again later.');
      }
    };

    fetchLiveClasses();
  }, []);

  const startMeetingHandler = (roomCode) => {
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

  return (
    <>
    <div className="live-classes-container">
      <h1>Live Classes</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="class-list">
        {liveClasses.length > 0 ? (
          liveClasses.map((liveClass) => (
            <div key={liveClass._id} className="class-card">
              <h2 className="course-name">{liveClass.course.title}</h2>
              <p className="class-time">
                {liveClass.time_start} - {liveClass.time_to} |{' '}
                {new Date(liveClass.date).toLocaleDateString()}
              </p>
              <button
                className="start-class-button"
                onClick={()=>{startMeetingHandler(liveClass.roomCode)}}
              >
                Start Class
              </button>
            </div>
            
          ))
        ) : (
          <p>No live classes available.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Dash_live;

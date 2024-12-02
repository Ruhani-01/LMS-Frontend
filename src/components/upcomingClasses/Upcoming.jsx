import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./Upcoming.css";

const Upcoming = () => {
  const { id } = useParams(); // Extract course ID from the URL
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

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

        // Filter for today's and future classes
        const today = new Date();
        const filteredClasses = response.data.filter((classItem) => {
          const classDate = new Date(classItem.date);
          return classDate >= today;
        });

        setClasses(filteredClasses); // Update state with filtered data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to fetch upcoming classes. Please try again.");
        setLoading(false);
      }
    };

    if (id) {
      fetchUpcomingClasses();
    }
  }, [id]);

  return (
    <>
      {/* Popup Modal */}
      {popupVisible && (
        <div className="popup-overlay" onClick={() => setPopupVisible(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-heading">Upcoming Classes</h2>
            <div className="popup-content">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                <div className="popup-classes-list">
                  {classes.length > 0 ? (
                    classes.map((classItem, index) => (
                      <div key={index} className="popup-class-container">
                        <div className="popup-class-info">
                          <h3 className="popup-course-name">
                            {classItem.course.title}
                          </h3>
                          <p className="popup-class-details">
                            <span>
                              <strong>Date:</strong>{" "}
                              {new Date(classItem.date).toLocaleDateString()}
                            </span>
                            <br />
                            <span>
                              <strong>Time:</strong> {classItem.time_start}
                            </span>
                          </p>
                        </div>
                        <button
                          className="popup-join-button"
                          onClick={() => joinMeeting(classItem.roomCode)}
                        >
                          Join Class
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No upcoming classes.</p>
                  )}
                </div>
              )}
            </div>
            <button
              className="popup-close-btn"
              onClick={() => setPopupVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button to Show Popup */}
      <button
        className="view-classes-btn"
        onClick={() => setPopupVisible(true)}
      >
        View Upcoming Classes
      </button>
    </>
  );
};

export default Upcoming;

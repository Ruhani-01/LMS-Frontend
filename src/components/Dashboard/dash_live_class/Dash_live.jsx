import React, { useState, useEffect } from "react";
import "./Dash_live.css";
import axios from "axios";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch from Redux
import { setActiveSession } from "../../../redux/liveClassSlice.jsx"; // Import Redux action

function Dash_live() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoomCode, setCurrentRoomCode] = useState("");
  const [sendingEmails, setSendingEmails] = useState(false); // State for sending emails
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  // Fetch live classes
  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/liveClasses?auth=${localStorage.getItem(
            "id"
          )}`
        );
        console.log(response.data);
        // Filter only today's and future meetings
        const filteredClasses = response.data.filter((liveClass) => {
          const classDate = new Date(liveClass.date);
          const today = new Date();
          return classDate >= new Date(today.setHours(0, 0, 0, 0));
        });

        setLiveClasses(filteredClasses); // Update state with filtered data
      } catch (err) {
        console.error("Error fetching live classes:", err);
        setError("Failed to fetch live classes. Please try again later.");
      }
    };

    fetchLiveClasses();
  }, []);

  const sendBulkEmail = async (courseId) => {
    setSendingEmails(true);
    try {
      // Fetch the course details to get the list of students
      const response = await axios.get(
        `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
          "id"
        )}`
      );

      const selectedCourse = response.data.find(
        (course) => course._id === courseId
      );

      if (selectedCourse && selectedCourse.students) {
        const emailAddresses = selectedCourse.students.map(
          (student) => student.email
        );

        // Make an API call to the backend to send bulk emails
        const emailResponse = await axios.post(
          "http://localhost:3000/api/sendBulkEmail",
          {
            emails: emailAddresses,
            subject: "Reminder: Upcoming Live Class",
            body: `Dear students, 

You have an upcoming live class for the course "${selectedCourse.title}" scheduled soon. Please make sure to attend.

Best regards,
Your Institution`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (emailResponse.status === 200) {
          alert("Bulk email sent successfully!");
        } else {
          alert("Failed to send emails. Please try again.");
        }
      } else {
        alert("No students found for the selected course.");
      }
    } catch (error) {
      console.error("Error sending bulk email:", error);
      alert("An error occurred while sending emails.");
    } finally {
      setSendingEmails(false);
    }
  };

  const startMeetingHandler = (roomCode) => {
    setCurrentRoomCode(roomCode);

    // Dispatch to Redux when meeting starts
    dispatch(
      setActiveSession({ roomCode, startedAt: new Date().toISOString() })
    );

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const joinRoom = () => {
    const appID = 1731996383;
    const serverSecret = "07bf73fbdd4291dc94114777d2d2d975";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      currentRoomCode,
      Date.now().toString(),
      `${localStorage.getItem("username")}`
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.getElementById("zego-cloud-container"),
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
    });

    zp.on("roomEnd", () => {
      navigate(-1); // Redirect back to the previous path after the meeting ends
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
                  {liveClass.time_start} - {liveClass.time_to} |{" "}
                  {new Date(liveClass.date).toLocaleDateString()}
                </p>
                <button
                  className="start-class-button"
                  onClick={() => startMeetingHandler(liveClass.roomCode)}
                >
                  Start Class
                </button>
                <button
                  className="bulk-email-button"
                  onClick={() => sendBulkEmail(liveClass.course._id)}
                  disabled={sendingEmails}
                >
                  {sendingEmails ? "Sending Emails..." : "Send Bulk Email"}
                </button>
              </div>
            ))
          ) : (
            <p>No live classes available.</p>
          )}
        </div>
      </div>

      {/* Modal for Video Call */}
      {isModalOpen && (
        <div className="meeting-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Video Meeting</h2>
              <button className="close-button" onClick={closeModal}>
                X
              </button>
            </div>
            <div
              id="zego-cloud-container"
              className="zego-video-container"
            ></div>
            <div className="modal-footer">
              <button className="start-meeting-btn" onClick={joinRoom}>
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dash_live;

// !
// import React, { useState, useEffect } from "react";
// import "./Dash_live.css";
// import axios from "axios";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux"; // Import useDispatch from Redux
// import { setActiveSession } from "../../../redux/liveClassSlice.jsx"; // Import Redux action

// function Dash_live() {
//   const [liveClasses, setLiveClasses] = useState([]);
//   const [error, setError] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentRoomCode, setCurrentRoomCode] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Initialize Redux dispatch

//   // Fetch live classes
//   useEffect(() => {
//     const fetchLiveClasses = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/liveClasses?auth=${localStorage.getItem(
//             "id"
//           )}`
//         );
//         console.log(response.data);
//         // Filter only today's and future meetings
//         const filteredClasses = response.data.filter((liveClass) => {
//           const classDate = new Date(liveClass.date);
//           const today = new Date();
//           return classDate >= new Date(today.setHours(0, 0, 0, 0));
//         });

//         setLiveClasses(filteredClasses); // Update state with filtered data
//       } catch (err) {
//         console.error("Error fetching live classes:", err);
//         setError("Failed to fetch live classes. Please try again later.");
//       }
//     };

//     fetchLiveClasses();
//   }, []);

//   const fetchStudentsForClass = async (courseId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem(
//           "id"
//         )}`
//       );

//       const selectedCourse = response.data.find(
//         (course) => course._id === courseId
//       );

//       if (selectedCourse && selectedCourse.students) {
//         console.log("Students for the live class:", selectedCourse.students);
//       } else {
//         console.warn("No students found for the selected course.");
//       }
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const startMeetingHandler = (roomCode) => {
//     setCurrentRoomCode(roomCode);

//     // Dispatch to Redux when meeting starts
//     dispatch(
//       setActiveSession({ roomCode, startedAt: new Date().toISOString() })
//     );

//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const joinRoom = () => {
//     const appID = 1731996383;
//     const serverSecret = "07bf73fbdd4291dc94114777d2d2d975";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       currentRoomCode,
//       Date.now().toString(),
//       `${localStorage.getItem("username")}`
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: document.getElementById("zego-cloud-container"),
//       scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
//     });

//     zp.on("roomEnd", () => {
//       navigate(-1); // Redirect back to the previous path after the meeting ends
//     });
//   };

//   return (
//     <>
//       <div className="live-classes-container">
//         <h1>Live Classes</h1>
//         {error && <p className="error-message">{error}</p>}
//         <div className="class-list">
//           {liveClasses.length > 0 ? (
//             liveClasses.map((liveClass) => (
//               <div key={liveClass._id} className="class-card">
//                 <h2 className="course-name">{liveClass.course.title}</h2>
//                 <p className="class-time">
//                   {liveClass.time_start} - {liveClass.time_to} |{" "}
//                   {new Date(liveClass.date).toLocaleDateString()}
//                 </p>
//                 <button
//                   className="start-class-button"
//                   onClick={() => startMeetingHandler(liveClass.roomCode)}
//                 >
//                   Start Class
//                 </button>
//                 <button
//                   className="view-students-button"
//                   onClick={() => fetchStudentsForClass(liveClass.course._id)}
//                 >
//                   View Students
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No live classes available.</p>
//           )}
//         </div>
//       </div>

//       {/* Modal for Video Call */}
//       {isModalOpen && (
//         <div className="meeting-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Video Meeting</h2>
//               <button className="close-button" onClick={closeModal}>
//                 X
//               </button>
//             </div>
//             <div
//               id="zego-cloud-container"
//               className="zego-video-container"
//             ></div>
//             <div className="modal-footer">
//               <button className="start-meeting-btn" onClick={joinRoom}>
//                 Join Meeting
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Dash_live;

// !

// !
// import React, { useState, useEffect } from "react";
// import "./Dash_live.css";
// import axios from "axios";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useNavigate } from "react-router-dom";

// function Dash_live() {
//   const [liveClasses, setLiveClasses] = useState([]);
//   const [error, setError] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentRoomCode, setCurrentRoomCode] = useState("");
//   const navigate = useNavigate();

//   // Fetch live classes
//   useEffect(() => {
//     const fetchLiveClasses = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/liveClasses?auth=${localStorage.getItem(
//             "id"
//           )}`
//         );
//         setLiveClasses(response.data); // Update state with fetched data
//       } catch (err) {
//         console.error("Error fetching live classes:", err);
//         setError("Failed to fetch live classes. Please try again later.");
//       }
//     };

//     fetchLiveClasses();
//   }, []);

//   const startMeetingHandler = (roomCode) => {
//     setCurrentRoomCode(roomCode);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const joinRoom = () => {
//     const appID = 1731996383;
//     const serverSecret = "07bf73fbdd4291dc94114777d2d2d975";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       currentRoomCode,
//       Date.now().toString(),
//       `${localStorage.getItem("username")}`
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: document.getElementById("zego-cloud-container"),
//       scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
//     });

//     zp.on("roomEnd", () => {
//       navigate(-1); // Redirect back to the previous path after the meeting ends
//     });
//   };

//   return (
//     <>
//       <div className="live-classes-container">
//         <h1>Live Classes</h1>
//         {error && <p className="error-message">{error}</p>}
//         <div className="class-list">
//           {liveClasses.length > 0 ? (
//             liveClasses.map((liveClass) => (
//               <div key={liveClass._id} className="class-card">
//                 <h2 className="course-name">{liveClass.course.title}</h2>
//                 <p className="class-time">
//                   {liveClass.time_start} - {liveClass.time_to} |{" "}
//                   {new Date(liveClass.date).toLocaleDateString()}
//                 </p>
//                 <button
//                   className="start-class-button"
//                   onClick={() => startMeetingHandler(liveClass.roomCode)}
//                 >
//                   Start Class
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No live classes available.</p>
//           )}
//         </div>
//       </div>

//       {/* Modal for Video Call */}
//       {isModalOpen && (
//         <div className="meeting-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Video Meeting</h2>
//               <button className="close-button" onClick={closeModal}>
//                 X
//               </button>
//             </div>
//             <div
//               id="zego-cloud-container"
//               className="zego-video-container"
//             ></div>
//             <div className="modal-footer">
//               <button className="start-meeting-btn" onClick={joinRoom}>
//                 Join Meeting
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Dash_live;

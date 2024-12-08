// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Calendar from "react-calendar"; // Import calendar library
// import "react-calendar/dist/Calendar.css"; // Default styles for react-calendar
// import "./Upcoming.css";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// const Upcoming = () => {
//   const { id } = useParams(); // Extract course ID from the URL
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [calendarDate, setCalendarDate] = useState(new Date());

//   const joinMeeting = (roomCode) => {
//     const appID = 1731996383;
//     const serverSecret = "07bf73fbdd4291dc94114777d2d2d975";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomCode,
//       Date.now().toString(),
//       `${localStorage.getItem("username")}`
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: document.getElementById("zego-cloud-container"),
//       scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
//     });
//   };

//   useEffect(() => {
//     const fetchUpcomingClasses = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/api/Upcomingclasses?course=${id}`);

//         // Filter for today's and future classes
//         const today = new Date();
//         const filteredClasses = response.data.filter((classItem) => {
//           const classDate = new Date(classItem.date);
//           return classDate >= today;
//         });

//         setClasses(filteredClasses); // Update state with filtered data
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching classes:", err);
//         setError("Failed to fetch upcoming classes. Please try again.");
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchUpcomingClasses();
//     }
//   }, [id]);

//   const renderButtons = () => (
//     <div className="navigation-buttons">
//       <button>Live Class</button>
//       <button>Resources</button>
//       <button>Notification</button>
//       <button>Chat with Instructor</button>
//       <button>My Details</button>
//     </div>
//   );

//   const onDateChange = (date) => {
//     setCalendarDate(date);
//   };

//   const renderCalendarClasses = () => {
//     const selectedDateClasses = classes.filter(
//       (classItem) =>
//         new Date(classItem.date).toDateString() === calendarDate.toDateString()
//     );

//     if (selectedDateClasses.length === 0) {
//       return <p>No classes on this date.</p>;
//     }

//     return selectedDateClasses.map((classItem, index) => (
//       <div key={index} className="class-card">
//         <h3 className="course-name">{classItem.course.title}</h3>
//         <p>
//           <strong>Time:</strong> {classItem.time_start}
//         </p>
//         <button
//           className="join-button"
//           onClick={() => joinMeeting(classItem.roomCode)}
//         >
//           Join Class
//         </button>
//       </div>
//     ));
//   };

//   return (
//     <>
//       {/* Popup Modal */}
//       {popupVisible && (
//         <div className="popup-overlay" onClick={() => setPopupVisible(false)}>
//           <div className="popup-container" onClick={(e) => e.stopPropagation()}>
//             <h2 className="popup-heading">Upcoming Classes</h2>
//             {renderButtons()}
//             <div className="calendar-container">
//               <Calendar
//                 onChange={onDateChange}
//                 value={calendarDate}
//                 tileClassName={({ date }) =>
//                   classes.some(
//                     (classItem) =>
//                       new Date(classItem.date).toDateString() ===
//                       date.toDateString()
//                   )
//                     ? "highlighted-date"
//                     : null
//                 }
//               />
//             </div>
//             <div className="calendar-classes">{renderCalendarClasses()}</div>
//             <button
//               className="popup-close-btn"
//               onClick={() => setPopupVisible(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Trigger Button to Show Popup */}
//       <button
//         className="view-classes-btn"
//         onClick={() => setPopupVisible(true)}
//       >
//         View Upcoming Classes
//       </button>
//     </>
//   );
// };

// export default Upcoming;

// const Upcoming = ()=>{
//   return(
//     <>
//     <h1>Good Morning ! {localStorage.getItem("username")}</h1>
//     </>
//   )
// }

// export default Upcoming

// import React from "react";
// import "./StudentDashboard.css"; // Optional CSS for styling

// const StudentDashboard = () => {
//   const username = localStorage.getItem("username") || "Student";

//   // Determine greeting based on current time
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>
//           {getGreeting()}! {username}
//         </h1>
//       </header>
//       <div className="tabs-container">
//         <div className="tab">
//           <h2>Today's Upcoming Classes</h2>
//           <p>Check your scheduled classes for today.</p>
//         </div>
//         <div className="tab">
//           <h2>Chat with Teacher</h2>
//           <p>Reach out to your teacher for any doubts or discussions.</p>
//         </div>
//         <div className="tab">
//           <h2>Notice</h2>
//           <p>View important announcements and updates.</p>
//         </div>
//         <div className="tab">
//           <h2>Resources</h2>
//           <p>Access course materials and additional resources.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useState } from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const username = localStorage.getItem("username") || "Student";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const [activeTab, setActiveTab] = useState("classes");

  const renderContent = () => {
    switch (activeTab) {
      case "classes":
        return <p>Here are today's upcoming classes for you.</p>;
      case "chat":
        return <p>Chat with your teacher to clarify doubts or ask questions.</p>;
      case "notice":
        return <p>Check out the latest notices and updates.</p>;
      case "resources":
        return <p>Access all the study materials and course resources here.</p>;
      default:
        return <p>Select a tab to view its content.</p>;
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2 className="navbar-title">Student Dashboard</h2>
        <div className="navbar-tabs">
          <button
            className={`tab-button ${activeTab === "classes" ? "active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            Today's Classes
          </button>
          <button
            className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            Chat with Teacher
          </button>
          <button
            className={`tab-button ${activeTab === "notice" ? "active" : ""}`}
            onClick={() => setActiveTab("notice")}
          >
            Notice
          </button>
          <button
            className={`tab-button ${activeTab === "resources" ? "active" : ""}`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
        </div>
      </nav>

      <header className="dashboard-header">
        <h1>
          {getGreeting()}, {username}!
        </h1>
      </header>

      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default StudentDashboard;


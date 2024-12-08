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

//!

// import React, { useState } from "react";
// import "./StudentDashboard.css";

// const StudentDashboard = () => {
//   const username = localStorage.getItem("username") || "Student";

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const [activeTab, setActiveTab] = useState("classes");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "classes":
//         return <p>Here are today's upcoming classes for you.</p>;
//       case "chat":
//         return (
//           <p>Chat with your teacher to clarify doubts or ask questions.</p>
//         );
//       case "notice":
//         return <p>Check out the latest notices and updates.</p>;
//       case "resources":
//         return <p>Access all the study materials and course resources here.</p>;
//       default:
//         return <p>Select a tab to view its content.</p>;
//     }
//   };

//   return (
//     <div className="dashboard">
//       <nav className="navbar">
//         <h2 className="navbar-title">Student Dashboard</h2>
//         <div className="navbar-tabs">
//           <button
//             className={`tab-button ${activeTab === "classes" ? "active" : ""}`}
//             onClick={() => setActiveTab("classes")}
//           >
//             Today's Classes
//           </button>
//           <button
//             className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
//             onClick={() => setActiveTab("chat")}
//           >
//             Chat with Teacher
//           </button>
//           <button
//             className={`tab-button ${activeTab === "notice" ? "active" : ""}`}
//             onClick={() => setActiveTab("notice")}
//           >
//             Notice
//           </button>
//           <button
//             className={`tab-button ${
//               activeTab === "resources" ? "active" : ""
//             }`}
//             onClick={() => setActiveTab("resources")}
//           >
//             Resources
//           </button>
//         </div>
//       </nav>

//       <header className="dashboard-header">
//         <h1>
//           {getGreeting()}, {username}!
//         </h1>
//       </header>

//       <main className="dashboard-content">{renderContent()}</main>
//     </div>
//   );
// };

// export default StudentDashboard;
// !
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Bell,
  BookOpen,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const username = localStorage.getItem("username") || "Student";

  // Expanded mock classes with more dates
  const mockClasses = {
    "2024-12-15": [
      {
        id: 1,
        time: "09:00",
        subject: "Mathematics",
        teacher: "Mr. Smith",
        room: "A-101",
      },
      {
        id: 2,
        time: "11:00",
        subject: "Physics",
        teacher: "Ms. Johnson",
        room: "B-205",
      },
    ],
    "2024-12-16": [
      {
        id: 3,
        time: "10:00",
        subject: "Chemistry",
        teacher: "Dr. Brown",
        room: "C-302",
      },
      {
        id: 4,
        time: "14:00",
        subject: "Computer Science",
        teacher: "Mr. Wilson",
        room: "D-402",
      },
      {
        id: 10,
        time: "14:00",
        subject: "Computer Science",
        teacher: "Mr. Wilson",
        room: "D-402",
      },
      {
        id: 11,
        time: "14:00",
        subject: "Computer Science",
        teacher: "Mr. Wilson",
        room: "D-402",
      },
      {
        id: 12,
        time: "14:00",
        subject: "Computer Science",
        teacher: "Mr. Wilson",
        room: "D-402",
      },
    ],
    "2024-12-17": [
      {
        id: 5,
        time: "09:30",
        subject: "Biology",
        teacher: "Ms. Garcia",
        room: "E-501",
      },
    ],
    "2024-12-20": [
      {
        id: 6,
        time: "11:30",
        subject: "English Literature",
        teacher: "Mrs. Williams",
        room: "F-612",
      },
    ],
    "2024-12-22": [
      {
        id: 7,
        time: "13:00",
        subject: "History",
        teacher: "Mr. Davis",
        room: "G-202",
      },
    ],
    "2024-12-25": [
      {
        id: 8,
        time: "10:30",
        subject: "Geography",
        teacher: "Ms. Martinez",
        room: "H-404",
      },
    ],
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const mockNotices = [
    {
      id: 1,
      title: "Upcoming Midterm Exams",
      date: "2024-03-25",
      priority: "high",
    },
    {
      id: 2,
      title: "Science Project Submission",
      date: "2024-04-05",
      priority: "medium",
    },
    {
      id: 3,
      title: "Annual Sports Day Registration",
      date: "2024-04-15",
      priority: "low",
    },
    {
      id: 4,
      title: "Annual Sports Day Registration",
      date: "2024-04-15",
      priority: "low",
    },
    {
      id: 5,
      title: "Annual Sports Day Registration",
      date: "2024-04-15",
      priority: "low",
    },
  ];

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)} className="nav-button">
            <ChevronLeft size={20} />
          </button>
          <h2>
            {currentDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={() => changeMonth(1)} className="nav-button">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day empty"></div>
          ))}
          {[...Array(daysInMonth)].map((_, index) => {
            const date = new Date(year, month, index + 1);
            const dateKey = date.toISOString().split("T")[0];
            const hasClasses = mockClasses[dateKey] || false;

            return (
              <div
                key={index + 1}
                className={`calendar-day ${
                  date.toISOString().split("T")[0] ===
                  selectedDate.toISOString().split("T")[0]
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {index + 1}
                {hasClasses && (
                  <div className="class-dot-container">
                    <span className="class-dot"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderClassList = () => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const classes = mockClasses[dateKey] || [];

    return (
      <div className="class-list-container">
        <h3 className="class-list-title">
          Classes on{" "}
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
        {classes.length === 0 ? (
          <div className="no-classes">
            <p>No classes scheduled for this date</p>
          </div>
        ) : (
          <div className="class-list">
            {classes.map((classItem) => (
              <div key={classItem.id} className="class-item">
                <div className="class-time">
                  <Clock size={20} />
                  <span>{classItem.time}</span>
                </div>
                <div className="class-details">
                  <h4>{classItem.subject}</h4>
                  <p>Teacher: {classItem.teacher}</p>
                  <p>Room: {classItem.room}</p>
                </div>
                <button className="join-meeting-button-unique">
                  Join Meeting
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderNotices = () => (
    <div className="notices-container-unique">
      <h2>Notices</h2>
      {mockNotices.map((notice) => (
        <div
          key={notice.id}
          className={`notice-item priority-${notice.priority} notice-card`}
        >
          <div className="notice-icon">
            <Bell size={20} />
          </div>
          <div className="notice-content">
            <h4>{notice.title}</h4>
            <p className="notice-date">
              <strong>Date:</strong>{" "}
              {new Date(notice.date).toLocaleDateString()}
            </p>
            <p className="notice-description">
              <strong>Description:</strong> This is a short description for the
              notice. You can add more details here to make the notice clearer.
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "classes":
        return (
          // <div className="classes-container">
          <>
            {renderCalendar()}
            {renderClassList()}
          </>
          // </div>
        );
      case "chat":
        return (
          <div className="placeholder-content">
            Chat functionality coming soon!
          </div>
        );
      case "notice":
        return renderNotices();
      case "resources":
        return (
          <div className="placeholder-content">
            Course resources will be available here.
          </div>
        );
      default:
        return (
          <div className="placeholder-content">
            Select a tab to view its content.
          </div>
        );
    }
  };

  return (
    <div className="dashboard-unique">
      <nav className="navbar-unique">
        <h2 className="navbar-title">Student Dashboard</h2>
        <div className="navbar-tabs">
          <button
            className={`tab-button ${activeTab === "classes" ? "active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            <Calendar size={16} /> Scheduled Classes
          </button>
          <button
            className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageCircle size={16} /> Chat
          </button>
          <button
            className={`tab-button ${activeTab === "notice" ? "active" : ""}`}
            onClick={() => setActiveTab("notice")}
          >
            <Bell size={16} /> Notice
          </button>
          <button
            className={`tab-button ${
              activeTab === "resources" ? "active" : ""
            }`}
            onClick={() => setActiveTab("resources")}
          >
            <BookOpen size={16} /> Resources
          </button>
        </div>
      </nav>
      <header className="dashboard-header-unique">
        <h1>
          {getGreeting()}, {username}!
        </h1>
      </header>
      <main className="dashboard-content">
        <div className="classes-container">
          {/* {renderCalendar()}
          {renderClassList()} */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;

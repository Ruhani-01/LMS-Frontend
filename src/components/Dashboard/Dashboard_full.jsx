import { Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Chat from "./dash_chat/Dash_chat.jsx";
import Liveclass from "./dash_live_class/Dash_live.jsx";
import Myaccount from "./Dash_myAccount/Dash_myaccount.jsx";
import Mycourses from "./dash_myCourses/Dash_Courses.jsx";
import Notify from "./dash_notify/Dash_notify.jsx";
import Schedule from "./dash_schedule/Dash_schedule.jsx";
import Students from "./dash_students/Dash_students.jsx";


function Dashboard_full() {
  const isTeacher = JSON.parse(localStorage.getItem("teacher"));

  if (isTeacher === false) {
    return <div>You have not access to this</div>;
  }

  return (
    <>
      <Route path="/admin" element={<Layout />}>
        <Route path="/admin/chat" element={<Chat />} />
        <Route path="/admin/liveclass" element={<Liveclass />} />
        <Route path="/admin/myaccount" element={<Myaccount />} />
        <Route path="/admin/mycourses" element={<Mycourses />} />
        <Route path="/admin/notify" element={<Notify />} />
        <Route path="/admin/schedule" element={<Schedule />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </>
  );
}

export default Dashboard_full;

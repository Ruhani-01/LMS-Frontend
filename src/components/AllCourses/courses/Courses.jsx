import CourseCard from "../cards/Card";
import "../AllCourses.css";
import "./Courses.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch courses and user ID on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await fetch("/api/admin/courses");
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch the logged-in user's ID
        const verifyResponse = await axios.get(
          "http://localhost:3000/api/verifyUser",
          {
            withCredentials: true,
          }
        );

        if (verifyResponse.data.success) {
          setUserId(verifyResponse.data.user._id);
        } else {
          throw new Error("Failed to verify user");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="App">
      <div className="course-grid">
        {courses.map((course) => {
          // Check if the current user is enrolled in the course
          const isEnrolled = userId && course.students.includes(userId);

          // Check if the current user is the owner of the course
          const teachercourse = userId === course.owner._id;

          return (
            <CourseCard
              key={course._id}
              title={course.title}
              image={course.img}
              discount_price={course.discountPrice}
              price={course.price}
              id={course._id}
              owner={course.owner.username}
              isEnrolled={isEnrolled} // Pass isEnrolled prop to CourseCard
              teachercourse={teachercourse} // Pass teachercourse prop to CourseCard
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;

// import CourseCard from "../cards/Card";
// import "../AllCourses.css";
// import "./Courses.css";
// import { useState, useEffect } from "react";
// // import {useNavigate} from 'react-router-dom'

// const App = () => {
//   const [courses, setCourses] = useState([]);
//   useEffect(() => {
//     fetch("/api/admin/courses")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch courses");
//         }
//         return response.json();
//       })
//       .then((data) => setCourses(data))
//       .catch((error) => setError(error.message));
//   }, []);

//   return (
//     <div className="App">
//       <div className="course-grid">
//         {courses.map((course) => (
//           <CourseCard
//             key={course._id}
//             title={course.title}
//             image={course.img}
//             discount_price={course.discountPrice}
//             price={course.price}
//             id={course._id}
//             owner={course.owner.username}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

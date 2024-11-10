import "./myLearning.css";
import CourseCard from "../utils/Cards/mylearningcard/card";
import { useState, useEffect } from "react";
import axios from "axios"; // Add this import

export default function Mylearning() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/mylearning", {
          withCredentials: true, // Include cookies if necessary
        });
        console.log(response);
        setCourses(response.data.mylearning || []); // Set as an empty array if no courses are returned
      } catch (error) {
        setError("Failed to fetch courses. Please try again later.");
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="mylearningcontainer">
        <h1 className="myLearning-header">My Learnings</h1>
        {error && <p className="error-message">{error}</p>} {/* Display error if any */}
        <div>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard
                key={index}
                image={course.img}
                courseName={course.title}
              />
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      </div>
    </>
  );
}

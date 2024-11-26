import React, { useEffect, useState } from "react";
import "./Dash_Courses.css";
import axios from "axios";



// Placeholder data for courses


const Dash_Courses = () => {

  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const setCourse=async()=>{
    const response=await axios.get(`http://localhost:3000/api/admin/dashCourses?auth=${localStorage.getItem("id")}`);
    setCourses(response.data);
  }
  useEffect(()=>{setCourse()},[])


  // Function to handle course editing
  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setModalOpen(true);
  };

  // Function to handle course update
  const handleUpdateCourse = (updatedCourse) => {
    const updatedCourses = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    setCourses(updatedCourses);
    setModalOpen(false);
  };

  // Function to handle adding a new course
  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    setModalOpen(false);
  };

  // Function to handle course deletion
  const handleDeleteCourse = async(courseId) => {
      const response= await axios.delete(`http://localhost:3000/api/admin/course/${courseId}/delete`);
      console.log(response);
  };

  return (
    <div className="container">
      <div className="right-panel">
        <div className="courses-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Students</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.price}</td>
                  <td>{course.discountPrice}</td>
                  <td>{course.students?course.students.length:0}</td>
                  <td>
                    <img
                      src={course.img}
                      alt="Course Preview"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="edit-button"
                    >
                      <span>✏️</span>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="delete-button"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="add-course-button"
            onClick={() => {
              setCurrentCourse(null); // Clear currentCourse for new course addition
              setModalOpen(true);
            }}
          >
            + Add Course
          </button>
        </div>

        {/* Modal for editing or adding course */}
        {modalOpen && (
          <CourseModal
            course={currentCourse}
            onClose={() => setModalOpen(false)}
            onSave={currentCourse ? handleUpdateCourse : handleAddCourse}
            onDelete={handleDeleteCourse}
          />
        )}
      </div>
    </div>
  );
};

const CourseModal = ({ course, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    title: course?.title || "",
    price: course?.price || "",
    discountPrice: course?.discountPrice || "",
    img: course?.img || "",
  });

  const createnew=async()=>{
      const response = axios.post(`http://localhost:3000/api/admin/create?auth=${localStorage.getItem("id")}`,formData);
      console.log(response);
      
      console.log("Creating a new Course");
  }
  const editCourse = async (id) => {
    console.log("Editing a Course");
    try {
      const response = await axios.patch(`http://localhost:3000/api/admin/course/${id}/edit`, formData);
      console.log("Course updated:", response.data);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };



  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{course ? "Edit Course" : "Add Course"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Course Name"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="discountPrice"
            placeholder="Discounted Price"
            value={formData.discountPrice}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="img"
            placeholder="Preview Image URL"
            value={formData.img}
            onChange={handleChange}
            required
          />
          <div className="image-preview">
            {formData.previewImage && (
              <img
                src={formData.img}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
          <button type="submit" className="save-button"onClick={course?()=>{editCourse(course._id)}:()=>{createnew()}}>
            {course ? "Save Changes" : "Add Course"}
            
          </button>
          {course && (
            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(course.id)}
            >
              Delete Course
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Dash_Courses;

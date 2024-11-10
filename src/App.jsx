import Layout from "./layout.jsx";
import Landingpage from "./components/LandingPage/Landingpage.jsx";
import Login from "./components/Login-Signup/Login.jsx";
import Courses from "./components/AllCourses/AllCourses.jsx";
import ViewCourse from "./components/view-course/ViewCourse.jsx";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Mylearning from "./components/Mylearning/Mylearning.jsx";
import Checkout from "./components/studentCheckout/Checkout.jsx";
import PlanPricing from "./components/Plans/PlansPricing.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/all-courses" element={<Courses />} />
          <Route path="/all-courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/Course/:id" element={<ViewCourse />} />
          <Route path="/my-learnings" element={<Mylearning />} />
          <Route path="/plans" element={<PlanPricing />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

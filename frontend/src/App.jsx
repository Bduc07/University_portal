import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentLayout from "./components/StudentLayout";
import AdminDashboardLayout from "./components/AdminDashboardLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Sidebar from "./pages/Sidebar";

import Home from "./pages/Home";
import About from "./pages/About";
import WhyUs from "./pages/WhyUs";
import Contact from "./pages/Contact";
import AllCourses from "./pages/AllCourses";
import Login from "./pages/Login";
import Enroll from "./pages/Enroll";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherReviews from "./pages/TeacherData";
import FeedbackPage from "./pages/feedbackPage";
import Feedback from "./components/Feedback";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Courses1 from "./courses/Courses1";
import Courses2 from "./courses/Courses2";
import Courses3 from "./courses/Courses3";
import Courses4 from "./courses/Courses4";
import Courses5 from "./courses/Courses5";
import Courses1details from "./courses/Courses1details";
import Courses2details from "./courses/Courses2details";
import Courses3details from "./courses/Courses3details";
import Courses4details from "./courses/Courses4details";
import Courses5details from "./courses/Courses5details";
import StudentDetails from "./pages/StudentDetails";
import ViewTeacherQuestions from "./pages/ViewTeacherQuestions";
import EditTeacherQuestions from "./pages/EditTeacherQuestions";
import AddTeacherQuestion from "./pages/AddTeacherQuestion";
import DeleteTeacherQuestion from "./pages/DeleteTeacherQuestion";
import ViewCourseQuestions from "./pages/ViewCourseQuestions";
import EditCourseQuestions from "./pages/EditCourseQuestions";
import AddCourseQuestion from "./pages/AddCourseQuestion";
import DeleteCourseQuestion from "./pages/DeleteCourseQuestion";
import GiveFeedback from "./pages/Givefeedback"; // Note case sensitivity!
import CourseAnalytics from "./pages/CourseAnalytics";
import ManageTeachers from "./pages/ManageTeachers";
import AdminMessages from "./pages/AdminMessages";
import Chat from "./pages/Chat";
import AiTutor from "./pages/AiTutor";
import PaymentResult from "./pages/PaymentResult";
import CourseSales from "./pages/CourseSales";
import { disconnectSocket } from "./socket.js";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    disconnectSocket();
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/enroll" element={<Enroll />} />

        {/* Public routes with layout */}
        <Route
          element={
            <Layout>
              <Sidebar />
            </Layout>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/whyus" element={<WhyUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/allcourses" element={<AllCourses />} />
        </Route>

        {/* Admin routes */}
        <Route
          element={
            <AdminDashboardLayout
              userName={localStorage.getItem("userName") || "Admin"}
              onLogout={handleLogout}
            />
          }
        >
          <Route
            path="/admin"
            element={
              <PrivateRoute roleRequired="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/student-details"
            element={
              <PrivateRoute roleRequired="admin">
                <StudentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/feedback"
            element={
              <PrivateRoute roleRequired="admin">
                <Feedback /> {/* This is the admin feedback component */}
              </PrivateRoute>
            }
          />

          <Route
            path="/feedback/teachers/view"
            element={
              <PrivateRoute roleRequired="admin">
                <ViewTeacherQuestions />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/teachers/edit"
            element={
              <PrivateRoute roleRequired="admin">
                <EditTeacherQuestions />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/teachers/add"
            element={
              <PrivateRoute roleRequired="admin">
                <AddTeacherQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/teachers/delete"
            element={
              <PrivateRoute roleRequired="admin">
                <DeleteTeacherQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/courses/view"
            element={
              <PrivateRoute roleRequired="admin">
                <ViewCourseQuestions />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/courses/edit"
            element={
              <PrivateRoute roleRequired="admin">
                <EditCourseQuestions />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/courses/add"
            element={
              <PrivateRoute roleRequired="admin">
                <AddCourseQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/courses/delete"
            element={
              <PrivateRoute roleRequired="admin">
                <DeleteCourseQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <PrivateRoute roleRequired="admin">
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/TeacherData/:teacherId"
            element={
              <PrivateRoute roleRequired="admin">
                <TeacherReviews />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/course-analytics"
            element={
              <PrivateRoute roleRequired="admin">
                <CourseAnalytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/teachers"
            element={
              <PrivateRoute roleRequired="admin">
                <ManageTeachers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <PrivateRoute roleRequired="admin">
                <AdminMessages />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/course-sales"
            element={
              <PrivateRoute roleRequired="admin">
                <CourseSales />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Student routes */}
        <Route element={<StudentLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roleRequired="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute roleRequired="student">
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/ai-tutor"
            element={
              <PrivateRoute roleRequired="student">
                <AiTutor />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-result"
            element={
              <PrivateRoute roleRequired="student">
                <PaymentResult />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <PrivateRoute roleRequired="student">
                <Feedback />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute roleRequired="student">
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/feedback"
            element={
              <PrivateRoute roleRequired="student">
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/feedback/:type/:id"
            element={
              <PrivateRoute roleRequired="student">
                <GiveFeedback />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute roleRequired="student">
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses1"
            element={
              <PrivateRoute roleRequired="student">
                <Courses1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses2"
            element={
              <PrivateRoute roleRequired="student">
                <Courses2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses3"
            element={
              <PrivateRoute roleRequired="student">
                <Courses3 />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses4"
            element={
              <PrivateRoute roleRequired="student">
                <Courses4 />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses5"
            element={
              <PrivateRoute roleRequired="student">
                <Courses5 />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses1details"
            element={
              <PrivateRoute roleRequired="student">
                <Courses1details />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses2details"
            element={
              <PrivateRoute roleRequired="student">
                <Courses2details />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses3details"
            element={
              <PrivateRoute roleRequired="student">
                <Courses3details />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses4details"
            element={
              <PrivateRoute roleRequired="student">
                <Courses4details />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/Courses5details"
            element={
              <PrivateRoute roleRequired="student">
                <Courses5details />
              </PrivateRoute>
            }
          />
        </Route>

        {/* 404 and unauthorized routes */}
        <Route
          path="*"
          element={
            <div className="p-6 text-center text-red-500">
              404 - Page Not Found
            </div>
          }
        />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      </Routes>
    </Router>
  );
}

export default App;

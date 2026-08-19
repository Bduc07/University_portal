import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import teacher1 from "../assets/teachers/teacher1.png";
import teacher2 from "../assets/teachers/teacher2.png";
import teacher3 from "../assets/teachers/teacher3.png";
import teacher4 from "../assets/teachers/teacher4.png";
import teacher5 from "../assets/teachers/teacher5.png";

function FeedbackPage() {
  const navigate = useNavigate();
  const [teacherLocks, setTeacherLocks] = useState({});
  const [courseLocks, setCourseLocks] = useState({});
  const submitterId = localStorage.getItem("userId");

  // ids must match the real teacher rows in the users table (role='teacher')
  const teachers = [
    { id: 11, name: "Walter White", image: teacher1 },
    { id: 12, name: "Jesse Pinkman", image: teacher2 },
    { id: 13, name: "Hank Schrader", image: teacher3 },
    { id: 14, name: "Skyler White", image: teacher4 },
    { id: 15, name: "Jane Margolis", image: teacher5 },
  ];

  const courses = [
    { id: 6, code: "4CS015/HJ1", name: "Fundamentals of Computing" },
    { id: 7, code: "4MM013/HJ1", name: "Computational Mathematics" },
    { id: 8, code: "5CS021/HJ1", name: "Numeric Methods and Concurrency" },
    { id: 9, code: "5CS024/HJ1", name: "Collaborative Development" },
    { id: 10, code: "5CS020/HJ1", name: "Human - Computer Interaction" },
  ];

  const checkLock = async () => {
    try {
      const token = localStorage.getItem("token");
      const authHeaders = { Authorization: `Bearer ${token}` };

      const teacherPromises = teachers.map((t) =>
        axios.get(`/api/feedback/check-last-submission`, {
          headers: authHeaders,
          params: {
            submitter_identifier: submitterId,
            target_type: "teacher",
            target_id: t.id,
          },
        })
      );

      const coursePromises = courses.map((c) =>
        axios.get(`/api/feedback/check-last-submission`, {
          headers: authHeaders,
          params: {
            submitter_identifier: submitterId,
            target_type: "course",
            target_id: c.id,
          },
        })
      );

      const teacherResults = await Promise.all(teacherPromises);
      const courseResults = await Promise.all(coursePromises);

      const teacherMap = {};
      teachers.forEach((t, i) => {
        teacherMap[t.id] = teacherResults[i].data;
      });

      const courseMap = {};
      courses.forEach((c, i) => {
        courseMap[c.id] = courseResults[i].data;
      });

      setTeacherLocks(teacherMap);
      setCourseLocks(courseMap);
    } catch (err) {
      console.error("Error checking submission locks:", err);
    }
  };

  useEffect(() => {
    checkLock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl px-4 mt-4 mx-auto font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-6 text-left">
        Leave Feedback
      </h1>

      {/* Teachers Section */}
      <section className="mb-8">
        <h2 className="text-base sm:text-lg font-bold text-[#1F386B] mb-4 text-left">
          Review our teachers
        </h2>
        <div className="flex space-x-4 overflow-x-auto bg-[#1F386B] p-4 rounded-xl">
          {teachers.length > 0 ? (
            teachers.map((teacher) => {
              const lockInfo = teacherLocks[teacher.id];
              const disabled = lockInfo && !lockInfo.canSubmit;
              return (
                <div
                  key={teacher.id}
                  className="bg-white rounded-md p-4 flex-1 flex flex-col items-center justify-center text-center shadow-md"
                  style={{ minWidth: "150px" }}
                >
                  <img
                    src={teacher.image}
                    alt={`Portrait of ${teacher.name}`}
                    className="w-20 h-20 sm:w-16 sm:h-16 rounded-full mb-2 object-cover border border-gray-300 bg-gray-200"
                  />
                  <p className="text-sm text-black mb-2">{teacher.name}</p>
                  <button
                    className={`rounded-full text-xs py-2 px-6 mt-2 transition-colors duration-300 ${
                      disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#1F386B] text-white hover:bg-[#2a4a8f]"
                    }`}
                    onClick={() => !disabled && navigate(`/student/feedback/teacher/${teacher.id}`)}
                    disabled={disabled}
                  >
                    {disabled ? `Wait ${lockInfo?.daysRemaining}d` : "Review"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-white">No teachers available for feedback.</p>
          )}
        </div>
      </section>

      {/* Courses Section */}
      <section className="mb-8">
        <h2 className="text-base sm:text-lg font-bold text-[#1F386B] mb-4 text-left">
          Review our courses
        </h2>
        <div className="flex space-x-4 overflow-x-auto bg-[#1F386B] p-4 rounded-xl">
          {courses.length > 0 ? (
            courses.map((course) => {
              const lockInfo = courseLocks[course.id];
              const disabled = lockInfo && !lockInfo.canSubmit;
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-md p-4 flex-1 flex flex-col items-center justify-center text-center shadow-md"
                  style={{ minWidth: "150px" }}
                >
                  <p className="text-sm font-bold">{course.code}</p>
                  <p className="text-sm text-black mb-2">{course.name}</p>
                  <button
                    className={`rounded-full text-xs py-2 px-6 mt-2 transition-colors duration-300 ${
                      disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#1F386B] text-white hover:bg-[#2a4a8f]"
                    }`}
                    onClick={() => !disabled && navigate(`/student/feedback/course/${course.id}`)}
                    disabled={disabled}
                  >
                    {disabled ? `Wait ${lockInfo?.daysRemaining}d` : "Review"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-white">No courses available for feedback.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default FeedbackPage;

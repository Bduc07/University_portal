import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function GiveFeedback() {
  const { type, id } = useParams(); // type: 'teacher' or 'course', id: target ID
  const [questions, setQuestions] = useState([]);
  const [ratings, setRatings] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false); // State for anonymity
  const [targetName, setTargetName] = useState("");
  const [canSubmit, setCanSubmit] = useState(true); // State to track submission eligibility
  const [daysRemaining, setDaysRemaining] = useState(0); // Track remaining days to submit
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("name") || `User ${userId}`; // Get username from Login

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // Courses aren't backed by real records yet — teachers are.
        const mockCourses = {
          6: "Fundamentals of Computing",
          7: "Computational Mathematics",
          8: "Numeric Methods and Concurrency",
          9: "Collaborative Development",
          10: "Human - Computer Interaction",
        };
        let name;
        if (type === "teacher") {
          const teacherRes = await axios.get(`/api/teachers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          name = teacherRes.data.name;
        } else {
          name = mockCourses[id];
        }
        if (!name) {
          throw new Error("Target not found");
        }
        setTargetName(name);

        // Fetch questions from server
        const response = await axios.get("/api/feedback-questions", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: { target_type: type, target_id: id },
        });

        const validatedQuestions = response.data.map((q) => ({
          ...q,
          id: q.question_id || q.id,
        }));

        if (validatedQuestions.length === 0) {
          setError(
            "No questions found for this target. Please contact the admin to add questions."
          );
        }

        setQuestions(validatedQuestions);
        setRatings(
          validatedQuestions.reduce((acc, curr) => {
            acc[curr.id] = 0;
            return acc;
          }, {})
        );

        // Check if user can submit feedback
        const feedbackCheckResponse = await axios.get("/api/feedback/check-last-submission", {
          headers: { Authorization: `Bearer ${token}` },
          params: { submitter_identifier: userId, target_type: type, target_id: id },
        });
        const { canSubmit, daysRemaining } = feedbackCheckResponse.data;
        setCanSubmit(canSubmit);
        setDaysRemaining(daysRemaining);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          "Failed to load questions from the server. Please try again later."
        );
        setQuestions([]);
        setRatings({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id, token, userId]);

  const handleRatingChange = (questionId, value) => {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
  };

  const renderStars = (questionId) => {
    const currentRating = ratings[questionId] || 0;
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={`${questionId}-${star}`}
            type="button"
            onClick={() => handleRatingChange(questionId, star)}
            className="focus:outline-none"
            aria-label={`Rate ${star} star`}
          >
            <svg
              className={`w-8 h-8 ${star <= currentRating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.05 9.397c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!userId) {
      setError("Please log in to submit feedback.");
      return;
    }
    if (!canSubmit) {
      setError(`You can submit feedback again in ${daysRemaining} day(s).`);
      return;
    }
    try {
      const responses = Object.entries(ratings)
        .filter(([, rating]) => rating > 0)
        .map(([questionId, rating]) => ({
          question_id: questionId,
          response_value: rating,
        }));
      if (responses.length === 0) {
        setError("Please provide at least one rating before submitting.");
        return;
      }

      const payload = {
        submitter_identifier: userId, // stable per-user key, used for the 7-day cooldown
        user_id: userId, // Include user_id for tracking
        target_type: type,
        target_id: id,
        responses,
        is_anonymous: isAnonymous ? 1 : 0, // Align with tinyint(1) in schema
      };

      await axios.post("/api/submit-feedback", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.response?.data?.error || "Failed to submit feedback. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="p-6 text-green-600 text-center text-lg font-semibold bg-green-100 rounded-lg mx-auto max-w-4xl">
        Thank you for your feedback!
      </div>
    );
  }

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg min-h-screen">
      {error && (
        <p className="text-red-500 mb-4 text-center text-lg font-medium">
          {error}
        </p>
      )}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
        {type === "teacher"
          ? `Feedback for ${targetName}`
          : `Feedback for ${targetName}`}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Questions */}
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <label className="block text-gray-700 font-semibold text-lg">
                Q{index + 1}: {q.question_text}
              </label>
              <div className="mt-4">
                <span className="text-gray-600 font-medium">Rating:</span>
                {renderStars(q.id)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No questions available.</p>
        )}

        {/* Anonymity Toggle */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold text-lg mb-2">
            Submit as:
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="anonymity"
                checked={!isAnonymous}
                onChange={() => setIsAnonymous(false)}
                className="mr-2"
              />
              User ({userName})
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="anonymity"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(true)}
                className="mr-2"
              />
              Anonymous
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <button
            type="submit"
            className="w-full bg-[#1F386B] text-white p-2 rounded hover:bg-[#2a4a8f]"
            disabled={loading || !canSubmit}
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default GiveFeedback;

import React, { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../auth/AuthContext";

function AdminPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: ""
  });
  const [questionForm, setQuestionForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: ""
  });
  const [status, setStatus] = useState(null);

  const loadQuizzes = async () => {
    const data = await apiFetch("/quizzes");
    setQuizzes(data || []);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleQuizChange = (e) => {
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setQuestionForm({ ...questionForm, [e.target.name]: e.target.value });
  };

  const createQuiz = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!user || user.role !== "ADMIN") {
      setStatus("Admin access required. Please login with an admin account.");
      return;
    }
    try {
      await apiFetch("/admin/quizzes", {
        method: "POST",
        body: JSON.stringify(quizForm)
      });
      setQuizForm({ title: "", description: "", category: "", difficulty: "" });
      await loadQuizzes();
      setStatus("Quiz created.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "ADMIN") {
      setStatus("Admin access required. Please login with an admin account.");
      return;
    }
    if (!selectedQuiz) {
      setStatus("Select a quiz first.");
      return;
    }
    setStatus(null);
    try {
      await apiFetch(`/admin/quizzes/${selectedQuiz}/questions`, {
        method: "POST",
        body: JSON.stringify(questionForm)
      });
      setQuestionForm({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: ""
      });
      setStatus("Question added.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <p style={styles.subtext}>Signed in as {user?.username || "Admin"}</p>
      {user?.role !== "ADMIN" && (
        <div style={styles.status}>
          Admin access required. Please login with an admin account.
        </div>
      )}

      {status && <div style={styles.status}>{status}</div>}

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Create Quiz</h3>
          <form onSubmit={createQuiz} style={styles.form}>
            <input
              name="title"
              placeholder="Quiz title"
              value={quizForm.title}
              onChange={handleQuizChange}
              required
            />
            <input
              name="description"
              placeholder="Description"
              value={quizForm.description}
              onChange={handleQuizChange}
            />
            <input
              name="category"
              placeholder="Category"
              value={quizForm.category}
              onChange={handleQuizChange}
            />
            <input
              name="difficulty"
              placeholder="Difficulty"
              value={quizForm.difficulty}
              onChange={handleQuizChange}
            />
            <button type="submit" style={styles.primaryButton} disabled={!isAdmin}>
              Create Quiz
            </button>
          </form>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add Question</h3>
          <div style={styles.selectRow}>
            <label>Select Quiz</label>
            <select
              value={selectedQuiz || ""}
              onChange={(e) => setSelectedQuiz(e.target.value)}
            >
              <option value="" disabled>Select a quiz</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={addQuestion} style={styles.form}>
            <input
              name="questionText"
              placeholder="Question text"
              value={questionForm.questionText}
              onChange={handleQuestionChange}
              required
            />
            <input
              name="optionA"
              placeholder="Option A"
              value={questionForm.optionA}
              onChange={handleQuestionChange}
              required
            />
            <input
              name="optionB"
              placeholder="Option B"
              value={questionForm.optionB}
              onChange={handleQuestionChange}
              required
            />
            <input
              name="optionC"
              placeholder="Option C"
              value={questionForm.optionC}
              onChange={handleQuestionChange}
              required
            />
            <input
              name="optionD"
              placeholder="Option D"
              value={questionForm.optionD}
              onChange={handleQuestionChange}
              required
            />
            <input
              name="correctOption"
              placeholder="Correct option (A/B/C/D)"
              value={questionForm.correctOption}
              onChange={handleQuestionChange}
              required
            />
            <button type="submit" style={styles.primaryButton} disabled={!isAdmin}>
              Add Question
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 30px"
  },
  heading: {
    fontSize: "32px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "6px"
  },
  subtext: {
    color: "var(--text-secondary)",
    marginBottom: "20px"
  },
  status: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "var(--shadow-card)"
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "14px",
    color: "var(--text-primary)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  selectRow: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "12px"
  },
  primaryButton: {
    padding: "10px 14px",
    borderRadius: "12px",
    border: "none",
    background: "var(--accent)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  }
};

export default AdminPage;

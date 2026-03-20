import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, getToken } from "../api/client";
import { useAuth } from "../auth/AuthContext";

function QuizSelectionPage() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [attemptedQuizIds, setAttemptedQuizIds] = useState(new Set());
  const [attemptedModal, setAttemptedModal] = useState(null);

  const startQuiz = (quiz) => {
    if (attemptedQuizIds.has(quiz.id)) {
      setAttemptedModal(quiz);
      return;
    }
    navigate("/quiz", { state: { quizId: quiz.id, quizTitle: quiz.title } });
  };
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await apiFetch("/quizzes");
        setQuizzes(data || []);
      } catch (error) {
        alert(error.message);
      }
    };

    loadQuizzes();
  }, []);

  useEffect(() => {
    if (!user) {
      setAttemptedQuizIds(new Set());
      return;
    }
    if (!getToken()) {
      setAttemptedQuizIds(new Set());
      return;
    }
    const loadAttempts = async () => {
      try {
        const data = await apiFetch("/quizzes/attempts");
        setAttemptedQuizIds(new Set(data || []));
      } catch (error) {
        setAttemptedQuizIds(new Set());
      }
    };
    loadAttempts();
  }, [user]);

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>Select a Quiz</h2>
      <p style={styles.subtext}>Choose a subject and start your challenge</p>

      <div style={styles.cardContainer}>

        {quizzes.map((quiz, idx) => (
          <div
            key={quiz.id}
            style={{...styles.card, animationDelay: `${idx * 0.12}s`}}
            onClick={() => startQuiz(quiz)}
          >
            <div style={styles.cardIcon}>🧠</div>
            <h3 style={styles.cardTitle}>{quiz.title}</h3>
            <div style={styles.cardMeta}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Questions</span>
                <span style={styles.metaValue}>{quiz.questionCount}</span>
              </div>
              <div style={styles.metaDivider} />
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Duration</span>
                <span style={styles.metaValue}>{quiz.questionCount} min</span>
              </div>
            </div>
            <div style={{
              ...styles.startLabel,
              color: attemptedQuizIds.has(quiz.id) ? "var(--error)" : "var(--accent)"
            }}>
              {attemptedQuizIds.has(quiz.id) ? "Already Attempted" : "Start Quiz →"}
            </div>
          </div>
        ))}

      </div>

      {attemptedModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={styles.modalTitle}>Quiz already attempted</h3>
            <p style={styles.modalText}>
              You have already completed "{attemptedModal.title}". You cannot attempt it again.
            </p>
            <button
              style={styles.modalButton}
              onClick={() => setAttemptedModal(null)}
            >
              Back to quizzes
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {

  container: {
    textAlign: "center",
    marginTop: "80px",
    padding: "0 20px"
  },

  heading: {
    fontSize: "40px",
    fontWeight: 800,
    color: "var(--text-primary)",
    letterSpacing: "-1.5px",
    marginBottom: "10px",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    transition: "color 0.4s ease"
  },

  subtext: {
    fontSize: "17px",
    color: "var(--text-secondary)",
    fontWeight: 400,
    marginBottom: "12px",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
    transition: "color 0.4s ease"
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "28px",
    marginTop: "44px",
    flexWrap: "wrap"
  },

  card: {
    width: "300px",
    padding: "40px 32px 32px",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    cursor: "pointer",
    background: "var(--bg-card)",
    boxShadow: "var(--shadow-md)",
    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, background-color 0.4s ease",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
    textAlign: "center"
  },

  cardIcon: {
    fontSize: "48px",
    marginBottom: "18px",
    animation: "float 3s ease-in-out infinite"
  },

  cardTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "20px",
    transition: "color 0.4s ease"
  },

  cardMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "22px"
  },

  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "3px"
  },

  metaLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--text-tertiary)",
    textTransform: "uppercase",
    letterSpacing: "0.8px"
  },

  metaValue: {
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text-primary)",
    transition: "color 0.4s ease"
  },

  metaDivider: {
    width: "1px",
    height: "32px",
    background: "var(--border)"
  },

  startLabel: {
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.2px"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    backdropFilter: "blur(6px)"
  },

  modalCard: {
    width: "min(460px, 92vw)",
    background: "var(--bg-card)",
    borderRadius: "var(--radius-lg)",
    padding: "28px 26px",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow-lg)",
    textAlign: "center"
  },

  modalTitle: {
    margin: "0 0 12px",
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text-primary)"
  },

  modalText: {
    color: "var(--text-secondary)",
    fontSize: "14px",
    marginBottom: "20px"
  },

  modalButton: {
    padding: "10px 20px",
    borderRadius: "999px",
    border: "none",
    background: "var(--accent)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer"
  }

};

export default QuizSelectionPage;
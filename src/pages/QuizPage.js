import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";
import { useAuth } from "../auth/AuthContext";

function QuizPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const quizId = location.state?.quizId;
  const quizType = location.state?.quizTitle || "Quiz";
  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!quizId) {
      navigate("/quiz-selection");
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }

    const loadQuiz = async () => {
      try {
        const attempts = await apiFetch("/quizzes/attempts");
        if (Array.isArray(attempts) && attempts.includes(quizId)) {
          alert("You already attempted this quiz.");
          navigate("/quiz-selection");
          return;
        }
        const data = await apiFetch(`/quizzes/${quizId}`);
        setQuestions(data.questions || []);
      } catch (error) {
        alert(error.message);
        navigate("/quiz-selection");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId, user, navigate]);

  useEffect(() => {
    if (!questions.length) {
      return;
    }
    const totalMinutes = Math.max(1, questions.length);
    setTimeLeft(totalMinutes * 60);
  }, [questions.length]);

  useEffect(() => {
    const requestFullScreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        // ignore fullscreen errors
      }
    };
    requestFullScreen();

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      setShowFinishConfirm(true);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const selectOption = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option
    });
  };

  const finishQuiz = useCallback(async () => {
    try {
      const payload = {
        answers: Object.keys(answers).map((index) => ({
          questionId: questions[index].id,
          selectedOption: answers[index]
        }))
      };

      const result = await apiFetch(`/quizzes/${quizId}/submit`, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      navigate("/result", {
        state: {
          score: result.score,
          total: result.total,
          attempted: Object.keys(answers).length,
          quizId,
          correctAnswers: result.correctAnswers
        }
      });
    } catch (error) {
      alert(error.message);
    }
  }, [answers, navigate, questions, quizId]);

  // TIMER
  useEffect(() => {
    if (!questions.length) {
      return;
    }
    if (timeLeft === 0) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finishQuiz, questions.length]);

  const isLowTime = timeLeft <= 60;
  const optionLabels = ["A", "B", "C", "D"];

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading quiz...</div>;
  }

  if (!questions.length) {
    return <div style={{ padding: "40px", textAlign: "center" }}>No questions available.</div>;
  }

  return (
    <div>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <div style={styles.quizBadge}>{quizType}</div>
          <span style={styles.questionCount}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div style={styles.timerBox}>
          <span style={styles.timerIcon}>⏱️</span>
          <h3 style={{
            ...styles.timer,
            color: isLowTime ? "var(--error)" : "var(--text-primary)",
            animation: isLowTime ? "pulse 1s ease-in-out infinite" : "none"
          }}>{formatTime()}</h3>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressTrack}>
        <div style={{
          ...styles.progressFill,
          width: `${((Object.keys(answers).length) / questions.length) * 100}%`
        }} />
      </div>

      <div style={styles.container}>

        {/* Left Panel */}
        <div style={styles.leftPanel}>

          <div style={styles.questionCard}>
            <h3 style={styles.questionText}>
              Q{currentQuestion + 1}. {questions[currentQuestion].questionText}
            </h3>

            <div style={styles.optionsGrid}>
              {[
                questions[currentQuestion].optionA,
                questions[currentQuestion].optionB,
                questions[currentQuestion].optionC,
                questions[currentQuestion].optionD
              ].map((option, index) => {
                const isSelected = answers[currentQuestion] === optionLabels[index];
                return (
                  <div
                    key={index}
                    style={{
                      ...styles.option,
                      backgroundColor: isSelected
                        ? "var(--accent)"
                        : "var(--bg-card)",
                      borderColor: isSelected
                        ? "var(--accent)"
                        : "var(--border)",
                      boxShadow: isSelected
                        ? "0 4px 16px rgba(0, 113, 227, 0.2)"
                        : "var(--shadow-sm)"
                    }}
                    onClick={() => selectOption(optionLabels[index])}
                  >
                    <div style={{
                      ...styles.optionLetter,
                      background: isSelected ? "rgba(255,255,255,0.25)" : "var(--accent-soft)",
                      color: isSelected ? "#fff" : "var(--accent)"
                    }}>
                      {optionLabels[index]}
                    </div>
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => selectOption(optionLabels[index])}
                      style={{ display: "none" }}
                    />
                    <label style={{
                      ...styles.optionLabel,
                      color: isSelected ? "#fff" : "var(--text-primary)"
                    }}>{option}</label>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>

          <div style={styles.sideCard}>
            <h4 style={styles.panelHeading}>Questions</h4>

            <div style={styles.questionGrid}>
              {questions.map((_, index) => {
                const isCurrent = currentQuestion === index;
                const isAnswered = !!answers[index];
                return (
                  <button
                    key={index}
                    style={{
                      ...styles.questionButton,
                      backgroundColor: isCurrent
                        ? "var(--accent)"
                        : isAnswered
                          ? "var(--success)"
                          : "var(--bg-option)",
                      color: (isCurrent || isAnswered)
                        ? "#fff"
                        : "var(--text-secondary)",
                      boxShadow: isCurrent
                        ? "0 0 0 3px var(--accent-soft)"
                        : isAnswered
                          ? "0 2px 8px rgba(48, 209, 88, 0.2)"
                          : "none",
                      transform: isCurrent ? "scale(1.1)" : "scale(1)"
                    }}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={styles.legend}>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, background: "var(--accent)"}} />
                <span>Current</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, background: "var(--success)"}} />
                <span>Answered</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, background: "var(--bg-option)", border: "1px solid var(--border)"}} />
                <span>Pending</span>
              </div>
            </div>
          </div>

          <div style={styles.navButtons}>
            <button
              style={styles.navBtn}
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(prev - 1, 0))
              }
            >
              ← Previous
            </button>

            <button
              style={styles.navBtn}
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(prev + 1, questions.length - 1)
                )
              }
            >
              Next →
            </button>
          </div>

          <button style={styles.endButton} onClick={() => setShowFinishConfirm(true)}>
            End Test
          </button>

        </div>

      </div>

      {showFinishConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={styles.modalTitle}>Finish quiz?</h3>
            <p style={styles.modalText}>
              Attempted: {Object.keys(answers).length} · Not attempted: {questions.length - Object.keys(answers).length}
            </p>
            <p style={styles.modalSubtext}>
              Are you sure you want to finish and submit your answers?
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalSecondary} onClick={() => setShowFinishConfirm(false)}>
                Continue Test
              </button>
              <button style={styles.modalPrimary} onClick={finishQuiz}>
                Finish Quiz
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 36px",
    borderBottom: "1px solid var(--border)",
    background: "var(--bg-card)",
    transition: "background-color 0.4s ease",
    animation: "fadeIn 0.5s ease forwards"
  },

  topBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },

  quizBadge: {
    padding: "6px 16px",
    borderRadius: "980px",
    background: "var(--accent)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.3px"
  },

  questionCount: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    fontWeight: 500
  },

  timerBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 18px",
    borderRadius: "var(--radius-md)",
    background: "var(--bg-option)",
    transition: "background-color 0.4s ease"
  },

  timerIcon: {
    fontSize: "16px"
  },

  timer: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
    transition: "color 0.3s ease"
  },

  progressTrack: {
    height: "3px",
    background: "var(--border)",
    width: "100%"
  },

  progressFill: {
    height: "100%",
    background: "var(--accent)",
    borderRadius: "0 3px 3px 0",
    transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
  },

  container: {
    display: "flex",
    padding: "32px 36px",
    gap: "32px",
    animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
  },

  leftPanel: {
    flex: 6
  },

  rightPanel: {
    flex: 4,
    animation: "slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both"
  },

  questionCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "36px 32px",
    boxShadow: "var(--shadow-card)",
    transition: "background-color 0.4s ease, box-shadow 0.4s ease"
  },

  questionText: {
    fontSize: "22px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "28px",
    lineHeight: 1.4,
    transition: "color 0.4s ease"
  },

  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px"
  },

  option: {
    padding: "18px 20px",
    borderRadius: "var(--radius-md)",
    border: "2px solid var(--border)",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
  },

  optionLetter: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: 700,
    flexShrink: 0,
    transition: "all 0.3s ease"
  },

  optionLabel: {
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "color 0.3s ease"
  },

  sideCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "28px 24px",
    boxShadow: "var(--shadow-card)",
    marginBottom: "16px",
    transition: "background-color 0.4s ease, box-shadow 0.4s ease"
  },

  panelHeading: {
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    marginBottom: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "color 0.4s ease"
  },

  questionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px"
  },

  questionButton: {
    height: "44px",
    borderRadius: "var(--radius-sm)",
    border: "none",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
  },

  legend: {
    display: "flex",
    gap: "18px",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px solid var(--border)"
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "var(--text-secondary)",
    fontWeight: 500
  },

  legendDot: {
    width: "10px",
    height: "10px",
    borderRadius: "3px"
  },

  navButtons: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px"
  },

  navBtn: {
    flex: 1,
    padding: "13px",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "var(--shadow-sm)",
    transition: "all 0.25s ease"
  },

  endButton: {
    padding: "14px",
    width: "100%",
    background: "var(--error)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(255, 59, 48, 0.2)",
    transition: "background-color 0.3s ease",
    letterSpacing: "0.3px"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    backdropFilter: "blur(6px)"
  },

  modalCard: {
    width: "min(520px, 92vw)",
    background: "var(--bg-card)",
    borderRadius: "var(--radius-lg)",
    padding: "28px 30px",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow-lg)",
    textAlign: "center"
  },

  modalTitle: {
    margin: "0 0 10px",
    fontSize: "22px",
    fontWeight: 700,
    color: "var(--text-primary)"
  },

  modalText: {
    margin: "0 0 6px",
    fontSize: "15px",
    fontWeight: 600,
    color: "var(--text-primary)"
  },

  modalSubtext: {
    margin: "0 0 20px",
    fontSize: "14px",
    color: "var(--text-secondary)"
  },

  modalActions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap"
  },

  modalSecondary: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "1px solid var(--border)",
    background: "var(--bg-option)",
    color: "var(--text-primary)",
    fontWeight: 600,
    cursor: "pointer"
  },

  modalPrimary: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    background: "var(--accent)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer"
  }
};

export default QuizPage;
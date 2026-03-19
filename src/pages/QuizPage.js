import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuizPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const quizType = location.state?.quizType || "Quiz";

  const questions = [
    {
      question: "What is 2 + 2?",
      options: ["2", "3", "4", "5"],
      answer: "4"
    },
    {
      question: "What is 5 × 3?",
      options: ["15", "10", "20", "25"],
      answer: "15"
    },
    {
      question: "What is 10 - 4?",
      options: ["3", "4", "5", "6"],
      answer: "6"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes

  // TIMER
  useEffect(() => {
    if (timeLeft === 0) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

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

  const finishQuiz = () => {

    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    navigate("/result", {
      state: {
        score: score,
        total: questions.length,
        attempted: Object.keys(answers).length
      }
    });
  };

  const isLowTime = timeLeft <= 60;
  const optionLabels = ["A", "B", "C", "D"];

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
              Q{currentQuestion + 1}. {questions[currentQuestion].question}
            </h3>

            <div style={styles.optionsGrid}>
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = answers[currentQuestion] === option;
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
                    onClick={() => selectOption(option)}
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
                      onChange={() => selectOption(option)}
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

          <button style={styles.endButton} onClick={finishQuiz}>
            End Test
          </button>

        </div>

      </div>

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
  }
};

export default QuizPage;
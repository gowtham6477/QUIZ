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

  return (
    <div>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <h3>{quizType}</h3>
        <h3>{formatTime()}</h3>
      </div>

      <div style={styles.container}>

        {/* Left Panel */}
        <div style={styles.leftPanel}>

          <h3>
            Q{currentQuestion + 1}. {questions[currentQuestion].question}
          </h3>

          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} style={styles.option}>
              <input
                type="radio"
                checked={answers[currentQuestion] === option}
                onChange={() => selectOption(option)}
              />
              <label>{option}</label>
            </div>
          ))}

        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>

          <h4>Questions</h4>

          <div style={styles.questionGrid}>
            {questions.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.questionButton,
                  backgroundColor: answers[index]
                    ? "#90ee90"
                    : "#f0f0f0"
                }}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div style={styles.navButtons}>
            <button
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(prev - 1, 0))
              }
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(prev + 1, questions.length - 1)
                )
              }
            >
              Next
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
    padding: "15px 30px",
    borderBottom: "1px solid #ccc"
  },

  container: {
    display: "flex",
    padding: "30px"
  },

  leftPanel: {
    flex: 6,
    paddingRight: "40px"
  },

  rightPanel: {
    flex: 4,
    borderLeft: "1px solid #ccc",
    paddingLeft: "20px"
  },

  option: {
    marginTop: "10px"
  },

  questionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 40px)",
    gap: "10px",
    marginTop: "10px"
  },

  questionButton: {
    height: "40px"
  },

  navButtons: {
    marginTop: "20px",
    display: "flex",
    gap: "10px"
  },

  endButton: {
    marginTop: "30px",
    padding: "8px",
    width: "100%"
  }
};

export default QuizPage;
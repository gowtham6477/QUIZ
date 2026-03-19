import React from "react";
import { useNavigate } from "react-router-dom";

function QuizSelectionPage() {

  const navigate = useNavigate();

  const startQuiz = (quizType) => {
    navigate("/quiz", { state: { quizType: quizType } });
  };

  const quizzes = [
    { name: "Maths Quiz", icon: "🧮", questions: 20, time: 20, color: "#0071e3" },
    { name: "Science Quiz", icon: "🔬", questions: 20, time: 20, color: "#30d158" }
  ];

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>Select a Quiz</h2>
      <p style={styles.subtext}>Choose a subject and start your challenge</p>

      <div style={styles.cardContainer}>

        {quizzes.map((quiz, idx) => (
          <div
            key={idx}
            style={{...styles.card, animationDelay: `${idx * 0.12}s`}}
            onClick={() => startQuiz(quiz.name)}
          >
            <div style={styles.cardIcon}>{quiz.icon}</div>
            <h3 style={styles.cardTitle}>{quiz.name}</h3>
            <div style={styles.cardMeta}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Questions</span>
                <span style={styles.metaValue}>{quiz.questions}</span>
              </div>
              <div style={styles.metaDivider} />
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Duration</span>
                <span style={styles.metaValue}>{quiz.time} min</span>
              </div>
            </div>
            <div style={{...styles.startLabel, color: quiz.color}}>
              Start Quiz →
            </div>
          </div>
        ))}

      </div>

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
  }

};

export default QuizSelectionPage;
import React from "react";
import { useNavigate } from "react-router-dom";

function QuizSelectionPage() {

  const navigate = useNavigate();

  const startQuiz = (quizType) => {
    navigate("/quiz", { state: { quizType: quizType } });
  };

  return (
    <div style={styles.container}>

      <h2>Select a Quiz</h2>

      <div style={styles.cardContainer}>

        <div style={styles.card} onClick={() => startQuiz("Maths Quiz")}>
          <h3>Maths Quiz</h3>
          <p>20 Questions</p>
          <p>20 Minutes</p>
        </div>

        <div style={styles.card} onClick={() => startQuiz("Science Quiz")}>
          <h3>Science Quiz</h3>
          <p>20 Questions</p>
          <p>20 Minutes</p>
        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    textAlign: "center",
    marginTop: "100px"
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "40px"
  },

  card: {
    width: "200px",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#f9f9f9"
  }

};

export default QuizSelectionPage;
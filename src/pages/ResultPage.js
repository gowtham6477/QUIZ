import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { apiFetch } from "../api/client";

function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const attempted = location.state?.attempted || 0;
  const quizId = location.state?.quizId;

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (!quizId) {
      return;
    }
    const loadLeaderboard = async () => {
      try {
        const data = await apiFetch(`/leaderboard?quizId=${quizId}`);
        setLeaderboard(data || []);
      } catch (error) {
        setLeaderboard([]);
      }
    };

    loadLeaderboard();
  }, [quizId]);

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const unattempted = total - attempted;
  const wrong = attempted - score;

  const attemptData = [
    { name: "Attempted", value: attempted },
    { name: "Unattempted", value: unattempted }
  ];

  const scoreData = [
    { name: "Correct", value: score },
    { name: "Wrong", value: wrong }
  ];


  const rankBadge = (rank) => {
    const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
    return medals[rank] || `#${rank}`;
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>Quiz Result</h2>

      <h3 style={styles.scoreText}>Your Score: {score} / {total}</h3>

      <div style={styles.chartContainer}>

        {/* Attempt Chart */}
        <div style={styles.chartCard}>
          <h4 style={styles.chartTitle}>Attempted vs Unattempted</h4>

          <PieChart width={250} height={250}>
            <Pie
              data={attemptData}
              dataKey="value"
              outerRadius={80}
              label
            >
              <Cell fill="#30d158" />
              <Cell fill="#ff3b30" />
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
                boxShadow: "var(--shadow-md)",
                fontSize: "14px"
              }}
            />
          </PieChart>

        </div>

        {/* Score Chart */}
        <div style={{...styles.chartCard, animationDelay: "0.15s"}}>
          <h4 style={styles.chartTitle}>Correct vs Wrong</h4>

          <PieChart width={250} height={250}>
            <Pie
              data={scoreData}
              dataKey="value"
              outerRadius={80}
              label
            >
              <Cell fill="#0071e3" />
              <Cell fill="#ff9f0a" />
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
                boxShadow: "var(--shadow-md)",
                fontSize: "14px"
              }}
            />
          </PieChart>

        </div>

      </div>

      {/* Leaderboard */}

      <h3 style={styles.leaderboardTitle}>Leaderboard</h3>

      <table style={styles.table}>

        <thead>
          <tr>
            <th>Name</th>
            <th>College</th>
            <th>Timing</th>
            <th>Rank</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td style={styles.nameCell}>{user.username}</td>
              <td>{user.college || "—"}</td>
              <td>{user.score}/{user.total}</td>
              <td style={styles.rankCell}>{rankBadge(index + 1)}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <button style={styles.homeButton} onClick={() => navigate("/")}>Back to Home</button>

    </div>
  );
}

const styles = {

  container: {
    textAlign: "center",
    padding: "40px 30px"
  },

  heading: {
    fontSize: "40px",
    fontWeight: 700,
    color: "var(--text-primary)",
    letterSpacing: "-1px",
    marginBottom: "12px",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    transition: "color 0.4s ease"
  },

  scoreText: {
    fontSize: "22px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "8px",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
    transition: "color 0.4s ease"
  },

  homeButton: {
    marginTop: "28px",
    padding: "12px 26px",
    borderRadius: "999px",
    border: "none",
    background: "var(--accent)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "var(--shadow-md)"
  },

  chartContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    marginTop: "36px",
    marginBottom: "56px",
    flexWrap: "wrap"
  },

  chartCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "28px 24px",
    boxShadow: "var(--shadow-card)",
    animation: "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
    transition: "background-color 0.4s ease, box-shadow 0.4s ease"
  },

  chartTitle: {
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "color 0.4s ease"
  },

  leaderboardTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "24px",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
    transition: "color 0.4s ease"
  },

  table: {
    margin: "0 auto",
    borderCollapse: "separate",
    borderSpacing: 0,
    width: "60%",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    boxShadow: "var(--shadow-card)",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
    transition: "background-color 0.4s ease, box-shadow 0.4s ease"
  },

  nameCell: {
    fontWeight: 600,
    color: "var(--text-primary)"
  },

  rankCell: {
    fontSize: "20px"
  }

};

export default ResultPage;
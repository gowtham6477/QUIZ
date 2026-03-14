import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function ResultPage() {

  const location = useLocation();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const attempted = location.state?.attempted || 0;

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

  const leaderboard = [
    { name: "Sangeetha", college: "ABC College", time: "10 min", rank: 1 },
    { name: "Rahul", college: "XYZ College", time: "12 min", rank: 2 },
    { name: "Priya", college: "DEF College", time: "15 min", rank: 3 }
  ];

  return (
    <div style={styles.container}>

      <h2>Quiz Result</h2>

      <h3>Your Score: {score} / {total}</h3>

      <div style={styles.chartContainer}>

        {/* Attempt Chart */}
        <div>
          <h4>Attempted vs Unattempted</h4>

          <PieChart width={250} height={250}>
            <Pie
              data={attemptData}
              dataKey="value"
              outerRadius={80}
              label
            >
              <Cell fill="#82ca9d" />
              <Cell fill="#ff7f7f" />
            </Pie>
            <Tooltip />
          </PieChart>

        </div>

        {/* Score Chart */}
        <div>
          <h4>Correct vs Wrong</h4>

          <PieChart width={250} height={250}>
            <Pie
              data={scoreData}
              dataKey="value"
              outerRadius={80}
              label
            >
              <Cell fill="#8884d8" />
              <Cell fill="#ffc658" />
            </Pie>
            <Tooltip />
          </PieChart>

        </div>

      </div>

      {/* Leaderboard */}

      <h3>Leaderboard</h3>

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
              <td>{user.name}</td>
              <td>{user.college}</td>
              <td>{user.time}</td>
              <td>{user.rank}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

const styles = {

  container: {
    textAlign: "center",
    padding: "30px"
  },

  chartContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    marginTop: "30px",
    marginBottom: "40px"
  },

  table: {
    margin: "0 auto",
    borderCollapse: "collapse",
    width: "60%"
  }

};

export default ResultPage;
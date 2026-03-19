import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Later we will connect this with backend
    console.log("Email:", email);
    console.log("Password:", password);

    navigate("/quiz-selection");
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleLogin}>

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.loginButton}>
            Login
          </button>

        </form>

        <p style={styles.footerText}>
          If new user{" "}
          <span
            style={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Register Now
          </span>
        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh"
  },

  card: {
    width: "400px",
    padding: "44px 40px",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    textAlign: "center",
    background: "var(--bg-card)",
    boxShadow: "var(--shadow-lg)",
    animation: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    transition: "background-color 0.4s ease, box-shadow 0.4s ease"
  },

  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "32px",
    color: "var(--text-primary)",
    letterSpacing: "-0.5px",
    transition: "color 0.4s ease"
  },

  inputGroup: {
    marginBottom: "20px",
    textAlign: "left"
  },

  loginButton: {
    width: "100%",
    padding: "13px",
    cursor: "pointer",
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    fontSize: "16px",
    fontWeight: 600,
    marginTop: "8px",
    letterSpacing: "0.1px",
    transition: "background-color 0.3s ease"
  },

  footerText: {
    marginTop: "24px",
    color: "var(--text-secondary)",
    fontSize: "14px",
    transition: "color 0.4s ease"
  },

  registerLink: {
    color: "var(--accent)",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: 600
  }
};

export default LoginPage;
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

        <h2>Login</h2>

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

        <p style={{ marginTop: "15px" }}>
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
    width: "300px",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center"
  },

  inputGroup: {
    marginBottom: "15px",
    textAlign: "left"
  },

  loginButton: {
    width: "100%",
    padding: "8px",
    cursor: "pointer"
  },

  registerLink: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline"
  }
};

export default LoginPage;
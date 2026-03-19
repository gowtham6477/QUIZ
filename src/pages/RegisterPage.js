import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData);

    // Later this will send data to Spring Boot backend

    navigate("/quiz-selection");
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Register</h2>

        <form onSubmit={handleRegister}>

          <div style={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>College Name</label>
            <input
              type="text"
              name="college"
              placeholder="Enter College Name"
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.registerButton}>
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    padding: "30px 0"
  },

  card: {
    width: "420px",
    padding: "40px",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    background: "var(--bg-card)",
    boxShadow: "var(--shadow-lg)",
    animation: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    transition: "background-color 0.4s ease, box-shadow 0.4s ease"
  },

  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "28px",
    color: "var(--text-primary)",
    textAlign: "center",
    letterSpacing: "-0.5px",
    transition: "color 0.4s ease"
  },

  inputGroup: {
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column"
  },

  registerButton: {
    width: "100%",
    padding: "13px",
    marginTop: "12px",
    cursor: "pointer",
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.1px",
    transition: "background-color 0.3s ease"
  }
};

export default RegisterPage;
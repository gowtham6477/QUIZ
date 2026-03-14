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

        <h2>Register</h2>

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
    height: "85vh"
  },

  card: {
    width: "320px",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "8px"
  },

  inputGroup: {
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column"
  },

  registerButton: {
    width: "100%",
    padding: "8px",
    marginTop: "10px",
    cursor: "pointer"
  }
};

export default RegisterPage;
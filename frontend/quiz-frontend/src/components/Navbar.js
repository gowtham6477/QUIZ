import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>Quiz Website</h2>

      <button style={styles.loginButton} onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#f4f4f4",
    borderBottom: "1px solid #ccc"
  },

  logo: {
    margin: 0
  },

  loginButton: {
    padding: "8px 15px",
    cursor: "pointer"
  }
};

export default Navbar;
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function Navbar() {

  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>Quiz Website</h2>

      <div style={styles.rightSection}>
        <button
          style={styles.themeToggle}
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span style={styles.toggleTrack}>
            <span style={{
              ...styles.toggleThumb,
              transform: isDark ? "translateX(22px)" : "translateX(0)"
            }}>
              {isDark ? "🌙" : "☀️"}
            </span>
          </span>
        </button>

        <button style={styles.loginButton} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 36px",
    backgroundColor: "var(--bg-nav)",
    backdropFilter: "saturate(180%) blur(20px)",
    WebkitBackdropFilter: "saturate(180%) blur(20px)",
    borderBottom: "1px solid var(--border)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: "background-color 0.4s ease"
  },

  logo: {
    margin: 0,
    fontSize: "21px",
    fontWeight: 700,
    color: "var(--text-primary)",
    letterSpacing: "-0.5px",
    transition: "color 0.4s ease"
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },

  themeToggle: {
    background: "var(--bg-option)",
    border: "1px solid var(--border)",
    borderRadius: "980px",
    padding: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    width: "52px",
    height: "28px",
    position: "relative",
    transition: "background-color 0.3s ease"
  },

  toggleTrack: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center"
  },

  toggleThumb: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: 1
  },

  loginButton: {
    padding: "8px 22px",
    cursor: "pointer",
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "980px",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "0.1px",
    transition: "background-color 0.3s ease"
  }
};

export default Navbar;
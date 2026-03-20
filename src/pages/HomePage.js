import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.badge}>✨ Challenge Your Mind</div>
        <h1 style={styles.heading}>Welcome to Quiz</h1>
        <p style={styles.subtitle}>
          Put your knowledge to the test with interactive quizzes across multiple subjects.
          Track your scores and compete on the leaderboard.
        </p>
        <div style={styles.buttonRow}>
          <button
            style={styles.ctaButton}
            onClick={() => navigate(user ? "/quiz-selection" : "/login")}
          >
            Get Started
          </button>
          <button style={styles.secondaryButton} onClick={() => navigate("/register")}>
            Create Account
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={styles.featuresSection}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📝</div>
          <h3 style={styles.featureTitle}>Multiple Quizzes</h3>
          <p style={styles.featureDesc}>Choose from Maths, Science, and more subjects to test your skills.</p>
        </div>
        <div style={{...styles.featureCard, animationDelay: "0.12s"}}>
          <div style={styles.featureIcon}>⏱️</div>
          <h3 style={styles.featureTitle}>Timed Challenges</h3>
          <p style={styles.featureDesc}>Answer questions within the time limit to earn your best score.</p>
        </div>
        <div style={{...styles.featureCard, animationDelay: "0.24s"}}>
          <div style={styles.featureIcon}>🏆</div>
          <h3 style={styles.featureTitle}>Leaderboard</h3>
          <p style={styles.featureDesc}>Compete with others and climb to the top of the rankings.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "0 40px 60px",
    maxWidth: "1100px",
    margin: "0 auto"
  },

  heroSection: {
    textAlign: "center",
    paddingTop: "100px",
    paddingBottom: "70px",
    animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards"
  },

  badge: {
    display: "inline-block",
    padding: "8px 20px",
    borderRadius: "980px",
    background: "var(--accent-soft)",
    color: "var(--accent)",
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "24px",
    letterSpacing: "0.3px",
    animation: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    transition: "background-color 0.4s ease, color 0.4s ease"
  },

  heading: {
    fontSize: "64px",
    fontWeight: 800,
    color: "var(--text-primary)",
    letterSpacing: "-2.5px",
    lineHeight: 1.05,
    marginBottom: "20px",
    transition: "color 0.4s ease"
  },

  subtitle: {
    fontSize: "19px",
    color: "var(--text-secondary)",
    fontWeight: 400,
    lineHeight: 1.7,
    maxWidth: "560px",
    margin: "0 auto 36px",
    animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both",
    transition: "color 0.4s ease"
  },

  buttonRow: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both"
  },

  ctaButton: {
    padding: "14px 36px",
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "980px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.1px",
    boxShadow: "0 4px 16px rgba(0, 113, 227, 0.2)",
    transition: "transform 0.25s, box-shadow 0.25s, background-color 0.3s"
  },

  secondaryButton: {
    padding: "14px 36px",
    background: "transparent",
    color: "var(--accent)",
    border: "2px solid var(--accent)",
    borderRadius: "980px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.1px",
    transition: "transform 0.25s, background-color 0.3s, color 0.3s"
  },

  featuresSection: {
    display: "flex",
    gap: "24px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  featureCard: {
    flex: "1 1 280px",
    maxWidth: "320px",
    padding: "36px 28px",
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "var(--shadow-card)",
    animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, background-color 0.4s ease"
  },

  featureIcon: {
    fontSize: "40px",
    marginBottom: "16px",
    animation: "float 3s ease-in-out infinite"
  },

  featureTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "10px",
    transition: "color 0.4s ease"
  },

  featureDesc: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: 1.6,
    transition: "color 0.4s ease"
  }
};

export default HomePage;

const quizModel = require("../models/quizModel");
const userModel = require("../models/userModel");

// Get Questions
exports.getQuiz = (req, res) => {
  quizModel.getAllQuestions((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Submit Score
exports.submitScore = (req, res) => {
  const { userId, score } = req.body;

  if (!userId || score == null) {
    return res.status(400).json({ message: "Invalid data" });
  }

  userModel.updateScore(userId, score, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Score updated" });
  });
};

// Leaderboard
exports.getLeaderboard = (req, res) => {
  userModel.getLeaderboard((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
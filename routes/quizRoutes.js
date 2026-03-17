const express = require("express");
const router = express.Router();

const {
  getQuiz,
  submitScore,
  getLeaderboard
} = require("../controllers/quizController");

router.get("/questions", getQuiz);
router.post("/submit", submitScore);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
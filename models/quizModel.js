const db = require("../config/db");

exports.getAllQuestions = (callback) => {
  const sql = "SELECT * FROM quiz";
  db.query(sql, callback);
};
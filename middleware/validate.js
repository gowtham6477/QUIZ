const {
  isValidEmail,
  isValidPassword,
  isValidName
} = require("../utils/validators");

exports.validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!isValidName(name)) {
    return res.status(400).json({ message: "Invalid name" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: "Password must be 6+ chars" });
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!isValidEmail(email) || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  next();
};
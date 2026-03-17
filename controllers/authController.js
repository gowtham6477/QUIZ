const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.createUser(name, email, hashedPassword, (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json(err);
    }

    res.json({ message: "User Registered Successfully" });
  });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        score: user.score
      }
    });
  });
};
// Email validation
exports.isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password validation
exports.isValidPassword = (password) => {
  return password.length >= 6;
};

// Name validation
exports.isValidName = (name) => {
  return name && name.length >= 3;
};
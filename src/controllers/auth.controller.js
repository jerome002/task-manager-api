const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register User
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: { message: 'User already exists' } });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      data: { token: generateToken(user), user },
      message: 'User registered successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }
    res.json({
      success: true,
      data: { token: generateToken(user), user },
      message: 'Login successful'
    });
  } catch (err) {
    next(err);
  }
};

// Get Current User
exports.getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};

// Update Profile
exports.updateMe = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ success: true, data: user, message: 'Profile updated' });
  } catch (err) {
    next(err);
  }
};

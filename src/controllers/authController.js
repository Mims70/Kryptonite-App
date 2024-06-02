const User = require("../models/user");
const JWT = require("jsonwebtoken");
const JWTSecret = process.env.JWT_SECRET;
const {
  register,
  login,
  verifyOtp,
  logout,
} = require("../services/authService");

// Register Controller
const registerController = async (req, res, next) => {
  try {
    const signupService = await register(req.body);
    return res.json(signupService);
  } catch (error) {
    next(error);
  }
};

// Login Controller
const loginController = async (req, res, next) => {
  try {
    const loginService = await login(req.body.email, req.body.password);
    return res.json(loginService);
  } catch (error) {
    next(error);
  }
};

// Verify OTP Controller
const verifyOtpController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Validate request body
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const verifyOtpService = await verifyOtp(email, otp);
    return res.json(verifyOtpService);
  } catch (error) {
    next(error);
  }
};

// Logout Controller
const logoutController = async (req, res) => {
  try {
    // Call the logout function with the user's email and the `res` object
    await logout(req.body.email, res);
  } catch (error) {
    // Handle any errors
    console.error("Error in logout controller:", error);
    res.status(500).json({ error: "An error occurred while logging out" });
  }
};

module.exports = {
  registerController,
  loginController,
  verifyOtpController,
  logoutController,
};

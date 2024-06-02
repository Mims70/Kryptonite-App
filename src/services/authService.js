const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWTSecret = process.env.JWT_SECRET;
const sendEmail = require("../utils/email/sendEmail"); 

// Register function
const register = async (data) => {
    try {
      // Check if the user already exists
      let user = await User.findOne({ email: data.email });
      if (user) {
        throw new Error("Email already exists");
      }
  
      // Create a new user
      user = new User({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
  
      // Save the user to the database
      await user.save();
  
      // Send a confirmation email to the user
      await sendEmail(
        user.email,
        "Registration Confirmation",
        {
          name: user.name,
        },
        "./template/registrationConfirmation.handlebars"
      );
  
      // Return success message
      return { message: 'User created successfully. A confirmation email has been sent to your email address.' };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };
  
  module.exports = {
    register,
  };

// Login function
const login = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the provided password with the hashed password in the database
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Update the user with the generated OTP and set OTP expiry time (e.g., 10 minutes)
  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  await user.save();

  // Send the OTP to the user's email address
  sendEmail(
    user.email,
    "Your OTP Code",
    {
      name: user.name,
      otp: otp,
    },
    "./template/otp.handlebars"
  );

  // Return a message indicating that the OTP has been sent
  return { message: 'OTP sent to your email address. Please use it to complete the login process.' };
};

// Verify OTP function
const verifyOtp = async (email, otp) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or OTP");
  }

  // Check if the OTP is valid and not expired
  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  // Clear the OTP and OTP expiry fields
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  // Generate a JWT token
  const token = JWT.sign({ id: user._id }, JWTSecret);

  return {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  };
};

const logout = async (email, res) => {
    try {
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      await Token.findOneAndDelete({ email });
  
      res.cookie('jwt', '', { maxAge: 1 });
  
      return res.json({ message: "Logout successful" });
    } catch (error) {
    
      console.error("Error logging out:", error);
      return res.status(500).json({ error: "An error occurred while logging out" });
    }
  };

module.exports = {
  register,
  login,
  verifyOtp,
  logout
};

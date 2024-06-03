const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWTSecret = process.env.JWT_SECRET;
const sendEmail = require("../utils/email/sendEmail"); 

const register = async (data) => {
    console.log("hitted")
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

      await sendEmail(
        user.email,
        "Registration Confirmation",
        {
          name: user.name,
          apiKey:user.apiKey,
        },
        "./template/registrationConfirmation.handlebars"
      );
  
      // Return success message
      return { message: 'User created successfully. A confirmation email has been sent to your email address.' };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error; 
    }
  };
  
  module.exports = {
    register,
  };


const login = async (email, password) => {

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  
  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  await user.save();


  sendEmail(
    user.email,
    "Your OTP Code",
    {
      name: user.name,
      otp: otp,
    },
    "./template/otp.handlebars"
  );

  return { message: 'OTP sent to your email address. Please use it to complete the login process.' };
};

const verifyOtp = async (email, otp) => {
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or OTP");
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

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
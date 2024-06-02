const {
    registerController,
    loginController,
    logoutController,
    verifyOtpController
  } = require("../controllers/authController");
  
  const router = require("express").Router();
  
  router.post("/register", registerController);
  router.post("/login", loginController);
  router.post("/logout", logoutController);
  router.post("/verify-otp", verifyOtpController);
  
  module.exports = router;
  
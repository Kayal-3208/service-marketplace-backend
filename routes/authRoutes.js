console.log("authRoutes.js loaded");

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
console.log(registerUser);
console.log(loginUser);

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Auth route working");
});
router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
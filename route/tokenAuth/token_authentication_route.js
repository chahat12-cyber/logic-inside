const express = require("express");
const Login = require("../../controller/tokenAuth/token_authentication.js");
const router = express.Router();

// Route for login
router.post("/login", Login.createLogin);
router.post("/profile", Login.verifyToken, Login.getProfile);

module.exports = router;

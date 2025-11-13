const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");

router.post("/api/v1/auth/signup", authControllers.signUp);
router.post("/api/v1/auth/login", authControllers.login);

module.exports = router;

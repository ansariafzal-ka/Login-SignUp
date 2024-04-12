const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users.controllers");
const authenticate = require("../config/auth");

router.get("/home", authenticate, userControllers.sendUserData);

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);

module.exports = router;

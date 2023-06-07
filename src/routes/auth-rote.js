const express = require("express");
const authController = require("../controllers/auth-controller");
const authenticateMidlleware = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateMidlleware, authController.getMe);

module.exports = router;

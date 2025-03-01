const express = require("express");
const {
  passCheckController,
  getPassword,
} = require("../controllers/passwordController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/pass", authMiddleware, passCheckController);
router.get("/get-pass", authMiddleware, getPassword);

module.exports = router;

const express = require("express");
const {
  emailCheckController,
  getMail,
} = require("../controllers/emailController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/email", authMiddleware, emailCheckController);
router.get("/get-email", authMiddleware, getMail);

module.exports = router;

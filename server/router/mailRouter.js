const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const mailController = require("../controllers/mailController");

const router = express.Router();
router.post("/pmail", authMiddleware, mailController);
module.exports = router;

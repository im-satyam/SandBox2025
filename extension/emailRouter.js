const express = require("express");
const emailCheckController = require("./emailController");

const router = express.Router();
router.post("/email", emailCheckController);
module.exports = router;

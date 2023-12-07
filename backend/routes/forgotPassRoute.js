const express = require("express");
const router = express.Router();
const ForgotPassword = require("../controllers/forgotPassCont.js");

router.put("/forgotpassword", ForgotPassword);

module.exports = router;
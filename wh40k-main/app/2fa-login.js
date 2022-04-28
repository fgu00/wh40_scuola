const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("home/2fa-login.ejs");
  });

module.exports = router;
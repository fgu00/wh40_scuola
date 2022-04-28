const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("dashboard/settings.ejs");
  });

module.exports = router;
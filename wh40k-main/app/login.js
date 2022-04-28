const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get("/", function (req, res) {
  res.render("home/login.ejs");
});

 router.post("/", function (req, res, next) {
  passport.authenticate('local',{
    successRedirect : '/2fa-login',
    failureRedirect: '/login',
    failureFlash : true
})(req,res,next)
}); 

module.exports = router;
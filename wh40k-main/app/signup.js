const api = require.main.require("./app/api/api_controller.js"); 
const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

router.get("/", function (req, res) {
  res.render("home/signup.ejs");
});

router.post("/", function (req, res, next) {
  const {username, password, password2} = req.body;
  let errors = [];
  console.log('Username: ' +username+ ' Password: ' +password+ ' Password2: ' +password2);  

  //check if password match
  if(password !== password2) {
    errors.push({msg : "Le password inserite non corrispondono!"});
  }

  //check if password is more than 6 characters
  if(password.length < 6 ) {
      errors.push({msg : 'La password deve essere lunga almeno 6 caratteri!'})
  }

  //check if username is longer than 15 characters
  if(username.length > 15 ) {
    errors.push({msg : 'Il nome utente non può essere più lungo di 15 caratteri!'})
}

  if(errors.length > 0 ) {
    res.render('home/signup.ejs', {
      errors : errors,
      username : username,
      password : password,
      password2 : password2})
    } else {
      //validation passed
      api.getUserByUsername(username,function(err,results){
        console.log(results);
        if (results.length > 0){
          errors.push({msg: 'Nome utente non disponibile oppure già registrato!'});
          res.render('home/signup.ejs',{errors,username,password,password2})
        }else{
        //hash password
        bcrypt.genSalt(10,(err,salt)=> 
        bcrypt.hash(password,salt,
          (err,hash)=> {
            if(err) throw err;
            console.log(hash);
            //save user to db
            api.signUpUser(username, function(err,results){
              if(err){
                errors.push({msg: 'Errore durante il processo di registrazione! Riprovare più tardi'});
                res.render('home/signup.ejs',{errors,username,password,password2})
              }else{
                req.flash('success_msg','Registrazione completata!');
                res.redirect('/login');
              }
            });   
          }));  
        }
      });
    }
}); 

module.exports = router;
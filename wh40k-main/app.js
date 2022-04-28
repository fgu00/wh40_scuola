const express = require ('express');
const ejs= require ('ejs');
const session = require('express-session');
const cookie = require ('cookie-parser');
const bodyParser = require('body-parser');
const path = require ('path'); 
const flash = require('connect-flash');
const passport = require("passport");
const app = express();

/* HOME */

const index = require ('./app/index');
const login = require ('./app/login');
const signup = require ('./app/signup');
const totpLogin = require ('./app/2fa-login');
const totpSignup = require ('./app/2fa-signup');

/* END HOME */

/* DASHBOARD */

const home = require ('./app/home');
const settings = require ('./app/settings');

/* END DASHBOARD */

/* PASSPORT CONFIG */

require('./config/passport')(passport)

/* END PASSPORT CONFIG */

const db = require('./app/api/api_controller');

app.set('view engine ', 'ejs');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookie());
app.use(
    session({
      secret : 'secret',
      resave : true,
      saveUninitialized : true
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 
  app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })


app.listen(3000 , function(){
    console.log("server running");
});

/* HOME */

app.use('/' , index);
app.use('/login' , login);
app.use('/signup' , signup);
app.use('/2fa-login' , totpLogin);
app.use('/2fa-signup' , totpSignup);

/* END HOME */

/* DASHBOARD */

app.use('/home' , home);
app.use('/settings' , settings);

/* END DASHBOARD */

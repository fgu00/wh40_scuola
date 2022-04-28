const api = require.main.require("./app/api/api_controller.js"); 
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'username'},(username,password,done)=>{

            api.getUserByUsername(username,function(err,results){
                if (results.length > 0){
                    for (i = 0; i < results.length; i++) {
                        account = JSON.stringify(results[i]);
                    }
                    var user = JSON.parse(account);
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) throw err;
                        if(isMatch){
                            return done(null,user);
                        } else{
                            return done(null,false,{message: 'Password errata!'});
                        }
                    })
                }else{
                    return done(null,false,{message:'Utente non registrato!'});
                }
            });
        })
    )

     passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    
    passport.deserializeUser(function(id,done){
        api.getUserById(id,function(err,results){
            if (results.length > 0){
                for (i = 0; i < results.length; i++) {
                    account = JSON.stringify(results[i]);
                }
                var user = JSON.parse(account);
                done(err,user);
            }
        });
    })
}
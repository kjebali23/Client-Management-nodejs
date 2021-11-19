const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

//Load User Account Model
const Accounts = require('../server/model/accountModel');


module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField : 'email'} , (email,password , done )=>{
            //Match user 
            Accounts.findOne({email : email})
                .then(user =>{
                    if(!user){
                        return done(null , false , {message: ' This email doesnt exist'})
                    }
                    //Match password
                    bycrypt.compare(password , user.password ,(err , isMatch )=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null , user);
                        }else{
                            return done(null,false , {message: 'Password is incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        Accounts.findById(id, (err, user)=> {
          done(err, user);
        });
      });
      
}
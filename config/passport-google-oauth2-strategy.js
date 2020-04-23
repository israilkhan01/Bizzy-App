const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID:'122581324455-1mrb67rp0blhoqhgv5hei6lkasfnijmg.apps.googleusercontent.com',
    clientSecret:'-GgJH7vojfWE-CFjd8EBAsF2',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
   },
   function(accessToken,refreshToken,profile,done){
       User.findOne({email:profile.emails[0].value}).exec(function(err,user){
           if(err){console.log('Error in googe strategy passport',err);return;}
           console.log(profile);
           if(user){
               //if find then set it as req.user
               return done(null,user);
           }else{
               //if not find then create the user and set it as req.user
               User.create({
                   name:profile.displayName,
                   email:profile.emails[0].value,
                   password:crypto.randomBytes(20).toString('hex')
               },
               function(err,user){
                if(err){console.log('Error in googe strategy passport',err);return;}
                return done(null,user);
               })
           }

       })
   }
));
module.exports=passport;
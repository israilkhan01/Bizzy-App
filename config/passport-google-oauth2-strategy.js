const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const env=require('./environment');
const User=require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID:env.Google_clientID,
    clientSecret:env.Google_clientSecret,
    callbackURL:env.Google_callbackURL,
   },
   function(accessToken,refreshToken,profile,done){
       User.findOne({email:profile.emails[0].value}).exec(function(err,user){
           if(err){console.log('Error in googe strategy passport',err);return;}
           console.log('accessToken',accessToken,refreshToken);
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
                if(err){console.log('Error in googe strategy passport while creating user',err);return;}
                return done(null,user);
               })
           }

       })
   }
));
module.exports=passport;
const passport=require('passport');
const JWTstrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const env=require('./environment');
const User=require('../models/user');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_Secret,
}
passport.use(new JWTstrategy(opts,function(jwtpayload,done){
  User.findById(jwtpayload._id,function(err,user){
      if(err){console.log('Error in finding user from jwt',err);return}
      if(user){
          return done(null,user);
      }else{
          return done(null,false);
      }
  })
}));

module.exports=passport;

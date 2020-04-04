const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email'
        },
    function(email,password,done){
   //find a user esteblishing the identity
   User.findOne({email:email},function(err,user){
       if(err){ console.log('error in finding user--> passport')
            return done(err);
        }
      if(!user||user.password!=password){
          console.log('password invalid');
          return done(null,false);
      }
      return done(null,user);
    });
    }
));

//serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserialising the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){ console.log('error in finding user--> passport')
            return done(err)
        }
        return done(null,user);
    }
)});

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if user is signed in then pass on request to the next function (controller action)
     if(req.isAuthenticated()){
         return next();
     }
     //if user is not signed in
     return res.redirect('/users/sign-in')

}

passport.setAuthenticatedUser=function(req,res,next){
//req.user contains the signed in user from the session cookie and we are just sending this to locals 
//for the views
   if(req.isAuthenticated()){
       res.locals.user=req.user;
   }
   next();
}
module.exports=passport;
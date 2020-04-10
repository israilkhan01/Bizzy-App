const User=require('../models/user')

module.exports.profile=function(req,res){
   User.findById(req.params.id,function(err,users){
    return res.render('user_profile',{
        title:"Profile",
        profile_user:users
    });
   })
    
}
//these are actions
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_signin',{
        title:"Bizzy | SignIn"
    })
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    return res.render('user_signup',{
        title:"Bizzy | SignUp"
    })
}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

   User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log('error in finding user in signing up'); return;} 
        if(!user){
                 User.create(req.body,function(err,user){
                     if(err){console.log('error in creating user while signing Up');return;}
                     return res.redirect('/users/sign-in');
                 })
        }else{ return res.redirect('back');}
        })
}

//sign in and create the session for the user

module.exports.createSession=function(req,res){
    //later on
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/')
}